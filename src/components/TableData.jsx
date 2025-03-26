const TableData = ({ currentItems, data, currentPage, itemsPerPage, paginate, totalPages }) => {
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;

    return (
        <div className='flex flex-col rounded-lg shadow-md'>
            <div className='-m-1.5 overflow-x-auto'>
                <div className='p-1.5 min-w-full inline-block align-middle'>
                    <div className='overflow-hidden'>
                        <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                                {currentItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className='hover:bg-gray-100 dark:hover:bg-neutral-700'
                                    >
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                                            {item.id}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200'>
                                            {item.title}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-end text-sm font-medium'>
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    item.completed
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {item.completed ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center p-4'>
                <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of{' '}
                    {data.length} entries
                </div>
                <div className='flex space-x-1'>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='px-3 py-1 border rounded disabled:opacity-50 hover:bg-blue-500 hover:text-white'
                    >
                        Prev
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => paginate(pageNum)}
                                className={`px-3 py-1 border rounded ${
                                    currentPage === pageNum ? 'bg-blue-500 text-white' : ''
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='px-3 py-1 border rounded disabled:opacity-50 hover:bg-blue-500 hover:text-white'
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TableData;
