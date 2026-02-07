import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Word } from '../types';
import { PixelButton, ProgressBar } from './RetroUI';
import { Volume2 } from 'lucide-react';
import { playPronunciation } from '../utils/audio';

interface ChoiceStageProps {
    wordData: Word;
    currentWordIndex: number;
    totalWords: number;
    onCorrect: () => void;
    onIncorrect: () => void;
}

export const ChoiceStage: React.FC<ChoiceStageProps> = ({ 
    wordData, 
    currentWordIndex,
    totalWords,
    onCorrect, 
    onIncorrect 
}) => {
    const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
    const [isASelected, setIsASelected] = useState(true); 
    const timeoutsRef = useRef<number[]>([]);

    // Randomize option placement only when the word changes
    useEffect(() => {
        setIsASelected(Math.random() > 0.5);
        setSelectedOption(null);
    }, [wordData]);

    // Auto-read 3 times
    useEffect(() => {
        // Clear previous scheduled reads
        timeoutsRef.current.forEach(window.clearTimeout);
        timeoutsRef.current = [];

        const scheduleRead = (delay: number) => {
            const id = window.setTimeout(() => {
                playPronunciation(wordData.english);
            }, delay);
            timeoutsRef.current.push(id);
        };

        // Schedule 3 reads: 0ms, 1500ms, 3000ms
        scheduleRead(500);
        scheduleRead(2000);
        scheduleRead(3500);

        return () => {
            timeoutsRef.current.forEach(window.clearTimeout);
        };
    }, [wordData]);

    const correctOption = useMemo(() => isASelected ? 'A' : 'B', [isASelected]);

    const handleSelect = (option: 'A' | 'B') => {
        if (selectedOption) return; 
        
        // Stop any pending audio when user makes a choice
        timeoutsRef.current.forEach(window.clearTimeout);

        setSelectedOption(option);
        
        if (option === correctOption) {
            playPronunciation(wordData.english);
            setTimeout(() => onCorrect(), 1000);
        } else {
            setTimeout(() => onIncorrect(), 1000);
        }
    };

    const progress = ((currentWordIndex) / totalWords) * 100;

    return (
        <div className="w-full max-w-md animate-retro-fade">
            <div className="relative h-48 w-full mb-6 bg-retro-dark pixel-border flex flex-col items-center justify-center p-4">
                <div className="absolute top-2 left-2 flex gap-1">
                    <div className="w-2 h-2 bg-retro-accent animate-pulse rounded-full"></div>
                    <div className="w-2 h-2 bg-retro-accent animate-pulse rounded-full delay-75"></div>
                    <div className="w-2 h-2 bg-retro-accent animate-pulse rounded-full delay-150"></div>
                </div>
                <div className="text-retro-pixel-7 text-xs mb-4 font-pixel">LISTEN & CHOOSE</div>
                <h2 className="font-pixel text-2xl md:text-4xl text-retro-light text-center leading-tight pixel-text-shadow break-all">
                    {wordData.english}
                </h2>
                <button 
                    onClick={() => playPronunciation(wordData.english)}
                    className="absolute top-4 right-4 text-retro-secondary hover:text-retro-accent transition-colors"
                >
                    <Volume2 size={24} />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
                
                <PixelButton 
                    variant={selectedOption && selectedOption === 'A' ? (correctOption === 'A' ? 'accent' : 'primary') : 'secondary'}
                    onClick={() => handleSelect('A')}
                    disabled={selectedOption !== null}
                    className="h-auto min-h-[60px] flex items-center justify-center text-lg"
                >
                    <span className="mr-2">A:</span> 
                    {isASelected ? wordData.chinese : wordData.fake}
                    {selectedOption === 'A' && correctOption === 'A' && <span className="ml-2">✅</span>}
                    {selectedOption === 'A' && correctOption !== 'A' && <span className="ml-2">❌</span>}
                </PixelButton>

                <PixelButton 
                    variant={selectedOption && selectedOption === 'B' ? (correctOption === 'B' ? 'accent' : 'primary') : 'primary'}
                    onClick={() => handleSelect('B')}
                    disabled={selectedOption !== null}
                    className="h-auto min-h-[60px] flex items-center justify-center text-lg"
                >
                    <span className="mr-2">B:</span> 
                    {isASelected ? wordData.fake : wordData.chinese}
                    {selectedOption === 'B' && correctOption === 'B' && <span className="ml-2">✅</span>}
                    {selectedOption === 'B' && correctOption !== 'B' && <span className="ml-2">❌</span>}
                </PixelButton>
            </div>

            <ProgressBar value={progress} label={`STAGE 1 - CHOICE ${currentWordIndex + 1}/${totalWords}`} />
        </div>
    );
};