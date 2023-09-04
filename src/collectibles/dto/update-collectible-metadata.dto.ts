import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectibleMetadataDTO } from './create-collectible-metadata.dto';

export class UpdateCollectibleMetadataDTO extends PartialType(
    CreateCollectibleMetadataDTO,
) {}
