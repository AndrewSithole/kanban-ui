import {Ticket} from "../../models/ticket.ts";
import {BaseRepository, BaseRepositoryParams} from "./BaseRepository.ts";
import TicketsRestApi from "../ApiService/ticketsApi.ts";


class CreateTicketRepository extends BaseRepository<boolean, CreateTicketRepositoryParams>{
    async call(params: CreateTicketRepositoryParams): Promise<boolean> {
        const api:TicketsRestApi = new TicketsRestApi();
        console.log(params)
        return api.post(params.ticket)
    }
}
class CreateTicketRepositoryParams extends BaseRepositoryParams{
    ticket: Ticket
    constructor(ticket_: Ticket) {
        super();
        this.ticket = ticket_;
    }
}

export {CreateTicketRepository, CreateTicketRepositoryParams}
