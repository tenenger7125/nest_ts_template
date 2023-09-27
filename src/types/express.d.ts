import 'express';

import { TokenInformationDto } from '@/modules/token/token.dto';

declare module 'express' {
  export interface Request {
    decoded: TokenInformationDto; // Request 객체에 추가할 커스텀 프로퍼티
  }
}
