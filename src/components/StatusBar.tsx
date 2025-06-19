
import React from 'react';

const StatusBar = () => {
  return (
    <div className="bg-white px-4 py-2 flex justify-between items-center">
      <div className="text-xs font-medium">8:41</div>
      <div className="flex space-x-2 text-xs">
        <span>📶</span>
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );
};

export default StatusBar;
