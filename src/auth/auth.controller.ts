import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ILoginResponse } from './auth.interfaces';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<ILoginResponse> {
        return this.authService.login(request, response);
    }

    // @Post('logout')
    // logout(@Req() request: Request, @Res() response: Response) {
    //     return this.authService.logout(request, response);
    // }
}
