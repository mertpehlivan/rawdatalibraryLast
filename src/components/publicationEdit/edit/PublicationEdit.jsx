import React from 'react';
import ArticleFormEdit from './type/ArticleFormEdit';
import ThesisFormEdit from './type/ThesisFormEdit';  // Corrected path
import ChapterInABookFormEdit from './type/ChapterInABookFormEdit';
import CompanyTestReportFormEdit from './type/CompanyTestReportFormEdit';
import ConferencePaperFormEdit from './type/ConferencePaperFormEdit';
import ResearchProjectFormEdit from './type/ResearchProjectFormEdit';

const PublicationEdit = ({ type, publication }) => {
  if (type === "ARTICLE") {
    return (<ArticleFormEdit publication={publication} type ={type}/>);
  } else if (type === "THESIS") {
    return (<ThesisFormEdit publication={publication} type ={type}/>);
  } else if (type === "CHAPTER_IN_A_BOOK") {
    return (<ChapterInABookFormEdit publication={publication} type ={type}/>);
  } else if (type === "COMPANY_TEST_REPORT") {
    return (<CompanyTestReportFormEdit publication={publication} type ={type}/>);
  } else if (type === "CONFERENCE_PAPER") {
    return (<ConferencePaperFormEdit publication={publication} type ={type}/>);
  } else if (type === "RESEARCH_PROJECT") {
    return (<ResearchProjectFormEdit publication={publication} type ={type}/>);
  }
  return null; // Add a fallback return to handle unknown types
};

export default PublicationEdit;
