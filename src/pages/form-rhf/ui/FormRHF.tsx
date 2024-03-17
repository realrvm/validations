import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type FormFields = {
  name: string;
  password: string;
  controller: string;
};

export const FormRHF = () => {
  const {
    register, // регистрация полей ввода
    handleSubmit, // в onSubmit передаются 2 функции для обработки формы и ошибок
    clearErrors, // для очистки ошибок
    formState: { errors }, // список ошибок
    reset, // для сброса значений - resetField - для сброса значения в одном поле
    setValue, // установить значение
    watch, // для отслеживания изменений
    control, // контроллер для работы с формой
  } = useForm<FormFields>({
    defaultValues: {
      name: "React Hook Form", // опциональная установка дефолтного значения
    },
  });


  const submit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const error: SubmitErrorHandler<FormFields> = (data) => {
    console.log(data, errors);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Простая форма с React Hook Form</h2>
      <p>{watch("name")}</p>
      <form
        className="flex flex-col gap-4 w-1/2"
        onSubmit={handleSubmit(submit, error)}
      >
        <input
          placeholder="Name"
          className="border rounded-lg py-3 px-4 outline-none focus:border-blue-500"
          {...register("name", { required: true, validate: () => true })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg py-3 px-4 outline-none focus:border-blue-500"
          {...register("password")}
        />
        <Controller
          name="controller"
          control={control}
          render={({ field: { ref, value, onChange } }) => (
            <input
              type="text"
              value={value}
              onChange={onChange}
              ref={ref}
              placeholder="Controller"
              className="border rounded-lg py-3 px-4 outline-none focus:border-blue-500"
            />
          )}
        />
        <button className="border py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-gray-100">
          Submit
        </button>
        <button
          onClick={() => clearErrors()}
          type="button"
          className="border py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-gray-100"
        >
          Clear errors
        </button>
        <button
          onClick={() =>
            reset({
              name: "",
              password: "",
            })
          }
          type="button"
          className="border py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-gray-100"
        >
          Clear fields
        </button>
        <button
          onClick={() => setValue("password", "secret")}
          type="button"
          className="border py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-gray-100"
        >
          Set Password
        </button>
      </form>
    </div>
  );
};
