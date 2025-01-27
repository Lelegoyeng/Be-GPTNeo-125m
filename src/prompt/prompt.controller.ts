import { Controller, Post, Body } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  async promptCommand(@Body() createPromptDto: CreatePromptDto): Promise<any> {
    return {
      data: {},
      message: `Successfully`,
      statusCode: 200,
    };
  }
}
