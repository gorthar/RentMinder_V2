import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

function MainContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mb-8">
      <div className="w-full lg:w-2/3">
        <LeftColumn />
      </div>
      <div className="w-full lg:w-1/3">
        <RightColumn />
      </div>
    </div>
  );
}
export default MainContent;
