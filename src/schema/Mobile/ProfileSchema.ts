

import { z } from "zod";



const FormSchema = z.object({
  email_saksi: z.string().trim().email(),
  nama_saksi: z.string().trim(),
  telp_saksi: z.string().trim(),
});

export { FormSchema };