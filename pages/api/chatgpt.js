import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: req.body.question }],
          n: 1, // 요청할 응답의 수
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      // response data 콘솔에 출력
      console.log("Response:", response.data);
      // GPT 사용량 콘솔에 출력
      console.log("Usage:", response.data.usage);

      const { prompt_tokens, completion_tokens, total_tokens } =
        response.data.usage;

      const usageData = {
        prompt_tokens: prompt_tokens,
        completion_tokens: completion_tokens,
        total_tokens: total_tokens,
      };

      await axios.post("https://api.surbear.site/external/gpt", usageData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const answers = response.data.choices.map(
        (choice) => choice.message.content
      );
      res.status(200).json({ answers });
    } catch (error) {
      console.error("에러 발생", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
