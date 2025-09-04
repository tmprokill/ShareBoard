import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../services/react-query";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/app/redux/store";
import { useTheme } from "../../../common/app/theme";
import { toast } from "react-toastify";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage() {
  const registerMutation = useRegisterMutation();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const {
    watch,
    register,
    reset,
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

  const currentLanguage = useSelector(
    (state: RootState) => state.appSettings.language
  );

  useEffect(() => {
    reset({ email: "", username: "", password: "", confirmPassword: "" });
  }, [currentLanguage, reset]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, t]);

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const result = await registerMutation.mutateAsync({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (result.success == true) {
      toast.success(t("register.messages.successful-registration"));
      navigate("/login");
      return;
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={`w-full content-center ${theme.background}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-4 max-w-sm mx-auto p-6 rounded shadow ${theme.border} ${theme.surface}`}
      >
        <div className="flex flex-col">
          <input
            {...register("email", {
              required: t("register.errors.email-required"),
            })}
            placeholder={t("register.placeholders.email")}
            className={`p-2 rounded ${theme.border} ${theme.background} ${theme.text}`}
          />
          {errors.email && (
            <p className={`text-sm mt-1 ${theme.errortext}`}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...register("username", {
              required: t("register.errors.username-required"),
            })}
            placeholder={t("register.placeholders.username")}
            className={`p-2 rounded ${theme.border} ${theme.background} ${theme.text}`}
          />
          {errors.username && (
            <p className={`text-sm mt-1 ${theme.errortext}`}>
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
            className={`p-2 rounded ${theme.border} ${theme.background} ${theme.text}`}
          />
          {errors.password && (
            <p className={`text-sm mt-1 ${theme.errortext}`}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...register("confirmPassword", {
              required: t("register.errors.confirm-password-required"),
              validate: (value) =>
                value === password ||
                t("register.errors.confirm-password-must-match"),
            })}
            placeholder={t("register.placeholders.confirm-password")}
            type="password"
            className={`p-2 rounded ${theme.border} ${theme.background} ${theme.text}`}
          />
          {errors.confirmPassword && (
            <p className={`text-sm mt-1 ${theme.errortext}`}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`py-2 rounded hover:opacity-80 transition ${theme.primary} ${theme.text}`}
        >
          {t("register.buttons.register-submit")}
        </button>
      </form>

      {error !== "" && (
        <p className={`text-center mt-2 ${theme.errortext}`}>{error}</p>
      )}
    </div>
  );
}
export default RegisterPage;
