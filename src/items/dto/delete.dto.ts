import { IsBoolean, IsNumberString } from 'class-validator';
import { BaseItemDTO } from './base.dto';

export class DeleteItemDTO extends BaseItemDTO {
    @IsBoolean()
    inTrash: boolean;
}

export class DeleteItemParamsDTO extends BaseItemDTO {}

export class DeleteItemQueryDTO {
    @IsNumberString()
    inTrash: string;
}
