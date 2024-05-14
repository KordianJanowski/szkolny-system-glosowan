import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotingsModule } from './votings/votings.module';
import { VotesModule } from './votes/votes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { Vote } from './votes/entities/vote.entity';
import { Voting } from './votings/entities/voting.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [User, Vote, Voting],
      synchronize: true,
      url: process.env.DATABASE_URL
    }),
    VotingsModule,
    VotesModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
