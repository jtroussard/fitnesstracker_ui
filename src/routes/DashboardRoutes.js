import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/dashboard/admin/AdminDashboard';
import MemberDashboard from '../components/dashboard/member/MemberDashboard';

const DashboardRoutes = ({ onLogout }) => {
    const userRoles = JSON.parse(localStorage.getItem('roles')) || [];
    
    // Display a message or fallback if roles are undefined or empty, instead of redirecting
    if (!userRoles || userRoles.length === 0) {
        console.log("From DashboardRoutes:: No user roles detected. Rendering fallback component.");
        return <h2>Access Restricted. Please log in to access the dashboard.</h2>;
    }

    // Conditional rendering for routes based on roles
    return (
        <Routes>
            <Route
                path="/admins/*"
                element={userRoles.includes('ROLE_ADMIN') ? (
                    <AdminDashboard onLogout={onLogout} />
                ) : (
                    <h2>Access Denied: Admins Only</h2>
                )}
            />

            <Route
                path="/members/*"
                element={userRoles.includes('ROLE_MEMBER') ? (
                    <MemberDashboard onLogout={onLogout} />
                ) : (
                    <h2>Access Denied: Members Only</h2>
                )}
            />

            {/* Fallback Route */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
    );
};

export default DashboardRoutes;
