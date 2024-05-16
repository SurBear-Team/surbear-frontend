import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { ListCard } from "@/pages/profile/components/ListCard";
import { useQuery } from "react-query";

export default function ManageGPT() {
  const fetchGpt = async () => {
    const { data } = await api.get("/external/gpt");
    return data;
  };
  const { data } = useQuery(["gpt"], fetchGpt);
  return (
    <>
      <TopBar title="GPT Token 사용량 확인" hasBack noShadow />
      <div className="white-screen flex-col justify-start pt-[50px]">
        <div className="inner-screen">
          <ListCard
            content="completion_tokens"
            surveyOwner={`${data?.completion_tokens} 토큰`}
          />
          <ListCard
            content="prompt_tokens"
            surveyOwner={`${data?.prompt_tokens} 토큰`}
          />
          <ListCard
            content="total_tokens"
            surveyOwner={`${data?.total_tokens} 토큰`}
          />
        </div>
      </div>
    </>
  );
}
