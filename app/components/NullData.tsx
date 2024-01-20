interface NullDataProps {
  title: string;
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
  return (
    <div className="w-full h-[50hv] flex items-center justify-center text-xl md:text-2xl mt-10 dark:text-white">
      <p className="font-medium">{title}</p>
    </div>
  );
};

export default NullData;
