import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true, // strip out non-decorated DTO properties in validation
        }),
    );

    app.enableCors({
        origin: '*',
    });

    await app.listen(8099);
}
bootstrap();
