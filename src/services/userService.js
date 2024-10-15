import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

const searchUsers = async (searchTerm, token) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/user/search?name=${searchTerm}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};
export const createTempUser = async (token, formValues) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/user/temp-user`, formValues,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};
export const findByIdToGetUserResponse = async (token,userId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/user/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};
export const findByIdToGetUserPublicResponse = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/no-auth/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};
export default {
  searchUsers,
};
