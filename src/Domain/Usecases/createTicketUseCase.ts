import {Ticket} from "../../models/ticket.ts";
import {BaseUseCase, BaseUseCaseParams} from "./BaseUsecase.ts";
import {CreateTicketRepository} from "../Repository/createTicketRepository.ts";


class CreateTicketUseCase extends BaseUseCase<Promise<boolean>, CreateTicketUseCaseParams>{
    // ToDo: implement proper dependency injection
    call(params: CreateTicketUseCaseParams): Promise<boolean> {
        const createTicketRepository: CreateTicketRepository = new CreateTicketRepository()
        return createTicketRepository.call({...params});
    }
}
class CreateTicketUseCaseParams extends BaseUseCaseParams{
    ticket: Ticket;
    constructor(ticket_: Ticket) {
        super();
        this.ticket = ticket_
    }
}

export {CreateTicketUseCase, CreateTicketUseCaseParams}
