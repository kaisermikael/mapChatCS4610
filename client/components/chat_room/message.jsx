export const Message = ({ message }) => {
    return (
      <div className="message m-4 overflow-y-auto bg-gray-600 border-2 border-black rounded-lg">
        <h3 className="user-name bg-blue-300 rounded-lg p-2 m-2">{message.userName}:</h3>
        <div className="p-2 text-white">{message.contents}</div>
      </div>
    );
  };