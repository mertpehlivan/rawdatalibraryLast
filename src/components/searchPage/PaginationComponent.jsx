import React from 'react';
import { Pagination } from '@mui/material';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => onPageChange(value)}
            color="primary"
            variant="outlined"
            shape="rounded"
        />
    );
};

export default PaginationComponent;
