import { deshboardAPI } from "../../service/api/deshboard";

export const TodayTopPlayer = () => {
  const { data, isSuccess, isLoading } = deshboardAPI.useGetRankedPlayer();

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <caption className="p-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white">
          Today's top 10 Games
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-5 text-sm">
              Rank
            </th>
            <th scope="col" className="px-6 py-5 text-sm">
              Name
            </th>
            <th scope="col" className="px-6 py-5 text-sm">
              Attempted question
            </th>
            <th scope="col" className="px-6 py-5 text-sm">
              Win Amount
            </th>
            <th scope="col" className="px-6 py-5 text-sm">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4} className="text-center">
                <p className="text-sm mt-5">Loading...</p>
              </td>
            </tr>
          )}
          {isSuccess &&
            data.map((plyr, index) => (
              <tr className="bg-white border-b" key={plyr.name + index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                >
                  {plyr.name}
                </th>
                <td className="px-6 py-4">{plyr.currentLevel}</td>
                <td className="px-6 py-4">{plyr.winAmount}</td>
                <td className="px-6 py-4">
                  {`${new Date(plyr.timeGap).toISOString().slice(14, 19)}`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
