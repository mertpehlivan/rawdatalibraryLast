import React, { useEffect, useState } from 'react';
import CoAuthorRequest from './CoAuthorRequest';
import { Stack, Pagination, CircularProgress, Typography, Box, Icon } from '@mui/material';
import { useUserContext } from '../../auth/AuthProvider';
import { getCoAuthorInvitations, getCoAuthorRequests } from '../../services/invitationServices';
import FilterBox from '../FilterBox';
import { Error, CheckCircle, HourglassEmpty } from '@mui/icons-material'; // Material UI icons

const CoAuthorInvitationList = () => {
    const { token } = useUserContext();
    const [refresh,setRefresh] = useState(false)
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusCounts, setStatusCounts] = useState({
        pendingCount: 0,
        confirmedCount: 0,
        rejectedCount: 0
    });
    const [filter, setFilter] = useState('ALL'); // Filter state
    const itemsPerPage = 4;

    const fetchCoAuthorRequests = async (page, size, statusFilter) => {
        setLoading(true);
        try {
            const response = await getCoAuthorInvitations(token, page - 1, size, statusFilter);
            if (response) {
                setRequests(response.content);
                setTotalPages(response.totalPages);
                setStatusCounts({
                    pendingCount: response.statusCount.pendingCount,
                    confirmedCount: response.statusCount.confirmedCount,
                    rejectedCount: response.statusCount.rejectedCount
                });
            }
        } catch (error) {
            console.error('Error fetching co-author requests:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCoAuthorRequests(currentPage, itemsPerPage, filter);
    }, [token, currentPage, filter,refresh]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleFilterChange = (event, newFilter) => {
        if (newFilter) {
            setFilter(newFilter);
            setCurrentPage(1); // Reset to first page on filter change
        }
    };

    useEffect(() => {
        return () => {
            setCurrentPage(1);
        };
    }, []);

    const renderStatusMessage = () => {
        switch (filter) {
            case 'PENDING':
                return (
                    <Stack justifyContent="center" direction="row" alignItems="center" spacing={0.5}>
                        <HourglassEmpty sx={{ fontSize: 40, color: 'primary.main' }} /> 
                        <Typography variant="h6" color="textSecondary">
                        No pending co-author requests available.
                        </Typography>
                    </Stack>
                );
            case 'CONFIRMED':
                return (
                    <Stack justifyContent="center" direction="row" alignItems="center" spacing={0.5}>
                        <CheckCircle sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="h6" color="textSecondary">
                             No confirmed co-author requests available.
                        </Typography>
                    </Stack>
                );
            case 'REJECTED':
                return (
                    <Stack justifyContent="center" direction="row" alignItems="center" spacing={0.5}>
                        <Error sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="h6" color="textSecondary">
                             No rejected co-author requests available.
                        </Typography>
                    </Stack>
                );
            default:
                return (
                    <Stack justifyContent="center" direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="h6" color="textSecondary">
                            No co-author requests available.
                        </Typography>
                    </Stack>
                );
        }
    };

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <FilterBox filter={filter} handleFilterChange={handleFilterChange} statusCounts={statusCounts} />
                    {requests.length > 0 ? (
                        <>
                            <Stack spacing={1} mt={1}>
                                {requests.map((request, index) => (
                                    <CoAuthorRequest setRefresh={setRefresh} key={index} data={request} token={token} />
                                ))}
                            </Stack>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                color="primary"
                                sx={{ marginTop: '16px', justifyContent: 'center', display: 'flex' }}
                            />
                        </>
                    ) : (
                        renderStatusMessage()
                    )}
                </>
            )}
        </div>
    );
};

export default CoAuthorInvitationList;
