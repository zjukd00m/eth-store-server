import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { ethers } from 'ethers';

@ValidatorConstraint({ name: 'isEthereumAddress', async: false })
export class IsEthereumAddress implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return ethers.isAddress(text);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Invalid Ethereum address';
    }
}
