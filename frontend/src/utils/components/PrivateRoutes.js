import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { parseJwt } from '../crypt';

const PrivateRoutes = () => {
    const { userInfo: user } = useSelector(state => state.user);

    return validateToken(parseJwt(user.token)) ? <Outlet/> : <Navigate to="/login"/>;
}

const validateToken = (token) => {
    let currentDate = new Date();

    return !(token.exp * 1000 < currentDate.getTime());
}
export default PrivateRoutes;