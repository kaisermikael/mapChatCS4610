import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import{ Button } from '../common/button';
import{ Link, useNavigate, Redirect } from 'react-router-dom';
import { CreateRoomButton } from '../common/createRoomButton';
import { NewRoomNameInput } from '../common/newRoomNameInput';
import { TopNav } from '../common/topNav';
import { ChatRoomCard } from './chatRoomCard';

export const Home = () => {
  const api = useContext(ApiContext);

  const [name, setName] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [latitude, setUserLat] = useState(null);
  const [longitude, setUserLon] = useState(null);

  var navigate = useNavigate();
  
  useEffect(async () => {
    const res = await api.get('/users/me');
    const { chatRooms } = await api.get('/chat_Rooms');
    setChatRooms(chatRooms);
    console.log(chatRooms);
    setUser(res.user);
    setLoading(false);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      setUserLat(location.coords.latitude);
      setUserLon(location.coords.longitude);
    }, (err) => {
      console.log("GeoLocation Error: " + err);
    });

    return () => {
      navigator.geolocation.clearWatch();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const createRoom = async () => {
    const { chatRoom } = await api.post('/chat_rooms', { name, latitude, longitude, });
    setChatRooms([...chatRooms, chatRoom]);
    setName('');
    navigate(`/chat_rooms/${chatRoom.id}`, { replace: true});
  };

  return (
    <div>
      <TopNav />
        <div className="container flex flex-col shrink-0 h-screen items-center bg-gray-100">
          <div className="flex flex-initial p-4">
            <div>
              <NewRoomNameInput type="text" value={name} placeholder="New Room Name Here" onChange={(e) => setName(e.target.value)}></NewRoomNameInput>
              <CreateRoomButton onClick={() => createRoom()}>Create New Room</CreateRoomButton>
            </div>
          </div>
          <div className="room-list bg-gray-300 flex-1 w-screen border-8 border-black rounded-lg border-double p-4">
            <h1 className="underline text-center text-white text-4xl m-4 p-4 font-mono bg-blue-800 rounded-lg inline-block border-4 border-black drop-shadow-lg">Nearby Rooms:</h1>
            <div>
              {chatRooms.map((chatRoom) => (
                <div key={chatRoom.id}>
                  <ChatRoomCard latitude={ latitude } longitude={ longitude } chatRoom={ chatRoom }/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};
