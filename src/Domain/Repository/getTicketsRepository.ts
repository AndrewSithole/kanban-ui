import {Ticket} from "../../models/ticket.ts";
import {BaseRepository, BaseRepositoryParams} from "./BaseRepository.ts";
import TicketsRestApi from "../ApiService/ticketsApi.ts";


class GetTicketsRepository extends BaseRepository<Array<Ticket>, GetTicketsRepositoryParams>{
    async call(params: GetTicketsRepositoryParams): Promise<Array<Ticket>> {
        const api:TicketsRestApi = new TicketsRestApi();
        console.log(params)
        return api.get()
    }
}
class GetTicketsRepositoryParams extends BaseRepositoryParams{

}

export {GetTicketsRepository, GetTicketsRepositoryParams}
