import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDivisions } from '../services/getDivisions';
import { getDistricts } from '../services/getDistricts';
import { getTodos } from '../services/getTableData';
import Filter from './Filter';
import TableData from './TableData';

export default function FilterTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [filtersTableData, setFiltersTableData] = useState({
        division: searchParams.get('division') || '',
        district: searchParams.get('district') || '',
        status: searchParams.get('status') || '',
        keywords: searchParams.get('keywords') || '',
    });

    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const getDivisionsData = async () => {
        const divisions = await getDivisions();
        setDivisions(divisions);
    };

    useEffect(() => {
        getDivisionsData();
    }, []);

    const getDistrictsData = async () => {
        if (filtersTableData.division) {
            const districts = await getDistricts(filtersTableData.division);
            setDistricts(districts);
        } else {
            setDistricts([]);
        }
    };

    useEffect(() => {
        getDistrictsData();
    }, [filtersTableData.division]);

    const getFilterTableData = async () => {
        const params = {};
        Object.entries(filtersTableData).forEach(([key, value]) => {
            if (value) params[key] = value;
        });
        setSearchParams(params);

        let todos = await getTodos(params);

        if (filtersTableData.division) {
            todos = todos.filter((item) => item.division === filtersTableData.division);
        }
        if (filtersTableData.district) {
            todos = todos.filter((item) => item.district === filtersTableData.district);
        }
        if (filtersTableData.status) {
            const isActive = filtersTableData.status === 'Active';
            todos = todos.filter((item) => item.completed === isActive);
        }
        if (filtersTableData.keywords) {
            todos = todos.filter((item) =>
                item.title.toLowerCase().includes(filtersTableData.keywords.toLowerCase())
            );
        }

        setTableData(todos);
        setCurrentPage(1);
    };

    useEffect(() => {
        getFilterTableData();
    }, [filtersTableData]);

    const handleFilterChange = (e) => {
        setFiltersTableData({ ...filtersTableData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFiltersTableData({ division: '', district: '', status: '', keywords: '' });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tableData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='p-6 bg-white'>
            <div className='font-medium text-3xl pb-6'>Table Filtering System</div>

            <Filter
                filters={filtersTableData}
                divisions={divisions}
                districts={districts}
                handleFilterChange={handleFilterChange}
                handleReset={handleReset}
            />

            <TableData
                currentItems={currentItems}
                data={tableData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                paginate={paginate}
                totalPages={totalPages}
            />
        </div>
    );
}
