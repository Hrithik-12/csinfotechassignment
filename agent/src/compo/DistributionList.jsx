import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../utils/api";

const DistributionList = () => {
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) {
    return (
      <div className="mt-8 max-w-6xl mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-6xl mx-auto px-4">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Distributed Tasks
        </h2>
        <p className="text-gray-600 text-lg">
          Overview of tasks assigned to agents
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <span className="text-blue-700 font-medium">
              {distributions.length} Distribution{distributions.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            <span className="text-green-700 font-medium">
              {distributions.reduce((total, dist) => total + dist.tasks.length, 0)} Total Tasks
            </span>
          </div>
        </div>
      </div>

      {/* Distributions List */}
      {distributions.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No distributions found</h3>
          <p className="text-gray-500">Tasks haven't been distributed to agents yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {distributions.map((dist) => (
            <div
              key={dist._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Agent Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {dist.agentId?.name || 'Unknown Agent'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {dist.agentId?.email || 'No email provided'}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border border-blue-200 rounded-lg px-3 py-1">
                    <span className="text-blue-700 font-medium text-sm">
                      {dist.tasks.length} task{dist.tasks.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tasks List */}
              <div className="p-6">
                {dist.tasks.length === 0 ? (
                  <p className="text-gray-500 italic text-center py-4">No tasks assigned</p>
                ) : (
                  <div className="grid gap-3">
                    {dist.tasks.map((task, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <h4 className="font-medium text-gray-900">
                                {task.firstName || 'Unnamed Task'}
                              </h4>
                            </div>
                            <div className="ml-4 space-y-1">
                              {task.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  {task.phone}
                                </div>
                              )}
                              {task.notes && (
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  <span className="leading-relaxed">{task.notes}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DistributionList;