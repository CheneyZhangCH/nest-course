import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './role'

@Injectable()
export class AaaGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler())
    console.log('requiredRoles', requiredRoles)
    if(!requiredRoles) return true

    const { user } = context.switchToHttp().getRequest()
    const result = requiredRoles.some(role => user && user.roles && user.roles.includes(role))
    return result
  }
}
