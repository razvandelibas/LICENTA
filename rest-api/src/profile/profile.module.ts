import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [AuthModule, ],
  controllers: [ProfileController],
  
})
export class ProfileModule {}
