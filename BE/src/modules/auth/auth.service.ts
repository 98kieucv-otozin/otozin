import { Injectable, UnauthorizedException, ConflictException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { eq, and } from 'drizzle-orm';
import * as argon2 from 'argon2';
import { DRIZZLE_DB } from '../../database/drizzle/drizzle.module';
import { users } from '../../database/drizzle/schema';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { User, UserPayload } from '../../common/interfaces';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: NodePgDatabase,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const [user] = await this.db
      .select({
        id: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        firstName: users.firstName,
        lastName: users.lastName,
        isActive: users.isActive,
        role: users.role,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await argon2.verify(user.passwordHash, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;

    // Check if user already exists
    const [existingUser] = await this.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const passwordHash = await argon2.hash(password);

    // Create user
    const [user] = await this.db
      .insert(users)
      .values({
        email,
        passwordHash,
        firstName,
        lastName,
        role: 'USER',
      })
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
      });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      // Verify refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('jwt.secret'),
      });

      // Check if user still exists and is active
      const [user] = await this.db
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          isActive: users.isActive,
          role: users.role,
        })
        .from(users)
        .where(and(eq(users.id, payload.sub), eq(users.isActive, true)))
        .limit(1);

      if (!user) {
        throw new UnauthorizedException('User not found or inactive');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user.id, user.email, user.role);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getAuthenticatedUser(userId: number) {
    const [user] = await this.db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        isActive: users.isActive,
        role: users.role,
      })
      .from(users)
      .where(and(eq(users.id, userId), eq(users.isActive, true)))
      .limit(1);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }

  async validateAccessToken(token?: string) {
    if (!token) {
      return null;
    }

    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(token, {
        secret: this.configService.get('jwt.secret'),
      });
      return payload;
    } catch (error) {
      // Token expired or invalid
      return null;
    }
  }

  private async generateTokens(userId: number, email: string, role: string) {
    const jwtConfig = this.configService.get('jwt');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: jwtConfig.secret,
          expiresIn: jwtConfig.accessTokenExpiresIn,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: jwtConfig.secret,
          expiresIn: jwtConfig.refreshTokenExpiresIn,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
