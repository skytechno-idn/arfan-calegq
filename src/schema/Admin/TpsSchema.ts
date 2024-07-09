import { z } from "zod";

const FormSchema = z.object({
  nama_tps: z.string().trim(),
  jml_dpt: z.number(),
  id_desa: z.string().trim(),
});


export { FormSchema };
