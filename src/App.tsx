import './App.css'
import TicketCard from "./components/ticketCard.tsx";
import {tickets} from "./data/tickets.ts";

function App() {

    return (
        <>
            { tickets.map(ticket=> <TicketCard key={ticket.id} ticket={ticket}></TicketCard>)}
        </>
    )
}

export default App
