"use client";

import { useEffect, useState } from "react";
import Heading from "../components/Heading/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}


const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Konto utworzone!");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Zalogowano");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Coś poszło nie tak"))
      .finally(() => {
        setIsLoading(false);
      });
  };


  if (currentUser) {
    return <p className="text-center">Zalogowano pomyślnie.</p>;
  }

  return (
    <>
      <Heading title="Rejestracja" />
      <hr className="bg-gray-300 w-full h-px" />
      <Input
        id="name"
        label="Imię"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        label={isLoading ? "Ładowanie" : "Zarejestruj się"}
        onClick={handleSubmit(onSubmit)}
      />
      <Button
        outline
        label="Kontynuuj z Google"
        icon={AiOutlineGoogle}
        onClick={() => {signIn('google')}}
      />

      <p className="text-sm">
        Masz już konto?{""}
        <Link className="underline" href={"/login"}>
          Zaloguj się
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
