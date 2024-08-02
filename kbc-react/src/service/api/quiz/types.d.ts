export interface IQuizListResponse {
  data: Array<IQuizListData>;
  total_records: number;
}

export interface IQuizListData {
  _id: string;
  userId: number;
  status: string;
  winAmount: number;
  currentLevel: number;
  questions: IQuestion[];
  createdAt: string;
}

interface IQuestion {
  questionId: string;
  questionStatus: string;
  _id: string;
}

export interface ILeaderBoardListResponse {
  data: Array<ILeaderBoardListData>;
  total_records: number;
}

export interface ILeaderBoardListData {
  name: string;
  winAmount: number;
  currentLevel: number;
  timeGap: number;
  status: string;
}
