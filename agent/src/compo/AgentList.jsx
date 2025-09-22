import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../utils/api";

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.AGENTS);
      const data = await res.json();
      setAgents(data);
    } catch (err) {
      console.error("Failed to fetch agents", err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Agents List</h2>
      <ul className="space-y-2">
        {agents.map((agent) => (
          <li
            key={agent._id}
            className="p-2 border rounded flex justify-between bg-gray-50"
          >
            <span>{agent.name} ({agent.email})</span>
            <span>{agent.mobile}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
