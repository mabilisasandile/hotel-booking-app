
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../components/AuthProvider';

const PrivateRoutes = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const { user } = useUserAuth();
  if (!user) {
    return navigate("/login")
  }
  console.log(user)
  return children;
}
export default PrivateRoutes;