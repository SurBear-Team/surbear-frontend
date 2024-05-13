import api from "@/pages/api/config";
import { useForm } from "react-hook-form";

interface DialogProps {
  title: string;
  placeholder: string;
  leftText: string;
  onLeftClick: () => void;
  rightText: string;
  onRightClick: (data?: any) => void;
}

export const InputDialog = ({
  title,
  placeholder,
  leftText,
  onLeftClick,
  rightText,
  onRightClick,
}: DialogProps) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    onRightClick(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-4/5 max-w-lg absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col py-8 px-6 rounded-lg z-50 bg-white shadow-md"
    >
      <div className="text-gray-9 font-semibold">{title}</div>
      <input
        {...register("nickname")}
        placeholder={placeholder}
        className="main-input text-gray-9"
      />
      <div className="gray-line my-6" />
      <div className="flex justify-between w-full gap-4">
        <button
          type="submit"
          onClick={onLeftClick}
          className="long-button border-gray-5 text-gray-5"
        >
          {leftText}
        </button>
        <button
          onClick={onRightClick}
          className="long-button primary-btn-style"
        >
          {rightText}
        </button>
      </div>
    </form>
  );
};
