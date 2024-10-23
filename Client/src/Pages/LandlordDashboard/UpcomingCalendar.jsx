import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

function UpcomingCalendar() {
  const [date, setDate] = useState(new Date());

  const events = [
    { date: new Date(2023, 4, 15), title: "Property Inspection - 456 Elm St" },
    { date: new Date(2023, 4, 20), title: "Lease Renewal - 123 Main St" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-full"
          />
          <div className="space-y-2">
            <h3 className="font-semibold">Upcoming Events:</h3>
            <ul className="space-y-1">
              {events.map((event, index) => (
                <li key={index} className="text-sm flex items-start">
                  <span className="w-24 flex-shrink-0">
                    {event.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    :
                  </span>
                  <span className="flex-grow">{event.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default UpcomingCalendar;
