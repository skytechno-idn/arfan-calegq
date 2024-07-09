import { z } from "zod";

const FormSchema = z.object({
  nama_partai: z.string().trim(),
  label_partai: z.string().trim(),
  nomor_urut: z.string().trim(),
  color: z.string().trim(),
});


export { FormSchema };
