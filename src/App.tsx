import './App.css'
import TicketCard from "./components/ticketCard.tsx";
import {tickets as initTickets} from "./data/tickets.ts";
import {Status, Statuses, Ticket} from "./models/ticket.ts";
import React, {useState} from "react";

function App() {
    const [tickets, setTickets] = useState(initTickets);
    const handleUpdateTicket = (newTicket: Ticket)=> {
        const updatedTickets = tickets.map(ticket=>{
            if(ticket.id === newTicket.id){
               return newTicket
            }
            return ticket;
        });
        setTickets(updatedTickets);
    }
    const handleDrop = (event: React.DragEvent<HTMLDivElement>, status: Status)=> {
        console.log(event.dataTransfer.getData("id"))
        const updatedTickets = tickets.map(ticket=>{
            if(ticket.id === event.dataTransfer.getData('id')){
               return {...ticket, status: status}
            }
            return ticket;
        });
        setTickets(updatedTickets);
    }
    return (
        <div className="divide-x grid grid-cols-3 ">
            {Statuses.map(status=>
                <div
                    onDragOver={(e)=>e.preventDefault()}
                onDrop={(e)=>handleDrop(e, status)} key={status}>
                <h2 className={"capitalize text-2xl p-2 text-neutral-800"}>
                    {status.replace("_", " ")}
                </h2>
                <div>
                    { tickets.map(ticket=> ticket.status===status && <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        updateTicket={handleUpdateTicket}
                    ></TicketCard>)}
                </div>
            </div>)}

        </div>
    )
}

export default App
