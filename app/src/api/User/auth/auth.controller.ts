import { Body, Controller, Post } from '@nestjs/common';
import { SigInDto} from './DTO/auth.dto';
import { LoginAuthService } from './login.service';

@Controller('')
export class AuthController {
    constructor(
        private readonly SigIn: LoginAuthService,
    ){}

    @Post('/auth')
    async auth(@Body() SigInDto:SigInDto):Promise<{token: string}>{
        return this.SigIn.login(SigInDto)
    }
}
