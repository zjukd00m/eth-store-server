import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ILoginResponse } from './auth.interfaces';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Req() request: Request): Promise<ILoginResponse> {
        return this.authService.login(request);
    }

    // @Post('logout')
    // logout(@Req() request: Request, @Res() response: Response) {
    //     return this.authService.logout(request, response);
    // }
}
