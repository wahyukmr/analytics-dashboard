import React, { useEffect, useState } from "react";
import DashboardLayout from "../templates/DashboardLayout";
import { mockEventFetcher } from "../../data";
import { getWorkspaceTimezone } from "../../utils";
import VisualizationData from "../organisms/VisualizationData";
import { useProcessedEvents } from "../../hooks";
import type { RawEvent } from "../../types";

export default function DashboardPage(): React.JSX.Element {
  const [eventData, setEventData] = useState<RawEvent[]>([]);
  const [workspaceTimezone] = useState(() => getWorkspaceTimezone());

  useEffect(() => {
    console.time("generate events");

    const events = mockEventFetcher();
    console.log("mockEventFetcher returned", events.length);

    setEventData(events);

    console.timeEnd("generate events");
  }, []);

  const eventStore = useProcessedEvents(eventData);

  console.log("page component rendered");
  console.log(eventStore);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <VisualizationData
        eventStore={eventStore}
        workspaceTimezone={workspaceTimezone}
      />
    </DashboardLayout>
  );
}
