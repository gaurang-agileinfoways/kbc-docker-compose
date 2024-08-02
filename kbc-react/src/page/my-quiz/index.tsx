import { useState } from "react";
import DefaultLayout from "../../components/common/layout/DefaultLayout";
import { quizAPI } from "../../service/api/quiz";
import { IPaginationList } from "../../utils/constants";
import { Pagination } from "./pagination";

let dateFlag: string = "";
export const MyQuiz = () => {
  function setDateFlag(d: string) {
    dateFlag = d.toString().substring(0, 10);
    return "";
  }

  const [pagination, setPagination] = useState<IPaginationList>({
    limit: 10,
    page: 1,
    search: "",
    skip: 0,
  });

  const { data, isLoading, isSuccess } = quizAPI.useGetMyQuiz(pagination);

  return (
    <DefaultLayout>
      <div className="relative overflow-x-auto border-gray-200/50 border sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <caption className="p-5 my-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white">
            My Quiz
            <p className="mt-1 text-sm font-normal text-gray-500">
              This is the list of quiz which given by you.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr No.
              </th>
              <th scope="col" className="px-6 py-3">
                Win Price
              </th>
              <th scope="col" className="px-6 py-3">
                Passed question
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr className="bg-white">
                <td colSpan={5} className="bg-gray-100">
                  <p className="my-5 text-center w-full">Loading...</p>
                </td>
              </tr>
            )}
            {isSuccess &&
              data.data?.map((data, index: number) => (
                <>
                  {dateFlag !== data.createdAt.toString().substring(0, 10) && (
                    <tr
                      className="bg-white border-y my-1"
                      key={data._id + "date"}
                    >
                      <td colSpan={5} className="bg-gray-100">
                        <p className="my-2 mx-4">
                          {data.createdAt.toString().substring(0, 10)}
                          {setDateFlag(data.createdAt)}
                        </p>
                      </td>
                    </tr>
                  )}

                  <tr className="bg-white border-b" key={data._id}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data.winAmount}
                    </th>
                    <td className="px-6 py-4">{data.currentLevel}</td>
                    <td className="px-6 py-4 capitalize">
                      {data.status.replace("_", " ")}
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>

        {isSuccess && (
          <Pagination
            limit={pagination.limit}
            totalRecords={data.total_records}
            pagination={pagination}
            paginationFunc={setPagination}
          />
        )}
      </div>
    </DefaultLayout>
  );
};
