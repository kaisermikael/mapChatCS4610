import { Button } from './button';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import '../../app.css';


export const TopNav = ({ children, ...other }) => {

    const [, setAuthToken] = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const api = useContext(ApiContext);
    const roles = useContext(RolesContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(async () => {
      
      const res = await api.get('/users/me');
      setUser(res.user);
      setLoading(false);
    }, []); 

    const logout = async () => {
      const res = await api.del('/sessions');
      if (res.success) {
        navigate('/signin');
        setAuthToken(null);
      }
    };

      if (loading) {
        return <div>Loading...</div>;
      }

    return (
      <div>
        <nav className="nav flex p-4 mt-0 bg-blue-300 w-screen drop-shadow">
            <div className="left flex-1">
                <Button onClick={logout}>Logout</Button>
            </div>
            <div className="middle flex-1">
                <h1 className="italic text-center text-3xl pt-3 font-mono flex-1 drop-shadow-lg">Welcome, { user.firstName }:</h1>
            </div>
            <div className="right flex-1">
                <h1 className="bold text-center text-5xl inline-block bg-white p-2 rounded-lg drop-shadow-lg">MapChat</h1>
            </div>
        </nav>
      </div>
    );
  };