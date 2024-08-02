import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../components/auth/loginForm";
import { Deshboard } from "../page/deshboard";
import { ROUTES } from "../utils/constants/routes";
import { Error404 } from "../page/error/error404";
import { AuthGuard } from "../components/auth/guards/auth.guard";
import { TestComponent } from "../page/quiz";
import { MyQuiz } from "../page/my-quiz";
import { Signup } from "../components/auth/signupForm";
import { LeaderBoard } from "../page/leaderboard";

const router = createBrowserRouter([
  {
    path: ROUTES.default,
    element: <Deshboard />,
  },
  {
    path: ROUTES.signIn,
    element: <Login />,
  },
  {
    path: ROUTES.signup,
    element: <Signup />,
  },
  {
    path: ROUTES.leaderboard,
    element: <LeaderBoard />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: ROUTES.quiz,
        element: <TestComponent />,
      },
      {
        path: ROUTES.myQuiz,
        element: <MyQuiz />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export const Routers = () => <RouterProvider router={router} />;
