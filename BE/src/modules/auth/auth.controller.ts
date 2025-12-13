import { Controller, Post, Body, Res, Req, UnauthorizedException, Get } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: FastifyReply) {
    const result = await this.authService.login(loginDto);

    // Set access token in HTTP-only cookie
    response.setCookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours (matches JWT token expiry)
      path: '/',
    });

    // Set refresh token in HTTP-only cookie
    response.setCookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/auth/refresh',
    });

    // Return user data (without tokens)
    const { accessToken, refreshToken, ...dataToReturn } = result;
    console.log('accessToken', accessToken);
    return response.send(dataToReturn);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() response: FastifyReply) {
    const result = await this.authService.register(registerDto);

    // Set access token in HTTP-only cookie
    response.setCookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours (matches JWT token expiry)
      path: '/',
    });

    // Set refresh token in HTTP-only cookie
    response.setCookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/auth/refresh',
    });

    // Return user data (without tokens)
    const { accessToken, refreshToken, ...dataToReturn } = result;
    return response.send(dataToReturn);
  }

  @Post('refresh')
  async refresh(@Req() request: FastifyRequest, @Res() response: FastifyReply) {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const result = await this.authService.refreshToken({ refreshToken });

    // Set new access token in HTTP-only cookie
    response.setCookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours (matches JWT token expiry)
      path: '/',
    });

    // Set new refresh token in HTTP-only cookie
    response.setCookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/auth/refresh',
    });

    // Return user data (without tokens)
    const { accessToken, refreshToken: newRefreshToken, ...dataToReturn } = result;
    return response.send(dataToReturn);
  }

  @Get('status')
  async status(@Req() request: FastifyRequest) {
    // Try to get token from cookie first, then from header (fallback)
    const accessToken = request.cookies.accessToken || this.extractTokenFromHeader(request);

    if (!accessToken) {
      return {
        isAuthenticated: false,
      };
    }

    const userPayload = await this.authService.validateAccessToken(accessToken);

    if (!userPayload) {
      return {
        isAuthenticated: false,
      };
    }

    const user = await this.authService.getAuthenticatedUser(userPayload.sub);

    if (!user) {
      return {
        isAuthenticated: false,
      };
    }

    return {
      isAuthenticated: true,
      user,
    };
  }

  /**
   * Extract Bearer token from Authorization header (fallback)
   * Expected format: "Bearer <token>"
   */
  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return undefined;
    }

    const parts = authHeader.trim().split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return undefined;
    }

    return parts[1];
  }
} 