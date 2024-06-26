"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";


const SearchBar = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");
    const url = queryString.stringifyUrl(
      { url: "/", query: { searchTerm: data.searchTerm } },
      { skipNull: true }
    );
    router.push(url);
    reset();
  };

  return (
    <div className="flex justify-center w-full">
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden dark:bg-neutral-700 dark:text-white w-full md:max-w-xs">
      <input
        {...register("searchTerm")}
        autoComplete="off"
        type="text"
        id="search"
        placeholder="Szukaj..."
        className="p-2 rounded-l-md focus:outline-none w-full"
      
  onKeyPress={(event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleSubmit(onSubmit)();
    }
  }}
/>

</form>

      </div>
   
  );
};

export default SearchBar;

