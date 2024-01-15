import {Ticket} from "../models/ticket.ts";

function TicketCard({ticket}:{ticket: Ticket}){

     return (
        <div className="border rounded-lg p-2 m-2 bg-gray-50">
            <div className="title font-semibold pb-1">{ticket.title}</div>
            <div className="descripition pb-1 text-gray-600">{ticket.description}</div>
            <div className="flex justify-between pb-1 text-gray-600">
                <div>{ticket.id}</div>
                <div className="flex gap-2"><span className="bi bi-person"></span>{ticket.assignedTo.name}</div>
            </div>
        </div>
    )
}
export default TicketCard
