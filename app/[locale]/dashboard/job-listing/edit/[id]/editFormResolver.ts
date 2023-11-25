import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

import { editFormSchema } from './editFormSchema';

export type EditFormInputs = z.infer<typeof editFormSchema>;

export const editFormResolver: Resolver<EditFormInputs> = async (values: EditFormInputs) => {
  try {
    const validatedData: EditFormInputs = await editFormSchema.parseAsync(values);
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

    return { values: {} as EditFormInputs, errors: rhfErrors };
  }
};
