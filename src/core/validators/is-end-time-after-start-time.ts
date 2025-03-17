import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEndTimeAfterStartTime', async: false })
export class IsEndTimeAfterStartTimeConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments): boolean {
    const relatedPropertyName = args.constraints[0];
    const startTime = (args.object as any)[relatedPropertyName];
    if (!startTime || !value) return false;
    return new Date(value) > new Date(startTime);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be greater than ${args.constraints[0]}`;
  }
}

export function IsEndTimeAfterStartTime(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: ['start_time'],
      validator: IsEndTimeAfterStartTimeConstraint,
    });
  };
}
