import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { zhCN } from '@mui/material/locale';
import AuthProvider from './auth/AuthProvider';
const theme = createTheme({
  palette: {
    primary: {
      main: '#091582',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#101582',
      light: '#53fc33',
      dark: '#091582',
      contrastText: '#fff',
    },
    background: {
      default: '#FFFFFF'
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c622828",
      contrastText: "#fff"
    }
  },
  typography: {
    fontSize: 12,
  },
 
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider />
    </BrowserRouter>
  </ThemeProvider>
 



);
