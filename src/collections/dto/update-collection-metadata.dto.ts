import { PartialType } from '@nestjs/mapped-types';
import { BaseCollectionMetadataDTO } from './collection-base-metadata.dto';

export class UpdateColletionMetadataDTO extends PartialType(
    BaseCollectionMetadataDTO,
) {}
