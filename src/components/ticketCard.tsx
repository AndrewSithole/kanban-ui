import {Ticket} from "../models/ticket.ts";
import {useContext, useState} from "react";
import {CurrentUserContext} from "../data/user_context.tsx";
import ChangeUserAssignedDropdown from "./changeUserAssignedDropdown.tsx";
import {User} from "../models/user.ts";

export type TicketCardField = "title" | "description" | "user"
export type EditingField = {
    field: TicketCardField,
    oldData: string,
    newValue: string
}
function TicketCard({ticket, updateTicket}:{
    ticket: Ticket
    updateTicket: (ticket: Ticket)=>void
}){
const [editing, setEditing] = useState<EditingField|null>(null);
    const contextData = useContext(CurrentUserContext);

const handleEditTitle = ()=>{
    if(contextData?.currentUser?.role==="admin"){
        setEditing({field: "title", oldData: ticket.title, newValue: ticket.title});
    }
}
const handleSubmitTitle = ()=>{
    updateTicket({...ticket, title: editing?.newValue??""});
    setEditing(null);
}
     return (
        <div
            draggable
            className="border rounded-lg p-2 m-2 bg-gray-50"
            onDragStart={(e)=>e.dataTransfer.setData("id",ticket.id)}
        >
            <div className="title font-semibold pb-1">
                {editing?
                    <div className="relative flex flex-wrap items-stretch gap-1">
                        <input
                            autoFocus={true}
                            value={editing.newValue}
                            className="flex-grow"
                            onChange={(e)=>setEditing({...editing, newValue: e.target.value})}

                        />

                        <button
                            className=""
                            type="button"
                            onClick={()=>setEditing(null)}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                        <button
                            className=""
                            type="button"
                            onClick={()=>handleSubmitTitle()}

                        >
                            <i className="bi bi-check2"></i>
                        </button>
                    </div>
                    :
                    <div className="title font-semibold pb-1" onClick={handleEditTitle}>{ticket.title}</div>}
            </div>

            <div className="descripition pb-1 text-gray-600">{ticket.description}</div>
            <div className="flex justify-between pb-1 text-gray-600">
                <div>{ticket.id}</div>
                <div className="flex gap-2"><span className="bi bi-person"></span>{ticket.assignedTo.name}</div>
            </div>
            <div className="flex justify-end pb-1 text-gray-600">
                <ChangeUserAssignedDropdown currentUser={ticket.assignedTo} updateTicketUserCallback={(user: User)=>updateTicket({
                    ...ticket,
                    assignedTo: user
                })}></ChangeUserAssignedDropdown>
            </div>
        </div>
    )
}
export default TicketCard
