import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import routes from '../configs/routes';
import NotFound from '../components/common/NotFound';
import Extractor from '../utils/Extractor';

const ProtectedRoutes = () => {
  const { isAuthenticated, userRoles, userId } = useContext(AuthContext);

  console.log('[ProtectedRoutes] isAuthenticated:', isAuthenticated);
  console.log('[ProtectedRoutes] userRoles:', userRoles);
  console.log('[ProtectedRoutes] userId:', userId);

  const id = Extractor.extractId(localStorage.getItem('jwt'));
  console.log('[ProtectedRoutes] extractor userId:', id);

  const renderRoutes = () => {
    const userRoutes = [...routes.public];

    if (!isAuthenticated) {
      console.log('[ProtectedRoutes] User is not authenticated. Rendering public routes only.');
      return userRoutes;
    }

    if (userRoles.includes('ROLE_MEMBER')) {
      if (userId === undefined) {
        console.log('[ProtectedRoutes] User is a member but userId is undefined. Showing loading state.');
        return [{ path: '*', element: () => <div>Loading...</div> }]; // Temporary loading route
      }
      console.log(`[ProtectedRoutes] User has ROLE_MEMBER with member id ${userId}. Adding member routes.`);
      userRoutes.push(
        ...routes.member.map(route => ({
          ...route,
          path: Object.keys(route.params || {}).reduce(
            (path, key) => path.replace(`:${key}`, route.params[key] || userId),
            route.path
          ),
        }))
      );
    }

    if (userRoles.includes('ROLE_ADMIN')) {
      console.log('[ProtectedRoutes] User has ROLE_ADMIN. Adding admin routes.');
      userRoutes.push(
        ...routes.admin.map(route => ({
          ...route,
          path: Object.keys(route.params || {}).reduce(
            (path, key) => path.replace(`:${key}`, route.params[key] || userId),
            route.path
          ),
        }))
      );
    }

    console.log('[ProtectedRoutes] Final userRoutes:', userRoutes);
    return userRoutes;
  };

  const availableRoutes = renderRoutes();

  console.log('[ProtectedRoutes] Rendered availableRoutes:', availableRoutes);

  return (
    <Routes>
      {availableRoutes.map(({ path, element: Component }) => (
        <Route
          key={path}
          path={path}
          element={<Component />}
        />
      ))}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default ProtectedRoutes;
