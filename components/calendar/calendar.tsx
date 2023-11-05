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
import {Button, Checkbox, Input, Modal, Row, Switch, Text, Textarea} from "@nextui-org/react";
import {Flex} from "../styles/flex";
import {Mail, Password} from "../login/loginModal";

const DragDropCalendar = withDragAndDrop(BigCalendar);

interface CalendarProps {
    name?: string;
    events?: any;
}

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export const Calendar = (props: CalendarProps = {}) => {
    const [myEvents, setMyEvents] = useState(props.events);
    const [visible, setVisible] = useState(false);
    const [event, setEvent] = useState({
        title: "",
        start: new Date(),
        end: new Date(),
        isStudy: false
    });
    const [editingEventIndex, setEditingEventIndex] = useState(null);

    const closeHandler = () => {
        setVisible(false);
    }

    const eventEditHandler = (eventToEdit: any) => {
        const index = myEvents.findIndex((e: { id: any; }) => e.id === eventToEdit.id);
        setEditingEventIndex(index);
        setVisible(true);
    }

    const titleChangeHandler = (event: any) => {
        myEvents[editingEventIndex ?? 0]["title"] = event.target.value;
    }

    return (
        <div>
            <Client>
                <DragDropCalendar
                    selectable
                    resizable
                    localizer={localizer}
                    events={myEvents}
                    views={[Views.DAY, Views.WEEK, Views.MONTH]}
                    defaultView={Views.WEEK}
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

                    eventPropGetter={useCallback(
                        (event) => ({
                            ...(event.isDraggable
                                ? {className: 'isDraggable'}
                                : {className: 'nonDraggable'}),
                        }),
                        []
                    )}

                    onSelectSlot={useCallback(
                        (event) => {
                            setMyEvents((prev) => {
                                const idList = prev.map((item) => item.id)
                                const newId = Math.max(...idList) + 1
                                return [...prev, {...event, id: newId}]
                            });
                        },
                        [setMyEvents]
                    )}

                    onDoubleClickEvent={(event) => {
                        console.log("Event double clicked", event);

                        // Show modal to edit event
                        eventEditHandler(event);
                    }}
                />
            </Client>
            <Server>
                Loading...
            </Server>

            <Modal
                blur
                scroll
                closeButton
                animated={true}
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                width="60%"
            >
                <Modal.Header
                    aria-label="modal-header"
                >
                    <Flex direction={"column"} css={{
                        gap: "$3",
                        alignItems: "center",
                    }}
                          aria-label="modal-header-flex"
                    >
                        <Text aria-label={"modal-title-text"} id="modal-title" size={18}>
                            <Text b size={18}>
                                Infinite Study:
                            </Text>
                            {" Edit Event"}
                        </Text>
                    </Flex>
                </Modal.Header>
                <Modal.Body aria-label={"modal-body"}>
                    <Flex direction={"row"} css={{
                        gap: "$3",
                        alignItems: "center",
                    }}>
                        <Text b size={18}>
                            Title:
                        </Text>
                        <Input clearable bordered initialValue={myEvents[editingEventIndex || 0]["title"] ?? ""}
                               onChange={titleChangeHandler}/>
                    </Flex>
                </Modal.Body>
                <Modal.Footer justify={"space-between"}>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
