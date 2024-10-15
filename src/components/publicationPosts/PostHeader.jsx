import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const PostHeader = ({ title, id, variant="h5" }) => {
    return (
        <Link
            to={`/publication/${id}`} // Add correct route for navigation
            style={{
                textDecoration: 'none',
                color: 'inherit'
            }}
        >
            <Typography
                variant={variant}
                color="primary.main"
                sx={{
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' } // Adding hover effect
                }}
            >
                {title}
            </Typography>
        </Link>
    );
};