import axios from 'axios';

// Base URL for the Research Interests API
const baseUrl = process.env.REACT_APP_BASE_URL; // Make sure this environment variable is set correctly

// Function to get current user's research interests
export const getCurrentUserWebOfScienceCategories = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/web-of-science-category/current-user`, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
            },
        });
        return response.data; // Return the list of interests
    } catch (error) {
        console.error('Error fetching current user research interests:', error);
        throw error; // Rethrow the error to handle it in the component
    }
};

export const getUserWebOfScienceCategories = async (token, userId) => {
    try {
        let response;
        if (token) {
            response = await axios.get(`${baseUrl}/api/v1/web-of-science-category/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to headers
                },
            });
        } else {
            response = await axios.get(`${baseUrl}/api/v1/no-auth/web-of-science-category/${userId}`);
        }

        return response.data; // Return the list of interests
    } catch (error) {
        console.error('Error fetching current user research interests:', error);
        throw error; // Rethrow the error to handle it in the component
    }
};

// Function to create new research interests
export const createWebOfScienceCategories = async (token, interests) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/web-of-science-category`, interests, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
            },
        });
        return response.data; // Return the created interests
    } catch (error) {
        console.error('Error creating research interests:', error);
        throw error;
    }
};



// Function to delete a research interest
export const deleteWebOfScienceCategory = async (token, categoryId) => {
    try {
        await axios.delete(`${baseUrl}/api/v1/web-of-science-category/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
            },
        });
    } catch (error) {
        console.error('Error deleting research interest:', error);
        throw error;
    }
};
