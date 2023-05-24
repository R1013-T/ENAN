import { z } from "zod";

export const validationSchema = z.object({
  name: z.string().nonempty("ユーザーネームを入力してください。"),
});
