import { z } from "zod";

const BaseFormSchema = z.object({
  email_admin: z.string().trim().email(),
  nama_admin: z.string().trim(),
  telp_admin: z.string().trim(),
});

interface TypeAdminSchema extends z.infer<typeof BaseFormSchema> {
  password: string;
}

const FormSchema = (isEditMode: boolean) =>
  BaseFormSchema.extend({
    password: isEditMode
      ? z
          .string()
          .optional()
          .refine((val: any) => !val || val?.length >= 8, {
            message: "Harus memiliki panjang tepat 8 karakter",
          })
      : z
          .string()
          .min(8)
          .max(20)
          .refine((val: any) => val?.length >= 8, {
            message: "Harus memiliki panjang tepat 8 karakter",
          }),
  });

export { FormSchema, BaseFormSchema };
export type { TypeAdminSchema };
