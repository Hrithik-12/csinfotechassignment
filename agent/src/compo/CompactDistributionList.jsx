import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../utils/api";

const CompactDistributionList = ({ refreshKey }) => {
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [showAllTasks, setShowAllTasks] = useState(new Set());

  const fetchDistributions = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_ENDPOINTS.DISTRIBUTIONS.BASE);
      const data = await res.json();
      setDistributions(data);
    } catch (error) {
      console.error("Failed to fetch distributions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistributions();
  }, [refreshKey]);

  const toggleExpand = (distId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(distId)) {
      newExpanded.delete(distId);
    } else {
      newExpanded.add(distId);
    }
    setExpandedCards(newExpanded);
  };

  const toggleShowAllTasks = (distId) => {
    const newShowAll = new Set(showAllTasks);
    if (newShowAll.has(distId)) {
      newShowAll.delete(distId);
    } else {
      newShowAll.add(distId);
    }
    setShowAllTasks(newShowAll);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Task Distributions</h3>
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1">
            <span className="text-blue-700 font-medium text-sm">
              {distributions.length} Agents
            </span>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1">
            <span className="text-green-700 font-medium text-sm">
              {distributions.reduce((total, dist) => total + dist.tasks.length, 0)} Tasks
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {distributions.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No distributions yet. Upload a file to get started.</p>
          </div>
        ) : (
          distributions.map((dist) => (
            <div
              key={dist._id}
              className="border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200"
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleExpand(dist._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        {dist.agentId?.name || 'Unknown Agent'}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {dist.agentId?.email || 'No email'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {dist.tasks.length} tasks
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedCards.has(dist._id) ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {expandedCards.has(dist._id) && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  {dist.tasks.length === 0 ? (
                    <p className="text-gray-500 text-xs italic">No tasks assigned</p>
                  ) : (
                    <div className="space-y-2">
                      {(showAllTasks.has(dist._id) ? dist.tasks : dist.tasks.slice(0, 3)).map((task, i) => (
                        <div key={i} className="bg-white rounded p-2 text-xs">
                          <div className="font-medium text-gray-900">{task.firstName}</div>
                          <div className="text-gray-500 flex items-center gap-4">
                            <span>{task.phone}</span>
                            {task.notes && <span className="truncate max-w-32">{task.notes}</span>}
                          </div>
                        </div>
                      ))}
                      {dist.tasks.length > 3 && (
                        <div className="text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleShowAllTasks(dist._id);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                          >
                            {showAllTasks.has(dist._id) 
                              ? 'Show less tasks' 
                              : `+${dist.tasks.length - 3} more tasks`
                            }
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompactDistributionList;