import {useState, useRef, useEffect, useContext} from "react";
import {users} from "../data/users.ts";
import {CurrentUserContext} from "../data/user_context.tsx";
import {User} from "../models/user.ts";

const ChangeUserAssignedDropdownButton = ({currentUser, updateTicketUserCallback}:{currentUser: User, updateTicketUserCallback: (user: User)=>void}) => {
    const [show, setShow] = useState(false);
    const buttonRef = useRef(null);

    const toggleShow = () => {
        setShow(!show);
    };

    const closeDropdown = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeDropdown);
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, []);
    const contextData = useContext(CurrentUserContext);

    const handleUpdateUser = (user: User)=>{
        if(contextData?.currentUser.role!=="admin" && user.id!==contextData?.currentUser.id){
            alert("You can only assign tickets to yourself")
        }
        else {
            updateTicketUserCallback(user)
        }
    }

    return (
        <div className="relative inline-block">
            <button
                ref={buttonRef}
                className="bg-neutral-200 p-2 rounded"
                onClick={toggleShow}
            >
                Update assignee<i className="bi bi-caret-down"></i>
            </button>

            <ul
                className={`absolute right-0 w-40 mt-2 bg-white border rounded-md shadow-lg ${
                    show ? "block" : "hidden"
                }`}
            >
                {users.map( user_=>
                    <li key={user_.id}>
                        <a
                            className={`block px-4 py-2 text-gray-600 hover:bg-gray-100 ${user_.id===currentUser.id && 'bg-gray-400'}`}
                            href="#"
                            onClick={()=>handleUpdateUser(user_)}
                        >
                            {user_?.name}
                        </a>
                </li>)}
            </ul>
        </div>
    );
};

export default ChangeUserAssignedDropdownButton;
