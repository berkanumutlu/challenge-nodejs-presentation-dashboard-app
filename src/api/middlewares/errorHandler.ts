import { Request, Response, Next } from '@/types/request';
import { createNewLog } from '@/utils/logger';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: Next
): void => {
    createNewLog(err, req, res, next);
    res.error(err, 'Internal Server Error', 500);
};

export default errorHandler;