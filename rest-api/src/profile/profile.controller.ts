import { Controller, Get, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/roles.guard';

//const JwtAuthGuard = AuthGuard('jwt');

@Controller('/profile')
export class ProfileController {


//Cand utilizatorul autentificat face o cerere pentru ruta localhost:3000/profile, acea cerere va fi verificată de către două guarduri de securitate: JwtAuthGuard și RoleGuard. 
//Guardul JwtAuthGuard va verifica dacă cererea are un JWT valid, în timp ce RoleGuard va verifica rolul utilizatorului in baza de date în baza de date. Dacă utilizatorul îndeplinește ambele condiții, va avea acces la ruta protejată.
@UseGuards(AuthGuard('jwt'))
@Roles('BasicUser')
@Get('/user')
profile(){
  return {message: 'I am protected route for BasicUser'};
}

@UseGuards(AuthGuard('jwt'))
@Roles('Admin')
@Get('/admin')
profileAdmin(){
  return {message: 'I am protected route for Admin'};
}


}
