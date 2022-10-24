import { UserDocument } from './../users/schema/user.schema';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService:JwtService,
  ){ }

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10); //Retorna la contraseña encriptada
    userObject = {...userObject, password: plainToHash};
    return this.userModel.create(userObject);
  }

  async login(userObjectLogin: LoginAuthDto) {

    const { email, password } = userObjectLogin;
    
    const findUser = await this.userModel.findOne({email:email});
    if(!findUser) throw new HttpException('USER_NOT_FOUND',404);
    


    const checkPassword = await compare( password, findUser.password);
    if(!checkPassword) throw new HttpException('PASSWORD_INVALID',403);

    const payload = {
      id:findUser._id,
      name: findUser.name
    }

    const token = this.jwtService.sign(payload);


    const data = {
      findUser,
      token
    };
    return data;
  }
}
