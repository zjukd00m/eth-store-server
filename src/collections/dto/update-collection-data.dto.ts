import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionDataDTO } from './create-collection-data.dto';

export class UpdateCollectionDataDTO extends PartialType(
    CreateCollectionDataDTO,
) {}
