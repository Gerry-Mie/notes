import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../auth/auth.decorators';
import { DecodedIdToken } from '../auth/auth.types';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('profile')
    profile(@RequestUser() user: DecodedIdToken) {
        return this.userService.profile(user);
    }
}
