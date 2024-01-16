import {createContext, Dispatch, SetStateAction} from "react";
import {User} from "../models/user.ts";

// Create a context object
export interface CurrentUserContextValue {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

const CurrentUserContext = createContext<CurrentUserContextValue | null>(null);

export {CurrentUserContext}
