import React, { useState, useCallback, useEffect } from 'react';
import { getLikes, updateLikes } from '../services/apiService';

const HeartIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-8 h-8 transition-all duration-300 ease-in-out ${className}`}
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

export const LikeButton: React.FC = () => {
    const [liked, setLiked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [likeCount, setLikeCount] = useState<number | null>(null);

    // Fetch initial likes from the backend
    useEffect(() => {
        const fetchInitialLikes = async () => {
            const count = await getLikes();
            setLikeCount(count);
        };
        fetchInitialLikes();
    }, []);


    const handleLike = useCallback(async () => {
        if (isAnimating || likeCount === null) return;

        const newLikedState = !liked;
        const originalLikeCount = likeCount;

        setLiked(newLikedState);
        setIsAnimating(true);
        setLikeCount(prev => (prev !== null ? (newLikedState ? prev + 1 : prev - 1) : null));

        try {
            await updateLikes(newLikedState);
        } catch (error) {
            console.error("Failed to update like count:", error);
            // Revert UI on error
            setLiked(!newLikedState);
            setLikeCount(originalLikeCount);
        }


        setTimeout(() => {
            setIsAnimating(false);
        }, 700);
    }, [liked, isAnimating, likeCount]);

    return (
        <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-300 hidden sm:inline">Show your love</span>
            <button
                onClick={handleLike}
                className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transform transition-transform duration-200 ease-in-out hover:scale-110"
                aria-label="Like button"
                disabled={likeCount === null}
            >
                {isAnimating && liked && (
                    <>
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute animate-float-up text-red-500"
                                style={{
                                    animationDelay: `${i * 0.1}s`,
                                    left: `${Math.random() * 80 - 10}%`,
                                }}
                            >
                                <HeartIcon filled={true} className="w-4 h-4" />
                            </div>
                        ))}
                    </>
                )}
                <HeartIcon 
                    filled={liked} 
                    className={`
                        ${liked ? 'text-red-500 scale-100' : 'text-gray-400'} 
                        ${isAnimating && liked ? 'scale-125' : ''}
                    `}
                />
            </button>
             <div className="text-lg font-bold text-white w-8 text-center">
                {likeCount === null ? '...' : likeCount}
             </div>
        </div>
    );
};
