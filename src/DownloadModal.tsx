import React, { useState } from 'react';
import { X, Download, ExternalLink, Check, Loader2, FileCode, PlusCircle } from 'lucide-react';
import { downloadableThemes, DownloadableTheme } from '../data/downloadableThemes';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = async (theme: DownloadableTheme) => {
    setDownloadingId(theme.id);
    try {
      const res = await fetch(theme.fileUrl);
      if (!res.ok) {
        throw new Error(`File ${theme.fileName} non trovato al percorso ${theme.fileUrl}`);
      }
      const htmlText = await res.text();
      const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = theme.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadedId(theme.id);
      setTimeout(() => setDownloadedId(null), 2500);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback direct link download
      const link = document.createElement('a');
      link.href = theme.fileUrl;
      link.download = theme.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#faf7ef] rounded-2xl shadow-2xl border border-stone-300 flex flex-col overflow-hidden text-stone-800 animate-in zoom-in-95 duration-150"
        style={{
          backgroundImage: `linear-gradient(to bottom, #fcfaf3 0%, #f6f1e3 100%)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#388566]/20 bg-[#faf7ef]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#b53a31] text-white flex items-center justify-center shadow-xs">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3
                className="text-base sm:text-lg font-bold text-[#b53a31] leading-tight"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                下载主题 · Scarica Temi HTML
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500 font-serif">
                I tuoi file HTML autonomi pronti per la lettura e la stampa A4
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            title="Chiudi (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: List of Themes */}
        <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 px-1">
            File disponibili ({downloadableThemes.length}):
          </div>

          {downloadableThemes.map((theme, idx) => {
            const isDownloading = downloadingId === theme.id;
            const isDownloaded = downloadedId === theme.id;

            return (
              <div
                key={theme.id}
                className="group relative rounded-xl border border-stone-300/80 bg-white p-3.5 sm:p-4 shadow-2xs hover:shadow-md hover:border-amber-600/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                {/* Theme Information */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-stone-400">
                      #{idx + 1}
                    </span>
                    <span
                      className="text-base sm:text-lg font-bold text-stone-900"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      {theme.titleZh}
                    </span>
                    <span className="text-xs sm:text-sm font-serif text-stone-600 italic">
                      ({theme.titleIt})
                    </span>
                    {theme.hskLevel && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-600 border border-stone-200">
                        {theme.hskLevel}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                    <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                      <FileCode className="w-3 h-3" />
                      {theme.fileName}
                    </span>
                    {theme.date && <span>• {theme.date}</span>}
                  </div>

                  {theme.description && (
                    <p className="text-[11px] text-stone-500 font-serif line-clamp-1">
                      {theme.description}
                    </p>
                  )}
                </div>

                {/* Actions: View and Download */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <a
                    href={theme.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-serif transition-colors"
                    title="Apri a schermo intero nel browser"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                    <span>Visualizza</span>
                  </a>

                  <button
                    onClick={() => handleDownload(theme)}
                    disabled={isDownloading}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-medium shadow-2xs transition-all cursor-pointer ${
                      isDownloaded
                        ? 'bg-emerald-600 text-white'
                        : isDownloading
                        ? 'bg-amber-600/70 text-white cursor-wait'
                        : 'bg-[#b53a31] hover:bg-[#9a3028] text-white hover:scale-102 active:scale-98'
                    }`}
                    title="Scarica il file HTML sul tuo computer"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Scaricamento...</span>
                      </>
                    ) : isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Scaricato!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Scarica .html</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info banner */}
        <div className="px-5 py-3 border-t border-stone-200/80 bg-stone-100/70 text-[11px] text-stone-600 flex items-start gap-2 font-serif">
          <PlusCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
        
        </div>
      </div>
    </div>
  );
};
