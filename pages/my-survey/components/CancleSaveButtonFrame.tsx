interface CancleSaveProps {
  isUpdate?: boolean;
  onCancleClick: () => void;
  onSaveClick?: () => void;
  onSaveAndAddClick?: () => void;
  onUpdateClick?: () => void;
}

export const CancleSaveButtonFrame = ({
  isUpdate,
  onCancleClick,
  onSaveClick,
  onSaveAndAddClick,
  onUpdateClick,
}: CancleSaveProps) => {
  return (
    <div className="flex justify-end p-0 mt-6 gap-2">
      <button
        onClick={onCancleClick}
        className="small-Btn w-auto bg-white text-gray-5 border-gray-5"
      >
        취소
      </button>
      {isUpdate ? (
        <>
          <button
            onClick={onUpdateClick}
            className="small-Btn w-auto primary-btn-style"
          >
            수정
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onSaveClick}
            className="small-Btn w-auto white-bg-primary-btn"
          >
            저장
          </button>
          <button
            onClick={onSaveAndAddClick}
            className="medium-Btn w-auto primary-btn-style"
          >
            저장 후 새 질문 추가
          </button>
        </>
      )}
    </div>
  );
};
