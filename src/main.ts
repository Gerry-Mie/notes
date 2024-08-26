import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { useSwagger } from '@app/core/swagger';
import * as admin from 'firebase-admin';
import * as process from 'node:process';

const serviceAccountKey = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf8');
const serviceAccount = JSON.parse(serviceAccountKey);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(compression());
    app.use(helmet());

    useSwagger(app);

    await app.listen(PORT);
}

bootstrap();
