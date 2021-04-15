import React from "react";

interface ButtonProps {
    children: string;
}

const Button = ({ children }: ButtonProps) => {
    return (
        <button
            type="button"

            // __css={{
            //     appearance: "none",
            //     display: props.hidden ? undefined : "inline-flex",
            //     alignItems: "center",
            //     lineHeight: "inherit",
            //     textDecoration: "none",
            //     border: "1px solid",
            //     fontSize: "inherit",
            //     fontFamily: "ui",
            // }}
        >
            {children}
        </button>
    );
};

export { Button };
