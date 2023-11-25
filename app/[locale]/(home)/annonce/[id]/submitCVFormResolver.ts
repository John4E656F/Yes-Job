import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

import { submitCVFormSchema } from './submitCVFormSchema';

export type submitCVFormInputs = z.infer<typeof submitCVFormSchema>;

export const submitCVFormResolver: Resolver<submitCVFormInputs> = async (values: submitCVFormInputs) => {
  try {
    const validatedData: submitCVFormInputs = await submitCVFormSchema.parseAsync(values);
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

    return { values: {} as submitCVFormInputs, errors: rhfErrors };
  }
};
