import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useRegisterMutation } from "../services/react-query";
import { useTranslation } from "react-i18next";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}


//TODO FINISH ON THIS 
//EXCEPTIONS (like 400) errors are being handlen in apirequestfile, that's why always call will success
//decide on how to proceed with that stuff.
function RegisterPage() {
  const registerMutation = useRegisterMutation();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const result = await registerMutation.mutateAsync({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (result.success == true) {
      navigate("/");
      return;
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-sm mx-auto p-6 border rounded shadow"
      >
        <div className="flex flex-col">
          <input
            {...register("email", {
              required: t("register.errors.email-required"),
            })}
            placeholder={t("register.placeholders.email")}
            className="border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register("username", {
              required: t("register.errors.username-required"),
            })}
            placeholder={t("register.placeholders.username")}
            className="border p-2 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register("password", {
              required: t("register.errors.password-required"),
            })}
            placeholder={t("register.placeholders.password")}
            type="password"
            className="border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...register("confirmPassword", {
              required: t("register.errors.confirm-password-required"),
              validate: (value) =>
                value === password || t("register.errors.confirm-password-must-match"),
            })}
            placeholder={t("register.placeholders.confirm-password")}
            type="password"
            className="border p-2 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-black-500 py-2 rounded hover:bg-blue-700"
        >
          {t("login.buttons.login-submit")}
        </button>
      </form>

      {error !== "" && (
        <p className="text-black-600 text-center mt-2">{error}</p>
      )}
    </>
  );
}

export default RegisterPage;
