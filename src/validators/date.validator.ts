import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidationOptions,
    registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsTimestamp', async: false })
export class IsTimestampConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (!value) {
            return false;
        }

        const notBefore: Date = args.constraints[0];

        try {
            const date = new Date(value).getTime();

            if (notBefore !== null || notBefore !== undefined) {
                const referenceDate = notBefore?.getTime();
                if (date < referenceDate) {
                    return false;
                }
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be a valid timestamp`;
    }
}

export function IsTimestamp(validationOptions?: ValidationOptions) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsTimestampConstraint,
        });
    };
}
