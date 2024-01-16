import {Ticket} from "../../models/ticket.ts";
import {BaseUseCase, BaseUseCaseParams} from "./BaseUsecase.ts";
import {UpdateTicketRepository} from "../Repository/updateTicketRepository.ts";


class UpdateTicketUseCase extends BaseUseCase<Promise<boolean>, UpdateTicketUseCaseParams>{
    // ToDo: implement proper dependency injection
    call(params: UpdateTicketUseCaseParams): Promise<boolean> {
        const updateTicketRepository: UpdateTicketRepository = new UpdateTicketRepository()
        return updateTicketRepository.call({...params});
    }
}
class UpdateTicketUseCaseParams extends BaseUseCaseParams{
    ticket: Ticket;
    constructor(ticket_: Ticket) {
        super();
        this.ticket = ticket_
    }
}

export {UpdateTicketUseCase, UpdateTicketUseCaseParams}
