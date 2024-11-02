// TODO add a toast when the user is redirected to home, explaining role issue
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../components/dashboard/admin/AdminDashboard';
import MemberDashboard from '../components/dashboard/member/MemberDashboard';

const DashboardRoutes = ({onLogout}) => {
    const userRoles = JSON.parse(localStorage.getItem('roles')) || [];
    if (!userRoles || userRoles.length === 0) {
        console.log(`From DashboardRoutes:: no user roles detected in the userRoles prop userRoles = |${userRoles}|`)
        return <Navigate to='/auth/login' />
    }

    // Conditional rendering for routes based on roles
    return (
        <Routes>
            <Route
                path="/admins/*"
                element={userRoles.includes('ROLE_ADMIN') ? (
                    <AdminDashboard onLogout={onLogout}/>
                ) : (
                    <Navigate to="/login" />
                )
                }
            />

            <Route
                path="/members/*"
                element={userRoles.includes('ROLE_MEMBER') ? (
                    <MemberDashboard onLogout={onLogout}/>
                ) : (
                    <Navigate to="/login" />
                )
                }
            />

            {/* Fallback Route */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
    );
};

export default DashboardRoutes;
