import './App.css'

function App() {
    const title = "Do market research";
    const id = "BUS-1";
    const description = "Desctiption";
    const assignedTo = "Andrew";
    return (
        <div className="border rounded-lg p-2 m-2 bg-gray-50">
            <div className="title font-semibold pb-1">{title}</div>
            <div className="descripition pb-1">{description}</div>
            <div className="flex justify-between pb-1 text-gray-700">
                <div>{id}</div>
                <div className="flex gap-2"><span className="bi bi-person"></span>{assignedTo}</div>
            </div>
        </div>
    )
}

export default App
