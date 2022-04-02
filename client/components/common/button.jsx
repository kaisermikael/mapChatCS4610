export const Button = ({ children, ...other }) => {
  return (
    <button className="bg-gray-600 pt-2 pb-2 pr-4 pl-4 rounded-lg font-bold text-2xl text-white flex-none
                      hover:text-black transition ease-in-out duration-500 hover:bg-red-800" {...other}>
      {children}
    </button>
  );
};
