import { HttpStatus } from '@nestjs/common';

export interface IDefaultResponse {
  status: HttpStatus;
  message: string;
}

export interface ISuccessResponse {
  status: HttpStatus;
  data: any;
  message?: string;
}

export class DefaultResponse implements IDefaultResponse {
  status: HttpStatus;
  message: string;
}

export class DefaultSuccessResponse implements ISuccessResponse {
  status: HttpStatus;
  data: any;
}
