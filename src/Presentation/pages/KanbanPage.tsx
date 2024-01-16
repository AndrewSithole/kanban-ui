import TicketCard from "../../components/ticketCard.tsx";
import {Status, Statuses, Ticket} from "../../models/ticket.ts";
import {useContext, useEffect, useState} from "react";
import CreateTicketModal, {CreateTicketFormProps} from "../../components/CreateTicketModal.tsx";
import {CurrentUserContext} from "../../data/user_context.tsx";
import {GetTicketsUseCase} from "../../Domain/Usecases/getTicketsUseCase.ts";
import {UpdateTicketUseCase, UpdateTicketUseCaseParams} from "../../Domain/Usecases/updateTicketUseCase.ts";
import {CreateTicketUseCase, CreateTicketUseCaseParams} from "../../Domain/Usecases/createTicketUseCase.ts";

function App() {
    const [tickets, setTickets] = useState<Array<Ticket>>([]);
    const [currentDropTarget, setCurrentDropTarget] = useState<null | Status>(null)
    const handleUpdateTicket = (newTicket: Ticket)=> {
        const updateTicketUseCase = new UpdateTicketUseCase();
        const updateParams = new UpdateTicketUseCaseParams({...newTicket});
        updateTicketUseCase.call(updateParams).then((res: boolean)=>{
                if(res){
                    handleUpdateTicketUI(updateParams.ticket);
                }
            }
        );
    }
    const handleUpdateTicketUI = (newTicket: Ticket)=> {
        const updatedTickets = tickets.map(ticket=>{
            if(ticket.id === newTicket.id){
                return newTicket
            }
            return ticket;
        });
        setTickets(updatedTickets);
    }
    useEffect(()=>{
        const getTicketsUseCase= new GetTicketsUseCase()
        getTicketsUseCase.call({}).then((result: Array<Ticket>)=>{
            setTickets(result)
        })
    }, [])

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, status: Status)=> {
        setCurrentDropTarget(null)
        const ticket_ = tickets.find(ticket=> ticket.id === event.dataTransfer.getData("id"))
        const updateTicketUseCase = new UpdateTicketUseCase();
        const updateParams = new UpdateTicketUseCaseParams({...ticket_!, status: status});
        updateTicketUseCase.call(updateParams).then((res: boolean)=>{
                if(res){
                    handleUpdateTicketUI(updateParams.ticket);
                }
            }
        );
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
        const ticket: Ticket = {...form, id: "Proj-"+(tickets.length+1)}
        const createTicketUseCase = new CreateTicketUseCase();
        const updateParams = new CreateTicketUseCaseParams({...ticket!});
        createTicketUseCase.call(updateParams).then((res: boolean)=>{
                if(res){
                    setTickets([...tickets, ticket]);
                }
            }
        );
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
