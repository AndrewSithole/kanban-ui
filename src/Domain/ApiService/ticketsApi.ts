import {Ticket, TicketModel} from "../../models/ticket.ts";
import {users} from "../../data/users.ts";
import BaseRestAPI from "./BaseRestAPI.ts";

class TicketsRestApi extends BaseRestAPI<Ticket>{
    base_url: string = import.meta.env.VITE_API_BASE_URL;
    async post(ticket: Ticket): Promise<boolean>{
        const response: Response = await fetch(this.base_url+"/tickets", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...ticket, assignedTo: ticket.assignedTo.id})
        });
        const data = await response.json();
        return new Promise((resolve, reject)=>{
            try {
                console.log(data);
                resolve(true)
            }catch (e){
                reject(e)
            }
        });
    }
    async get(): Promise<Array<Ticket>>{
        const response: Response = await fetch(this.base_url+"/tickets");
        const data = await response.json();
        return new Promise((resolve, reject)=>{
            try {
                resolve(data.map((ticket: TicketModel) => {
                        return {...ticket, assignedTo: users.find(user => user.id === ticket.assignedTo)}
                    })
                )
            }catch (e){
                reject(e)
            }
        });
    }
    async put(ticket: Ticket): Promise<boolean>{
        const response: Response = await fetch(this.base_url+"/tickets/"+ticket.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...ticket, assignedTo: ticket.assignedTo.id})
        });
        const data = await response.json();
        return new Promise((resolve, reject)=>{
            try {
                console.log(data);
                resolve(true)
            }catch (e){
                reject(e)
            }
        });
    }
    // async delete(): Promise<boolean>{
    //     return new Promise((resolve, reject)=>{
    //         // ToDo:
    //         try {
    //             resolve(true)
    //         }catch (e){
    //             reject(e)
    //         }
    //     });
    // }
}
export default TicketsRestApi;
