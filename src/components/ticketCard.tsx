import {Ticket} from "../models/ticket.ts";
import {useState} from "react";

function TicketCard({ticket, updateTicket}:{
    ticket: Ticket
    updateTicket: (ticket: Ticket)=>void
}){
const [editing, setEditing] = useState(false);

     return (
        <div
            draggable
            className="border rounded-lg p-2 m-2 bg-gray-50"
            onDragStart={(e)=>e.dataTransfer.setData("id",ticket.id)}
        >
            <div className="title font-semibold pb-1">
                {editing?
                        <input
                            autoFocus={true}
                            value={ticket.title}
                            className="flex-grow"
                            onChange={(e)=>updateTicket({...ticket, title: e.target.value})}
                        />
                    :
                    <div className="title font-semibold pb-1" onClick={()=>setEditing(true)}>{ticket.title}</div>}
            </div>

            <div className="descripition pb-1 text-gray-600">{ticket.description}</div>
            <div className="flex justify-between pb-1 text-gray-600">
                <div>{ticket.id}</div>
                <div className="flex gap-2"><span className="bi bi-person"></span>{ticket.assignedTo.name}</div>
            </div>
        </div>
    )
}
export default TicketCard
