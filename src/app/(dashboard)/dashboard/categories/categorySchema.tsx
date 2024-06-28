import { z } from 'zod';

export const createCategorySchema = z.object({
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

export const updateCategorySchema = z.object({
  categoryName: z
    .string()
    .min(3, 'Category name must be at least 3 characters long')
    .nonempty('Category name is required'),
  categoryIcon: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0] instanceof File && files[0].type.startsWith('image/')),
      {
        message: 'Invalid file type. Only images are allowed',
      }
    ),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;
