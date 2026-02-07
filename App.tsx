import React, { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { ChoiceStage } from './components/ChoiceStage';
import { SpellStage } from './components/SpellStage';
import { EndScreen } from './components/EndScreen';
import { GameHUD } from './components/RetroUI';
import { LevelSelect } from './components/LevelSelect';
import { 
    getLevelWords,
    CATEGORIES
} from './data/vocabulary';
import { 
    MAX_HEALTH, 
    POINTS_CHOICE, 
    POINTS_SPELL, 
    POINTS_LEVEL_COMPLETE, 
    POINTS_GAME_COMPLETE 
} from './constants';
import { GameStage, RoundStage, PlayerStats, UserProgress, CategoryID } from './types';

// Initial progress state
const INITIAL_PROGRESS: UserProgress = {
    beginner: {},
    intermediate: {},
    advanced: {},
    custom: {}
};

const App: React.FC = () => {
    // Persistent Progress (Load from localStorage if available)
    const [userProgress, setUserProgress] = useState<UserProgress>(() => {
        const saved = localStorage.getItem('pixelWordQuest_progress_v1');
        return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
    });

    // Save progress helper
    const saveProgress = (newProgress: UserProgress) => {
        setUserProgress(newProgress);
        localStorage.setItem('pixelWordQuest_progress_v1', JSON.stringify(newProgress));
    };

    // Game State
    const [gameState, setGameState] = useState<GameStage>(GameStage.HOME);
    const [roundStage, setRoundStage] = useState<RoundStage>(RoundStage.CHOICE);
    
    // Player Stats
    const [stats, setStats] = useState<PlayerStats>({
        score: 0,
        health: MAX_HEALTH,
        category: 'beginner',
        levelIndex: 0,
        wordIndex: 0,
        totalWordsAnswered: 0,
        correctAnswers: 0
    });

    // Derived State
    const currentLevelWords = getLevelWords(stats.category, stats.levelIndex);
    const currentWord = currentLevelWords?.[stats.wordIndex];

    const enterLevelSelect = () => {
        setGameState(GameStage.LEVEL_SELECT);
    };

    const returnHome = () => {
        setGameState(GameStage.HOME);
    };

    const startLevel = (category: CategoryID, levelIndex: number) => {
        setStats({
            score: 0,
            health: MAX_HEALTH,
            category: category,
            levelIndex: levelIndex,
            wordIndex: 0,
            totalWordsAnswered: 0,
            correctAnswers: 0
        });
        setGameState(GameStage.PLAYING);
        setRoundStage(RoundStage.CHOICE);
    };

    const handleGameOver = (won: boolean) => {
        if (won) {
            const finalScore = stats.score + POINTS_GAME_COMPLETE;
            setStats(prev => ({ ...prev, score: finalScore }));
            
            // Save Progress
            const newProgress = { ...userProgress };
            const catProgress = newProgress[stats.category] || {};
            const lvlProgress = catProgress[stats.levelIndex] || { unlocked: true, stars: 0, score: 0 };
            
            // Update high score
            if (finalScore > lvlProgress.score) {
                lvlProgress.score = finalScore;
                lvlProgress.stars = 1; // Simple logic: 1 star for clearing
                catProgress[stats.levelIndex] = lvlProgress;
                
                // Unlock next level
                // Actually LevelSelect component handles visualization based on previous level score
                // But let's be explicit
                const nextLvlIndex = stats.levelIndex + 1;
                 // (In a real implementation we'd mark next level as unlocked explicitly)
            }
            newProgress[stats.category] = catProgress;
            saveProgress(newProgress);
        }
        setGameState(GameStage.END);
    };

    const handleCorrectChoice = () => {
        setStats(prev => ({
            ...prev,
            score: prev.score + POINTS_CHOICE,
            correctAnswers: prev.correctAnswers + 1,
            totalWordsAnswered: prev.totalWordsAnswered + 1 
        }));
        setRoundStage(RoundStage.SPELL);
    };

    const handleIncorrectChoice = () => {
        setStats(prev => ({
            ...prev,
            health: prev.health - 1,
            totalWordsAnswered: prev.totalWordsAnswered + 1
        }));
        if (stats.health - 1 <= 0) {
            handleGameOver(false);
        } else {
             advanceToNextWord();
        }
    };

    const handleCorrectSpell = () => {
        setStats(prev => ({
            ...prev,
            score: prev.score + POINTS_SPELL,
            correctAnswers: prev.correctAnswers + 1
        }));
        advanceToNextWord();
    };

    const handleIncorrectSpell = () => {
        setStats(prev => ({
            ...prev,
            health: prev.health - 1
        }));
        
        if (stats.health - 1 <= 0) {
            handleGameOver(false);
        }
        
        setTimeout(() => {
             if (stats.health - 1 > 0) {
                 advanceToNextWord();
             }
        }, 1500);
    };

    const advanceToNextWord = () => {
        const isLastWordInLevel = stats.wordIndex >= currentLevelWords.length - 1;

        if (isLastWordInLevel) {
            // Level Cleared
            handleGameOver(true);
        } else {
            // Next Word
            setStats(prev => ({
                ...prev,
                wordIndex: prev.wordIndex + 1
            }));
            setRoundStage(RoundStage.CHOICE);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            
            {gameState === GameStage.HOME && <StartScreen onStart={enterLevelSelect} />}

            {gameState === GameStage.LEVEL_SELECT && (
                <LevelSelect 
                    progress={userProgress}
                    onSelectLevel={startLevel}
                    onBack={returnHome}
                />
            )}

            {gameState === GameStage.PLAYING && (
                <div className="w-full max-w-md">
                     <GameHUD 
                        level={stats.levelIndex + 1}
                        score={stats.score}
                        health={stats.health}
                        totalLevels={Math.ceil(CATEGORIES[stats.category].words.length / 10)}
                        onHome={() => setGameState(GameStage.LEVEL_SELECT)} // Quit to map
                     />
                </div>
            )}
            
            {gameState === GameStage.PLAYING && currentWord && (
                <>
                    {roundStage === RoundStage.CHOICE && (
                        <ChoiceStage 
                            wordData={currentWord}
                            currentWordIndex={stats.wordIndex}
                            totalWords={currentLevelWords.length}
                            onCorrect={handleCorrectChoice}
                            onIncorrect={handleIncorrectChoice}
                        />
                    )}
                    {roundStage === RoundStage.SPELL && (
                        <SpellStage 
                            wordData={currentWord}
                            totalWordsAnswered={stats.totalWordsAnswered} 
                            totalTotalWords={currentLevelWords.length * 2} 
                            currentWordIndex={stats.wordIndex}
                            totalWords={currentLevelWords.length}
                            onCorrect={handleCorrectSpell}
                            onIncorrect={handleIncorrectSpell}
                        />
                    )}
                </>
            )}

            {gameState === GameStage.END && (
                <EndScreen 
                    score={stats.score}
                    won={stats.health > 0}
                    onRestart={() => {
                        if (stats.health > 0) {
                            // Next level logic if won, else retry
                            // Check if next level exists
                            const nextIndex = stats.levelIndex + 1;
                            const maxLevels = Math.ceil(CATEGORIES[stats.category].words.length / 10);
                            if (nextIndex < maxLevels) {
                                startLevel(stats.category, nextIndex);
                            } else {
                                // Category Complete - back to map
                                setGameState(GameStage.LEVEL_SELECT);
                            }
                        } else {
                            startLevel(stats.category, stats.levelIndex);
                        }
                    }}
                    onHome={() => setGameState(GameStage.LEVEL_SELECT)}
                />
            )}

            <footer className="mt-8 text-center text-retro-pixel-7 text-xs font-pixel opacity-50">
                <p>RETRO LEARNING GAME • v1.1</p>
            </footer>
        </div>
    );
};

export default App;