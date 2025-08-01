import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';
import { PaymentDto }                                    from './payment.dto';

export class CreateOrderDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  productIds: string[];

  @ValidateNested() // 충첩된거 검증
  @Type(() => AddressDto) // 이 dto로 자동 변경
  @IsNotEmpty()
  address: AddressDto;

  @ValidateNested() // 충첩된거 검증
  @Type(() => PaymentDto) // 이 dto로 자동 변경
  @IsNotEmpty()
  payment: PaymentDto;
}
