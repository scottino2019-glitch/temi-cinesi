import React from 'react';
import { NotebookPageData, CELLS_PER_PAGE } from '../types';
import { PinyinTianzigeCell } from './PinyinTianzigeCell';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NotebookPageProps {
  page: NotebookPageData;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export const NotebookPage: React.FC<NotebookPageProps> = ({
  page,
  totalPages,
  onPrevPage,
  onNextPage,
  canPrev,
  canNext,
}) => {
  const emptySlotsCount = Math.max(0, CELLS_PER_PAGE - page.cells.length);

  return (
    <div
      className="relative w-full h-full bg-[#fbf9f2] rounded-r-xl sm:rounded-r-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.02)] flex flex-col justify-between p-3 sm:p-5 md:p-6 select-none overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 0%, transparent 4%, transparent 96%, rgba(0,0,0,0.02) 100%)`,
      }}
    >
      {/* Top Header: Authentic Chinese exercise book header */}
      <div className="relative z-10 flex items-center justify-between pb-1.5 sm:pb-2.5 border-b border-[#388566]/25 font-serif text-xs text-[#2a4535]">
        <div className="flex items-center gap-1.5 sm:gap-2 max-w-[70%]">
          <span className="font-bold text-[#b53a31] shrink-0">课题：</span>
          <span
            className="text-xs sm:text-sm font-bold text-stone-900 tracking-wider truncate"
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            {page.titleZh}
          </span>
          {page.totalParts > 1 && (
            <span className="text-[10px] sm:text-xs text-stone-500 font-mono shrink-0 bg-stone-200/60 px-1 py-0.5 rounded">
              ({page.partIndex}/{page.totalParts})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {page.gradeStamp && (
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#b53a31] text-[#b53a31] flex items-center justify-center font-bold font-serif text-xs -rotate-12 bg-[#fdf2f1] shadow-2xs">
              {page.gradeStamp}
            </div>
          )}
          <span className="font-mono text-[10px] sm:text-xs text-stone-600">
            第 <span className="font-bold text-[#b53a31]">{page.pageNumber}</span> / {totalPages} 页
          </span>
        </div>
      </div>

      {/* Center: The Proportional 7-Column Pinyin Tianzige Grid (42 cells per page) */}
      <div className="relative z-10 my-auto py-1 sm:py-2">
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2 w-full">
          {/* Filled character cells */}
          {page.cells.map((cell, idx) => (
            <PinyinTianzigeCell key={`${page.id}-${idx}`} cell={cell} />
          ))}

          {/* Remaining empty printed exercise grid cells */}
          {Array.from({ length: emptySlotsCount }).map((_, idx) => (
            <PinyinTinyinEmptyCell key={`empty-${idx}`} />
          ))}
        </div>
      </div>

      {/* Bottom Pager: Clearly labeled minimal Chinese navigation controls */}
      <div className="relative z-10 flex items-center justify-between pt-1.5 sm:pt-2 border-t border-[#388566]/20 text-[11px] sm:text-xs text-stone-600 font-serif">
        <button
          onClick={onPrevPage}
          disabled={!canPrev}
          className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
            canPrev
              ? 'text-stone-800 hover:text-[#b53a31] hover:bg-stone-200/70 cursor-pointer font-medium'
              : 'opacity-20 cursor-not-allowed'
          }`}
          title="上一页"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>上一页</span>
        </button>

        <span className="font-mono text-stone-400 text-[10px] tracking-widest">
          · {page.pageNumber} ·
        </span>

        <button
          onClick={onNextPage}
          disabled={!canNext}
          className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
            canNext
              ? 'text-stone-800 hover:text-[#b53a31] hover:bg-stone-200/70 cursor-pointer font-medium'
              : 'opacity-20 cursor-not-allowed'
          }`}
          title="下一页"
        >
          <span>下一页</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// Clean empty grid cell helper
function PinyinTinyinEmptyCell() {
  const borderColor = 'border-[#388566]';
  const dashedColor = 'border-[#4ba883]/60';
  const pinyinLineColor = 'border-[#4ba883]/40';

  return (
    <div className="flex flex-col w-full aspect-[1/1.4] select-none">
      <div className={`relative w-full h-[28%] border-[1.5px] border-b-0 ${borderColor} bg-[#fdfbf6] overflow-hidden`}>
        <div className={`absolute top-[33.33%] left-0 w-full border-b border-dashed ${pinyinLineColor}`} />
        <div className={`absolute top-[66.66%] left-0 w-full border-b border-dashed ${pinyinLineColor}`} />
      </div>
      <div className={`relative w-full aspect-square border-[1.5px] ${borderColor} bg-[#fdfbf6]`}>
        <div className={`absolute top-1/2 left-0 w-full border-b border-dashed ${dashedColor} -translate-y-1/2`} />
        <div className={`absolute left-1/2 top-0 h-full border-r border-dashed ${dashedColor} -translate-x-1/2`} />
      </div>
    </div>
  );
}
