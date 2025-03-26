const Filter = ({ filters, divisions, districts, handleFilterChange, handleReset }) => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md w-full my-6'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div>
                    <label className='block text-sm font-medium'>
                        Division<span className='text-red-500'>*</span>
                    </label>
                    <div className='relative'>
                        <select
                            className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                            name='division'
                            value={filters.division}
                            onChange={handleFilterChange}
                        >
                            <option value=''>Select Division</option>
                            {divisions.map((div) => (
                                <option key={div.id} value={div.name}>
                                    {div.name}
                                </option>
                            ))}
                        </select>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.2'
                            stroke='currentColor'
                            className='h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                            />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className='block text-sm font-medium'>
                        District<span className='text-red-500'>*</span>
                    </label>
                    <div className='relative'>
                        <select
                            className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                            name='district'
                            value={filters.district}
                            onChange={handleFilterChange}
                            disabled={!filters.division}
                        >
                            <option value=''>Select District</option>
                            {districts.map((dist) => (
                                <option key={dist.id} value={dist.name}>
                                    {dist.name}
                                </option>
                            ))}
                        </select>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.2'
                            stroke='currentColor'
                            className='h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                            />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className='block text-sm font-medium'>Status</label>
                    <div className='relative'>
                        <select
                            className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                            name='status'
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <option value=''>All Status</option>
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                        </select>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.2'
                            stroke='currentColor'
                            className='h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                            />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className='block text-sm font-medium'>Keyword</label>
                    <div className='relative'>
                        <input
                            name='keywords'
                            value={filters.keywords}
                            onChange={handleFilterChange}
                            className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md'
                            placeholder='Enter keyword'
                        />
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.2'
                            stroke='currentColor'
                            className='h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 21l-4.35-4.35m0 0a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9z'
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='mt-4 text-right'>
                <button
                    onClick={handleReset}
                    className='px-4 py-2 text-slate-700 text-sm border border-slate-200 rounded hover:text-white hover:bg-blue-600'
                >
                    Reset
                </button>
            </div>
        </div>
    );
};
export default Filter;
