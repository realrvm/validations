import { cn } from "@/shared/lib/cn";
import { ChangeEvent, FormEvent, useState } from "react";
import { ZodError, z } from "zod";

type FormType = {
  name: string;
  email: string;
  password: string;
};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is not valid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(10, "Password must be at most 10 characters long"),
});

const initialForm: FormType = {
  name: "",
  email: "",
  password: "",
};

export const Form = () => {
  const [formData, setFormData] = useState<FormType>(initialForm);
  const [errors, setErrors] = useState<FormType>(initialForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);

      console.log("Form submitted", formData);

      setFormData(initialForm);

      setErrors(initialForm);
    } catch (e) {
      if (e instanceof ZodError) {
        const validationErrors: Record<string, string> = {};
        e.errors.forEach((err) => {
          if (err.path) {
            validationErrors[err.path[0]] = err.message;
          }
        });
        setErrors(validationErrors as FormType);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Простая форма с ZOD валидацией</h2>
      <form className="flex flex-col gap-4 w-1/2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className={cn(
            "border rounded-lg py-3 px-4 outline-none focus:border-blue-500",
            { "border-red-500": errors.name },
          )}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
        <input
          type="email"
          placeholder="Email"
          className={cn(
            "border rounded-lg py-3 px-4 outline-none focus:border-blue-500",
            { "border-red-500": errors.email },
          )}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          className={cn(
            "border rounded-lg py-3 px-4 outline-none focus:border-blue-500",
            { "border-red-500": errors.password },
          )}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        <button className="border py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-gray-100">
          Submit
        </button>
      </form>
    </div>
  );
};
