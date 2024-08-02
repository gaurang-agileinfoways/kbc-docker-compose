import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsAnswerInOptions(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'isAnswerInOptions',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args) {
          const object = args.object as any;
          return object.options && object.options.includes(value);
        },
        defaultMessage(args) {
          return `${args.property} must be one of the options`;
        },
      },
    });
  };
}
