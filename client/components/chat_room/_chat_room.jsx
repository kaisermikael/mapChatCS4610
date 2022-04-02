import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../../utils/api_context';

import { Button } from '../common/button';
import { useMessages } from '../../utils/use_messages';
import { Message } from './message';
import{ Link } from 'react-router-dom';
import { TopNav } from '../common/topNav';

export const ChatRoom = () => {

    const [chatRoom, setChatRoom] = useState(null);
    const [contents, setContents] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const api = useContext(ApiContext);
    const { id } = useParams();
    console.log(id);
    const [messages, sendMessage] = useMessages(chatRoom);

    useEffect(async () => {
        setLoading(true);
        if (!user) {
            const { user } = await api.get('/users/me');
            setUser(user);
        }
        const { chatRoom } = await api.get(`/chat_rooms/${id}`);
        setChatRoom(chatRoom);
        setLoading(false);

    }, [id]);

    if (loading) return 'Loading...';


    return (
        <div>
            <div className="overflow-y-auto">
                <div className="container h-screen w-screen bg-gray-100 overflow-y-auto">
                    <h1 className="float-center bg-black text-white m-6 p-4 rounded-xl text-4xl italic text-center content-center drop-shadow-xl">Welcome to { chatRoom.name }!</h1>
                    <div className="block p-4 m-4 drop-shadow-xl">
                        <Link className="bg-blue-800 text-xl  text-center text-white m-4 p-2 rounded-lg flex-1 drop-shadow-xl
                                        hover:text-black transition ease-in-out duration-500 hover:bg-blue-400" to={`/`}>Return to Room List</Link>
                        <div className="border-4 border-black rounded-lg m-4 drop-shadow-xl">
                            {messages.map((message) => (
                            <Message key={message.id} message={message} />
                            ))}
                        </div>
                </div>
                <div className="flex absolute inset-x-1/4 bottom-0 w-1/2 m-2 p-4 h-17">
                            <input className="text-lg p-1 rounded-lg border-2 border-black flex-1 drop-shadow-xl" type="text" placeholder="Enter a message to send" value={contents} onChange={(e) => setContents(e.target.value)} />
                            <Button onClick={() => sendMessage(contents, user)}>Send</Button>
                </div>
            </div>
        </div>
      </div>
    );
};