import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { UserPayload } from '../../common/interfaces';

interface RequestWithUser extends FastifyRequest {
  user?: UserPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    // BƯỚC 1: LẤY TOKEN từ cookie hoặc header
    const tokenFromCookie = request.cookies?.accessToken;
    const tokenFromHeader = this.extractTokenFromHeader(request);
    const token = tokenFromCookie || tokenFromHeader;


    if (!token) {
      throw new UnauthorizedException('Access token is required');
    }

    // BƯỚC 2: VERIFY TOKEN (check signature, expiration, etc.)
    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(token, {
        secret: this.configService.get('jwt.secret'),
      });

      // BƯỚC 3: SET USER lên request
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
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