import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useForm, SubmitHandler } from "react-hook-form";
import { LoginModel } from "../models/login";
import { useLoginMutation } from "../services/react-query";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../common/app/theme";
import { toast } from "react-toastify";
import { RootState } from "../../../common/app/redux/store";

function LoginPage() {
  const loginMutation = useLoginMutation();
  const theme = useTheme();
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
      toast.success(t("login.messages.successful-login"));
      navigate("/");
      return;
    } else {
      setError(result.message);
    }
  };

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, t]);

  return (
    <div className={`w-full content-center ${theme.background}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-4 max-w-sm mx-auto p-6 rounded shadow ${theme.border} ${theme.surface}`}
      >
        <div className="flex flex-col">
          <input
            {...register("login", {
              required: t("login.errors.login-required"),
            })}
            placeholder={t("login.placeholders.login")}
            className={`p-2 rounded ${theme.border} ${theme.background} ${theme.text}`}
          />
          {errors.login && (
            <p className={`text-sm mt-1 ${theme.errortext}`}>
              {errors.login.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...register("password", {
              required: t("login.errors.password-required"),
            })}
            placeholder={t("login.placeholders.password")}
            type="password"
            className={`p-2 rounded ${theme.border} ${theme.background} ${theme.text}`}
          />
          {errors.password && (
            <p className={`text-sm mt-1 ${theme.errortext}`}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`py-2 rounded hover:opacity-80 transition ${theme.primary} ${theme.text}`}
        >
          {t("login.buttons.login-submit")}
        </button>
      </form>

      {error !== "" && <p className={`${theme.errortext} mt-2`}>{error}</p>}
    </div>
  );
}

export default LoginPage;
