import React from "react";
import styled from "styled-components";

interface Props {
    primary?: boolean;
    onClick?: () => void;
    isBig?: boolean;
    isContracted?: boolean;
}

interface ButtonProps {
    isBig?: boolean;
    primary?: boolean;
    isContracted?: boolean;
}

const Wrapper = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    padding: 1.15em 2em;
    margin: auto auto 0;
    min-width: ${({ isContracted }) => (isContracted ? "2.75rem" : "10rem")};
    font-size: ${({ isBig }) => (isBig ? "1.5rem" : "0.875rem")};
    font-weight: 900;
    color: #ffffff;
    cursor: pointer;
    background-color: ${({ primary }) => (primary ? "#3D5EFF" : "#313131")};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
`;

const Button: React.FC<Props> = ({ children, ...props }) => {
    return <Wrapper {...props}>{children}</Wrapper>;
};

export default Button;