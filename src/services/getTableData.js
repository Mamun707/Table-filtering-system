import axios from 'axios';

const API_URL = import.meta.env.VITE_TODO_API_URL;

export const getTodos = async (params = {}) => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const response = await axios.get(`${API_URL}?${queryString}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};
