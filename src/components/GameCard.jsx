import React from 'react';
import { Play } from 'lucide-react';

export const GameCard = ({ game, onSelect }) => {
  return (
    <div 
      id={`game-card-${game.id}`}
      className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-500/10"
      onClick={() => onSelect(game)}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-zinc-100 font-medium text-lg leading-tight">{game.title}</h3>
            <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{game.category}</span>
          </div>
          <div className="bg-emerald-500/10 p-2 rounded-full group-hover:bg-emerald-500 transition-colors duration-300">
            <Play size={18} className="text-emerald-500 group-hover:text-white fill-current" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};
