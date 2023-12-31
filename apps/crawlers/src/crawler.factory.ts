import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InflearnParserService } from './inflearn-parser.service';
import { TossParserService } from './toss-parser.service';

import { CompanyEnum, CompanyEnumType, DocDto } from '@app/common';

export interface AbstractCrawlerFactory {
  parser(baseUri: string, html: string): Promise<DocDto[]>;
}

@Injectable()
export class CrawlerFactory {
  private readonly logger = new Logger(CrawlerFactory.name);

  constructor(
    private readonly tossParserService: TossParserService,
    private readonly inflearnParserService: InflearnParserService,
    private readonly configService: ConfigService,
  ) {}

  getCompanyParser(company: CompanyEnumType): [AbstractCrawlerFactory, string] {
    switch (company) {
      case CompanyEnum.TOSS:
        return [this.tossParserService, this.configService.getOrThrow('TOSS_BASE_URI')];
      case CompanyEnum.INFLEARN:
        return [this.inflearnParserService, this.configService.getOrThrow('INFLEARN_BASE_URI')];
      default:
        this.logger.error(`not found company ${company}`);
    }
  }
}
