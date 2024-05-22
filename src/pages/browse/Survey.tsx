import api from "@/api/config";
import { Dialog } from "@/components/Dialog";
import { TopBar } from "@/components/TopBar/TopBar";
import { useOneBtnDialog } from "@/hooks/useOneBtnDialog";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import MultipleChoice from "./components/MultipleChoice";
import RangeSlider from "./components/RangeSlider";
import ShortAnswer from "./components/ShortAnswer";
import SingleChoice from "./components/SingleChoice";
import Subjective from "./components/Subjective";

export interface IOption {
  id: number;
  answer: string;
}

interface IData {
  options: IOption[];
  surveyQuestion: IQuestion;
}

interface IQuestion {
  questionOrder: 0;
  deleted: boolean;
  id: number;
  surveyId: number;
  questionType: string;
  content: string;
  required: boolean;
  page: number;
  maxText: number;
}

interface IAnswers {
  questionId: number;
  answers: string[];
}

export default function Survey() {
  const [data, setData] = useState<IData[]>();
  const [answers, setAnswers] = useState<IAnswers[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (id !== undefined) {
      api
        .get(`/survey/management/${id}`)
        .then((res) => setTitle(res.data.title));
    }
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      api
        .get(`/survey/management/option/${id}`)
        .then((res) => {
          const data: IData[] = res.data.sort(
            (a: IData, b: IData) =>
              a.surveyQuestion.page - b.surveyQuestion.page
          );
          setData(data);
          const lastPage = data[data.length - 1].surveyQuestion.page;
          setLastPage(lastPage);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (data !== undefined) {
      const percent = Math.ceil((answers.length / data.length) * 100);
      setProgress(percent);
    }
  }, [answers]);

  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const onConfirm = () => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("surbearToken");
      if (token) {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded && decoded.sub) {
          const memberId = parseInt(decoded.sub);
          api
            .post("/survey/answer", {
              memberId: memberId,
              surveyId: id,
            })
            .then((res) => {
              const surveyAnswerId = res.data;
              if (surveyAnswerId !== undefined) {
                api
                  .post(`/survey/answer/${surveyAnswerId}`, answers)
                  .then((res) => {
                    queryClient.invalidateQueries("surveyHistory");
                    queryClient.invalidateQueries("member");
                    router.push("/browse/done");
                  })
                  .catch((err) =>
                    showOneBtnDialog("설문조사 제출 실패! 다시 시도해주세요")
                  );
              }
            })
            .catch((err) =>
              showOneBtnDialog("사용자 인식 실패! 로그인 후 다시 시도해주세요")
            );
        }
      } else {
        showOneBtnDialog("로그인 상태를 확인해주세요.");
      }
    }
  };

  return (
    <>
      <TopBar
        title="설문 그만두기"
        hasBack
        progress={progress}
        subTitle={title}
        page={[currentPage, lastPage]}
      />

      {/* 설문 유형별 컴포넌트 렌더링 */}
      <div className="white-screen flex items-start pb-[74px] overflow-y-scroll">
        <div className="inner-screen flex flex-col">
          {data !== undefined &&
            data.map((el, index) => {
              if (el.surveyQuestion.deleted === false) {
                if (el.surveyQuestion.page === currentPage) {
                  if (el.surveyQuestion.questionType === "SINGLE_CHOICE")
                    return (
                      <SingleChoice
                        key={el.surveyQuestion.id}
                        index={index + 1}
                        title={el.surveyQuestion.content}
                        options={el.options}
                        required={el.surveyQuestion.required}
                        onSelect={(selected: string) => {
                          const id = el.surveyQuestion.id;
                          const newAnswer = {
                            questionId: id,
                            answers: [selected],
                          };
                          const otherAnswers = answers.filter(
                            (el) => el.questionId !== id
                          );
                          setAnswers([...otherAnswers, newAnswer]);
                        }}
                        initial={
                          answers
                            .find(
                              (answer) =>
                                answer.questionId === el.surveyQuestion.id
                            )
                            ?.answers.map((el) => el) || []
                        }
                      />
                    );
                  if (el.surveyQuestion.questionType === "MULTIPLE_CHOICE")
                    return (
                      <MultipleChoice
                        key={el.surveyQuestion.id}
                        index={index + 1}
                        title={el.surveyQuestion.content}
                        options={el.options}
                        required={el.surveyQuestion.required}
                        onSelect={(selected: string[]) => {
                          const id = el.surveyQuestion.id;
                          const newAnswer = {
                            questionId: id,
                            answers: [...selected],
                          };
                          const otherAnswers = answers.filter(
                            (el) => el.questionId !== id
                          );
                          setAnswers([...otherAnswers, newAnswer]);
                        }}
                        initial={
                          answers
                            .find(
                              (answer) =>
                                answer.questionId === el.surveyQuestion.id
                            )
                            ?.answers.map((el) => el) || []
                        }
                      />
                    );
                  if (el.surveyQuestion.questionType === "SHORT_ANSWER")
                    return (
                      <ShortAnswer
                        key={el.surveyQuestion.id}
                        index={index + 1}
                        title={el.surveyQuestion.content}
                        required={el.surveyQuestion.required}
                        maxText={el.surveyQuestion.maxText}
                        onSelect={(selected: string) => {
                          const id = el.surveyQuestion.id;
                          const newAnswer = {
                            questionId: id,
                            answers: [selected],
                          };
                          const otherAnswers = answers.filter(
                            (el) => el.questionId !== id
                          );
                          setAnswers([...otherAnswers, newAnswer]);
                        }}
                        initial={
                          answers
                            .find(
                              (answer) =>
                                answer.questionId === el.surveyQuestion.id
                            )
                            ?.answers.map((el) => el) || []
                        }
                      />
                    );
                  if (el.surveyQuestion.questionType === "SUBJECTIVE")
                    return (
                      <Subjective
                        key={el.surveyQuestion.id}
                        index={index + 1}
                        title={el.surveyQuestion.content}
                        required={el.surveyQuestion.required}
                        onSelect={(selected: string) => {
                          const id = el.surveyQuestion.id;
                          const newAnswer = {
                            questionId: id,
                            answers: [selected],
                          };
                          const otherAnswers = answers.filter(
                            (el) => el.questionId !== id
                          );
                          setAnswers([...otherAnswers, newAnswer]);
                        }}
                        initial={
                          answers
                            .find(
                              (answer) =>
                                answer.questionId === el.surveyQuestion.id
                            )
                            ?.answers.map((el) => el) || []
                        }
                      />
                    );
                  if (el.surveyQuestion.questionType === "SLIDER")
                    return (
                      <RangeSlider
                        key={el.surveyQuestion.id}
                        index={index + 1}
                        title={el.surveyQuestion.content}
                        initial={
                          answers
                            .find(
                              (answer) =>
                                answer.questionId === el.surveyQuestion.id
                            )
                            ?.answers.map(Number) || []
                        }
                        onChange={(value: number) => {
                          const id = el.surveyQuestion.id;
                          const newAnswer = {
                            questionId: id,
                            answers: [value + ""],
                          };
                          const otherAnswers = answers.filter(
                            (el) => el.questionId !== id
                          );
                          setAnswers([...otherAnswers, newAnswer]);
                        }}
                      />
                    );
                }
              }
            })}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 w-full flex justify-center bg-white border-t border-gray-2">
        <div className="flex gap-4 w-full max-w-xl px-8 py-4">
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
            }
            className="long-button font-semibold text-gray-5"
          >
            이전 페이지로
          </button>
          {currentPage === lastPage ? (
            <button
              onClick={() => {
                const required = data
                  ?.filter((el) => el.surveyQuestion.required === true)
                  .map((el) => el.surveyQuestion.id);
                const checkRequired = required?.map((target) =>
                  answers.findIndex((el) => el.questionId === target)
                );
                if (checkRequired?.findIndex((el) => el === -1) !== -1) {
                  showOneBtnDialog("필수 질문을 답해주세요.");
                } else {
                  setShowPopUp((prev) => !prev);
                }
              }}
              className="long-button primary-btn-style"
            >
              설문조사 제출
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }}
              className="long-button white-bg-primary-btn"
            >
              다음 페이지로
            </button>
          )}
        </div>
      </div>
      {showPopUp && (
        <>
          <Dialog
            title="답변을 제출할까요?"
            content="제출 후에는 수정할 수 없어요!"
            rightText="제출하기"
            leftText="취소"
            onLeftClick={() => setShowPopUp((prev) => !prev)}
            onRightClick={() => onConfirm()}
          />
        </>
      )}
      {oneBtnDialog.open && (
        <Dialog
          title={oneBtnDialog.title}
          rightText="확인"
          onlyOneBtn
          onRightClick={hideOneBtnDialog}
        />
      )}
    </>
  );
}
