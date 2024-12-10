import { Request, Response } from 'express';

export const streamGeneratedText = (req: Request, res: Response) => {
  const { modelName, prompt } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let count = 0;
  const interval = setInterval(() => {
    res.write(`data: Chunk of text part ${++count}\n\n`);
    if (count === 10) {
      clearInterval(interval);
      res.end();
    }
  }, 1000);
};