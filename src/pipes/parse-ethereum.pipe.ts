import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    UnprocessableEntityException,
} from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class ParseEthereumAddressPipe implements PipeTransform<string, string> {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!ethers.isAddress(value)) {
            throw new UnprocessableEntityException(
                'The value is not a valid ethereum address',
            );
        }

        return value.toLowerCase();
    }
}
