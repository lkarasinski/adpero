import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../utils/theme";
import Navbar from "../../Organisms/Navbar";
import SidePanel from "../../Organisms/SidePanel";

interface Props {
    photoURL: string | null;
}

interface IContent {
    leftMargin: boolean;
}

const Main = styled.div`
    display: flex;
    flex-direction: row;
`;
const Content = styled.div<IContent>`
    z-index: 10;
    width: 100%;
    min-height: 100vh;
    padding-left: 2rem;
    margin-left: ${({ leftMargin }) => (leftMargin ? "14.3125rem" : "0rem")};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.shadow};
`;

const Layout: React.FC<Props> = ({ children }) => {
    const [width, setWidth] = useState<number>(0);
    const [showContent, setShowContent] = useState(false);
    const handleWidthChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        handleWidthChange();
        window.addEventListener("resize", handleWidthChange);
        setShowContent(true);
        return window.removeEventListener("resize", handleWidthChange);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Main>
                {width > 820 && <SidePanel />}

                <Content leftMargin={width > 820}>
                    {showContent && children}
                </Content>
            </Main>
        </ThemeProvider>
    );
};

export default Layout;
