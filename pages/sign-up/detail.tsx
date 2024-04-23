import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

interface DialogState {
  open: boolean;
  title: string;
}

export default function IdPassword() {
  const router = useRouter();

  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    title: "",
  });

  useEffect(() => {
    setUserNickname("");
  }, []);

  const [userNickname, setUserNickname] = useRecoilState(userNicknameAtom);
  const userEmail = useRecoilValue(userEmailAtom);
  const userId = useRecoilValue(userIdAtom);
  const userPassword = useRecoilValue(userPasswordAtom);

  const onNicknameChange = (e: any) => {
    setUserNickname(e.target.value);
  };

  const [selectedAge, setSelectedAge] = useState("20대");
  const [showSheet, setShowSheet] = useState(false);

  const toggleShowSheet = () => {
    setShowSheet(!showSheet);
  };

  const [selectedGender, setSelectedGender] = useState("남자");

  const ageMapping: { [key: string]: string } = {
    "20대 미만": "UNDER_TWENTY",
    "20대": "TWENTIES",
    "30대": "THIRTIES",
    "40대": "FOURTIES",
    "50대": "FIFTIES",
    "60대 이상": "OVER_SIXTIES",
  };

  const genderMapping: { [key: string]: string } = {
    남자: "MALE",
    여자: "FEMALE",
  };

  const submitData = {
    age: ageMapping[selectedAge], // 매핑된 값을 사용
    gender: genderMapping[selectedGender], // 매핑된 값을 사용
    userId: userId,
    password: userPassword,
    email: userEmail,
    point: 0,
    nickname: userNickname,
    deleted: false,
  };

  const onNextClick = async () => {
    if (!userNickname.trim()) {
      setDialog({
        open: true,
        title: "닉네임을 입력해주세요",
      });
      return;
    }

    try {
      const response = await api.post("/member/signup", submitData);
      console.log(response.data);

      if (response.status === 200) {
        router.push("/sign-up/done"); // 성공 시 '/sign-up/done' 페이지로 이동
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      if (axiosError.response && axiosError.response.status === 409) {
        setDialog({
          open: true,
          title: "이미 가입한 계정이에요",
        });
      } else {
        setDialog({
          open: true,
          title: "회원가입에 실패했습니다. 다시 시도해주세요",
        });
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

          {/* 다음버튼 */}
          <div className="w-full">
            <button
              className="long-button px-32 mt-8 font-semibold bg-white border-primary-1 text-primary-1"
              onClick={onNextClick}
            >
              다음
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

          {dialog.open && (
            <Dialog
              title={dialog.title}
              rightText="확인"
              onRightClick={() => {
                setDialog((current) => ({ ...current, open: false }));
              }}
              onlyOneBtn
            />
          )}
        </div>
      </div>
    </>
  );
}
