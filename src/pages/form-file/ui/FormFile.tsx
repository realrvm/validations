import { ChangeEvent, FormEvent, useState } from "react";
import { ZodError, z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((fileList) => fileList.length === 1, "Expected file")
    .transform((file) => file[0] as File)
    .refine((file) => {
      return file.size <= MAX_FILE_SIZE;
    }, "File size is too large.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only these types are allowed .jpg, .jpeg, .png and .webp",
    ),
});

export const FormFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [errors, setErrors] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      fileSchema.parse({ file: e.target.files });

      setSelectedFile(file);

      setErrors(null);
    } catch (error) {
      if (error instanceof ZodError) {
        setSelectedFile(undefined);

        setErrors(error.errors[0].message);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("data", selectedFile);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl font-bold">Форма с валидацией размера файла</h2>
      <form className="flex flex-col gap-y-4 w-1/2" onSubmit={handleSubmit}>
        <label className="relative cursor-pointer self-start">
          <span className="p-2 bg-gray-200 rounded hover:bg-gray-300">
            Загрузить
          </span>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="absolute -z-1 opacity-0 w-0 h-0"
            onChange={handleChange}
          />
        </label>
        <span className={errors ? "text-red-500" : ""}>
          {errors ? errors : "*No more 5mb"}
        </span>
        <span>Selected file: {selectedFile?.name}</span>
        <button className="border py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-gray-100">
          Submit
        </button>
      </form>
    </div>
  );
};
