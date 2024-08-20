import { SigInDto } from './DTO/auth.dto';
import { LoginAuthService } from './login.service';
export declare class AuthController {
    private readonly SigIn;
    constructor(SigIn: LoginAuthService);
    auth(SigInDto: SigInDto): Promise<{
        token: string;
    }>;
}
