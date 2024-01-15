import {Ticket} from "../models/ticket.ts";
import {users} from "./users.ts";

export const tickets: Ticket[] = [
    {
        id: "Proj 1",
        status: "todo",
        description: "Implement the login feature using Firebase authentication",
        title: "Login feature",
        assignedTo: users[0]
    },
    {
        id: "Proj 2",
        status: "in_progress",
        description: "Design the landing page using Bootstrap and CSS",
        title: "Landing page",
        assignedTo: users[1]
    },
    {
        id: "Proj 3",
        status: "done",
        description: "Write unit tests for the backend API using Jest",
        title: "Unit tests",
        assignedTo: users[0]
    },
    {
        id: "Proj 4",
        status: "todo",
        description: "Create a database schema for the user and project models",
        title: "Database schema",
        assignedTo: users[1]
    },
    {
        id: "Proj 5",
        status: "in_progress",
        description: "Deploy the app to Heroku and set up the environment variables",
        title: "Deployment",
        assignedTo: users[2]
    },
    {
        id: "Proj 6",
        status: "done",
        description: "Write the documentation for the app using Markdown",
        title: "Documentation",
        assignedTo: users[2]
    }
]
