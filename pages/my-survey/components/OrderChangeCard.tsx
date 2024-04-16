import { OrderDownIcon, OrderUpIcon } from "@/pages/components/styles/Icons";

interface OrderChangeProps {
  orderTitle: string;
  orderIndex?: number;
  orderContents: any[];
  onOrderUpClick: (index: number) => void;
  onOrderDownClick: (index: number) => void;
  onCancleClick: () => void;
  onMoveClick: () => void;
}

export const OrderChangeCard = ({
  orderTitle,
  orderIndex,
  orderContents,
  onOrderUpClick,
  onOrderDownClick,
  onCancleClick,
  onMoveClick,
}: OrderChangeProps) => {
  return (
    <div className="fixed card p-8 flex gap-6 bg-white z-50">
      <div className="sm-gray-9-text text-base">{orderTitle}</div>

      <div className="flex flex-col gap-4">
        {orderContents.map((content, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="pr-2 text-gray-9 text-xs">
              {index + 1}. {content}
            </div>
            <div className="flex gap-1">
              <button onClick={() => onOrderUpClick(index)}>
                <OrderUpIcon />
              </button>
              <button onClick={() => onOrderDownClick(index)}>
                <OrderDownIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="gray-line" />

      <div className="w-full flex gap-4">
        <button
          onClick={onCancleClick}
          className="medium-Btn w-full bg-white border-gray-5 text-gray-5"
        >
          취소
        </button>
        <button
          onClick={onMoveClick}
          className="medium-Btn w-full primary-btn-style"
        >
          이동
        </button>
      </div>
    </div>
  );
};
