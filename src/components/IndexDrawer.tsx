import React from 'react';
import { ThemeItem, NotebookPageData } from '../types';
import { X, ChevronRight, BookOpen, Layers, Download } from 'lucide-react';

interface IndexDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  themes: ThemeItem[];
  pages: NotebookPageData[];
  currentPageNumber: number; // 0 for Cover, 1..N for pages
  onSelectPage: (pageNumber: number) => void;
  onOpenDownload?: () => void;
}

export const IndexDrawer: React.FC<IndexDrawerProps> = ({
  isOpen,
  onClose,
  themes,
  pages,
  currentPageNumber,
  onSelectPage,
  onOpenDownload,
}) => {
  if (!isOpen) return null;

  // Map each theme to its starting page number and total pages
  const themePageInfo = themes.map((theme) => {
    const themePages = pages.filter((p) => p.themeId === theme.id);
    const startPage = themePages.length > 0 ? themePages[0].pageNumber : 1;
    const pageCount = themePages.length;
    return {
      theme,
      startPage,
      pageCount,
      endPage: startPage + pageCount - 1,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-xs sm:max-w-sm h-full bg-[#faf7ef] shadow-2xl border-l-2 border-[#b53a31] flex flex-col justify-between p-4 sm:p-5 text-stone-800 select-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, #fcf9f2 0%, #f6f2e6 100%)`,
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#388566]/20">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#b53a31]" />
            <span
              className="text-[#b53a31] font-bold text-lg"
              style={{ fontFamily: '"Noto Serif SC", serif' }}
            >
              目录
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            title="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Page & Theme List */}
        <div className="flex-1 my-3 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
          {/* Cover option */}
          <div
            onClick={() => {
              onSelectPage(0);
              onClose();
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all flex items-center justify-between text-xs font-serif cursor-pointer ${
              currentPageNumber === 0
                ? 'bg-[#9cbba7]/25 border-[#2a4535] font-bold text-[#1e2a22] shadow-xs'
                : 'bg-white/70 border-stone-200 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-mono text-[11px]">0.</span>
              <span style={{ fontFamily: '"Noto Serif SC", serif' }}>封面</span>
            </div>
            {currentPageNumber === 0 ? (
              <span className="text-[#b53a31] text-xs">●</span>
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            )}
          </div>

          {/* Themes list */}
          {themePageInfo.map(({ theme, startPage, pageCount, endPage }, idx) => {
            const isCurrentlyReadingThisTheme =
              currentPageNumber >= startPage && currentPageNumber <= endPage;

            return (
              <div
                key={theme.id}
                onClick={() => {
                  onSelectPage(startPage);
                  onClose();
                }}
                className={`group w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between text-xs font-serif cursor-pointer ${
                  isCurrentlyReadingThisTheme
                    ? 'bg-[#b53a31]/10 border-[#b53a31] font-bold text-stone-900 shadow-xs'
                    : 'bg-white/70 border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-stone-400 font-mono text-[11px] shrink-0">
                      {idx + 1}.
                    </span>
                    <span
                      className="truncate text-stone-900 font-medium"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      {theme.titleZh}
                    </span>
                  </div>

                  {/* Multi-page indicator */}
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mt-1 ml-4 font-mono">
                    <span>
                      {pageCount === 1 ? `第 ${startPage} 页` : `第 ${startPage} - ${endPage} 页`}
                    </span>
                    {pageCount > 1 && (
                      <span className="inline-flex items-center gap-0.5 text-[#388566] bg-[#388566]/10 px-1 rounded text-[9px] font-sans">
                        <Layers className="w-2.5 h-2.5" />
                        {pageCount} 页
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center shrink-0">
                  {isCurrentlyReadingThisTheme ? (
                    <span className="text-[#b53a31] text-xs">●</span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer: Minimal page count + micro button to open Download Page */}
        <div className="pt-2.5 border-t border-[#388566]/20 flex items-center justify-between text-[11px] font-serif text-stone-500">
          <div className="flex items-center gap-1.5">
            <span>共 {themes.length} 个主题</span>
            <span className="font-mono text-stone-400">({pages.length}页)</span>
          </div>

          {onOpenDownload && (
            <button
              onClick={() => {
                onClose();
                onOpenDownload();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#388566]/15 hover:bg-[#388566]/25 text-[#1e5c43] hover:text-[#144230] text-[11px] font-serif font-medium transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98"
              title="Apri elenco per scaricare i file HTML dei temi"
            >
              <Download className="w-3 h-3 text-[#2a6d51]" />
              <span>下载 · Scarica Temi</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
