import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './auth.constant';
import { ROLES_KEY } from './roles.decorator';

//Cand utilizatorul autentificat face o cerere pentru ruta localhost:3000/profile, acea cerere va fi verificată de către două guarduri de securitate: JwtAuthGuard și RoleGuard. 
//Guardul JwtAuthGuard va verifica dacă cererea are un JWT valid, în timp ce RoleGuard va verifica rolul utilizatorului in baza de date în baza de date. 
//Dacă utilizatorul îndeplinește ambele condiții, va avea acces la ruta protejată.

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const  userJWT   = context.switchToHttp().getRequest().headers['authorization']; // ia token-ul JWT din header-ul Authorization ("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQmFzaWNVc2VyIiwic3ViIjo2LCJpYXQiOjE2NzgwMzgwMTksImV4cCI6MTY3ODAzOTgxOX0.EOBpjYvi8zQmNst-VgBFVw82GVIwbY3lrAWCxdfrdf0")
    const token = userJWT.split(' ')[1]; // scoate 'Bearer ' din fața token-ului
    let user = null;
    try {
    const decodedToken = jwt.verify(token, jwtConstants.secret) as jwt.JwtPayload ; // decodează token-ul
    if (decodedToken && decodedToken.role) {
      user = { role: decodedToken.role }; // creează un obiect user care conține doar rolul
      }
    } catch (err) {
      user = null;
    }
    return requiredRoles.some((role) => user?.role && user.role === role); //verifica rolul in baza de date
  }
}