"use client";

import { useEffect, useState } from "react";
import Heading from "../components/Heading/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
  activeUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ activeUser: activeUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (activeUser) {
      router.push("/");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Zalogowano");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (activeUser) {
    return <p className="text-center">Zalogowano pomyślnie</p>;
  }

  return (
    <>
      <Heading title="Zaloguj się" />
      <hr className="bg-gray-300 w-full h-px" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Hasło"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Ładowanie" : "Zaloguj"}
        onClick={handleSubmit(onSubmit)}
      />
      <Button
        outline
        label="Kontynuuj z Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />

      <p className="text-sm">
        Nie masz konta?{""}
        <Link className="underline" href={"/register"}>
          Zarejestruj się
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
