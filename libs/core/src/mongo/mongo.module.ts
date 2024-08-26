import { Module, Type } from '@nestjs/common';
import { ModelDefinition, MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import * as paginate from 'mongoose-paginate-v2';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('DB_URI'),
                dbName: configService.get('DB_NAME'),
                connectionFactory: (connection) => {
                    connection.plugin(paginate);
                    return connection;
                },
            }),
            inject: [ConfigService],
        }),
    ],
})
export class MongoModule {
    static forFeatures(models: Type[]) {
        return MongooseModule.forFeature(
            models.map(
                (model): ModelDefinition => ({
                    name: model.name,
                    schema: SchemaFactory.createForClass(model),
                }),
            ),
        );
    }
}
