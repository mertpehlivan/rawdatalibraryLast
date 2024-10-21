import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Paper,
    Typography,
    CircularProgress,
    Stack,
    Button
} from '@mui/material';
import { useUserContext } from '../auth/AuthProvider';
import userService from '../services/userService';
import { getProfileImage } from '../services/imageServices';
import { searchPublicationsByTitle } from '../services/publicationService';
import SearchBar from '../components/searchPage/SearchBar';
import SearchTypeToggle from '../components/searchPage/SearchTypeToggle';
import SearchResults from '../components/searchPage/SearchResults';
import PaginationComponent from '../components/searchPage/PaginationComponent';
import { Search } from '@mui/icons-material';

const fallbackImage = 'path_to_fallback_image'; // Update this path with your actual fallback image path

const SearchPage = () => {
    const { token } = useUserContext();
    const [searchType, setSearchType] = useState('researcher');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchImages = async () => {
            const urls = await Promise.all(
                results.map(async (author) => {
                    try {
                        const imageBlob = await getProfileImage(author.id);
                        return { id: author.id, url: URL.createObjectURL(imageBlob) };
                    } catch {
                        return { id: author.id, url: fallbackImage };
                    }
                })
            );

            const newImageUrls = urls.reduce((acc, img) => ({ ...acc, [img.id]: img.url }), {});
            setImageUrls(newImageUrls);
        };

        if (searchType === 'researcher' && results.length) {
            fetchImages();
        }
    }, [results, searchType]);

    const handleSearch = async (page = 0) => {
        if (!query) return;
        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, size: 5 },
            };

            let response;
            if (searchType === 'researcher') {
                response = await userService.searchUsers(query, token);
                setResults(response);
                setTotalPages(1);
            } else if (searchType === 'publication') {
                response = await searchPublicationsByTitle(token, query, page, 5);
                setResults(response.publications || []);
                setTotalPages(response.totalPages);
            } else if (searchType === 'rawData') {
                response = await axios.get(`/api/rawdata?search=${query}`, config);
                setResults(response.data || []);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setResults([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (value) => {
        setCurrentPage(value);
        handleSearch(value - 1); // Yeni sayfa numarasını kullanarak arama yap
    };

    const handleTypeChange = (newType) => {
        setSearchType(newType);
        setQuery('');
        setResults([]);
        setTotalPages(0);
        setCurrentPage(1);
    };

    const handleSearchButtonClick = () => {
        handleSearch();
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 5, height: "80vh" }}>
            <Typography variant="h6" sx={{ marginBottom: 1, color: 'primary.main' }}>Search</Typography>

            <SearchTypeToggle searchType={searchType} onChange={handleTypeChange} />
            <Stack direction="row" spacing={1}>
                <SearchBar query={query} onQueryChange={setQuery} />
                <Button
                    startIcon={<Search />}
                    variant="contained"
                    color="primary"
                    onClick={handleSearchButtonClick}
                    sx={{ marginTop: 2 }}
                >
                    Search
                </Button>
            </Stack>

            {loading ? (
                <CircularProgress />
            ) : (
                results.length > 0 ?
                    <SearchResults
                        searchType={searchType}
                        results={results}
                        imageUrls={imageUrls}
                        fallbackImage={fallbackImage}
                    /> :
                    <Typography variant="h6" mt={2}>
                        Please enter your search query above to find researchers, publications, or raw data.
                    </Typography>
            )}
            {!loading && totalPages > 0 && (
                <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                    <PaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                </Stack>
            )}
        </Paper>
    );
};

export default SearchPage;
