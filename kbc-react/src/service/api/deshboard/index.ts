import apiInstance from "../..";
import { ApiEndPoints } from "../../../utils/constants";
import { useFetch } from "../../hooks";

export const deshboardAPI = {
  useGetRankedPlayer() {
    return useFetch({
      queryKey: ["deshboard"],
      queryFn: (): Promise<
        Array<{
          currentLevel: number;
          name: string;
          timeGap: number;
          winAmount: number;
        }>
      > =>
        apiInstance
          .post(ApiEndPoints.quiz.rankedPlayer)
          .then((res) => res.data),
    });
  },
};
