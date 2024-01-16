
// Define the ModalProps type
import {useState} from "react";
import {Status} from "../models/ticket.ts";
import {User} from "../models/user.ts";
import {users} from "../data/users.ts";
export type CreateTicketFormProps = {
  title: string;
  description: string;
  status: Status;
  assignedTo: User;
};
type ModalProps = {
  status:Status;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: CreateTicketFormProps) => void;
};

// Define the Modal component
function CreateTicketModal({ status, isOpen, onClose, onSubmit }: ModalProps) {
  // Use state hooks to store the form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState<User>(users[0]);

  // Handle the form submission
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Call the onSubmit prop with the form data
    onSubmit({
      title,
      description,
      status,
      assignedTo,
    });
    // Reset the form data
    setTitle("");
    setDescription("");
    setAssignedTo(users[0]);
  }

  // Return the modal element
  return (
    <div
      className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Create a new form</h3>
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={3}
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="assignedTo"
              value={assignedTo.id}
              onChange={(e)=> setAssignedTo(users.find(u=>u.id===e.target.value)!)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              {users.map(user_ => <option  key={user_.id} value={user_.id}>{user_.name}</option>)}
            </select>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateTicketModal;
