import { z } from "zod";

// для примера. проверка посторонней константы
export const CONFIG = z
  .object({
    API_URL: z.string(),
  })
  .parse({
    API_URL: import.meta.env.VITE_API_URL,
  });
