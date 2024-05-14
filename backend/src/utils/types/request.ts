import { Request } from 'express';

export interface Res<T> {
  data: T;
}

export interface Req<T> extends Request {
  body: T;
}