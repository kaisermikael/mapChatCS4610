import { useContext, useEffect, useState } from 'react';
import{ Button } from '../common/button';
import{ Link, useNavigate, Redirect } from 'react-router-dom';
import { ApiContext } from '../../utils/api_context';

export const ChatRoomCard = ({ latitude, longitude, chatRoom }) => {

    const api = useContext(ApiContext);

    const [validCoord, setValidCoord] = useState(false);
    const [deleted, setDeleted] = useState(false);
  
    useEffect( () => {
        if ((latitude - .08) <= chatRoom.latitude <= (latitude + .08)){ 
            if((longitude - .08) <= chatRoom.longitude <= (longitude + .08)) {
                setValidCoord(true);
            } else { return ( <div className="display-hidden"></div> ); }
          } else { return ( <div className="display-hidden"></div> ); }
    });

    const deleteRoom = async (chatRoom) => {
        let { success } = await api.del(`/chat_rooms/${chatRoom.id}`);
        if (success) {
            setDeleted(true);
        }
    }

    if (deleted) {
        return ( <div className="display-hidden"></div> );
    }

    return (
    <div>
        <Link className="bg-white text-2xl m-4 mt-2 mb-2 p-4 inline-block rounded-lg shadow-2xl
                    hover:text-black transition ease-in-out duration-500 hover:bg-blue-400" to={`/chat_rooms/${chatRoom.id}`}>{chatRoom.name}</Link>
        <Button onClick={() => deleteRoom(chatRoom)}>Delete Room</Button>
    </div>
    );
};