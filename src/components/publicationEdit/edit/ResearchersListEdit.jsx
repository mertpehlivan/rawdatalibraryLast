import { Search } from '@mui/icons-material';
import React, { useState } from 'react';
import SearchAuthorEdit from './SearchAuthorEdit';
import { Container, Grid } from '@mui/material';
import ResearcherList from '../ResearcherList';

const ResearchersListEdit = ({ authors, type }) => {
  const [authorList, setAuthorList] = useState(authors);
  
  const handleRoleChange = (authorId, newRole) => {
    // `authorList` dizisinde güncellemeyi yapacak bir kopyasını oluştur
    const updatedAuthors = authorList.map((author) => {
      if (author.id === authorId) {
        // Rolü güncelle
        return { ...author, authorRole: newRole };
      }
      return author;
    });
    console.log(updatedAuthors)
    // Durumu güncellemek için `setAuthorList` fonksiyonunu çağır
    setAuthorList(updatedAuthors);
  };
  
  const addAuthors = (author) => {
    setAuthorList((prev) => [...prev, author]);
  };

  const moveAuthorUp = (index) => {
    if (index > 0) {
      const newList = [...authorList];
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
      setAuthorList(newList);
    }
  };

  const moveAuthorDown = (index) => {
    if (index < authorList.length - 1) {
      const newList = [...authorList];
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      setAuthorList(newList);
    }
  };

  const deleteAuthor = (index) => {
    const newList = authorList.filter((_, i) => i !== index);
    setAuthorList(newList);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <SearchAuthorEdit addAuthors={addAuthors} authors={authorList} setAuthors={setAuthorList} />
        </Grid>
        <Grid item xs={6}>
          <ResearcherList
            handleRoleChange={handleRoleChange}
            onDelete={deleteAuthor}
            moveAuthorUp={moveAuthorUp}
            moveAuthorDown={moveAuthorDown}
            authors={authorList}
            type={type}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ResearchersListEdit;
