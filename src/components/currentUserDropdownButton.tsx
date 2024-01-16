import {useState, useRef, useEffect, useContext} from "react";
import {users} from "../data/users.ts";
import {CurrentUserContext} from "../data/user_context.tsx";

const CurrentUserDropdownButton = () => {
    const [show, setShow] = useState(false);
    const buttonRef = useRef(null);

    const toggleShow = () => {
        setShow(!show);
    };
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const closeDropdown = (event) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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

    return (
        <div className="relative inline-block">
            <button
                ref={buttonRef}
                className="rounded-full bg-cover bg-center bg-gray-400 w-12 h-12"
                onClick={toggleShow}
            >
                <i className="bi bi-person"></i>
            </button>

            <ul
                className={`absolute right-0 w-40 mt-2 bg-white border rounded-md shadow-lg ${
                    show ? "block" : "hidden"
                }`}
            >
                {users.map( user_=> <li key={user_.id}>
                    <a
                        className={`block px-4 py-2 text-gray-600 hover:bg-gray-100 ${user_.id===contextData?.currentUser?.id && 'bg-gray-400'}`}
                        href="#"
                        onClick={()=>contextData?.setCurrentUser(user_)}
                    >
                        {user_?.name}
                    </a>
                </li>)}
            </ul>
        </div>
    );
};

export default CurrentUserDropdownButton;
