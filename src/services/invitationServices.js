import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

// Function to create a co-author request
export const createCoAuthorRequest = async (token, publicationId) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/invitation/co-author-request`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                publicationId: publicationId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating co-author request:', error);
        throw error;
    }
};


export const getCoAuthorRequests = async (token, page = 0, size = 5, statusFilter = 'ALL') => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/invitation/co-author-request`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                page: page,  // Page number for pagination (zero-based index)
                size: size,  // Number of items per page
                status: statusFilter,  // Filter by status (ALL, PENDING, CONFIRMED, REJECTED)
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching co-author requests:', error);
        throw error;
    }
};


// Function to get all co-author invitations
export const getCoAuthorInvitations = async (token, page = 0, size = 5, statusFilter = 'ALL') => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/invitation/co-author-invitation`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                page: page,  // Page number for pagination (zero-based index)
                size: size,  // Number of items per page
                status: statusFilter,  // Filter by status (ALL, PENDING, CONFIRMED, REJECTED)
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching co-author invitations:', error);
        throw error;
    }
};

// Function to reject a co-author invitation
export const rejectCoAuthorInvitation = async (token, invitationId) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/invitation/co-author-reject/${invitationId}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error rejecting co-author invitation:', error);
        throw error;
    }
};

// Function to confirm a co-author invitation
export const confirmCoAuthorInvitation = async (token, invitationId) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/invitation/co-author-confirm/${invitationId}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error confirming co-author invitation:', error);
        throw error;
    }
};
