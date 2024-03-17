// для простоты сделано в одном файле
import { CONFIG } from "@/shared/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, ZodType, z } from "zod";

const ApiUserSchema = z.object({
  name: z.string().min(1, "Имя слишком короткое"),
});

export const FormTypicode = () => {
  const [data, setData] = useState("");
  // Проверка на изменение строки запроса пользователем
  const { userId } = useQueryParams({
    userId: z.preprocess((id) => Number(id), z.number()),
  });

  useFetch(setData);

  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl font-bold">
        Запрос к typicode, валидацией данных из API. Защита строки запроса
        (только код для справки)
      </h2>
      {userId ? (
        <h2 className="text-2xl font-bold text-red-500">
          No user with this ID
        </h2>
      ) : (
        <div className="h-20 border border-gray-100 bg-slate-500 rounded-lg text-white text-xl p-3">
          {data}
        </div>
      )}
    </div>
  );
};

// hooks
// Проверка на изменение строки запроса пользователем
function useQueryParams<P extends Record<string, ZodType<any, any, any>>>(
  params: P,
) {
  const [query] = useState(new URLSearchParams(window.location.search));

  const result: { [K in keyof P]?: z.infer<P[K]> } = {};

  for (const key of Object.keys(params)) {
    const paramsKey = key as keyof P;
    const schema = params[paramsKey];

    const parse = schema.safeParse(query.get(paramsKey.toString()));

    if (parse.success) {
      result[paramsKey] = parse.data;
    }
  }

  return result;
}

function useFetch(setData: (val: string) => void) {
  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios(`${CONFIG.API_URL}/users/1`);

        // runtime проверка входящего значения
        ApiUserSchema.parse(data);

        setData(data.name);
      } catch (e) {
        if (e instanceof ZodError) {
          setData(e.errors[0].message);
        }
      }
    }

    getUser();
  }, [setData]);
}
