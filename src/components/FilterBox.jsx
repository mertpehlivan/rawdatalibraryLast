import { Select, MenuItem, FormControl, InputLabel, InputAdornment, Icon, Box, Stack } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


const FilterBox = ({ filter, handleFilterChange, statusCounts }) => (
    <Stack direction="row" justifyContent="end" sx={{ paddingX: 2 }}>
        <FormControl size="small" >
            <InputLabel id="co-author-filter-label">Filter</InputLabel>
            <Select
                sx={{ minWidth: 60 }}
                labelId="co-author-filter-label"
                id="co-author-filter"
                value={filter}
                label="Filter"
                onChange={(event) => handleFilterChange(event, event.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <FilterListIcon />
                    </InputAdornment>
                }
            >
                <MenuItem value="ALL">
                    ({statusCounts.confirmedCount + statusCounts.pendingCount + statusCounts.rejectedCount}) All
                </MenuItem>
                <MenuItem value="PENDING">
                    ({statusCounts.pendingCount}) Pending
                </MenuItem>
                <MenuItem value="CONFIRMED">
                    ({statusCounts.confirmedCount}) Confirmed
                </MenuItem>
                <MenuItem value="REJECTED">
                    ({statusCounts.rejectedCount}) Rejected
                </MenuItem>
            </Select>
        </FormControl>
    </Stack>
);

export default FilterBox;
