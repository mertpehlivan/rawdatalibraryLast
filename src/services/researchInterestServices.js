import axios from 'axios';

// Base URL for the Research Interests API
const baseUrl = process.env.REACT_APP_BASE_URL; // Make sure this environment variable is set correctly

// Function to get current user's research interests
export const getCurrentUserResearchInterests = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/research-interests/current-user`, {
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

export const getUserResearchInterests = async (token, userId) => {
    try {
        let response;
        if (token) {
            response = await axios.get(`${baseUrl}/api/v1/research-interests/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to headers
                },
            });
        } else {
            response = await axios.get(`${baseUrl}/api/v1/no-auth/research-interests/${userId}`);
        }

        return response.data; // Return the list of interests
    } catch (error) {
        console.error('Error fetching current user research interests:', error);
        throw error; // Rethrow the error to handle it in the component
    }
};

// Function to create new research interests
export const createResearchInterests = async (token, interests) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/research-interests`, interests, {
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

// Function to update existing research interests
export const updateResearchInterests = async (token, interestIds, newInterests) => {
    try {
        const payload = { interestIds, newInterests };
        const response = await axios.put(`${baseUrl}/api/v1/research-interests/update`, payload, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
            },
        });
        return response.data; // Return the updated interests
    } catch (error) {
        console.error('Error updating research interests:', error);
        throw error;
    }
};

// Function to delete a research interest
export const deleteResearchInterest = async (token, interestId) => {
    try {
        await axios.delete(`${baseUrl}/api/v1/research-interests/${interestId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
            },
        });
    } catch (error) {
        console.error('Error deleting research interest:', error);
        throw error;
    }
};
