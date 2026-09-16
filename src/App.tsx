import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeItem, NotebookMeta } from './types';
import { DEFAULT_THEMES, INITIAL_NOTEBOOK_META, generateNotebookPages } from './data/defaultThemes';
import { NotebookSpine } from './components/NotebookSpine';
import { NotebookCover } from './components/NotebookCover';
import { NotebookPage } from './components/NotebookPage';
import { IndexDrawer } from './components/IndexDrawer';
import { DownloadModal } from './components/DownloadModal';
import { playPageFlipSound } from './utils/audio';

export default function App() {
  const [themes] = useState<ThemeItem[]>(DEFAULT_THEMES);
  const [meta] = useState<NotebookMeta>(INITIAL_NOTEBOOK_META);

  // Automatically generates all pages with exact 42-cell distribution across multi-page themes
  const pages = useMemo(() => generateNotebookPages(themes), [themes]);

  // 0 = Cover, 1..N = Notebook Pages
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [pageDirection, setPageDirection] = useState<'next' | 'prev'>('next');
  const [isIndexOpen, setIsIndexOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  const goToPage = useCallback(
    (targetPage: number) => {
      const clamped = Math.max(0, Math.min(targetPage, pages.length));
      if (clamped !== currentPageNumber) {
        setPageDirection(clamped > currentPageNumber ? 'next' : 'prev');
        playPageFlipSound(0.25);
        setCurrentPageNumber(clamped);
      }
    },
    [currentPageNumber, pages.length]
  );

  const nextPage = useCallback(() => {
    if (currentPageNumber < pages.length) {
      goToPage(currentPageNumber + 1);
    }
  }, [currentPageNumber, pages.length, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPageNumber > 0) {
      goToPage(currentPageNumber - 1);
    }
  }, [currentPageNumber, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDownloadModalOpen) {
        if (e.key === 'Escape') setIsDownloadModalOpen(false);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevPage();
      } else if (e.key === 'Escape') {
        setIsIndexOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, isDownloadModalOpen]);

  const currentPageData =
    currentPageNumber > 0 && currentPageNumber <= pages.length
      ? pages[currentPageNumber - 1]
      : null;

  return (
    <main className="min-h-screen bg-[#181916] flex flex-col justify-center items-center relative overflow-x-hidden p-2 sm:p-6 md:p-8 select-none">
      {/* Subtle ambient desk lighting */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 35%, rgba(255,248,220,0.15) 0%, transparent 65%)`,
        }}
      />

      {/* THE NOTEBOOK: Clean, proportionate, 100% focused on the notebook */}
      <div className="relative w-full max-w-[390px] sm:max-w-[480px] md:max-w-[560px] my-auto flex items-center justify-center">
        {/* Physical Notebook Card */}
        <div className="relative w-full aspect-[1/1.38] flex shadow-[0_25px_60px_rgba(0,0,0,0.7)] rounded-xl sm:rounded-2xl border border-stone-800 bg-[#121310] overflow-visible">
          {/* Left authentic red cloth binding spine */}
          <div className="w-5 sm:w-8 md:w-9 h-full shrink-0">
            <NotebookSpine />
          </div>

          {/* Discreet Bookmark Tab for "目录" (Index Table of Contents) */}
          <button
            onClick={() => setIsIndexOpen(true)}
            className="absolute -right-3.5 sm:-right-4.5 top-8 sm:top-10 z-30 flex items-center justify-center py-2.5 px-1 sm:px-1.5 rounded-r bg-[#b53a31] text-amber-50 shadow-md hover:translate-x-0.5 transition-all cursor-pointer writing-vertical-lr text-[11px] sm:text-xs font-serif font-bold tracking-widest border border-l-0 border-[#d8584e]"
            title="目录"
          >
            目录
          </button>

          {/* Main Notebook Leaf with smooth page-turn animation */}
          <div className="flex-1 h-full overflow-hidden relative rounded-r-xl sm:rounded-r-2xl bg-[#fbf9f2]">
            <AnimatePresence mode="wait" initial={false}>
              {currentPageNumber === 0 ? (
                /* Cover Page (With explicit navigation button to turn page) */
                <motion.div
                  key="cover"
                  initial={{ opacity: 0, rotateY: pageDirection === 'next' ? -8 : 8 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: pageDirection === 'next' ? 8 : -8 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="w-full h-full"
                >
                  <NotebookCover
                    meta={meta}
                    totalPages={pages.length}
                    onOpen={() => goToPage(1)}
                  />
                </motion.div>
              ) : currentPageData ? (
                /* Tianzige Grid Page */
                <motion.div
                  key={`page-${currentPageData.id}`}
                  initial={{ opacity: 0, x: pageDirection === 'next' ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: pageDirection === 'next' ? -16 : 16 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="w-full h-full"
                >
                  <NotebookPage
                    page={currentPageData}
                    totalPages={pages.length}
                    onPrevPage={prevPage}
                    onNextPage={nextPage}
                    canPrev={true}
                    canNext={currentPageNumber < pages.length}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Index Drawer (Clean Table of Contents: Cover + list of themes and their pages) */}
      <IndexDrawer
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        themes={themes}
        pages={pages}
        currentPageNumber={currentPageNumber}
        onSelectPage={goToPage}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
      />

      {/* Clean Modal for Downloading User HTML Themes */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </main>
  );
}
