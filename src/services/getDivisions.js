import axios from 'axios';

const BD_API = import.meta.env.VITE_BD_API_URL;
export const getDivisions = async () => {
    try {
        const response = await axios.get(`${BD_API}/divisions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching divisions:', error);
        throw error;
    }
};
