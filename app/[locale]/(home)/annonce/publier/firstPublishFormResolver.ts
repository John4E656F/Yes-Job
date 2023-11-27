import { firstPublishFormSchema } from './firstPublishFormSchema';
import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

export type FirstPublishFormInputs = z.infer<typeof firstPublishFormSchema>;

export const firstPublishFormResolver: Resolver<FirstPublishFormInputs> = async (values: FirstPublishFormInputs) => {
  try {
    const validatedData: FirstPublishFormInputs = await firstPublishFormSchema.parseAsync(values);
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

    return { values: {} as FirstPublishFormInputs, errors: rhfErrors };
  }
};
