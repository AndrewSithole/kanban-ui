import TicketCard from "../components/ticketCard.tsx";
import {Status, Statuses, Ticket, TicketModel} from "../models/ticket.ts";
import {useContext, useEffect, useState} from "react";
import {users} from "../data/users.ts";
import CreateTicketModal, {CreateTicketFormProps} from "../components/CreateTicketModal.tsx";
import {CurrentUserContext} from "../data/user_context.tsx";

function App() {
    const [tickets, setTickets] = useState<Array<Ticket>>([]);
    const [currentDropTarget, setCurrentDropTarget] = useState<null | Status>(null)
    const handleUpdateTicket = (newTicket: Ticket)=> {
        const updatedTickets = tickets.map(ticket=>{
            if(ticket.id === newTicket.id){
                fetch(import.meta.env.VITE_API_BASE_URL+"/tickets/"+ticket.id, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...newTicket, assignedTo: newTicket.assignedTo.id})
                }).then(res=> res.json().then(data=>console.log(data)))
               return newTicket
            }
            return ticket;
        });
        setTickets(updatedTickets);
    }
    useEffect(()=>{
        fetch(import.meta.env.VITE_API_BASE_URL+"/tickets").then(
            (response)=>{
                try {
                    response.json().then(data=> {
                        setTickets(data.map((ticket: TicketModel)=> {
                            return {...ticket, assignedTo:users.find(user => user.id===ticket.assignedTo)}
                        }))
                    })
                }catch (e){
                    console.log(e)
                }
            }
        )
    }, [])

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, status: Status)=> {
        const ticket_ = tickets.find(ticket=> ticket.id === event.dataTransfer.getData("id"))
        handleUpdateTicket({...ticket_!, status: status})
        setCurrentDropTarget(null)
    }
    const handleDragEnter = (status: Status)=> {
        setCurrentDropTarget(status)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
// Handle the modal close event
    function handleModalClose() {
        setIsModalOpen(false);
    }
    const contextData = useContext(CurrentUserContext);

    // Handle the modal submit event
    function handleModalSubmit(form: CreateTicketFormProps) {
        // Do something with the form data
        console.log(form);
        const ticket: Ticket = {...form, id: "Proj-"+tickets.length.toString()}
        fetch(import.meta.env.VITE_API_BASE_URL+"/tickets", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...ticket, assignedTo: ticket.assignedTo.id})
        }).then(res=> res.json().then(data=>console.log(data)))
        setTickets([...tickets, ticket]);
        setIsModalOpen(false);
    }
    const [currentCreationStatus, setCurrentCreationStatus] = useState<Status>("todo")
    return (
         <div className="divide-x grid grid-cols-3 ">
            {Statuses.map(status=>
                <div
                    onDragEnter={()=>handleDragEnter(status)}
                    onDragOver={(e)=>e.preventDefault()}
                onDrop={(e)=>handleDrop(e, status)} key={status}>
                <div className="flex justify-between p-2">
                    <h2 className={"capitalize text-2xl text-neutral-800"}>
                        {status.replace("_", " ")}
                    </h2>
                    {(contextData?.currentUser?.role==="admin")?<button onClick={() => {
                        setCurrentCreationStatus(status);
                        setIsModalOpen(true);
                    }}>
                        <i className="bi bi-plus-circle"></i>
                    </button>:null}
                </div>
                <div className={`h-full ${currentDropTarget===status && 'bg-gray-100'}`}>
                    { tickets.map(ticket=> ticket.status===status && <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        updateTicket={handleUpdateTicket}
                    ></TicketCard>)}
                </div>
            </div>)}
             <CreateTicketModal
                 status={currentCreationStatus}
                 isOpen={isModalOpen}
                 onClose={handleModalClose}
                 onSubmit={handleModalSubmit}
             />
        </div>
    )
}

export default App
