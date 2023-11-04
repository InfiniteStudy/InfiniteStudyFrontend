import type {NextPage} from 'next';
import {Nav} from '../components/navbar/navbar';
import {Layout} from '../components/navbar/layout';
import {Box} from '../components/styles/box';
import {Footer} from '../components/footer';
import {Flex} from "../components/styles/flex";
import {Divider, Image, Text, useTheme} from "@nextui-org/react";
import React from "react";
import {PageTag} from "../components/meta/pageTag";
import {ArticleCard} from "../components/article/card";
import {useTheme as useNextTheme} from "next-themes";

const homeImage = "/images/darkModeLogo.png";

const Home: NextPage = () => {
    const {setTheme} = useNextTheme();
    const {isDark, type} = useTheme();

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

                    <Flex
                        direction={"row"}
                        align={"center"}
                        justify={"center"}
                        wrap={"wrap"}
                        css={{
                            gap: "$10",
                            mw: "1500px"
                        }}
                    >

                        {
                            [
                                "Title 1",
                                "Title 2",
                                "Title 3",
                                "Title 4"
                            ].map((title) => (
                                <ArticleCard
                                    key={title}
                                    width={300}
                                    height={450}
                                    title={title}
                                    description={"Test Description but it's really long to test how the card wraps text and to see whether the little grey box expands to fit the description"}
                                    tags={[
                                        "LibRapid",
                                        "High Performance Computing",
                                    ]
                                    }
                                    image={"/images/neuralNetworkInterpretation.jpg"}
                                    link={"https://google.com"}
                                />
                            ))
                        }

                    </Flex>
                </Flex>
                <Divider
                    css={{position: 'absolute', inset: '0p', left: '0', mt: '$10'}}
                />
                <Footer/>
            </Box>
        </Layout>
    );
};

export default Home;
