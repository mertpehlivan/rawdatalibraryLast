import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthRoutes } from './AuthRoutes'
import { Box, CircularProgress, Container, Stack, Typography } from '@mui/material';
// import { Book } from '@mui/icons-material';


import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Appbar from '../components/Appbar';
import axios from 'axios';
import NoAuthBar from '../components/NoAuthBar';
import Footer from '../components/Footer';

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false)
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation()


  useEffect(() => {
    const token = localStorage.getItem("access-token")
    const checkAuth = async () => {
      if (token) {
        try {
          setLoading(true)

          const response = await axios.get(
            `${baseUrl}/api/v1/user/check-user`
            , {
              headers: { "Authorization": `Bearer ${token}` }
            });
          console.log(response.data)
          handleAuth(response.data)
        } catch {
          localStorage.clear()
          navigate('/')

        } finally {
          setLoading(false)
        }
      }
    };

    checkAuth();
  }, []);

  const handleAuth = (data) => {
    const token = localStorage.getItem("access-token")
    if (!token) {
      localStorage.setItem("access-token", data.token)
      setToken(data.token);
      setUser(data.account);
      setAuthenticated(true)
    } else {
      setToken(token)
      setUser(data);
      setAuthenticated(true)
    }

  }
  const logout = () => {
    localStorage.removeItem("access-token");
    setToken("");
    setUser(null);
    setAuthenticated(false);
    navigate('/'); // Kullanıcıyı giriş sayfasına yönlendirin
  };
  if (loading) {
    return (
      <Stack width="100%" height="100vh">
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <UserContext.Provider
      value={{ user, authenticated, token, handleAuth, logout }}
    >
      <>
        {authenticated ? <Appbar /> : <NoAuthBar/>}
        <AuthRoutes />
        <Footer/>
      </>
    </UserContext.Provider>
  );
};

export default AuthProvider;
