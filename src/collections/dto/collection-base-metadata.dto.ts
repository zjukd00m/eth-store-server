// This data is returned by the smart contract's method:
// contractURI()

import { IsBase64, IsNumber, IsString, IsUrl } from 'class-validator';

export class BaseCollectionMetadataDTO {
    @IsNumber()
    name: string;

    @IsString()
    description: string;

    @IsBase64()
    image: string;

    @IsUrl()
    external_link: string;
}
