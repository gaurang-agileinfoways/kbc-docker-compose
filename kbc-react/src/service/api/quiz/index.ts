import apiInstance from "../..";
import { IApiSuccess } from "../../../utils/Types";
import { ApiEndPoints, IPaginationList } from "../../../utils/constants";
import { ILeaderBoardListResponse, IQuizListResponse } from "./types";
import { useFetch } from "../../hooks";

export const quizAPI = {
  async generateQuiz(): Promise<IApiSuccess<Record<string, string>>> {
    return apiInstance
      .post(ApiEndPoints.quiz.startQuiz)
      .then((response) => response)
      .catch((err) => {
        throw err?.response?.data;
      });
  },

  useGetMyQuiz(data: IPaginationList) {
    return useFetch({
      queryKey: ["leaderboard", "my-quiz", data],
      queryFn: (): Promise<IQuizListResponse> =>
        apiInstance
          .post(ApiEndPoints.quiz.myQuiz, data)
          .then((res) => res.data),
    });
  },

  useGetLeaderboard(data: IPaginationList) {
    return useFetch({
      queryKey: ["leaderboard", "top-games", data],
      queryFn: (): Promise<ILeaderBoardListResponse> =>
        apiInstance
          .post(ApiEndPoints.quiz.leaderboard, data)
          .then((resp) => resp.data),
    });
  },
};
