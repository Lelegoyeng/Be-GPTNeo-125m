import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class PromptService {
  async processPrompt(prompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const command = `python ./gpt/chat.py "${prompt}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Execution error: ${stderr || error.message}`));
        } else {
          const result = stdout.trim();
          if (result === prompt) {
            resolve('Maaf saya belum paham maksud anda.');
          } else {
            resolve(result);
          }
        }
      });
    });
  }
}
