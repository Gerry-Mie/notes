import { IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import 'dotenv/config';

export class Config {
    @IsString()
    DB_URI: string;

    @IsString()
    DB_NAME: string;

    public static validate(config: Record<string, unknown>) {
        const validatedConfig = plainToInstance(Config, config);

        const errors = validateSync(validatedConfig, {
            skipMissingProperties: false,
        });

        if (errors.length > 0) {
            throw new Error(errors.toString());
        }

        return validatedConfig;
    }
}
