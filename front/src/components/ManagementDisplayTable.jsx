
const ManagementDisplayTable = ({ data }) => {
  return (
    <div className="overflow-x-auto relative border sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-gray-300">
              <th scope="row" className="w-24 py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300">
                {item.label}
              </th>
              <td className="py-2 px-6">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagementDisplayTable;
