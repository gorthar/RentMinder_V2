// eslint-disable-next-line react/prop-types
function Button({ text, onClick }) {
  return (
    <a
      href="#"
      onClick={onClick}
      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 mx-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
    >
      {text}
    </a>
  );
}
export default Button;
