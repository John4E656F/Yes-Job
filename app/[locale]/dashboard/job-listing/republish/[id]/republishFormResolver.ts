import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

import { republishFormSchema } from './republishFormSchema';

export type RepublishFormInputs = z.infer<typeof republishFormSchema>;

export const republishFormResolver: Resolver<RepublishFormInputs> = async (values: RepublishFormInputs) => {
  try {
    const validatedData: RepublishFormInputs = await republishFormSchema.parseAsync(values);
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

    return { values: {} as RepublishFormInputs, errors: rhfErrors };
  }
};
