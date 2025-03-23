import replicate from "../config/replicate";
import { ReplicatePrediction } from "../interfaces/chatInterfaces";

const chatWithReplicate = async (
  input: Record<string, any>,
): Promise<string | string[] | number | number[] | boolean | null> => {
  try {
    const prediction = (await replicate.run("meta/llama-2-13b-chat", {
      input: input,
    })) as ReplicatePrediction;

    if (Array.isArray(prediction.message)) {
      return prediction.message.join("");
    }

    if (prediction.status === "failed" || prediction.error) {
      console.error(
        "Replicate prediction failed:",
        prediction.error || prediction,
      );
      throw new Error(prediction.error || "Replicate prediction failed");
    }

    if (!prediction.message) {
      return "No output from Replicate model.";
    }

    return prediction.message;
  } catch (error) {
    console.error("Error running Replicate model:", error);
    throw new Error("Failed to run Replicate model.");
  }
};

export default chatWithReplicate;
