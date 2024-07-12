import { z } from "zod";

const FormSchema = z.object({
  nama_caleg: z.string().trim(),
  // nomor_urut: z.number(),
  // color: z.string().trim(),
  id_partai: z.string().trim(),
});

export { FormSchema };
