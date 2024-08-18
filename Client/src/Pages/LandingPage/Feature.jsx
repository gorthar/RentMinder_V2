// eslint-disable-next-line react/prop-types
export default function Feature({ text, svg, headerText }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
        {svg}
      </div>
      <h3 className="mb-2 text-xl font-bold dark:text-white ">{headerText}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-justify">{text}</p>
    </div>
  );
}
