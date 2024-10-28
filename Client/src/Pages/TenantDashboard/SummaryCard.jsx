import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropTypes from "prop-types";

export const SummaryCard = ({ title, icon: Icon, items }) => {
  console.log(items);
  if (!items) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Icon className="w-5 h-5 mr-2" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>No activity yet</CardContent>
      </Card>
    );
  }
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className="w-5 h-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items?.length < 1
            ? "No activity yet"
            : items.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.label}</span>
                  <span className={`font-semibold ${item.statusClass || ""}`}>
                    {item.value}
                  </span>
                </li>
              ))}
        </ul>
      </CardContent>
    </Card>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      statusClass: PropTypes.string,
    })
  ).isRequired,
};
