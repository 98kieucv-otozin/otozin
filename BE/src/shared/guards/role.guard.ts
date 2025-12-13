import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPayload, UserRole } from '../../common/interfaces/user.interface';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';

const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.GUEST]: 0,
  [UserRole.USER]: 1,
  [UserRole.DEALER]: 2,
  [UserRole.ADMIN]: 3,
};

function getRequiredRoleFromPath(path: string): UserRole | null {
  if (path.startsWith('/api/admin/')) return UserRole.ADMIN;
  if (path.startsWith('/api/dealer/')) return UserRole.DEALER;
  if (path.startsWith('/api/user/')) return UserRole.USER;
  if (path.startsWith('/api/guest/')) return UserRole.GUEST;
  return null;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = (request as any).user as UserPayload;

    // Check nếu có @Roles() decorator - decorator này chỉ dành cho route-level guards
    // Global guard không nên check decorator này
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Nếu có @Roles() decorator, skip (để route-level RoleGuard xử lý)
    if (requiredRoles && requiredRoles.length > 0) {
      return true; // Skip để route-level guards xử lý
    }

    // Global guard chỉ check path-based role
    const requiredRole = getRequiredRoleFromPath(request.url);
    if (!requiredRole) return true; // Không kiểm tra nếu không phải route bảo vệ

    if (!user || ROLE_HIERARCHY[user.role] < ROLE_HIERARCHY[requiredRole]) {
      throw new ForbiddenException('Access denied: insufficient role');
    }

    return true;
  }
}
