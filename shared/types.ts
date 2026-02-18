// shared/types.ts — used by both client and server

export type ThemeName = 'github' | 'academic' | 'minimal' | 'dark';
export type PageSize = 'A4' | 'Letter';
export type FontFamily = 'sans' | 'serif' | 'mono';

export interface MarginConfig {
    top: string;
    bottom: string;
    left: string;
    right: string;
}

export interface ThemeConfig {
    selectedTheme: ThemeName;
    accentColor: string;
    fontFamily: FontFamily;
    fontSize: number;
    pageSize: PageSize;
    margins: MarginConfig;
    customCSS: string;
}

export interface GeneratePDFRequest {
    markdown: string;
    theme: ThemeConfig;
}

export const DEFAULT_THEME: ThemeConfig = {
    selectedTheme: 'github',
    accentColor: '#0969da',
    fontFamily: 'sans',
    fontSize: 16,
    pageSize: 'A4',
    margins: { top: '1in', bottom: '1in', left: '1in', right: '1in' },
    customCSS: '',
};