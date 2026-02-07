import React, { useState, useEffect, useRef } from 'react';
import { Word } from '../types';
import { PixelButton, ProgressBar } from './RetroUI';
import { Volume2, Check } from 'lucide-react';
import { playPronunciation } from '../utils/audio';

interface SpellStageProps {
    wordData: Word;
    currentWordIndex: number;
    totalWords: number;
    totalWordsAnswered: number;
    totalTotalWords: number;
    onCorrect: () => void;
    onIncorrect: () => void;
}

export const SpellStage: React.FC<SpellStageProps> = ({ 
    wordData, 
    totalWordsAnswered,
    totalTotalWords,
    onCorrect, 
    onIncorrect 
}) => {
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setInputValue('');
        setStatus('IDLE');
    }, [wordData]);

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (status !== 'IDLE' || !inputValue.trim()) return;

        const cleanInput = inputValue.trim().toLowerCase();
        const correct = wordData.english.toLowerCase();

        if (cleanInput === correct) {
            setStatus('CORRECT');
            playPronunciation(wordData.english);
            setTimeout(() => onCorrect(), 1500);
        } else {
            setStatus('WRONG');
            setTimeout(() => {
                onIncorrect();
                setInputValue(''); // Optional: clear input on wrong? Or keep it? The original kept it briefly then cleared
                if (inputRef.current) inputRef.current.focus();
                // Reset status handled by parent usually unmounting or we reset here if parent keeps us mounted
                 setStatus('IDLE'); 
            }, 1500);
        }
    };

    const progress = ((totalWordsAnswered + 0.5) / totalTotalWords) * 100;

    return (
        <div className="w-full max-w-md animate-retro-fade">
            <div className="relative h-40 w-full mb-6 bg-retro-dark pixel-border flex flex-col items-center justify-center p-4">
                <div className="text-retro-pixel-7 text-xs mb-4 font-pixel">SPELL THE WORD</div>
                <h2 className="font-retro text-4xl sm:text-5xl text-retro-secondary text-center leading-tight pixel-text-shadow">
                    {wordData.chinese}
                </h2>
                <button 
                    onClick={() => playPronunciation(wordData.english)}
                    className="absolute top-4 right-4 text-retro-secondary hover:text-retro-accent transition-colors"
                >
                    <Volume2 size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="mb-6">
                <input 
                    ref={inputRef}
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-retro-dark border-2 border-retro-pixel-7 font-pixel text-retro-light p-4 text-center text-xl outline-none focus:border-retro-accent focus:shadow-[inset_0_0_0_2px_#000,0_0_0_2px_#feca57] transition-all mb-2"
                    placeholder="TYPE HERE..."
                    autoComplete="off"
                    disabled={status !== 'IDLE'}
                />
                
                {status === 'IDLE' && (
                    <div className="text-center text-xs text-retro-pixel-7 mt-2 animate-pixel-blink font-pixel">
                        PRESS ENTER TO SUBMIT
                    </div>
                )}
                {status === 'WRONG' && (
                     <div className="text-center text-xs text-retro-primary mt-2 font-pixel">
                        WRONG! TRY AGAIN
                    </div>
                )}
                {status === 'CORRECT' && (
                     <div className="text-center text-xs text-retro-secondary mt-2 font-pixel">
                        CORRECT!
                    </div>
                )}
            </form>

            <PixelButton 
                variant="accent" 
                fullWidth 
                onClick={() => handleSubmit()}
                className="mb-6"
                disabled={status !== 'IDLE'}
            >
                SUBMIT <Check className="inline ml-2" size={16} />
            </PixelButton>

            <ProgressBar value={progress} label={`STAGE 2 - SPELLING CHALLENGE`} />
        </div>
    );
};