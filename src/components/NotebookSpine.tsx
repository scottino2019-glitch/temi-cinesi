import React from 'react';

export const NotebookSpine: React.FC = () => {
  return (
    <div
      className="w-7 sm:w-10 md:w-12 h-full bg-[#822a25] flex flex-col justify-between items-center py-8 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.5),3px_0_8px_rgba(0,0,0,0.35)] relative select-none rounded-l-md"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, #70211d, #70211d 2px, #8c2e28 2px, #8c2e28 4px)`,
      }}
    >
      {/* Texture cloth weave */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Top Staple / Stitch */}
      <div className="relative z-10 w-2.5 sm:w-3.5 h-6 sm:h-8 rounded-sm bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 shadow-md border border-stone-600/40 my-4" />

      {/* Middle Spine Calligraphy mark */}
      <div className="relative z-10 writing-vertical-lr text-[10px] sm:text-[11px] tracking-[0.4em] text-amber-100/75 font-serif select-none">
        生字簿
      </div>

      {/* Bottom Staple / Stitch */}
      <div className="relative z-10 w-2.5 sm:w-3.5 h-6 sm:h-8 rounded-sm bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 shadow-md border border-stone-600/40 my-4" />
    </div>
  );
};
