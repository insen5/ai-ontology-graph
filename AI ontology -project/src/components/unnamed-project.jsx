"use client";
import React from "react";

function UnnamedProject({ title, zoom, onZoomIn, onZoomOut, onZoomReset }) {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-2">
        <div className="text-sm text-gray-600 mr-2">Zoom: {zoom}%</div>
        <button
          onClick={onZoomOut}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          onClick={onZoomReset}
          className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 text-white"
          aria-label="Reset zoom"
        >
          Reset
        </button>
        <button
          onClick={onZoomIn}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>
    </div>
  );
}

function UnnamedProjectStory() {
  const handleZoomIn = () => {};
  const handleZoomOut = () => {};
  const handleZoomReset = () => {};

  return (
    <div>
      <UnnamedProject
        title="AI Knowledge Graph"
        zoom={100}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
      />
    </div>
  );
}

export default UnnamedProject;