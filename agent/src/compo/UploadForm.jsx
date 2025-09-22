import { useState } from "react";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../utils/api";

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(API_ENDPOINTS.DISTRIBUTIONS.UPLOAD, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("File uploaded and tasks distributed!");
      setFile(null);
      onUpload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.csv') || 
        droppedFile.name.endsWith('.xlsx') || 
        droppedFile.name.endsWith('.xls'))) {
      setFile(droppedFile);
    } else {
      toast.error("Please upload a valid CSV or Excel file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Tasks</h3>
        <p className="text-gray-600 text-sm">Upload CSV or Excel files to distribute tasks to agents</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
            dragOver
              ? 'border-blue-400 bg-blue-50'
              : file
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-2">
            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
              file ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {file ? (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>
            {file ? (
              <div>
                <p className="text-sm font-medium text-green-600">{file.name}</p>
                <p className="text-xs text-gray-500">File ready for upload</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-900">Drop your file here, or browse</p>
                <p className="text-xs text-gray-500">Supports CSV, XLS, XLSX files</p>
              </div>
            )}
          </div>
        </div>

        {/* File Input */}
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="file-upload"
        />
        
        {!file && (
          <label
            htmlFor="file-upload"
            className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Choose File
          </label>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!file || isUploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload & Distribute
              </>
            )}
          </button>
          
          {file && (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Upload Guidelines */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">File Requirements:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Supported formats: CSV, XLS, XLSX</li>
          <li>• Required columns: firstName, phone, notes</li>
          <li>• Max file size: 10MB</li>
          <li>• Tasks will be automatically distributed to available agents</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadForm;
