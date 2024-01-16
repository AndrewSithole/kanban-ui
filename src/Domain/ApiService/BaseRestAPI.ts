import {Ticket} from "../../models/ticket.ts";

abstract class BaseRestAPI<T>{
   abstract get():Promise<Array<T>>;
   abstract post(ticket: Ticket):Promise<boolean>;
   abstract put(ticket: Ticket):Promise<boolean>;
   // abstract delete():Promise<boolean>;
}

export default BaseRestAPI
