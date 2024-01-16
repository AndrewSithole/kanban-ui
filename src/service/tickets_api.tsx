fetch(import.meta.env.VITE_API_BASE_URL+"/tickets", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({...ticket, assignedTo: ticket.assignedTo.id})
}).then(res=> res.json().then(data=>console.log(data)))
