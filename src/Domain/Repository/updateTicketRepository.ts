import {Ticket} from "../../models/ticket.ts";
import {BaseRepository, BaseRepositoryParams} from "./BaseRepository.ts";
import TicketsRestApi from "../ApiService/ticketsApi.ts";


class UpdateTicketRepository extends BaseRepository<boolean, UpdateTicketRepositoryParams>{
    async call(params: UpdateTicketRepositoryParams): Promise<boolean> {
        const api:TicketsRestApi = new TicketsRestApi();
        console.log(params)
        return api.put(params.ticket)
    }
}
class UpdateTicketRepositoryParams extends BaseRepositoryParams{
    ticket: Ticket
    constructor(ticket_: Ticket) {
        super();
        this.ticket = ticket_;
    }
}

export {UpdateTicketRepository, UpdateTicketRepositoryParams}
