import { DocumentData, DocumentReference } from "firebase/firestore";

export interface Journey {
    author: string;
    createdAt: Date;
    editors: string[];
    categories: Category[];
    name: string;
    polls: Poll[];
    users: string[];
    startDate: Date;
    endDate: Date;
    id: string;
    cost: Cost;
}

export type JourneyDataType = {
    id: string;
    ref: DocumentReference<DocumentData> | null;
    data: Journey;
};

export interface Poll {
    title: string;
    id: string;
    votes: Vote[];
    content: Category[];
}
export interface Category {
    details: Detail[];
    title: string;
    id: string;
}
export interface Detail {
    label: string;
    type: "Price" | "Text" | "Date" | "Address" | "";
    value: string | Date;
    currency: string;
    id: string;
}

export interface Cost {
    value: number;
    currency: string;
}

export interface JourneyData {
    journeyName: string;
    totalCost: Cost;
    startDate: string;
    endDate: string;
    users: string[];
    categories: Category[];
    polls: Poll[];
}

export interface Vote {
    user: string;
    id: string; // Refers to the expense id
}

export interface Timestamp {
    seconds: number;
    nanoseconds: number;
}

export type JoinJourneyErrors =
    | "You have already joined this journey"
    | "Journey does not exist"
    | "Invite does not exist"
    | "You must be logged in to accept invites"
    | ""
    | null;
