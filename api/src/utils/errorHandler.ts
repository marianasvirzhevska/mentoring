import { Response } from 'express';

export function errorHandler(
  message: string,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/ban-types
  error?: Object | string,
  code = 500,
): void {
  if (error) {
    console.error(error);
  }

  response.status(code).json({ status: message });
  response.end();
}
