import type {NextPage} from 'next';
import {Nav} from '../components/navbar/navbar';
import {Layout} from '../components/navbar/layout';
import {Box} from '../components/styles/box';
import {Footer} from '../components/footer';
import {Flex} from "../components/styles/flex";
import {Button, Divider, Image, Text, useTheme} from "@nextui-org/react";
import React from "react";
import {PageTag} from "../components/meta/pageTag";
import {ArticleCard} from "../components/article/card";
import {useTheme as useNextTheme} from "next-themes";
import {Event, Calendar} from "../components/calendar/calendar";
import {CalendarDateTime} from "@internationalized/date";
import {userStore} from "../components/safeLocalStorage/safeLocalStorage";

import {addTimeSlot, findStudySlots, getAccountInformation} from "../components/backendConnect/backendConnect"

const homeImage = "/images/darkModeLogo.png";

function getFullWeeksBetween(d1, d2) {
    const msPerWeek = 7 * 24 * 60 * 60 * 1000; // Number of milliseconds in a week
    const differenceInMs = Math.abs(d2 - d1); // Difference in milliseconds
    return Math.floor(differenceInMs / msPerWeek); // Divide by milliseconds per week and floor for full weeks
}

const Home: NextPage = () => {
    const {setTheme} = useNextTheme();
    const {isDark, type} = useTheme();

    const currentUserID = userStore((state: any) => state.userID);
    const setUserID = userStore((state: any) => state.setUserID);

    const [events, setEvents] = React.useState<Event[]>([
        {
            id: 0,
            title: "Test Event",
            start: new Date(),
            end: new Date(),
            isStudy: false,
        }
    ]);

    const [studyGroups, setStudyGroups] = React.useState<any[]>([]);
    let studyGroupCards: any[] = [];

    const studyGroupFinderHandler = () => {
        // Split events into (weekID, startMinute, endMinute) tuples
        let result: { userID: number, weekID: number, start: number, end: number }[] = [];
        const timeOrigin = new Date(2023, 9, 5);
        for (let event of events) {
            const weekID = getFullWeeksBetween(timeOrigin, event.start);
            const startMinute = event.start.getDay() * 24 * 60 + event.start.getHours() * 60 + event.start.getMinutes();
            const endMinute = event.end.getDay() * 24 * 60 + event.end.getHours() * 60 + event.end.getMinutes();
            result.push({userID: currentUserID, weekID: weekID, start: startMinute, end: endMinute});
        }

        console.log("Events:", result);

        // Push times to backend
        for (let event of result) {
            addTimeSlot(event).then((response) => {
                console.log("Add Time Slot:", response);

                if (event === result[result.length - 1]) {
                    // Find study groups
                    // getAccountInformation(currentUserID).then((ret) => {
                    // const subject = ret["subject"];
                    const subject = "Computer Science";
                    findStudySlots(currentUserID, subject).then((response) => {
                        console.log("Find Study Slots:", response);
                        setStudyGroups(response);

                        response.forEach(([username, times]) => {
                            studyGroupCards.push(
                                <ArticleCard
                                    key={username}
                                    width={300}
                                    height={450}
                                    title={username}
                                    description={"Test Description but it's really long to test how the card wraps text and to see whether the little grey box expands to fit the description"}
                                    tags={[
                                        "LibRapid",
                                        "High Performance Computing",
                                    ]
                                    }
                                    image={"/images/neuralNetworkInterpretation.jpg"}
                                    link={"https://google.com"}
                                />
                            );
                        });
                    });
                    // });
                }
            });
        }
    }

    return (
        <Layout>
            <PageTag pageTitle={"Infinite Study"}
                     contentTitle={"Infinite Study"}
                     description={"A place to connect and study with other students, working around your timetable."}
                     url={"https://github.com/InfiniteStudy/InfiniteStudyFrontend"}
                     image={homeImage}
            />

            <Nav/>
            <Box as="main">
                <Flex
                    css={{
                        "gap": "$3",
                        "px": "$6",
                        "pl": "$12",
                        "pr": "$12",
                        "flexDirection": "column",
                        "alignContent": "center",
                        "justifyContent": "center",
                        "alignItems": "center",
                        "width": "100%",
                        "@sm": {
                            flexDirection: "row",
                            mt: "$20",
                        },
                    }}
                    justify={"center"}
                >
                    <Box
                        css={{
                            pt: '$13',

                            display: 'flex',
                            flexDirection: 'column',
                            gap: '$5',
                        }}
                    >
                        <Box
                            css={{
                                maxWidth: "600px",
                            }}
                        >
                            <Text
                                h1
                                css={{
                                    display: "inline",
                                }}
                            >
                                {"Infinite Study. The best place to "}
                            </Text>
                            <Text
                                h1
                                css={{
                                    display: 'inline',
                                }}
                                color="primary"
                            >
                                {"connect with students"}
                            </Text>
                            <Text
                                h1
                                css={{
                                    display: 'inline',
                                }}
                            >
                                {" and "}
                            </Text>
                            <Text
                                h1
                                css={{
                                    display: 'inline',
                                }}
                                color="primary"
                            >
                                {"work around your timetable"}
                            </Text>
                            <Text
                                h1
                                css={{
                                    display: 'inline',
                                }}
                            >
                                {"."}
                            </Text>
                        </Box>

                        <Text
                            css={{
                                color: '$accents8',
                                maxWidth: '400px',
                            }}
                            size={'$lg'}
                            span
                        >
                            {"Connect with students and find the best time to study with people on your course, or find " +
                                "a study group to motivate you to work effectively."}
                        </Text>
                    </Box>
                    <Box>
                        <Image width={450} src={isDark ? "/images/darkModeLogo.png" : "/images/lightModeLogo.png"}/>
                    </Box>
                </Flex>

                <Flex
                    direction={"column"}
                    align={"center"}
                    justify={"center"}
                    css={{
                        gap: "$10",
                        pt: "$20",
                        pl: "$12",
                        pr: "$12",
                    }}
                >
                    <Box css={{
                        pt: '$10',
                        pb: '$10',
                        pl: '$15',
                        pr: '$15',
                    }}>
                        <Calendar events={events} setEvents={setEvents}/>
                    </Box>

                    <Button color={"success"} ghost onPress={studyGroupFinderHandler}>
                        Find Someone to Study With
                    </Button>

                    <Flex
                        direction={"row"}
                        align={"center"}
                        justify={"center"}
                        wrap={"wrap"}
                        css={{
                            gap: "$10",
                            mw: "1500px"
                        }}>


                    </Flex>
                </Flex>

                {
                    studyGroupCards.map((card) => (
                        card
                    ))
                }

                <Divider
                    css={{position: 'absolute', inset: '0p', left: '0', mt: '$10'}}
                />
                <Footer/>
            </Box>
        </Layout>
    );
};

export default Home;
