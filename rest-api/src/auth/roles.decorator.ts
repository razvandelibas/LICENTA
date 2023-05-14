import { SetMetadata } from '@nestjs/common';


//se defineste constanta ROLES_KEY care va fi folosită pentru a marca ruta ca fiind protejată cu decoratorul RoleGuard 
//și pentru a specifica rolurile necesare pentru acces

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);