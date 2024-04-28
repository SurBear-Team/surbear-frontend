import api from "@/pages/api/config";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { editSurveyTitleAtom } from "../editSurveyState";
import { useEffect } from "react";
import { TopBar } from "@/pages/components/TopBar/TopBar";

export default function EditSurveyPage() {
  const router = useRouter();
  const surveyId = useParams();
  const surveyTitle = useRecoilValue(editSurveyTitleAtom);

  const fetchSurvey = async () => {
    const { data } = await api.get(`/survey/management/option/${surveyId?.id}`);
    return data;
  };

  const { data } = useQuery(["editSurvey", surveyId?.id], fetchSurvey, {
    enabled: !!surveyId,
  });

  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <>
      <TopBar title={surveyTitle!} hasBack onLeftClick={() => {}} />
      <div className="white-screen flex-col pt-14 justify-start">
        <div className="inner-screen pb-20">하잉</div>
      </div>
    </>
  );
}
