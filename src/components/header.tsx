import {CurrentUserContext} from "../data/user_context.tsx";
import {useContext} from "react";
import CurrentUserDropdownButton from "./currentUserDropdownButton.tsx";

function Header(){

    const contextData = useContext(CurrentUserContext);
    return (
        <div className="bg-gray-800">
            <div className="flex justify-between items-center px-4 py-2 container mx-auto">

                <div className="text-white font-bold text-xl">
                    <a href="#">Kanban UI</a>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <div className="flex gap-2 align-middle ">
                            <div className="flex flex-col justify-center font-semibold text-gray-400">{contextData?.currentUser?.name}</div>
                            <CurrentUserDropdownButton></CurrentUserDropdownButton>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Header
