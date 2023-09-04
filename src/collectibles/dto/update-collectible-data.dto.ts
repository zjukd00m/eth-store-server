import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectibleDataDTO } from './create-collectible-data.dto';

export class UpdateCollectibleDataDTO extends PartialType(
    CreateCollectibleDataDTO,
) {}
