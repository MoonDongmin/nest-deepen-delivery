import { Metadata } from '@grpc/grpc-js';
import { v4 } from 'uuid';

export const constructMetadata = (
  callerClass: string,
  callerMethod: string,
  preMetadata?: Metadata,
) => {
  const metadata = preMetadata ?? new Metadata();

  // 메타데이터의 정보를 map으로 들고옴
  const traceId = metadata.getMap()['trace-id'] ?? v4();

  metadata.set('trace-id', traceId.toString());
  metadata.set('client-class', callerClass);
  metadata.set('client-method', callerMethod);

  return metadata;
};
