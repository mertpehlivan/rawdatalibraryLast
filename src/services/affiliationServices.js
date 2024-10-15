import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

// Helper function to create headers with the token
const getAuthHeaders = (token) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get affiliations by user ID
export const getAffiliationsByUserId = async (userId, token) => {
  try {
    let response;
    if (token) {
      response = await axios.get(`${baseUrl}/api/v1/affiliation/${userId}`, {
        headers: getAuthHeaders(token)
      });
    }else{
      response = await axios.get(`${baseUrl}/api/v1/no-auth/affiliation/${userId}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching affiliations:', error);
    throw error;
  }
};
export const getAffiliationsByCurrentUser = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/affiliation/edit`, {
        headers: getAuthHeaders(token)
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching affiliations:', error);
      throw error;
    }
  };

// Create a new affiliation
export const createAffiliation = async (affiliationData, token) => {
    console.log(token);
    console.log(affiliationData);

    try {
        const response = await axios.post(`${baseUrl}/api/v1/affiliation`, affiliationData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Specify JSON content type
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating affiliation:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update an existing affiliation by ID
export const updateAffiliation = async (id, affiliationData, token) => {
  try {
    const response = await axios.put(`${baseUrl}/api/v1/affiliation/${id}`, affiliationData, {
      headers: getAuthHeaders(token)
    });
    return response.data;
  } catch (error) {
    console.error('Error updating affiliation:', error);
    throw error;
  }
};

// Delete an affiliation by ID
export const deleteAffiliation = async (id, token) => {
  try {
    await axios.delete(`${baseUrl}/api/v1/affiliation/${id}`, {
      headers: getAuthHeaders(token)
    });
  } catch (error) {
    console.error('Error deleting affiliation:', error);
    throw error;
  }
};
