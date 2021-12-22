import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { IJourneyCard } from "utils/types";
import { Expense } from "utils/interfaces";

const journeysRef = firebase.firestore().collection("journeys");

const useDashboardData = (email: string | null) => {
    const dataQuery = journeysRef.where("users", "array-contains", email);
    const [collectionData, loading] = useCollection(dataQuery);
    const [data, setData] = useState<IJourneyCard[]>();

    useEffect(() => {
        const databaseDashboardData = JSON.parse(
            localStorage.getItem("dashboardData") ?? "[]"
        );
        const offlineDashboardData = JSON.parse(
            localStorage.getItem("offlineDashboardData") ?? "[]"
        );
        const offlineJourneysData = JSON.parse(
            localStorage.getItem("offlineJourneysData") ?? "[]"
        );
        const dashboardData = [
            ...databaseDashboardData,
            ...offlineDashboardData,
        ];
        setData(dashboardData);
        if (!email) {
            const newData = [];
            for (const journey in offlineJourneysData) {
                newData.push(offlineJourneysData[journey]);
            }
            const updatedDashboardData = newData.map((data: any) => ({
                label: data.name,
                details: data.expenses.map((expense: Expense) => expense.title),
                id: data.id,
            }));
            setData(updatedDashboardData);
            localStorage.setItem(
                "offlineDashboardData",
                JSON.stringify(updatedDashboardData)
            );
        }
    }, []);

    useEffect(() => {
        if (email) {
            if (collectionData) {
                const journeyData = collectionData.docs.map((data) => ({
                    label: data.data().name,
                    details: data
                        .data()
                        .expenses.map((expense: Expense) => expense.title),
                    id: data.ref.id,
                }));
                const offlineDashboardData = JSON.parse(
                    localStorage.getItem("offlineDashboardData") ?? "[]"
                );
                setData([...journeyData, ...offlineDashboardData]);
                localStorage.setItem(
                    "dashboardData",
                    JSON.stringify(journeyData)
                );
            }
        }
    }, [loading]);

    return [data];
};

export default useDashboardData;
