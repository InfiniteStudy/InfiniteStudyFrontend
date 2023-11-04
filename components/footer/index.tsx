import {Divider, Link, Text} from "@nextui-org/react";
import React from "react";
import {Logo} from "../icons/logo";
import {Box} from "../styles/box";
import {Flex} from "../styles/flex";
import {icons} from "../icons/icons";

interface FooterItem {
    key: string;
    title: string;
    link: string;
}

function footerList(title: string, items: FooterItem[]) {
    return (
        <Flex
            direction={"column"}
            css={{
                "gap": "$4",
            }}>

            <Text
                css={{
                    "color": "$primary",
                    "fontWeight": "$semibold",
                    "fontSize": "18pt",
                }}
            >
                {title}
            </Text>
            {
                items.map((item) => (
                    <Link
                        key={item.key}
                        href={item.link}
                        css={{
                            "color": "$accents8",
                            "&:hover": {
                                color: "$accents9",
                            },
                        }}
                    >
                        {item.title}
                    </Link>
                ))
            }
        </Flex>
    )
}

export const Footer = () => {
    return (
        <Flex
            css={{
                py: "$20",
                px: "$6",
            }}
        >
            <Box as={"footer"} css={{width: "100%"}}>
                <Flex
                    direction={"row"}
                    justify={"center"}
                    align={"center"}
                    wrap={"wrap"}
                    css={{
                        "gap": "$40",
                        "pt": "$2",
                        "pb": "$10"
                    }}
                >
                    {footerList("Links", [
                        {
                            key: "githubHome",
                            title: "GitHub Home",
                            link: "https://github.com/InfiniteStudy"
                        }
                    ])
                    }

                    {footerList("Contact", [
                        {
                            key: "email",
                            title: "Email",
                            link: "mailto:pencilcaseman@gmail.com"
                        }
                    ])
                    }
                </Flex>
                <Box
                    css={{
                        "px": "$10",
                        "@md": {
                            px: "$56",
                        },
                    }}
                >
                    <Divider
                        css={{
                            mt: "$14",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    />
                    <Flex
                        //   justify={"between"}
                        align={"center"}
                        wrap={"wrap"}
                        css={{
                            "pt": "$8",
                            "gap": "$10",
                            "justifyContent": "center",
                            "@md": {
                                justifyContent: "space-between",
                            },
                        }}
                    >
                        <Flex
                            css={{
                                gap: "$10",
                            }}
                            wrap={"wrap"}
                        >
                            <Logo/>
                        </Flex>
                        <Flex
                            css={{
                                gap: "$6",
                            }}
                        >
                            <Text span css={{color: "$accents8"}}>
                                © Copyright {new Date().getFullYear().toString()} InfiniteStudy Team.
                            </Text>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
        ;
};
