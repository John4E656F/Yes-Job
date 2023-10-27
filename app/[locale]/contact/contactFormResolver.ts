import { contactFormSchema } from './contactFormSchema';
import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

export type contactFormInputs = z.infer<typeof contactFormSchema>;

export const contactFormResolver: Resolver<contactFormInputs> = async (values: contactFormInputs) => {
  try {
    const validatedData: contactFormInputs = await contactFormSchema.parseAsync(values);
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

    return { values: {} as contactFormInputs, errors: rhfErrors };
  }
};
