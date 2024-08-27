import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';
import { ValidationService } from '../common/validation.service';
import { PrismaService } from '../common/prisma.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';
import { UserValidation } from './user.validation';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.debug(`[User] Register new user ${JSON.stringify(request)}`);
    const dataRequest = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    );

    const findEmail = await this.prismaService.user.count({
      where: { email: dataRequest.email },
    });

    if (findEmail != 0) throw new HttpException('Email already exists', 400);

    dataRequest.password = await bcrypt.hash(dataRequest.password, 10);

    const user = await this.prismaService.user.create({ data: dataRequest });

    return {
      email: user.email,
      name: user.name,
    };
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    this.logger.debug(`[User] Login user ${JSON.stringify(request)}`);
    const dataRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    let user = await this.prismaService.user.findUnique({
      where: { email: dataRequest.email },
    });

    if (!user) throw new HttpException('Email or password is wrong', 401);

    const isPasswordValid = await bcrypt.compare(
      dataRequest.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new HttpException('Email or password is wrong', 401);

    user = await this.prismaService.user.update({
      where: { email: dataRequest.email },
      data: {
        token: uuid(),
        last_login: moment().format(),
      },
    });

    return {
      email: user.email,
      name: user.name,
      token: user.token,
    };
  }

  async get(user: User): Promise<UserResponse> {
    this.logger.debug(`[User] Get user ${JSON.stringify(user)}`);
    return {
      email: user.email,
      name: user.name,
    };
  }

  async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    this.logger.debug(
      `[User] Update user ${JSON.stringify(user)} , ${JSON.stringify(request)}`,
    );
    const dataRequest = this.validationService.validate(
      UserValidation.UPDATE,
      request,
    );

    if (dataRequest.password)
      dataRequest.password = await bcrypt.hash(dataRequest.password, 10);

    const result = await this.prismaService.user.update({
      where: { email: user.email },
      data: dataRequest,
    });

    return {
      email: result.email,
      name: result.name,
    };
  }

  async logout(user: User): Promise<boolean> {
    this.logger.debug(`[User] Logout user ${JSON.stringify(user)}`);
    await this.prismaService.user.update({
      where: { email: user.email },
      data: {
        token: null,
      },
    });

    return true;
  }
}
