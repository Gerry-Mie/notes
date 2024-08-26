import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { useSwagger } from '@app/core/swagger';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as process from 'node:process';

const serviceAccount = path.join(process.cwd(), 'google-service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(compression());
    app.use(helmet());

    useSwagger(app);

    await app.listen(3000);
}

bootstrap();
