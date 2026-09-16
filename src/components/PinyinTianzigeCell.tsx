import React from 'react';
import { GridCell } from '../types';

interface PinyinTianzigeCellProps {
  cell?: GridCell;
  isEmpty?: boolean;
}

export const PinyinTianzigeCell: React.FC<PinyinTianzigeCellProps> = ({
  cell,
  isEmpty = false,
}) => {
  if (cell && cell.char === '\n') {
    return <div className="w-full h-0 basis-full" />;
  }

  // Authentic Chinese exercise notebook green colors
  const borderColor = 'border-[#388566]';
  const dashedColor = 'border-[#4ba883]/60';
  const pinyinLineColor = 'border-[#4ba883]/40';
  const pinyinTextColor = 'text-[#1e5c43]';
  const charTextColor = 'text-[#1a1c1b]';

  return (
    <div className="flex flex-col w-full aspect-[1/1.4] select-none">
      {/* 1. TOP PINYIN BOX (四线三格) */}
      <div
        className={`relative w-full h-[28%] border-[1.5px] border-b-0 ${borderColor} bg-[#fdfbf6] flex items-center justify-center overflow-hidden`}
      >
        {/* Guide lines 2 and 3 */}
        <div
          className={`absolute top-[33.33%] left-0 w-full border-b border-dashed ${pinyinLineColor} pointer-events-none`}
        />
        <div
          className={`absolute top-[66.66%] left-0 w-full border-b border-dashed ${pinyinLineColor} pointer-events-none`}
        />

        {/* Pinyin with tones */}
        {!isEmpty && cell?.pinyin && (
          <span
            className={`relative z-10 text-[10px] sm:text-xs md:text-sm font-sans font-medium tracking-wide leading-none ${pinyinTextColor}`}
            style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
          >
            {cell.pinyin}
          </span>
        )}
      </div>

      {/* 2. BOTTOM TIANZIGE SQUARE (田字格) */}
      <div
        className={`relative w-full aspect-square border-[1.5px] ${borderColor} bg-[#fdfbf6] flex items-center justify-center`}
      >
        {/* Horizontal dashed line */}
        <div
          className={`absolute top-1/2 left-0 w-full border-b border-dashed ${dashedColor} -translate-y-1/2 pointer-events-none`}
        />

        {/* Vertical dashed line */}
        <div
          className={`absolute left-1/2 top-0 h-full border-r border-dashed ${dashedColor} -translate-x-1/2 pointer-events-none`}
        />

        {/* Character or punctuation */}
        {!isEmpty && cell && (
          <>
            {cell.isPunctuation ? (
              <span
                className={`relative text-lg sm:text-xl md:text-2xl font-serif font-bold ${charTextColor} self-start ml-1 sm:ml-1.5 mt-0.5 sm:mt-1 leading-none`}
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                {cell.char}
              </span>
            ) : (
              <span
                className={`relative z-10 text-xl sm:text-2xl md:text-[28px] font-normal leading-none ${charTextColor}`}
                style={{
                  fontFamily: '"Kaiti SC", "STKaiti", "Noto Serif SC", "Ma Shan Zheng", serif',
                }}
              >
                {cell.char}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
