import React, { useState } from 'react';
import { CATEGORIES, getLevelsCount } from '../data/vocabulary';
import { CategoryID, UserProgress } from '../types';
import { PixelButton, PixelCard } from './RetroUI';
import { Lock, Star, ArrowLeft } from 'lucide-react';

interface LevelSelectProps {
    progress: UserProgress;
    onSelectLevel: (category: CategoryID, levelIndex: number) => void;
    onBack: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({ progress, onSelectLevel, onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryID | null>(null);

    // If no category selected, show category list
    if (!selectedCategory) {
        return (
            <div className="w-full max-w-lg animate-retro-fade p-4">
                <div className="flex items-center mb-6">
                    <button onClick={onBack} className="mr-4 text-retro-light hover:text-retro-accent">
                        <ArrowLeft />
                    </button>
                    <h1 className="font-pixel text-lg text-retro-accent">SELECT DIFFICULTY</h1>
                </div>
                
                <div className="grid gap-6">
                    {(Object.keys(CATEGORIES) as CategoryID[]).map((catId) => {
                        const cat = CATEGORIES[catId];
                        // Basic logic: Count total stars in this category
                        const catProgress = progress[catId] || {};
                        const totalStars = Object.values(catProgress).reduce((sum, lvl) => sum + lvl.stars, 0);

                        return (
                            <PixelCard key={catId} className="hover:border-retro-accent cursor-pointer transition-colors group" >
                                <div onClick={() => setSelectedCategory(catId)}>
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="font-pixel text-retro-secondary group-hover:text-retro-accent">{cat.name}</h2>
                                        <div className="flex items-center text-retro-accent text-sm">
                                            <Star size={16} className="mr-1 fill-retro-accent" /> {totalStars}
                                        </div>
                                    </div>
                                    <p className="font-retro text-xl text-retro-pixel-7">{cat.description}</p>
                                </div>
                            </PixelCard>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Show levels for selected category
    const levelCount = getLevelsCount(selectedCategory);
    const levels = Array.from({ length: levelCount }, (_, i) => i);
    
    return (
        <div className="w-full max-w-lg animate-retro-fade p-4">
             <div className="flex items-center mb-6 justify-between">
                <div className="flex items-center">
                    <button onClick={() => setSelectedCategory(null)} className="mr-4 text-retro-light hover:text-retro-accent">
                        <ArrowLeft />
                    </button>
                    <h1 className="font-pixel text-lg text-retro-accent">{CATEGORIES[selectedCategory].name}</h1>
                </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {levels.map((lvlIdx) => {
                    const lvlProgress = progress[selectedCategory]?.[lvlIdx];
                    const isUnlocked = lvlIdx === 0 || lvlProgress?.unlocked || progress[selectedCategory]?.[lvlIdx - 1]?.score > 0;
                    
                    // Force unlock for demo purposes if needed, but let's stick to logic
                    // Logic: Level 0 is always unlocked. Level N unlocked if Level N-1 has score > 0.
                    const isPlayable = lvlIdx === 0 || (progress[selectedCategory]?.[lvlIdx - 1]?.score > 0);

                    return (
                        <button
                            key={lvlIdx}
                            disabled={!isPlayable}
                            onClick={() => onSelectLevel(selectedCategory, lvlIdx)}
                            className={`
                                aspect-square pixel-border flex flex-col items-center justify-center relative
                                ${isPlayable 
                                    ? 'bg-retro-dark hover:bg-retro-secondary hover:text-retro-dark text-retro-light cursor-pointer' 
                                    : 'bg-retro-pixel-1 text-retro-pixel-6 cursor-not-allowed opacity-50'}
                            `}
                        >
                            <span className="font-pixel text-lg">{lvlIdx + 1}</span>
                            {!isPlayable && <Lock size={12} className="absolute bottom-2" />}
                            {isPlayable && lvlProgress?.score > 0 && (
                                <div className="absolute bottom-1 flex gap-[1px]">
                                    <Star size={8} className="fill-retro-accent text-retro-accent" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};