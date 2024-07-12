import { z } from "zod";

const FormSchema = z.object({
  password: z
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
       'Password harus terdiri dari 8-20 karakter dan mengandung setidaknya satu huruf besar, satu huruf kecil, satu angka, dan satu simbol khusus (#?!@$%^&*-)',
    }
  ),
  
});

export { FormSchema };
