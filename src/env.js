export const NODE_ENV = process.env.NODE_ENV || 'development';

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || 9000;

export const SECRET = process.env.SECRET || 'qooper';

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://clouditable:clouditable1.@cluster0.yb3pl.mongodb.net/qooper?retryWrites=true&w=majority';

export const RATE_LIMIT = process.env.RATE_LIMIT || 0;
