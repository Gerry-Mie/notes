import { Module } from '@nestjs/common';
import { ConfigModule as NConfig } from '@nestjs/config';
import { Config } from '@app/core/config/config.dto';

@Module({
    imports: [NConfig.forRoot({ isGlobal: true, validate: Config.validate })],
})
export class ConfigModule {}
