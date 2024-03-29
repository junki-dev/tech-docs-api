import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { DocsController } from './docs.controller';
import { DocsRepository } from './docs.repository';
import { DocsService } from './docs.service';

import { DatabaseModule, DocDocument, DocsSchema, HealthModule, LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    HealthModule,
    DatabaseModule,
    DatabaseModule.forFeature([{ name: DocDocument.name, schema: DocsSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        DOCS_GRPC_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [DocsController],
  providers: [DocsService, DocsRepository],
})
export class DocsModule {}
