import './App.css'
import TicketCard from "./components/ticketCard.tsx";
import {tickets} from "./data/tickets.ts";
import {Statuses} from "./models/ticket.ts";

function App() {

    return (
        <div className="flex divide-y">
            {Statuses.map(status=><div key={status}>
                <h2 style={{textTransform:"capitalize"}}>
                    {status.replace("_", " ")}
                </h2>
                <div>
                    { tickets.map(ticket=> ticket.status===status?<TicketCard key={ticket.id} ticket={ticket}></TicketCard>:null)}
                </div>
            </div>)}

        </div>
    )
}

export default App
