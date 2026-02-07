import React from 'react';
import { PixelButton, PixelCard } from './RetroUI';

interface StartScreenProps {
    onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <div className="w-full max-w-md animate-retro-fade p-4">
            <div className="w-full flex justify-center mb-8">
                <h1 className="font-pixel text-retro-accent text-xl sm:text-2xl text-center leading-tight pixel-border bg-retro-dark p-4 pixel-text-shadow">
                    🎮 WORD QUEST <br/> 8-BIT <span className="text-xs block mt-2 text-retro-secondary">v1.1</span>
                </h1>
            </div>

            <PixelCard>
                <div className="text-center mb-6">
                    <div className="font-pixel text-retro-secondary text-lg mb-2">English Vocab Adventure</div>
                    <div className="text-retro-accent text-xs font-pixel">CHOOSE YOUR PATH</div>
                </div>

                <div className="text-retro-light text-sm mb-6 space-y-3 font-retro text-lg">
                    <div className="flex items-center">
                        <span className="text-retro-primary mr-2">▶</span>
                        <span>3000+ Words in 3 Difficulties</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-retro-primary mr-2">▶</span>
                        <span>Auto-pronunciation Drills</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-retro-primary mr-2">▶</span>
                        <span>Level Unlock System</span>
                    </div>
                </div>

                <PixelButton variant="primary" fullWidth onClick={onStart} className="animate-pixel-pulse">
                    START ADVENTURE
                </PixelButton>
                
                <div className="mt-6 text-center text-xs text-retro-pixel-7 font-pixel">
                    CONTROLS: CLICK or TAP<br/>
                    SOUND ON 🔊
                </div>
            </PixelCard>
        </div>
    );
};