import { IsBoolean, IsUUID } from 'class-validator';

export class UpdateCollectibleBodyDTO {
    @IsBoolean()
    isDeployed?: boolean;
}

export class UpdateCollectibleDTO extends UpdateCollectibleBodyDTO {
    @IsUUID('4')
    id: string;
}
