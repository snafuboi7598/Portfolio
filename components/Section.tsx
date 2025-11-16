
import React from 'react';

interface SectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, icon, children }) => {
    return (
        <section className="mb-8 relative">
            <div className="flex items-center mb-4">
                <span className="text-blue-400 mr-3">{icon}</span>
                <h2 className="text-2xl font-bold text-gray-100 tracking-wide">{title}</h2>
            </div>
            <div className="pl-8 border-l-2 border-gray-700/50">
                {children}
            </div>
        </section>
    );
};
