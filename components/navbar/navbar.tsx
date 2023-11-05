import {Button, Dropdown, Link, Navbar, Switch, Text, Image, Modal, Input, Row, Checkbox} from "@nextui-org/react";
import React from "react";
import {useRouter} from "next/router";
import {useState} from "react";
import {ModalLogin} from "../modal";
import {icons} from "../icons/icons";
import {Logo} from "../icons/logo";
import {useTheme as useNextTheme} from "next-themes";
import {useTheme} from "@nextui-org/react";
import LoginModal, {Mail, Password} from "../login/loginModal";
import {Flex} from "../styles/flex";
import {userStore} from "../safeLocalStorage/safeLocalStorage";
import {getAccountInformation, setAccountInformation} from "../backendConnect/backendConnect";

interface DropdownElement {
    key: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    link?: string;
}

const socials = [
    {
        key: "github",
        title: "GitHub",
        description: "My GitHub profile with all my projects and source code.",
        icon: icons.github,
        link: "https://github.com/Pencilcaseman/"
    },
    {
        key: "discord",
        title: "Discord",
        description: "The LibRapid Discord server, where you can talk about anything programming related.",
        icon: icons.discord,
        link: "https://discord.gg/cGxTFTgCAC"
    },
    {
        key: "devto",
        title: "Dev.to",
        description: "My Dev.to profile with some articles and tutorials.",
        icon: icons.devTo,
        link: "https://dev.to/pencilcaseman/"
    },
    {
        key: "linkedin",
        title: "LinkedIn",
        description: "My LinkedIn profile with my work experience and education.",
        icon: icons.linkedIn,
        link: "https://uk.linkedin.com/in/toby-davis-codes/"
    },
    {
        key: "stackoverflow",
        title: "Stack Overflow",
        description: "My Stack Overflow profile with my questions and answers.",
        icon: icons.stackOverflow,
        link: "https://stackoverflow.com/users/11564403/pencilcaseman"
    },
    {
        key: "midjourney",
        title: "Midjourney",
        description: "My Midjourney profile with AI-generated images, some of which are used on this website.",
        icon: icons.midjourney,
        link: "https://www.midjourney.com/app/users/84b4ba6f-22f0-4339-9812-dd1382ef4d9b/"
    }
]

const tutorials: DropdownElement[] = [
    {
        key: "mlincpp",
        title: "Exploring Machine Learning in C++",
        description: "Learn about machine learning and how to implement it in C++.",
        icon: icons.machineLearning,
        link: "https://github.com/Pencilcaseman/"
    },
];

interface NavbarDropdownMenuProps {
    label: string;
    elements: DropdownElement[];
}

function NavbarDropdownMenu(props: NavbarDropdownMenuProps) {
    let router = useRouter();
    const [selectedKey, setSelectedKey] = useState();

    return (
        <Dropdown isBordered>
            <Navbar.Item>
                <Dropdown.Button
                    auto
                    light
                    css={{
                        px: 0,
                        dflex: "center",
                        svg: {pe: "none"},
                    }}
                    iconRight={icons.chevron}
                    ripple={false}
                >
                    {props.label}
                </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
                aria-label={props.label}
                css={{
                    "$$dropdownMenuWidth": "340px",
                    "$$dropdownItemHeight": "70px",
                    "& .nextui-dropdown-item": {
                        "py": "$4",
                        "svg": {
                            color: "$secondary",
                            mr: "$4",
                        },
                        "& .nextui-dropdown-item-content": {
                            w: "100%",
                            fontWeight: "$semibold",
                        },
                    },
                }}
                onAction={(item) => {
                    props.elements.forEach((element) => {
                        if (element.key == item) {
                            if (element.link) {
                                if (element.link.startsWith("http")) {
                                    window.open(element.link, "_blank");
                                } else {
                                    router.push(element.link).catch((err) => {
                                        console.log(err);
                                    });
                                }
                            }
                        }
                    })
                }}
            >
                {props.elements.map((element) => (
                    <Dropdown.Item
                        key={element.key}
                        showFullDescription
                        description={element.description}
                        icon={element.icon}
                    >
                        {element.title}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

function NavbarCollapseMenu(props: NavbarDropdownMenuProps) {
    return (
        <>
            <Navbar.CollapseItem style={{
                paddingTop: "3pt",
                paddingBottom: "0"
            }}>
                <Text
                    color="$primary"
                    css={{
                        fontWeight: "$semibold",
                        fontSize: "18pt",
                    }}
                >
                    {props.label}
                </Text>
            </Navbar.CollapseItem>

            {props.elements.map((element) => (
                <Navbar.CollapseItem key={element.title} style={{
                    paddingTop: "2px",
                    paddingBottom: "3pt",
                }}>
                    <Link
                        color="inherit"
                        css={{
                            minWidth: "100%",
                        }}
                        href={element.link}
                    >
                        {"--> " + element.title}
                    </Link>
                </Navbar.CollapseItem>
            ))}

        </>
    )
}

const AccountModal = () => {
    const [visible, setVisible] = useState(false);
    const currentUserID = userStore((state: any) => state.userID);
    const setUserID = userStore((state: any) => state.setUserID);

    const [username, setUsername] = useState("");
    const [universityName, setUniversityName] = useState("");
    const [subject, setSubject] = useState("");

    const handler = () => {
        console.log("Current User ID:", currentUserID);
        if (currentUserID !== null) {
            getAccountInformation(currentUserID).then((ret) => {
                setUsername(ret["username"]);
                setUniversityName(ret["university_name"]);
                setSubject(ret["subject"]);
            });
        }

        setVisible(true);
    }

    const closeHandler = () => {
        setVisible(false);
    }

    const saveHandler = () => {
        setAccountInformation(currentUserID, username, universityName, subject).then((ret) => {
            console.log(ret);
        });
        closeHandler();
    }

    return (
        <div>
            {currentUserID ? <Button auto ghost color="success" onPress={handler} css={{
                height: "45px",
            }}>
                Account
            </Button> : null}

            <Modal
                width={"50%"}
                blur
                closeButton
                animated={true}
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
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
                            Infinite Study:
                            <Text b size={18}>
                                {" Edit Account"}
                            </Text>
                        </Text>
                    </Flex>
                </Modal.Header>
                <Modal.Body aria-label={"modal-body"}>
                    <Flex direction={"row"} css={{
                        gap: "$3",
                        alignItems: "center"
                    }}>
                        <Text b size={18} css={{
                            width: "150px",
                        }}>
                            Username:
                        </Text>
                        <Input
                            aria-label={"modal-email-input"}
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            initialValue={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </Flex>

                    <Flex direction={"row"} css={{
                        gap: "$3",
                        alignItems: "center"
                    }}>
                        <Text b size={18} css={{
                            width: "150px",
                        }}>
                            University:
                        </Text>
                        <Input
                            aria-label={"modal-email-input"}
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            initialValue={universityName}
                            onChange={(e) => {
                                setUniversityName(e.target.value);
                            }}
                        />
                    </Flex>

                    <Flex direction={"row"} css={{
                        gap: "$3",
                        alignItems: "center"
                    }}>
                        <Text b size={18} css={{
                            width: "150px",
                        }}>
                            Subject:
                        </Text>
                        <Input
                            aria-label={"modal-email-input"}
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            initialValue={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                            }}
                        />
                    </Flex>
                </Modal.Body>
                <Modal.Footer justify={"space-between"}>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>

                    <Button auto flat color="success" onPress={saveHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export const Nav = () => {
    const {setTheme} = useNextTheme();
    const {isDark, type} = useTheme();

    return (
        <Navbar
            isBordered
            css={{
                "overflow": "hidden",
                "& .nextui-navbar-container": {
                    background: "$background",
                    borderBottom: "none",
                },
            }}
        >
            <Navbar.Brand>
                <Navbar.Toggle aria-label="toggle navigation" showIn="xs"/>
                <Link href={"/"} css={{
                    color: "inherit",
                }}>
                    <Logo/>
                    <Text b color="inherit" hideIn="xs" css={{
                        pl: "$8"
                    }}>
                        Infinite Study
                    </Text>
                </Link>

                <Navbar.Content
                    hideIn="xs"
                    css={{
                        pl: "6rem",
                    }}
                >
                </Navbar.Content>
            </Navbar.Brand>

            <Navbar.Collapse transitionTime={0} showIn={"xs"} style={{overflow: "auto", maxHeight: "85vh"}}>
                <Navbar.CollapseItem>
                    <Switch
                        checked={isDark}
                        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                    />
                </Navbar.CollapseItem>

                <NavbarCollapseMenu label={"Socials"} elements={socials}/>
            </Navbar.Collapse>

            <Navbar.Content>
                <Navbar.Item hideIn={"xs"}>
                    <Switch
                        checked={isDark}
                        onChange={(e) =>
                            setTheme(e.target.checked ? "dark" : "light")
                        }
                    />
                </Navbar.Item>

                <Navbar.Item hideIn={"xs"}>
                    <AccountModal/>
                </Navbar.Item>

                <Navbar.Item hideIn={"xs"}>
                    <LoginModal/>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    );
};