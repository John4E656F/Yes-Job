import { publishFormSchema } from './publishFormSchema';
import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

export type PublishFormInputs = z.infer<typeof publishFormSchema>;

export const publishFormResolver: Resolver<PublishFormInputs> = async (values: PublishFormInputs) => {
  try {
    const validatedData: PublishFormInputs = await publishFormSchema.parseAsync(values);
    return { values: validatedData, errors: {} };
  } catch (error) {
    const zodError = error as ZodValidationError;
    const fieldErrorEntries = Object.entries(zodError.formErrors.fieldErrors || {});

    const rhfErrors: Record<string, FieldError> = {};

    for (const [field, fieldErrors] of fieldErrorEntries) {
      if (fieldErrors) {
        rhfErrors[field] = {
          type: 'manual',
          message: fieldErrors[0],
        };
      }
    }

    return { values: {} as PublishFormInputs, errors: rhfErrors };
  }
};
