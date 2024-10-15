import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

// Helper function to create headers with the token
const getAuthHeaders = (token) => {
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json', // Specify JSON content type
    },
  };
};

// Get educations by user ID
export const getEducationsByUserId = async (userId, token) => {
  try {
    let response;
    if (token) {
      response = await axios.get(`${baseUrl}/api/v1/educations/user/${userId}`, getAuthHeaders(token));
    }else{
      response = await axios.get(`${baseUrl}/api/v1/no-auth/educations/user/${userId}`);
    }
   
    return response.data;
  } catch (error) {
    console.error('Error fetching educations:', error);
    throw error;
  }
};

// Get educations for the current user
export const getEducationsByCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/educations/current`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error('Error fetching current user educations:', error);
    throw error;
  }
};

// Create a new education
export const createEducation = async (educationData, token) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/educations`, educationData, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error('Error creating education:', error);
    throw error;
  }
};

// Update an existing education by ID
export const updateEducation = async (id, educationData, token) => {
  try {
    const response = await axios.put(`${baseUrl}/api/v1/educations/${id}`, educationData, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error('Error updating education:', error);
    throw error;
  }
};

// Delete an education by ID
export const deleteEducation = async (id, token) => {
  try {
    await axios.delete(`${baseUrl}/api/v1/educations/${id}`, getAuthHeaders(token));
  } catch (error) {
    console.error('Error deleting education:', error);
    throw error;
  }
};
