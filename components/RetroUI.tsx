import React from 'react';
import { MAX_HEALTH } from '../constants';
import { Home } from 'lucide-react';

// --- Button ---
interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'default';
    fullWidth?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ 
    children, 
    variant = 'default', 
    fullWidth = false, 
    className = '',
    ...props 
}) => {
    const baseStyle = "font-pixel py-3 px-4 pixel-btn text-center text-sm disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-retro-primary hover:bg-retro-accent text-retro-light",
        secondary: "bg-retro-secondary hover:bg-retro-accent text-retro-dark",
        accent: "bg-retro-accent hover:bg-retro-secondary text-retro-dark",
        default: "bg-retro-dark border-2 border-retro-pixel-7 hover:border-retro-accent text-retro-light"
    };

    return (
        <button 
            className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// --- Container/Card ---
interface PixelCardProps {
    children: React.ReactNode;
    className?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-retro-dark pixel-border p-6 ${className}`}>
            {children}
        </div>
    );
};

// --- Health Bar ---
interface HealthDisplayProps {
    health: number;
}

export const HealthDisplay: React.FC<HealthDisplayProps> = ({ health }) => {
    return (
        <div className="flex gap-1">
            {Array.from({ length: MAX_HEALTH }).map((_, i) => (
                <div 
                    key={i}
                    className={`w-5 h-5 border-2 border-retro-pixel-1 transition-colors duration-200 ${
                        i < health ? 'bg-retro-pixel-9' : 'bg-retro-pixel-6'
                    }`}
                />
            ))}
        </div>
    );
};

// --- Progress Bar ---
interface ProgressBarProps {
    value: number; // 0 to 100
    label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label }) => {
    return (
        <div className="w-full">
            <div className="h-4 bg-retro-pixel-6 border-2 border-retro-pixel-1 mb-2">
                <div 
                    className="h-full bg-retro-pixel-12 transition-all duration-300 steps-4" 
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                />
            </div>
            {label && (
                <div className="text-center text-xs text-retro-pixel-7 font-pixel">
                    {label}
                </div>
            )}
        </div>
    );
};

// --- Header/HUD ---
interface GameHUDProps {
    level: number;
    score: number;
    health: number;
    totalLevels: number;
    onHome: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({ level, score, health, totalLevels, onHome }) => {
    return (
        <div className="w-full bg-retro-dark pixel-border p-3 mb-4 flex justify-between items-center z-10 sticky top-2 shadow-lg">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onHome}
                    className="p-2 border-2 border-retro-pixel-7 hover:bg-retro-accent hover:text-retro-dark text-retro-light transition-colors"
                    title="Return to Home"
                >
                    <Home size={16} />
                </button>
                <div className="font-pixel text-xs flex flex-col sm:flex-row sm:gap-4">
                    <div><span className="text-retro-accent">LVL:</span> {level}</div>
                    <div><span className="text-retro-accent">PTS:</span> {score}</div>
                </div>
            </div>
            <HealthDisplay health={health} />
        </div>
    );
};