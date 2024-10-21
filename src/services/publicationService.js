import axios from "axios"

const baseUrl = process.env.REACT_APP_BASE_URL
const formatString = (input) => {
    return input.toLowerCase().replace(/[\s_]+/g, '-');
};
export const createPublication = async (token, publicationRequest, type, onprogress) => {
    console.log(token)
    try {
        const formattedType = formatString(type);
        const response = await axios.post(`${baseUrl}/api/v1/publication/${formattedType}`, publicationRequest, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progressEvent => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onprogress(progress);
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating publication:', error);
        throw error;
    }


}
export const updatePublication = async (token, publicationId, request, type) => {
    try {
        const formattedType = formatString(type);
        const response = await axios.put(`${baseUrl}/api/v1/publication/${formattedType}/${publicationId}`, request, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating publication:', error);
        if (error.response) {
            throw new Error(`Error ${error.response.status}: ${error.response.data.message}`);
        } else {
            throw new Error('An unexpected error occurred while updating the publication.');
        }
    }
};
export const getHomePagePublications = async (token, page = 1, size = 10) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/publication/get-homepage-publication`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching home page publications:', error);
        throw error;
    }
}
export const getPublicationPage = async (token, publicationId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/publication/get-publication-page/${publicationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching home page publications:', error);
        throw error;
    }
}
export const getPublicationPublicPage = async (publicationId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/no-auth/publication/get-publication-page/${publicationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching home page publications:', error);
        throw error;
    }
}
export const getPdfFile = async (pdfFileId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/no-auth/file/pdf-file/${pdfFileId}`);
        const pdfFileUrl = response.data;

        return pdfFileUrl;
    } catch (error) {
        console.error('Error fetching pdf file:', error);
        throw error;
    }
}
export const getRawDataFile = async (token, rawDataId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/file/raw-data/${rawDataId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const pdfFileUrl = response.data;

        return pdfFileUrl;
    } catch (error) {
        console.error('Error fetching raw data :', error);
        throw error;
    }
}
export const deletePublication = async (token, publicationId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/v1/publication/${publicationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data; // "Publication successfully deleted"
    } catch (error) {
        console.error('Error deleting publication:', error);
        throw error;
    }
};
export const getPublicationEdit = async (token, publicationId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/publication/edit-publication/${publicationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching publication edit details:', error);
        throw error;
    }
};
export const updateAuthor = async (token, publicationId, authorRequests) => {
    try {
        const response = await axios.put(`${baseUrl}/api/v1/publication-author/${publicationId}`, authorRequests, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching publication edit details:', error);
        throw error;
    }
};
export const uploadPdfFile = async (token, pdfFileId, file, status) => {
    const formData = new FormData();
    formData.append('file', file); // Ensure 'file' is a File object, not just a string
    formData.append('only', status); // Ensure 'only' is properly named as per backend requirement

    try {
        const response = await axios.post(`${baseUrl}/api/v1/file/pdf-file/${pdfFileId}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.status;
    } catch (error) {
        console.error('Error uploading PDF file:', error);
        throw error;
    }
};

export const getProfilePublications = async (token, userId) => {
    const startTime = performance.now(); // Capture start time
    try {
        const response = await axios.get(`${baseUrl}/api/v1/publication/get-profilepage-publication/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const endTime = performance.now(); // Capture end time
        const loadingTime = endTime - startTime; // Calculate loading time in milliseconds

        console.log(`Fetching profile publications took ${loadingTime.toFixed(2)} milliseconds`); // Log the loading time
        return  response.data; // Return the data and loading time
    } catch (error) {
        console.error('Error fetching profile publications:', error);
        throw error;
    }
};
export const searchPublicationsByTitle = async (token, title, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/publication/search`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                title: title,
                page: page, // Add page parameter
                size: size, // Add size parameter
            },
        });
        return response.data; // Return the publication data from the response
    } catch (error) {
        console.error('Error searching publications by title:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};
export const getAllPublicationsByYear = async (token,userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/publication/${userId}/years`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data; // Dönüş verisi burada
    } catch (error) {
        console.error('Error fetching publications by year:', error);
        throw error; // Hata fırlatıyoruz, bu şekilde hatayı yönetebilirsiniz
    }
};
export const getCoAuthorLastPublications = async (token, userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/publication/co-authors/${userId}/last-publications`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; // Return the list of AuthorResponse
    } catch (error) {
        console.error('Error fetching co-author last publications:', error);
        throw error; // Throw the error to be handled in the component
    }
};