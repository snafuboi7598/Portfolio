import React, { useState, useEffect } from 'react';
import { saveLead } from '../services/apiService';
import { Mail, Loader2, Check, User, Phone } from 'lucide-react';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Add dataLayer to window interface for GTM
declare global {
    interface Window {
      dataLayer: any[];
    }
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal is closed
            setTimeout(() => {
                setFormData({ name: '', email: '', phone: '' });
                setStatus('idle');
                setMessage('');
            }, 300);
        }
    }, [isOpen]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setStatus('error');
            setMessage('Please enter your name.');
            return;
        }
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }
        
        setStatus('loading');
        setMessage('');

        try {
            await saveLead(formData);
            setStatus('success');
            setMessage("Thank you! I'll be in touch soon.");
            
            // Push event to Google Tag Manager dataLayer
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'lead_submission',
                lead_category: 'Resume Portfolio Interest',
                lead_email_hash: formData.email // Basic example, consider hashing PII
            });

            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            setStatus('error');
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again later.';
            setMessage(errorMessage);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 rounded-xl shadow-2xl p-8 m-4 w-full max-w-md border border-gray-700 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up"
                style={{ animation: 'fade-in-up 0.3s ease-out forwards' }}
                onClick={(e) => e.stopPropagation()}
            >
                <style>{`
                    @keyframes fade-in-up {
                        to {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                `}</style>
                <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
                <p className="text-gray-400 mb-6">Interested in my profile? Leave your details, and I'll connect with you.</p>
                
                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full bg-gray-900 border border-gray-600 rounded-md py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                disabled={status === 'loading' || status === 'success'}
                                required
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className="w-full bg-gray-900 border border-gray-600 rounded-md py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                disabled={status === 'loading' || status === 'success'}
                                required
                            />
                        </div>
                         <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number (Optional)"
                                className="w-full bg-gray-900 border border-gray-600 rounded-md py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                disabled={status === 'loading' || status === 'success'}
                            />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={status === 'loading' || status === 'success'}
                    >
                        {status === 'loading' && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
                        {status === 'success' && <Check className="w-5 h-5 mr-2" />}
                        {status === 'success' ? 'Sent!' : 'Connect'}
                    </button>
                    {message && (
                        <p className={`mt-3 text-sm text-center ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};