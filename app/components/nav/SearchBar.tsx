"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// ... (imports)

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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="max-w-md mx-auto ">
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden dark:bg-neutral-700">
        <div className="grid place-items-center h-full w-12 text-gray-300 dark:text-white ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          {...register("searchTerm")}
          autoComplete="off"
          type="text"
          id="search"
          placeholder="Search something.."
          className="peer h-full w-64 outline-none text-sm text-gray-700 dark:text-white pr-2 dark:bg-neutral-700" // Adjust the width here
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchBar;

