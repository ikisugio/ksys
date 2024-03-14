const ManagementDisplayTable = ({ items }) => {
  return (
    <div className="overflow-x-auto relative border sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-gray-300"
            >
              <th
                scope="row"
                className="w-24 py-1 px-2 text-lg text-gray-700 whitespace-nowrap border-r border-gray-300 text-white bg-slate-700/90 font-normal"
              >
                {item.label}
              </th>
              <td className="py-1 px-6 text-gray-900 text-lg">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagementDisplayTable;
