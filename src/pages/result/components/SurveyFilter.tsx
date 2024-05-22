import { Overlay } from "@/pages/components/styles/Overlay";
import { SurveyData } from "./ShortAnswerSubjective";

interface SurveyFilterProps {
  item: SurveyData;
  handleCancel: (questionId: number) => void;
  toggleFilterOption: (
    questionId: number,
    optionType: "age" | "gender",
    option: string,
    all?: boolean
  ) => void;
  isAllSelected: (questionId: number, optionType: "age" | "gender") => boolean;
  getButtonStyle: (
    questionId: number,
    optionType: "age" | "gender",
    option: string
  ) => string;
  applyFilters: (questionId: number) => void;
}

export const SurveyFilter = ({
  item,
  handleCancel,
  toggleFilterOption,
  isAllSelected,
  getButtonStyle,
  applyFilters,
}: SurveyFilterProps) => {
  return (
    <>
      <Overlay
        onClick={() => {
          handleCancel(item.surveyQuestion.id);
        }}
      />
      <div className="fixed h-4/5 bottom-0 left-0 w-full flex flex-col bg-white rounded-t-lg px-6 gap-4 z-50">
        <button
          onClick={() => handleCancel(item.surveyQuestion.id)}
          className="pt-4 text-start text-gray-9 cursor-pointer"
        >
          X 취소
        </button>

        <div className="gray-line mb-4 mx-4" />

        <span className="text-gray-9 font-bold pb-2">필터</span>
        {/* 성별 */}
        <span className="text-gray-9 font-medium ">성별</span>
        <div className="flex gap-2 w-full px-12 justify-between pb-2">
          <button
            onClick={() =>
              toggleFilterOption(item.surveyQuestion.id, "gender", "", true)
            }
            className={`w-full py-1 text-center border-[1px] border-primary-1 ${
              isAllSelected(item.surveyQuestion.id, "gender")
                ? "primary-btn-style"
                : "white-bg-primary-btn"
            } rounded-[40px] cursor-pointer`}
          >
            전체
          </button>
          <button
            onClick={() =>
              toggleFilterOption(item.surveyQuestion.id, "gender", "MALE")
            }
            className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
              item.surveyQuestion.id,
              "gender",
              "MALE"
            )} rounded-[40px] cursor-pointer`}
          >
            남성
          </button>
          <button
            onClick={() =>
              toggleFilterOption(item.surveyQuestion.id, "gender", "FEMALE")
            }
            className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
              item.surveyQuestion.id,
              "gender",
              "FEMALE"
            )} rounded-[40px] cursor-pointer`}
          >
            여성
          </button>
        </div>

        <div className="gray-line mb-4 mx-4" />

        {/* 나이 */}
        <span className="text-gray-9 font-medium ">나이</span>
        <div className="flex flex-col px-12 w-full justify-between gap-4">
          <button
            onClick={() =>
              toggleFilterOption(item.surveyQuestion.id, "age", "", true)
            }
            className={`w-full py-1 text-center border-[1px] border-primary-1 ${
              isAllSelected(item.surveyQuestion.id, "age")
                ? "primary-btn-style"
                : "white-bg-primary-btn"
            } rounded-[40px] cursor-pointer`}
          >
            전체
          </button>
          <div className="w-full flex justify-between gap-4">
            <button
              onClick={() =>
                toggleFilterOption(
                  item.surveyQuestion.id,
                  "age",
                  "UNDER_TWENTY"
                )
              }
              className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                item.surveyQuestion.id,
                "age",
                "UNDER_TWENTY"
              )} rounded-[40px] cursor-pointer`}
            >
              20대 미만
            </button>
            <button
              onClick={() =>
                toggleFilterOption(item.surveyQuestion.id, "age", "TWENTIES")
              }
              className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                item.surveyQuestion.id,
                "age",
                "TWENTIES"
              )} rounded-[40px] cursor-pointer`}
            >
              20대
            </button>
          </div>
          <div className="w-full flex justify-between gap-4">
            <button
              onClick={() =>
                toggleFilterOption(item.surveyQuestion.id, "age", "THIRTIES")
              }
              className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                item.surveyQuestion.id,
                "age",
                "THIRTIES"
              )} rounded-[40px] cursor-pointer`}
            >
              30대
            </button>
            <button
              onClick={() =>
                toggleFilterOption(item.surveyQuestion.id, "age", "FOURTIES")
              }
              className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                item.surveyQuestion.id,
                "age",
                "FOURTIES"
              )} rounded-[40px] cursor-pointer`}
            >
              40대
            </button>
          </div>
          <div className="w-full flex justify-between gap-4">
            <button
              onClick={() =>
                toggleFilterOption(item.surveyQuestion.id, "age", "FIFTIES")
              }
              className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                item.surveyQuestion.id,
                "age",
                "FIFTIES"
              )} rounded-[40px] cursor-pointer`}
            >
              50대
            </button>
            <button
              onClick={() =>
                toggleFilterOption(
                  item.surveyQuestion.id,
                  "age",
                  "OVER_SIXTIES"
                )
              }
              className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                item.surveyQuestion.id,
                "age",
                "OVER_SIXTIES"
              )} rounded-[40px] cursor-pointer`}
            >
              60대 이상
            </button>
          </div>
        </div>

        <div className="gray-line my-4 mx-4" />

        <button
          onClick={() => applyFilters(item.surveyQuestion.id)}
          className="w-full justify-self-center self-center py-1 mx-8 mb-4 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
        >
          적용
        </button>
      </div>
    </>
  );
};
