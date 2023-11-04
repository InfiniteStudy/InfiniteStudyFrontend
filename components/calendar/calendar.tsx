import {
    Calendar as BigCalendar,
    momentLocalizer,
    Views
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import React, {useCallback, useMemo, useState} from "react";
import {HydrationProvider, Server, Client} from "react-hydration-provider";

interface CalendarProps {
    name?: string;
    events?: any;
}

moment.locale("en-GB");
const localizer = momentLocalizer(moment);


const events = [
    {
        id: 0,
        title: "Board meeting",
        start: new Date(2018, 0, 29, 9, 0, 0),
        end: new Date(2018, 0, 29, 13, 0, 0),
        resourceId: 1
    },
    {
        id: 1,
        title: "MS training",
        allDay: true,
        start: new Date(2018, 0, 29, 14, 0, 0),
        end: new Date(2018, 0, 29, 16, 30, 0),
        resourceId: 2
    },
    {
        id: 2,
        title: "Team lead meeting",
        start: new Date(2018, 0, 29, 8, 30, 0),
        end: new Date(2018, 0, 29, 12, 30, 0),
        resourceId: 3
    },
    {
        id: 11,
        title: "Birthday Party",
        start: new Date(2018, 0, 30, 7, 0, 0),
        end: new Date(2018, 0, 30, 10, 30, 0),
        resourceId: 4
    }
];

export const Calendar = (props: CalendarProps = {}) => {
    const [myEvents, setMyEvents] = useState(props.events)

    const DragDropCalendar = withDragAndDrop(BigCalendar)

    return (
        <div>
            <Client>
                <DragDropCalendar
                    selectable
                    localizer={localizer}
                    events={myEvents}
                    defaultView={Views.WEEK}
                    views={[Views.DAY, Views.WEEK, Views.MONTH]}
                    step={60}
                    defaultDate={new Date(2018, 0, 29)}

                    onEventDrop={useCallback(
                        ({event, start, end}) => {
                            setMyEvents((prev) => {
                                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                                const filtered = prev.filter((ev) => ev.id !== event.id)
                                return [...filtered, {...existing, start, end}]
                            })
                        },
                        [setMyEvents]
                    )}

                    onEventResize={useCallback(
                        ({event, start, end}) => {
                            setMyEvents((prev) => {
                                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                                const filtered = prev.filter((ev) => ev.id !== event.id)
                                return [...filtered, {...existing, start, end}]
                            })
                        },
                        [setMyEvents]
                    )}

                    onDragStart={({event}) => {
                        console.log("Event drag started", event);
                    }}
                />
            </Client>
            <Server>
                Loading...
            </Server>
        </div>
    )
}
