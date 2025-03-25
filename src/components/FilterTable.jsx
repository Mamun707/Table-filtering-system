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
    const [filters, setFilters] = useState({
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
        if (filters.division) {
            const districts = await getDistricts(filters.division);
            setDistricts(districts);
        } else {
            setDistricts([]);
        }
    };

    useEffect(() => {
        getDistrictsData();
    }, [filters.division]);

    const getFilterTableData = async () => {
        const params = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params[key] = value;
        });
        setSearchParams(params);

        let todos = await getTodos(params);

        if (filters.division) {
            todos = todos.filter((item) => item.division === filters.division);
        }
        if (filters.district) {
            todos = todos.filter((item) => item.district === filters.district);
        }
        if (filters.status) {
            const isActive = filters.status === 'Active';
            todos = todos.filter((item) => item.completed === isActive);
        }
        if (filters.keywords) {
            todos = todos.filter((item) =>
                item.title.toLowerCase().includes(filters.keywords.toLowerCase())
            );
        }

        setTableData(todos);
        setCurrentPage(1);
    };

    useEffect(() => {
        getFilterTableData();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFilters({ division: '', district: '', status: '', keywords: '' });
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tableData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='p-6 bg-white'>
            <div className='font-medium text-3xl pb-6'>Table Filtering System</div>

            <Filter
                filters={filters}
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
