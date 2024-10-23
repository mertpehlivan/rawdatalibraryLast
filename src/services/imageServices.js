import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getRawDataImage = async (rawDataId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/no-auth/image/raw-data/${rawDataId}`, {
      responseType: 'blob', // Ensure the response is handled as binary data (blob)
    });
    return response.data; // Return the blob (binary data)
  } catch (error) {
    
    throw error;
  }
};
export const getProfileImage = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/no-auth/image/profile/${userId}`, {
      responseType: 'blob', // Ensure the response is handled as binary data (blob)
    });
    return response.data; // Return the blob (binary data)
  } catch (error) {
    console.error(`Profile image not found for user ${userId}. Error:`, error);
    return null; // Return null if the image is not found
  }
};