import {Ticket} from "../../models/ticket.ts";
import {BaseUseCase, BaseUseCaseParams} from "./BaseUsecase.ts";
import {GetTicketsRepository} from "../Repository/getTicketsRepository.ts";


class GetTicketsUseCase extends BaseUseCase<Promise<Array<Ticket>>, GetTicketsUseCaseParams>{
    // ToDo: implement proper dependency injection
    call(params: GetTicketsUseCaseParams): Promise<Array<Ticket>> {
        const getTicketsRepository: GetTicketsRepository = new GetTicketsRepository()
        return getTicketsRepository.call({...params});
    }
}
class GetTicketsUseCaseParams extends BaseUseCaseParams{

}

export {GetTicketsUseCase, GetTicketsUseCaseParams}
