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
          .refine(
            (val) =>
              !val ||
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                val
              ),
            {
              message:
                "Password must be at least 8 characters long and contain at least one uppercase character, one lowercase character, and one special symbol",
            }
          )
      : z
          .string()
          .min(8)
          .max(20)
          .refine(
            (val) =>
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                val
              ),
            {
              message:
                "Password must be at least 8 characters long and contain at least one uppercase character, one lowercase character, and one special symbol",
            }
          ),
  });

export { FormSchema, BaseFormSchema };
export type { TypeAdminSchema };
