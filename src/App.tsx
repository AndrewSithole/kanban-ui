import './App.css'
import KanbanPage from "./Presentation/pages/KanbanPage.tsx";
import {User} from "./models/user.ts";
import Header from "./components/header.tsx";
import {useState} from "react";
import {users} from "./data/users.ts";
import {CurrentUserContext} from "./data/user_context.tsx";


function App() {

    const [currentUser, setCurrentUser] = useState<User | null>(users[0]);

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <Header></Header>
            <div className="container mx-auto px-4">
                <KanbanPage></KanbanPage>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App
