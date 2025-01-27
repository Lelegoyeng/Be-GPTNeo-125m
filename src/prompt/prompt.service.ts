import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Injectable()
export class PromptService {
  promptCommand(createPromptDto: CreatePromptDto) {
    return 'This action adds a new prompt';
  }
}
