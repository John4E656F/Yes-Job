import { signupFormSchema } from './signupFormSchema';
import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

export type SignupFormInputs = z.infer<typeof signupFormSchema>;

export const signupFormResolver: Resolver<SignupFormInputs> = async (values: SignupFormInputs) => {
  try {
    const validatedData: SignupFormInputs = await signupFormSchema.parseAsync(values);
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

    return { values: {} as SignupFormInputs, errors: rhfErrors };
  }
};
