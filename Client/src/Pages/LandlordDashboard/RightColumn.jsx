import Notifications from "./Notifications";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import UpcomingCalendar from "./UpcomingCalendar";

function RightColumn() {
  return (
    <div className="space-y-8">
      <Notifications />
      <QuickActions />
      <RecentActivity />
      <UpcomingCalendar />
    </div>
  );
}
export default RightColumn;
