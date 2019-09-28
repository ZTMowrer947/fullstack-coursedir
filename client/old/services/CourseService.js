// Imports
import axios from "axios";

// Module
export default (() => {
    const baseUrl = "http://localhost:5000/api/courses";

    return {
        getList: async () => {
            // Get courses from API
            const response = await axios.get(baseUrl);
        
            // Return course listing
            return response.data;
        },

        getById: async id => {
            // Get course from API
            const response = await axios.get(`${baseUrl}/${id}`);

            // Return course data
            return response.data;
        },
    };
})();
