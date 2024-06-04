import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serializer, SerializerOptions } from 'jsonapi-serializer';

@Injectable()
export class JsonApiInterceptor implements NestInterceptor {
  private serializer: Serializer;

  constructor(type: string, options: SerializerOptions) {
    this.serializer = new Serializer(type, options);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.serializer.serialize(data)));
  }
}
