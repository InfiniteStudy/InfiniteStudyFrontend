import {Image} from "@nextui-org/react";
import React from "react";
import {useTheme} from '@nextui-org/react';

interface LogoProps {
    isDark?: boolean;
    size?: number;
    width?: number;
    height?: number;
}

export const Logo = (props: LogoProps = {}) => {
    const {isDark} = useTheme();
    let source = "";

    if (props.isDark || isDark) {
        source = "/images/darkModeLogo.png";
    } else {
        source = "/images/lightModeLogo.png";
    }

    return (
        <Image
            src={source}
            width={(props.size ?? props.width) ?? 50} height={(props.size ?? props.height) ?? 50} alt={"Toby Davis"}/>
    )
};
