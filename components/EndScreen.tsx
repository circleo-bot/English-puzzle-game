import React from 'react';
import { PixelButton, PixelCard } from './RetroUI';

interface EndScreenProps {
    score: number;
    won: boolean;
    onRestart: () => void;
    onHome: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ score, won, onRestart, onHome }) => {
    const getAchievement = () => {
        if (!won && score < 100) return 'WORD APPRENTICE';
        if (!won) return 'WORD WARRIOR';
        if (score > 1000) return 'WORD LEGEND';
        return 'WORD MASTER';
    };

    return (
        <div className="w-full max-w-md animate-retro-fade p-4">
             <div className="w-full flex justify-center mb-8">
                <h1 className={`font-pixel text-xl sm:text-2xl text-center leading-tight pixel-border bg-retro-dark p-4 pixel-text-shadow ${won ? 'text-retro-secondary' : 'text-retro-primary'}`}>
                    {won ? '🎉 LEVEL CLEARED! 🎉' : '💀 GAME OVER 💀'}
                </h1>
            </div>

            <PixelCard>
                <div className="text-center mb-8">
                    <div className="text-retro-light text-xs font-pixel mb-2">FINAL SCORE</div>
                    <div className="font-pixel text-retro-accent text-5xl mb-2 pixel-text-shadow">{score}</div>
                </div>

                <div className="mb-8 p-4 bg-retro-pixel-2 border-2 border-retro-pixel-1 text-center">
                    <div className="font-pixel text-xs text-retro-secondary mb-2">🏆 ACHIEVEMENT</div>
                    <p className="text-retro-light text-xl font-retro">{getAchievement()}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <PixelButton variant="accent" fullWidth onClick={onRestart}>
                        {won ? 'NEXT LEVEL' : 'TRY AGAIN'}
                    </PixelButton>
                    <PixelButton variant="default" fullWidth onClick={onHome}>
                        RETURN TO MAP
                    </PixelButton>
                </div>
            </PixelCard>
        </div>
    );
};