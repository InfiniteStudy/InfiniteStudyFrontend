import React from "react";
import {Modal, Button, Text, Input, Row, Checkbox, Switch} from "@nextui-org/react";
import {Box} from "../styles/box";
import {Flex} from "../styles/flex";

import {signUp, logIn} from "../backendConnect/backendConnect";

export const Password = ({fill, size = undefined, height = undefined, width = undefined, ...props}) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill={fill}>
                <path
                    d="M18.75 8v2.1a12.984 12.984 0 00-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2a12.984 12.984 0 00-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8z"/>
                <path
                    d="M18.75 10.1a12.984 12.984 0 00-1.5-.1H6.75a12.984 12.984 0 00-1.5.1C2.7 10.41 2 11.66 2 15v2c0 4 1 5 5 5h10c4 0 5-1 5-5v-2c0-3.34-.7-4.59-3.25-4.9zM8.71 16.71A1.052 1.052 0 018 17a1 1 0 01-.38-.08 1.032 1.032 0 01-.33-.21A1.052 1.052 0 017 16a1 1 0 01.08-.38 1.155 1.155 0 01.21-.33 1.032 1.032 0 01.33-.21 1 1 0 011.09.21 1.155 1.155 0 01.21.33A1 1 0 019 16a1.052 1.052 0 01-.29.71zm4.21-.33a1.155 1.155 0 01-.21.33A1.052 1.052 0 0112 17a1.033 1.033 0 01-.71-.29 1.155 1.155 0 01-.21-.33A1 1 0 0111 16a1.033 1.033 0 01.29-.71 1.047 1.047 0 011.42 0A1.033 1.033 0 0113 16a1 1 0 01-.08.38zm3.79.33a1.014 1.014 0 01-1.42 0 1.014 1.014 0 010-1.42 1.047 1.047 0 011.42 0c.04.05.08.1.12.16a.556.556 0 01.09.17.636.636 0 01.06.18 1.5 1.5 0 01.02.2 1.052 1.052 0 01-.29.71z"/>
            </g>
        </svg>
    );
}

export const Mail = ({fill, size = undefined, height = undefined, width = undefined, ...props}) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            {...props}
        >
            <g
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3"/>
                <path
                    d="M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22"/>
            </g>
        </svg>
    );
};

export default function LoginModal() {
    const [visible, setVisible] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const tmpLocalStorage = typeof window !== "undefined" ? localStorage : null;

    const handler = () => {
        setVisible(true);
    }

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const closeHandler = () => {
        setVisible(false);
    };

    const loginHandler = async (username, password, confirmPassword) => {
        console.log("Username: " + username, "Password: " + password, "Confirm Password: " + confirmPassword);
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }

        if (isLogin) {
            // login
            const userInfo = logIn(email, password).then((res) => {
                console.log(res);
                if (res["login"]) {
                    // Successful sign up
                    console.log("Successful login")
                    setError(false);

                    // Set user ID in local storage
                    if (tmpLocalStorage) {
                        tmpLocalStorage.setItem("userID", res["user_id"]);
                    }

                    closeHandler();
                } else {
                    // Unsuccessful sign up
                    setError(true);
                    setErrorMessage(res["message"]);

                    // Wait 3 seconds before clearing error
                    setTimeout(() => {
                        setError(false);
                        setErrorMessage("");
                    }, 2000);
                }
            });
        } else {
            // sign up
            const userInfo = signUp(email, password, confirmPassword).then((res) => {
                console.log(res);
                if (res["signup"]) {
                    // Successful sign up
                    console.log("Successful sign up")
                    setError(false);

                    // Set user ID in local storage
                    if (tmpLocalStorage) {
                        tmpLocalStorage.setItem("userID", res["user_id"]);
                    }

                    closeHandler();
                } else {
                    // Unsuccessful sign up
                    setError(true);
                    setErrorMessage(res["message"]);

                    // Wait 3 seconds before clearing error
                    setTimeout(() => {
                        setError(false);
                        setErrorMessage("");
                    }, 2000);
                }
            });
        }
    }

    const logOutHandler = () => {
        // Clear user ID in local storage
        if (tmpLocalStorage) {
            tmpLocalStorage.removeItem("userID");
        }

        // Refresh page
        window.location.reload();
    }

    const signupButton = () => {
        if (error) {
            return (
                <Text>
                    {errorMessage}
                </Text>
            );
        } else {
            return (
                <Text>
                    {isLogin ? "Log In" : "Sign Up"}
                </Text>);
        }
    }

    if (tmpLocalStorage && tmpLocalStorage["userID"]) {
        return (
            <Button auto ghost color="success" onPress={logOutHandler}>
                Log Out
            </Button>
        )
    } else {
        return (
            <div>
                <Button auto ghost color="success" onPress={handler}>
                    Login / Sign Up
                </Button>

                <Modal
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
                                Welcome to{" "}
                                <Text b size={18}>
                                    Infinite Study
                                </Text>
                            </Text>

                            <Flex aria-label={"modal-content-flex"} direction={"row"} css={{
                                gap: "$3",
                                alignItems: "center",
                            }}>
                                <Text aria-label={"modal-signup"} b size={14} css={{pt: "$2"}}
                                      color={isLogin ? "normal" : "success"}>Sign Up</Text>
                                <Switch aria-label={"modal-signup-toggle"} size="md" color="success" initialChecked
                                        onChange={(event) => {
                                            setIsLogin(event.target.checked);
                                        }}/>
                                <Text aria-label={"modal-login"} b size={14} css={{pt: "$2"}}
                                      color={isLogin ? "success" : "normal"}>Log In</Text>
                            </Flex>
                        </Flex>
                    </Modal.Header>
                    <Modal.Body aria-label={"modal-body"}>
                        <Input
                            aria-label={"modal-email-input"}
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Email"
                            contentLeft={<Mail fill="currentColor"/>}
                            onChange={emailHandler}
                        />
                        <Input
                            aria-label={"modal-password-input"}
                            type={"password"}
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Password"
                            contentLeft={<Password fill="currentColor"/>}
                            onChange={passwordHandler}
                        />
                        {
                            !isLogin &&
                            <Input
                                aria-label={"modal-confirm-password-input"}
                                type={"password"}
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                placeholder="Confirm Password"
                                contentLeft={<Password fill="currentColor"/>}
                                onChange={confirmPasswordHandler}
                            />
                        }
                        <Row justify="space-between">
                            <Checkbox>
                                <Text size={14}>Remember me</Text>
                            </Checkbox>
                            <Text size={14}>Forgot password?</Text>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer justify={"space-between"}>
                        <Button auto flat color="error" onPress={closeHandler}>
                            Close
                        </Button>
                        <Button auto
                                color={error ? "error" : "success"}
                                onPress={() => {
                                    loginHandler(email, password, confirmPassword).then(() => {
                                        // closeHandler();
                                        console.log("Login");
                                    });
                                }}>
                            {signupButton()}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
