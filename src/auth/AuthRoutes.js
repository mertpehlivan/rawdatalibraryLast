import { Route, Routes } from "react-router-dom";
import { useUserContext } from "./AuthProvider";
import { nav } from "./navigations";
import ErrorPage from '../pages/ErrorPage'





export const AuthRoutes = () => {
  const { authenticated, user } = useUserContext();

  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && authenticated ) {
          return (
            <Route key={i} path={r.path} element={r.element}>
              {r.children && r.children.length > 0 &&
                r.children.map((child, index) => (
                  <Route key={index} path={child.path} element={child.element} />
                ))
              }
            </Route>
          );
        } else if (!r.isPrivate && !authenticated) {
          return <Route key={i} path={r.path} element={r.element}>
            {r.children && r.children.length > 0 &&
              r.children.map((child, index) => (
                <Route key={index} path={child.path} element={child.element} />
              ))
            }
          </Route>;
        } else return false;
      })}

      
      <Route path="*" element={<ErrorPage />} />
      
    </Routes>
  );
};
