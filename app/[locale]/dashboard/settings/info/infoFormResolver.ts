import { infoFormSchema } from './infoFormSchema';
import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

export type InfoFormInputs = z.infer<typeof infoFormSchema>;

export const infoFormResolver: Resolver<InfoFormInputs> = async (values: InfoFormInputs) => {
  try {
    const validatedData: InfoFormInputs = await infoFormSchema.parseAsync(values);
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

    return { values: {} as InfoFormInputs, errors: rhfErrors };
  }
};
