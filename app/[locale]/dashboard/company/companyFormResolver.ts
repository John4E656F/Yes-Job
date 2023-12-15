import { companyFormSchema } from './companyFormSchema';
import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

export type CompanyFormInputs = z.infer<typeof companyFormSchema>;

export const companyFormResolver: Resolver<CompanyFormInputs> = async (values: CompanyFormInputs) => {
  try {
    const validatedData: CompanyFormInputs = await companyFormSchema.parseAsync(values);
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

    return { values: {} as CompanyFormInputs, errors: rhfErrors };
  }
};
