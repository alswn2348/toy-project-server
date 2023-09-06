import { applyDecorators } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export function IsNotEmptyString(min: number, max: number) {
    return applyDecorators(
        IsNotEmpty(), 
        IsString(), 
        Length(min, max)
    );
}

export function IsNotEmptyNumber() {
    return applyDecorators(
        IsNotEmpty(),
        IsInt(),  // 정수형 인지를 검사
        Type(() => Number),  //  숫자형으로 변환될 수 있는지 여부를 검사
    );
}