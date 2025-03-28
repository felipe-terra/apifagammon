import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isStartTimeBeforeEndTime', async: false })
export class IsStartTimeBeforeEndTimeConstraint
  implements ValidatorConstraintInterface
{
  validate(startTime: string, args: ValidationArguments) {
    const object = args.object as any;
    const endTime = object[args.constraints[0]];

    if (!startTime || !endTime) return false;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0);

    return startDate < endDate;
  }

  defaultMessage(args: ValidationArguments) {
    return `O campo "${args.property}" deve ser menor que "${args.constraints[0]}"`;
  }
}

export function IsStartTimeBeforeEndTime(
  endTimeField: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [endTimeField],
      validator: IsStartTimeBeforeEndTimeConstraint,
    });
  };
}
