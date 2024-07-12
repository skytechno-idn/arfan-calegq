import { z } from "zod";

const BaseFormSchema = z.object({
  email_saksi: z.string().trim().email(),
  nama_saksi: z.string().trim(),
  telp_saksi: z.string().trim(),
  id_tps: z.string().trim(),
});

interface TypeSaksiSchema extends z.infer<typeof BaseFormSchema> {
  password: string;
}

const FormSchema = (isEditMode: boolean) =>
  BaseFormSchema.extend({
    password: isEditMode
      ? z
          .string()
          .optional()
       
          .refine((val:any) =>  !val || val?.length >= 8, {
            message: "Harus memiliki panjang tepat 8 karakter",
          })

      : z
          .string()
          .min(8)
          .max(20)
          .refine((val:any) => val?.length >= 8, {
            message: "Harus memiliki panjang tepat 8 karakter",
          })
  });

export { FormSchema, BaseFormSchema };
export type { TypeSaksiSchema };
