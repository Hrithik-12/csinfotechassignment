import { useState } from "react";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../utils/api";

const AgentForm = ({ onAgentAdded }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_ENDPOINTS.AGENTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Agent added successfully!");
      onAgentAdded();
      setForm({ name: "", email: "", mobile: "", password: "" });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-md shadow-md flex flex-col gap-3 bg-white"
    >
      <h2 className="text-lg font-bold">Add New Agent</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="p-2 border rounded"
        required
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile (+91...)"
        value={form.mobile}
        onChange={handleChange}
        className="p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Agent
      </button>
    </form>
  );
};

export default AgentForm;
