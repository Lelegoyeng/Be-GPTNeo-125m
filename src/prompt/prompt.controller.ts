import { Controller, Post, Body } from '@nestjs/common';
import { PromptService } from './prompt.service';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  async handlePrompt(@Body('prompt') prompt: string): Promise<any> {
    try {
      const response = await this.promptService.processPrompt(prompt);
      return {
        data: response,
        message: 'Successfully processed prompt',
        statusCode: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: `Error: ${error.message}`,
        statusCode: 500,
      };
    }
  }
}
