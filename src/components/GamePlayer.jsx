import React from 'react';
import { X, Maximize2, RotateCcw } from 'lucide-react';

export const GamePlayer = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const iframeRef = React.useRef(null);

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    
    if (!isFullscreen) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div id="game-player-overlay" className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold text-white">{game.title}</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={reloadGame}
            title="Reload Game"
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <RotateCcw size={20} />
          </button>
          <button 
            onClick={toggleFullscreen}
            title="Fullscreen"
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative bg-zinc-950 flex items-center justify-center">
        <iframe
          ref={iframeRef}
          src={game.iframeUrl}
          className="w-full h-full border-none shadow-2xl"
          title={game.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="p-3 bg-zinc-900 text-center text-zinc-500 text-xs border-t border-zinc-800">
        Playing {game.title} • Press ESC to exit fullscreen
      </div>
    </div>
  );
};
