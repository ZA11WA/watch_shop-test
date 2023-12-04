"use client";

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { HtmlHTMLAttributes, useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button/Button";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectedColor: React.FC<SelectColorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);

  return (
    <div className="grid grid-cols-1  overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      {file ? (
        <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
          <p>{file?.name}</p>
          <div className="w-70px">
            <Button
              label="Cancel"
              small
              outline
              onClick={() => {
                setFile(null);
                removeImageFromState(item);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="col-span-2 text-center">
          <SelectImage item={item} handleFileChange={handleFileChange} />
        </div>
      )}
    </div>
  );
};

export default SelectedColor;
