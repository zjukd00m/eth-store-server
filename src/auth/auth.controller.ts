import {
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthRequest, ILoginResponse } from './auth.interfaces';
import { LoginDTO } from './dto/login.dto';
import { AuthInterceptor } from './auth.interceptor';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(201)
    login(@Body() loginDTO: LoginDTO): Promise<ILoginResponse> {
        return this.authService.login(loginDTO);
    }

    @UseInterceptors(AuthInterceptor)
    @Post('logout')
    logout(@Req() request: IAuthRequest): Promise<number> {
        const token = request.headers.authorization.split('Bearer ')[1];
        return this.authService.logout(request, token);
    }
}
