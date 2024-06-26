"use client";

import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectedColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Wybierz kategorie");
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Nie wybrales zdjecia");
    }

    const handleImageUploads = async () => {
      toast("Tworzenie produktu, poczekaj...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                  console.log("Błąd w ładowaniu zdjęcia", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });

                      resolve();
                    })
                    .catch((error) => {
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.group("Error handling image uploads", error);
        return toast.error("Error handling image uploads");
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };
    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Produkt dodany");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Coś poszło nie tak w zapisie produktu do bazy danych.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-neutral-900 dark:text-white p-8 rounded-md shadow-lg max-w-2xl mx-auto my-10">
      <Heading title="Dodaj produkt" center />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <Input
          id="name"
          label="Nazwa"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="price"
          label="Cena"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
          required
        />
        <Input
          id="brand"
          label="Firma"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <TextArea
          id="description"
          label="Opis"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <CustomCheckBox
          id="inStock"
          register={register}
          label="Ten produkt jest dostępny"
        />

        <div className="w-full font-medium">
          <div className="mb-2 font-semibold">Wybierz kategorię</div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 overflow-y-auto">
            {categories.map((item) => {
              if (item.label === "All") {
                return null;
              }
              return (
                <CategoryInput
                  key={item.label}
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="font-bold">Wrzuć zdjęcie</div>
          {/* Image upload section here */}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {colors.map((item, index) => (
            <SelectedColor
              key={index}
              item={item}
              addImageToState={addImageToState}
              removeImageFromState={removeImageToState}
              isProductCreated={isProductCreated}
            />
          ))}
        </div>
        <Button
          label={isLoading ? "Ładowanie..." : "Dodaj produkt"}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default AddProductForm;
