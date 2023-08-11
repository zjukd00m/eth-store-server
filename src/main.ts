import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Eth Store API')
        .setDescription('Eth Store REST API Documentation')
        .setVersion('1.0')
        .addTag('Users')
        .addTag('Items')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true, // strip out non-decorated DTO properties in validation
        }),
    );

    app.enableCors({
        origin: '*',
    });

    await app.listen(process.env.ETH_SERVER_PORT || 8098);
}
bootstrap();
