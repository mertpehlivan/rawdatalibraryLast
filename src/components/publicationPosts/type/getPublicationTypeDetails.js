import { Article, Assignment, Book, BusinessCenter, School, Science } from "@mui/icons-material";

export const getPublicationTypeDetails = (type) => {
  switch (type) {
    case "ARTICLE":
      return { label: "Article", icon: <Article color="background.default" /> };
    case "THESIS":
      return { label: "Thesis", icon: <School color="background.default" /> };
    case "CHAPTER_IN_A_BOOK":
      return { label: "Chapter in a book", icon: <Book color="background.default" /> };
    case "CONFERENCE_PAPER":
      return { label: "Conference paper", icon: <Assignment color="background.default" /> };
    case "RESEARCH_PROJECT":
      return { label: "Research project", icon: <Science color="background.default" /> };
    case "COMPANY_TEST_REPORT":
      return { label: "Company test report", icon: <BusinessCenter color="background.default" /> };
    default:
      return { label: "Unknown type", icon: null };
  }
};