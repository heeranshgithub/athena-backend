import Replicate from "replicate";
import { REPLICATE_API_KEY } from "./envConfig";

const replicate = new Replicate({
  auth: REPLICATE_API_KEY,
});

export default replicate;
