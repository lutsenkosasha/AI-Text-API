import { config } from '../config';

export interface AIModel {
    name: string;
    tokenPrice: number; // Количество кредитов за токены
    generateText(prompt: string): Promise<string>; // Генерация текста на основе запроса
  }
  
  // Примерная реализация для OpenAI GPT
  class OpenAIModel implements AIModel {
    name = 'gpt-4';
    tokenPrice = 20;
  
    async generateText(prompt: string): Promise<string> {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
  
      //const data = await response.json();
      //return data.choices[0].text; // Возвращаем сгенерированный текст
      
      const text = await response.text(); // Используем .text() вместо .json() для отладки
      console.log('API response:', text);

      try {
        const data = JSON.parse(text); // Попытаемся распарсить ответ
        return data.choices[0].text; // Возвращаем сгенерированный текст
      } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to generate text');
      }
    }
}
  
  // Примерная реализация другой модели
  class GeminiModel implements AIModel {
    name = 'gemini-flash';
    tokenPrice = 10;
  
    async generateText(prompt: string): Promise<string> {
      return "Generated text from Gemini";
    }
  }
  

  export const models: AIModel[] = [new OpenAIModel(), new GeminiModel()];