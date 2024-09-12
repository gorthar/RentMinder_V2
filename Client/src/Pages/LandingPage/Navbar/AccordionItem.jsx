import { ChevronDown, ChevronUp } from "lucide-react";
import PropTypes from "prop-types";

function AccordionItem({ title, isOpen, toggle, children }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="w-full flex justify-between items-center pt-2 px-3 text-left font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={toggle}
      >
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className=" px-3 ml-2" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
}
export default AccordionItem;
//Prototypes
AccordionItem.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  children: PropTypes.node,
};
