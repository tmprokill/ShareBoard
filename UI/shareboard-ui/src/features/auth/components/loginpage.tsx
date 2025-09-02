import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthState } from "../auth-slice";
import { useNavigate } from "react-router";

import { useForm, SubmitHandler } from "react-hook-form";
import { LoginModel } from "../models/login";
import { useLoginMutation } from "../services/react-query";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const loginMutation = useLoginMutation();
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginModel> = async (data) => {
    const result = await loginMutation.mutateAsync({
      login: data.login,
      password: data.password,
    });

    if (result.success == true) {
      navigate("/");
      return;
    } else {
      setError(result.message);
    }
  };

  const isAuthenticated = useSelector(
    (state: AuthState) => state.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      //return to homepage if authenticated
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-sm mx-auto p-6 border rounded shadow"
      >
        <div className="flex flex-col">
          <input
            {...register("login", {
              required: t("login.errors.login-required"),
            })}
            placeholder={t("login.placeholders.login")}
            className="border p-2 rounded"
          />
          {errors.login && (
            <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...register("password", {
              required: t("login.errors.password-required"),
            })}
            placeholder={t("login.placeholders.password")}
            type="password"
            className="border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-red-500 py-2 rounded hover:bg-blue-700"
        >
          {t("login.buttons.login-submit")}
        </button>
      </form>

      {error !== "" && <p className="text-red-600 text-center mt-2">{error}</p>}
    </>
  );
}

export default LoginPage;
