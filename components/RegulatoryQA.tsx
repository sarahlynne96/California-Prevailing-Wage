import React, { useState, useCallback } from 'react';
import { generateContent } from '../services/geminiService';
import Card from './common/Card';
import GeminiResponse from './common/GeminiResponse';

const PRESET_QUESTIONS = [
    "What are the key requirements of AB 2143 for solar projects?",
    "How does prevailing wage apply to energy storage projects?",
    "What is the process for submitting Certified Payroll Records (CPRs)?",
    "Explain the apprentice-to-journeyman ratio requirements in California.",
    "What are the penalties for non-compliance with prevailing wage laws?"
];

const RegulatoryQA: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (query?: string) => {
        const currentQuestion = query || question;
        if (!currentQuestion) return;

        setIsLoading(true);
        setError(null);
        setResponse(null);

        const result = await generateContent(currentQuestion);
        if (result.startsWith('An error occurred')) {
            setError(result);
        } else {
            setResponse(result);
        }
        setIsLoading(false);
    }, [question]);
    
    const handlePresetClick = (preset: string) => {
        setQuestion(preset);
        handleSubmit(preset);
    };

    return (
        <div className="space-y-8 animate-fade-in">
             <header>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Regulatory Q&amp;A</h1>
                <p className="text-text-secondary text-base mt-1">Ask our AI assistant about California's prevailing wage laws.</p>
            </header>

            <Card>
                <h2 className="text-xl font-semibold mb-2 text-primary">Ask a Question</h2>
                <p className="text-sm text-text-secondary mb-4">Get AI-powered answers based on current regulations.</p>
                <textarea
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder="e.g., What are the record-keeping requirements for prevailing wage projects?"
                    className="w-full p-3 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface"
                    rows={4}
                />
                <div className="mt-4 text-center">
                    <button
                        onClick={() => handleSubmit()}
                        disabled={isLoading || !question}
                        className="px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition transform hover:scale-105 shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Asking Gemini...' : 'Ask Question'}
                    </button>
                </div>
            </Card>

            <Card>
                <h2 className="text-xl font-semibold mb-4 text-primary">Or, Try a Preset Question</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PRESET_QUESTIONS.map(q => (
                        <button 
                            key={q} 
                            onClick={() => handlePresetClick(q)}
                            className="p-4 bg-background text-left rounded-lg hover:bg-slate-100 transition text-text-primary border border-border"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </Card>

            {(isLoading || error || response) && <GeminiResponse isLoading={isLoading} error={error} response={response} title="Gemini's Answer" />}
        </div>
    );
};

export default RegulatoryQA;