import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoutes = () => {
    const { userInfo: user } = useSelector(state => state.user);

    return user?.isAdmin ? <Outlet/> : <Navigate to="/"/>;
}

export default AdminRoutes;