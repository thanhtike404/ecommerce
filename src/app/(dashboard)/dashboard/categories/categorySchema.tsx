// zodSchemas.ts
import { z } from 'zod';

export const categorySchema = z.object({
  categoryName: z
    .string()
    .min(3, 'Category name must be at least 3 characters long')
    .nonempty('Category name is required'),
  categoryIcon: z
    .any()
    .refine((files) => files.length > 0, {
      message: 'Category icon is required',
    })
    .refine(
      (files) => files[0] instanceof File && files[0].type.startsWith('image/'),
      {
        message: 'Invalid file type. Only images are allowed',
      }
    ),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
