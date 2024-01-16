import {User} from "./user.ts";

export type Status = "todo" | "in_progress" | "done";

export type Ticket = {
    id: string,
    title: string,
    description: string,
    status: Status,
    assignedTo: User
}

export type TicketModel = {
    id: string,
    title: string,
    description: string,
    status: Status,
    assignedTo: string
}

export const Statuses: Status[] = ["todo", "in_progress", "done"]
