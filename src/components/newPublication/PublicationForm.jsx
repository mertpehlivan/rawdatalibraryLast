import React from 'react'
import { useNewPublicationContext } from '../../context/NewPublicationProvider'

import ArticleForm from './publicationsForm/ArticleForm'
import ThesisForm from './publicationsForm/ThesisForm'
import ChapterInABookForm from './publicationsForm/ChapterInABookForm'
import CompanyTestReportForm from './publicationsForm/CompanyTestReportForm'
import ConferencePaperForm from './publicationsForm/ConferencePaperForm'
import ResearchProjectForm from './publicationsForm/ResearchProjectForm'

const PublicationForm = () => {
  const {publication} = useNewPublicationContext()
  if (publication.type == "Article") {
    return(<ArticleForm/>)
  }else if(publication.type == "Thesis"){
    return(<ThesisForm/>)
  }else if (publication.type == "Chapter in a book"){
    return(<ChapterInABookForm/>)
  }else if (publication.type == "Company test report"){
    return(<CompanyTestReportForm/>)
  }else if (publication.type == "Conference paper"){
    return(<ConferencePaperForm/>)
  }else if (publication.type == "Research project"){
    return(<ResearchProjectForm/>)
  }
}

export default PublicationForm