import React from 'react';
import { NotebookMeta } from '../types';
import { ChevronRight } from 'lucide-react';

interface NotebookCoverProps {
  meta: NotebookMeta;
  onOpen: () => void;
  totalPages: number;
}

export const NotebookCover: React.FC<NotebookCoverProps> = ({
  meta,
  onOpen,
  totalPages,
}) => {
  return (
    <div
      className="relative w-full h-full bg-[#9cbba7] rounded-r-xl sm:rounded-r-2xl shadow-[inset_0_0_50px_rgba(0,0,0,0.08)] select-none transition-all duration-200 overflow-hidden flex flex-col justify-between p-3.5 sm:p-6 md:p-7 text-[#1e2a22]"
      style={{
        backgroundImage: `radial-gradient(#8cb199 1.5px, transparent 1.5px), linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.06) 100%)`,
        backgroundSize: '16px 16px, 100% 100%',
      }}
    >
      {/* Traditional Double Line Frame with Corner Accents */}
      <div className="absolute inset-2.5 sm:inset-4 md:inset-5 border-2 border-[#b53a31] pointer-events-none rounded-xs">
        <div className="absolute inset-[3px] border border-[#b53a31]/60" />
        {/* Geometric Chinese Corners */}
        <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-[#b53a31]" />
        <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-[#b53a31]" />
        <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-[#b53a31]" />
        <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-[#b53a31]" />
      </div>

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between px-2 pt-1 font-serif">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#2a4535] font-medium tracking-widest">
          <span className="text-[#b53a31] font-bold">★</span>
          <span>统一标准小学生练习簿</span>
        </div>
        <div className="text-[10px] sm:text-xs font-mono text-[#2a4535]/90 border border-[#2a4535]/40 px-1.5 py-0.5 rounded bg-white/20">
          共 {totalPages} 页
        </div>
      </div>

      {/* Main Title Block */}
      <div
        onClick={onOpen}
        className="relative z-10 flex flex-col items-center text-center my-auto py-2 px-2 cursor-pointer group"
      >
        <div className="text-[10px] sm:text-xs font-sans tracking-[0.35em] text-[#7a2620] uppercase font-medium mb-1">
          PĪN YĪN TIÁN ZÌ BĚN
        </div>

        <div className="relative px-6 sm:px-10 py-2 border-y-2 border-[#b53a31] my-1 sm:my-2 group-hover:scale-[1.02] transition-transform">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] text-[#b53a31]"
            style={{ fontFamily: '"Noto Serif SC", "Kaiti SC", "Songti SC", serif' }}
          >
            拼音田字本
          </h1>
          <div className="text-[10px] sm:text-xs tracking-[0.4em] text-[#2a4535] mt-1 font-serif">
            语 文 · 练 习 簿
          </div>
        </div>

        {/* Student Information Form */}
        <div className="relative w-full max-w-[260px] sm:max-w-xs md:max-w-sm mt-3 sm:mt-5 bg-[#faf7ef]/95 border border-[#b53a31]/60 p-3 sm:p-4 rounded shadow-sm text-left">
          <div className="space-y-2 font-serif text-[11px] sm:text-xs text-stone-800">
            <div className="flex items-center border-b border-stone-400/40 pb-0.5">
              <span className="font-bold tracking-widest text-[#b53a31] shrink-0 w-14 sm:w-16">学校：</span>
              <span className="font-medium tracking-wide text-stone-900 truncate">{meta.schoolName}</span>
            </div>
            <div className="flex items-center border-b border-stone-400/40 pb-0.5">
              <span className="font-bold tracking-widest text-[#b53a31] shrink-0 w-14 sm:w-16">班级：</span>
              <span className="font-medium tracking-wide text-stone-900">{meta.studentClass}</span>
            </div>
            <div className="flex items-center border-b border-stone-400/40 pb-0.5">
              <span className="font-bold tracking-widest text-[#b53a31] shrink-0 w-14 sm:w-16">姓名：</span>
              <span className="font-bold tracking-widest text-stone-900">{meta.studentName}</span>
            </div>
            <div className="flex items-center border-b border-stone-400/40 pb-0.5">
              <span className="font-bold tracking-widest text-[#b53a31] shrink-0 w-14 sm:w-16">课题：</span>
              <span className="font-medium tracking-wide text-stone-900 truncate">{meta.subject}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Explicit Navigation Button */}
      <div className="relative z-10 flex items-center justify-between px-2 pt-2 border-t border-[#388566]/30 text-[11px] sm:text-xs text-stone-700 font-serif">
        <span className="text-[#2a4535]/80 text-[10px] sm:text-xs">全国通用 · 绿色环保</span>

        {/* Tasto esplicito di navigazione per sfogliare la prima pagina */}
        <button
          onClick={onOpen}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#b53a31] hover:bg-[#9e2f27] text-amber-50 font-serif font-bold shadow-sm transition-all cursor-pointer hover:translate-x-0.5"
          title="翻开 · 下一页"
        >
          <span>翻开 · 下一页</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
