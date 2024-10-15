import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import ArticlePost from './type/ArticlePost';
import ThesisPost from './type/ThesisPost';
import ChapterInABookPost from './type/ChapterInABookPost';
import ConferencePaperPost from './type/ConferencePaperPost';
import ResearchProjectPost from './type/ResearchPorjectPost';
import CompanyTestReportPost from './type/CompanyTestReport';

const PostChip = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small (mobile)

  // Function to render the appropriate post component
  const renderPostComponent = () => {
    switch (data.type) {
      case 'ARTICLE':
        return <ArticlePost data={data} />;
      case 'THESIS':
        return <ThesisPost data={data} />;
      case 'CHAPTER_IN_A_BOOK':
        return <ChapterInABookPost data={data} />;
      case 'CONFERENCE_PAPER':
        return <ConferencePaperPost data={data} />;
      case 'RESEARCH_PROJECT':
        return <ResearchProjectPost data={data} />;
      case 'COMPANY_TEST_REPORT':
        return <CompanyTestReportPost data={data} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      {renderPostComponent()}
    </Box>
  );
};

export default PostChip;
