import { GridCell } from '../types';
import { pinyin } from 'pinyin-pro';

const PUNCTUATION_REGEX = /[，。！？、“”：；、《》（）—…\.,!\?:;\"\'\(\)]/;

export function isPunctuationChar(char: string): boolean {
  return PUNCTUATION_REGEX.test(char);
}

/**
 * Parses raw text into GridCell objects.
 * Uses `pinyin-pro` to provide accurate Pinyin with tonal accents for every Chinese character.
 * Punctuation occupies its own cell without Pinyin.
 */
export function parseTextToGridCells(text: string): GridCell[] {
  const cells: GridCell[] = [];

  // Clean and iterate over characters
  for (const ch of text) {
    if (ch === '\n') {
      cells.push({ char: '\n', pinyin: '' });
      continue;
    }
    if (ch.trim() === '') continue;

    const isPunct = isPunctuationChar(ch);
    if (isPunct) {
      cells.push({
        char: ch,
        pinyin: '',
        isPunctuation: true,
      });
    } else {
      // Use pinyin-pro to obtain accurate tonal pinyin
      const py = pinyin(ch, { toneType: 'symbol' }).trim();
      cells.push({
        char: ch,
        pinyin: py,
        isPunctuation: false,
      });
    }
  }

  return cells;
}
