import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { loadMD } from '@app/core/utils';

export const useSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Notes')
        .setDescription(loadMD('swagger/doc.md', 'core'))
        .addBearerAuth()
        .addServer('http://localhost:3000', 'local')
        .addServer('https://notes-api.gerrymie.site', 'staging')
        .setVersion('1.0')
        .build();

    // save openapi json to root dir
    const document = SwaggerModule.createDocument(app, config);
    const outputPath = path.resolve(process.cwd(), 'swagger.json');
    writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8' });

    SwaggerModule.setup('swagger', app, document);
};
