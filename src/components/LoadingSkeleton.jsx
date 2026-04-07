import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="h-12 w-64 bg-white/5 rounded-2xl mb-16 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass rounded-3xl p-6 flex flex-col gap-6">
            <div className="w-full h-48 rounded-2xl bg-white/5 animate-pulse" />
            <div className="space-y-4">
              <div className="h-6 w-3/4 bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
              <div className="h-10 w-full bg-white/5 rounded-xl animate-pulse mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
