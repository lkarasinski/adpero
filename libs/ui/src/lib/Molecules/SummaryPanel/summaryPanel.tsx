import React from "react";
import styled from "styled-components";
import Label from "../../Atoms/Label/label";
import Text from "../../Atoms/Text/text";
import Card from "../../Atoms/Card/card";
import { format } from "date-fns";
import { dashboardTheme } from "@adpero/themes";
import { mobileScreenSize } from "@adpero/constants";

export type SummaryPanelProps = {
    numberOfUsers: number;
    startDate: Date;
    endDate: Date;
    totalCost: {
        value: number;
        currency: string;
    };
};

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
    numberOfUsers,
    totalCost,
    startDate,
    endDate,
}) => {
    return (
        <Wrapper>
            <Label color={dashboardTheme.colors.primary.regular}>Summary</Label>
            <Grid>
                <DetailContainer>
                    <Text color={dashboardTheme.colors.gray.light}>Cost: </Text>
                    <Text>
                        {totalCost.value} {totalCost.currency}
                    </Text>
                </DetailContainer>
                <DetailContainer>
                    <Text color={dashboardTheme.colors.gray.light}>
                        Participants:{" "}
                    </Text>
                    <Text>{numberOfUsers}</Text>
                </DetailContainer>
                <DetailContainer>
                    <Text color={dashboardTheme.colors.gray.light}>
                        Departure date:{" "}
                    </Text>
                    <Text>{format(new Date(startDate), "dd/MM/yyyy")}</Text>
                </DetailContainer>
                <DetailContainer>
                    <Text color={dashboardTheme.colors.gray.light}>
                        Day of return:{" "}
                    </Text>
                    <Text>{format(new Date(endDate), "dd/MM/yyyy")}</Text>
                </DetailContainer>
            </Grid>
        </Wrapper>
    );
};

const Wrapper = styled(Card)`
    margin-top: 0;
    max-width: 21rem;
    background-color: ${({ theme }) => theme.colors.background};

    @media (max-width: ${mobileScreenSize}px) {
        margin-top: 2rem;
        max-width: 100%;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 0.5rem;
`;

const DetailContainer = styled.div`
    display: grid;
    gap: 3px;
`;

export default SummaryPanel;
