import { IsDefined, IsString } from 'class-validator'

export class LoginValidation {
    @IsDefined({ always: true })
    @IsString()
    Username: string;

    @IsDefined({ always: true })
    @IsString()
    Password: string;
}