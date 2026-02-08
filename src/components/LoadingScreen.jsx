import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 75);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-50 transition-opacity duration-500">
      <div className="text-center">
        {/* Neural Node Animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Center node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full pulse-glow"></div>
          
          {/* Orbiting nodes */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const radian = (angle * Math.PI) / 180;
            const radius = 50;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            
            return (
              <div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full pulse-glow"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            );
          })}
          
          {/* Connecting lines */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const radian = (angle * Math.PI) / 180;
            const length = 50;
            
            return (
              <div
                key={`line-${i}`}
                className="absolute top-1/2 left-1/2 origin-left h-px bg-gradient-to-r from-white to-transparent opacity-20"
                style={{
                  width: `${length}px`,
                  transform: `rotate(${angle}deg)`,
                }}
              ></div>
            );
          })}
        </div>

        {/* Loading text */}
        <p className="text-2xl text-white mb-4" style={{ fontStyle: 'italic' }}>
          Activating neural nodes…
        </p>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-dark-border rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Percentage */}
        <p className="text-light-gray text-sm mt-3">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;