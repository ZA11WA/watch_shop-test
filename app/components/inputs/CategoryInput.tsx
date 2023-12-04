import { Icon } from "@mui/material";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-2xl  border-2 p-4 flex flex-col items-center gap-2 hover:border-gray-500 transition cursor-pointer ${selected? 'border-stone-500 dark:bg-neutral-900 shadow-md transition' : 'border-gray-200'}`}
    >
      <Icon size={30} />
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput;
