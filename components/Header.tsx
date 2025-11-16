
import React from 'react';
import { Mail, Phone, Linkedin, Github, Code, Instagram } from 'lucide-react';

interface Link {
    name: string;
    url: string;
}

interface Contact {
    email: string;
    phone: string;
    links: Link[];
}

interface HeaderProps {
    name: string;
    contact: Contact;
}

const iconMap: { [key: string]: React.ElementType } = {
    LinkedIn: Linkedin,
    GitHub: Github,
    LeetCode: Code,
    Instagram: Instagram,
};

export const Header: React.FC<HeaderProps> = ({ name, contact }) => {
    return (
        <header className="mb-10 border-b border-gray-700 pb-6">
            <h1 className="text-5xl font-extrabold text-white tracking-tight mb-2">{name}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>{contact.email}</span>
                </a>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                </a>
                {contact.links.map(link => {
                    const Icon = iconMap[link.name];
                    return (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                            {Icon && <Icon className="w-4 h-4" />}
                            <span>{link.name}</span>
                        </a>
                    );
                })}
            </div>
        </header>
    );
};
