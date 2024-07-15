import { Response } from 'express';

import { createErrorResponse } from './api.response';
import HttpCode from './http.code';

export const handleJoiValidationError = (error: string, res: Response) => {
  return res.json(
    createErrorResponse(HttpCode.BAD_REQUEST, 'Validation Error', error),
  );
};
