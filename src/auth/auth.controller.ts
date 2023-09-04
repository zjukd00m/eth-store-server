import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILoginResponse } from './auth.interfaces';
import { LoginDTO } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() request: LoginDTO): Promise<ILoginResponse> {
        return this.authService.login(request);
    }
}
