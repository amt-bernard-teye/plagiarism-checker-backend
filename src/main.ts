import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ["http://localhost:3000"]
  });
  app.use(morgan("tiny"));

  const config = new DocumentBuilder()
    .setTitle("Plagiarism Checker API")
    .setDescription("A simple backend api used by universities for checking submitted documents to ensure students aren't copying")
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api-docs", app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
