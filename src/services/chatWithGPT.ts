import openai from "../config/openai";

const chatWithGPT = async (message: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return response.choices[0]?.message?.content || "No response from ChatGPT";
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    throw new Error("Failed to get response from ChatGPT");
  }
};

export default chatWithGPT;
