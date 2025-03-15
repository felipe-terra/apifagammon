import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Agendamentos API')
    .setDescription('Em desenvolvimento')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT',
    )
    .build();

  app.useGlobalPipes(new ValidationPipe());

  const customOptions: ExpressSwaggerCustomOptions = {
    customSiteTitle: 'Agendamentos API',
    customCss: `
      .swagger-ui section.models{display: none};`,
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();

interface ExpressSwaggerCustomOptions {
  explorer?: boolean;
  swaggerOptions?: Record<string, any>;
  customCss?: string;
  customCssUrl?: string;
  customJs?: string;
  customfavIcon?: string;
  swaggerUrl?: string;
  customSiteTitle?: string;
  operationsSorter?: string;
  url?: string;
  urls?: Record<'url' | 'name', string>[];
}
