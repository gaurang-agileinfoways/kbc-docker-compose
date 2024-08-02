import { useForm } from "react-hook-form";
import DefaultLayout from "../../common/layout/DefaultLayout";
import { ISignInReq } from "../../../service/store/auth/types";
import { joiResolver } from "@hookform/resolvers/joi";
import { LoginVelidation } from "../../../utils/constants/form-validation";
import { useEffect, useState } from "react";
import { authAPI } from "../../../service/api/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants/routes";

export const Login = () => {
  const [handleShowPassword, setHandleShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInReq>({
    resolver: joiResolver(LoginVelidation),
  });

  const navigate = useNavigate();
  const mutation = authAPI.useSignIn();
  function handleFormData(data: ISignInReq) {
    console.log("data: ", data);
    mutation.mutate(data);
  }

  useEffect(() => {
    if (mutation.isSuccess && mutation?.data?.message) {
      toast.success(mutation?.data?.message);
      navigate(ROUTES.default);
    }
    if (mutation.isError) toast.error(mutation.error.message);
  }, [mutation.isSuccess, mutation.isError]);
  return (
    <DefaultLayout>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleFormData)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                  {...register("email")}
                />
                <p className="text-red-500/80">
                  {errors?.email && errors.email.message}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="adfdasf"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  type={handleShowPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                  {...register("password")}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <button
                    type="button"
                    onClick={() => setHandleShowPassword(!handleShowPassword)}
                    className="focus:shadow-outline py-1 focus:outline-none"
                  >
                    {!handleShowPassword ? (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 w-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 w-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </span>
              </div>
              <div className="font-medium">
                {errors?.password && (
                  <>
                    <div
                      className="flex items-center py-2 mb-4 text-sm text-red-600/90 rounded-lg"
                      role="alert"
                    >
                      <svg
                        className="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div className="font-medium">
                        {errors?.password && errors.password.message}
                      </div>
                    </div>
                    <div
                      className="flex p-4 my-4 text-sm text-gray-700 rounded-lg bg-blue-50"
                      role="alert"
                    >
                      <svg
                        className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">
                          Ensure that these requirements are met:
                        </span>
                        <ul className="mt-1.5 list-disc list-inside">
                          <li>
                            At least 8 characters (and up to 16 characters)
                          </li>
                          <li>At least one lowercase character</li>
                          <li>At least one special character, e.g.!@#?</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6
                text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-indigo-600 disabled:bg-indigo-500/50 disabled:cursor-progress"
              >
                {mutation.isPending ? (
                  <svg
                    version="1.1"
                    id="L9"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                    enableBackground="new 0 0 0 0"
                    className="h-6 w-8"
                  >
                    <rect x="10" y="10" width="6" height="18" fill="#000000">
                      <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0"
                        dur="0.6s"
                        repeatCount="indefinite"
                      ></animateTransform>
                    </rect>
                    <rect x="22" y="10" width="6" height="18" fill="#000000">
                      <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.2s"
                        dur="0.6s"
                        repeatCount="indefinite"
                      ></animateTransform>
                    </rect>
                    <rect x="34" y="10" width="6" height="18" fill="#000000">
                      <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.4s"
                        dur="0.6s"
                        repeatCount="indefinite"
                      ></animateTransform>
                    </rect>
                  </svg>
                ) : (
                  <p>Sign in</p>
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 flex justify-between">
            <p className="text-center text-sm text-gray-500">Not a member?</p>
            <Link
              to={ROUTES.signup}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
