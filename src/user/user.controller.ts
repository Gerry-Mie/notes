import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminPermission, RequestUser } from '../auth/auth.decorators';
import { DecodedIdToken } from '../auth/auth.types';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';
import { User } from './user.model';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: 'profile' })
    @Get('profile')
    @ApiResponse({ type: User })
    profile(@RequestUser() user: DecodedIdToken) {
        return this.userService.profile(user);
    }

    @ApiOperation({ summary: 'update permission' })
    @Patch('permission')
    @AdminPermission()
    @ApiResponse({ type: User })
    updateUserPermission(@Body() body: UpdateUserPermissionDto) {
        return this.userService.updateUserPermission(body);
    }
}
