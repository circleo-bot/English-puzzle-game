export interface Word {
    english: string;
    chinese: string;
    fake: string;
}

export type CategoryID = 'beginner' | 'intermediate' | 'advanced' | 'custom';

export interface Category {
    id: CategoryID;
    name: string;
    description: string;
    words: Word[];
}

export enum GameStage {
    HOME = 'HOME',
    LEVEL_SELECT = 'LEVEL_SELECT',
    PLAYING = 'PLAYING',
    END = 'END'
}

export enum RoundStage {
    CHOICE = 'CHOICE',
    SPELL = 'SPELL',
    FEEDBACK = 'FEEDBACK'
}

export interface PlayerStats {
    score: number;
    health: number;
    category: CategoryID;
    levelIndex: number; // The chunk index (0 = Level 1)
    wordIndex: number;  // Index within the chunk
    totalWordsAnswered: number;
    correctAnswers: number;
}

export interface LevelProgress {
    unlocked: boolean;
    stars: number; // 0-3
    score: number;
}

export type UserProgress = Record<CategoryID, Record<number, LevelProgress>>;