import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { Overlay } from "../components/styles/Overlay";
import { AgeSheet } from "./Components/AgeSheet";
import { TopBar } from "../components/TopBar/TopBar";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userEmailAtom,
  userIdAtom,
  userNicknameAtom,
  userPasswordAtom,
} from "./userState";
import { AxiosError } from "axios";
import api from "../api/config";
import { Dialog } from "../components/Dialog";
import { useOneBtnDialog } from "../hooks/useOneBtnDialog";

export default function SignUpDetail() {
  const router = useRouter();

  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();
  // 사용자가 입력하는 닉네임
  const [userNickname, setUserNickname] = useRecoilState(userNicknameAtom);
  // recoil로 가져오는 것들, post에 쓰임
  const userEmail = useRecoilValue(userEmailAtom);
  const userId = useRecoilValue(userIdAtom);
  const userPassword = useRecoilValue(userPasswordAtom);

  // 닉네임 중복 확인
  const checkDuplicate = async () => {
    // 유효성검사 추가
    try {
      const response = await api.post("/member/verification/duplicate", {
        type: "nickname",
        value: userNickname,
      });
      if (response.data === true) {
        onNextClick();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      // (409) 이미 가입한 닉네임이면
      if (axiosError.response && axiosError.response.status === 409) {
        showOneBtnDialog("이미 가입한 닉네임이에요");
      } else {
        showOneBtnDialog(
          "네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요"
        );
      }
    }
  };

  // 닉네임 onChange
  const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNickname(e.target.value);
  };

  // 나이대
  const [selectedAge, setSelectedAge] = useState("20대");
  const [showSheet, setShowSheet] = useState(false);

  const ageMapping: { [key: string]: string } = {
    "20대 미만": "UNDER_TWENTY",
    "20대": "TWENTIES",
    "30대": "THIRTIES",
    "40대": "FOURTIES",
    "50대": "FIFTIES",
    "60대 이상": "OVER_SIXTIES",
  };

  // 시트 보였다 말았다
  const toggleShowSheet = () => {
    setShowSheet(!showSheet);
  };

  // 성별
  const [selectedGender, setSelectedGender] = useState("남자");

  const genderMapping: { [key: string]: string } = {
    남자: "MALE",
    여자: "FEMALE",
  };

  // post할 데이터
  const submitData = {
    age: ageMapping[selectedAge],
    gender: genderMapping[selectedGender],
    userId: userId,
    password: userPassword,
    email: userEmail,
    point: 0,
    nickname: userNickname,
    deleted: false,
  };

  // 다음 버튼
  const onNextClick = async () => {
    if (!userNickname.trim()) {
      showOneBtnDialog("닉네임을 입력해주세요");
      return;
    }

    try {
      const response = await api.post("/member/signup", submitData);

      if (response.status === 200) {
        router.push("/sign-up/done");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      // (409) 중복
      if (axiosError.response && axiosError.response.status === 409) {
        showOneBtnDialog("이미 가입한 계정이에요");
      } else {
        showOneBtnDialog("회원가입에 실패했습니다. 다시 시도해주세요");
      }
    }
  };
  return (
    <>
      <TopBar hasBack noShadow title="회원가입" />
      <div className="white-screen">
        <div className="inner-screen px-12 flex-col">
          {/* 닉네임 */}
          <div className="w-full">
            <span className="font-semibold">닉네임</span>
            <input
              type="text"
              value={userNickname}
              onChange={onNicknameChange}
              placeholder="닉네임을 입력해주세요"
              className="main-input mt-1 mb-10 text-gray-9"
            />
          </div>
          {/* 나이 */}
          <div className="w-full">
            <span className="font-semibold">나이</span>
            <input
              onClick={() => {
                setShowSheet(true);
              }}
              value={selectedAge}
              className="main-input text-center mt-1 mb-10 text-gray-9 cursor-pointer"
            />
          </div>
          {/* 성별 */}
          <div className="w-full">
            <span className="font-semibold ">성별</span>
            <div className="flex gap-4 mt-1">
              <button
                className={`long-button ${
                  selectedGender === "남자"
                    ? "primary-btn-style"
                    : "border-primary-1 text-primary-1"
                }`}
                onClick={() => setSelectedGender("남자")}
              >
                남자
              </button>
              <button
                className={`long-button ${
                  selectedGender === "여자"
                    ? "primary-btn-style"
                    : "border-primary-1 text-primary-1"
                }`}
                onClick={() => setSelectedGender("여자")}
              >
                여자
              </button>
            </div>
          </div>

          <div className="gray-line w-full mt-12 mx-10" />

          {/* 회원가입 완료 버튼 */}
          <div className="w-full">
            <button
              className="long-button px-32 mt-8 font-semibold white-bg-primary-btn"
              onClick={checkDuplicate}
            >
              회원가입 완료
            </button>
          </div>
          {showSheet && (
            <>
              <Overlay onClick={toggleShowSheet} />
              <AgeSheet
                showSheet={showSheet}
                onClose={toggleShowSheet}
                onSelected={setSelectedAge}
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
        </div>
      </div>
    </>
  );
}
