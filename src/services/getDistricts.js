import axios from 'axios';

const BD_API = import.meta.env.VITE_BD_API_URL;

export const getDistricts = async (division) => {
    try {
        const response = await axios.get(`${BD_API}/districts/${division}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching districts:', error);
        throw error;
    }
};
