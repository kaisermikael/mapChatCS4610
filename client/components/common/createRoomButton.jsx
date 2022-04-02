export const CreateRoomButton = ({ children, ...other }) => {
  return (
    <button className="bg-blue-800 pt-2 h-auto pb-2 pr-4 pl-4 rounded-lg font-bold text-xl text-white hover:text-black transition ease-in-out duration-500 hover:bg-blue-400" {...other}>
      {children}
    </button>
  );
};
