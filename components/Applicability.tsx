import React, { useState, useCallback } from 'react';
import { generateContent } from '../services/geminiService';
import Card from './common/Card';
import GeminiResponse from './common/GeminiResponse';

interface FormState {
    projectType: 'solar' | 'storage' | 'solar-storage';
    systemSize: number;
    isPublicWork: boolean;
    hasStateFunding: boolean;
    isSmallBusiness: boolean;
}

const Applicability: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        projectType: 'solar',
        systemSize: 25,
        isPublicWork: false,
        hasStateFunding: false,
        isSmallBusiness: false,
    });
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: keyof FormState, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        const prompt = `
            Analyze whether California prevailing wage laws apply to the following project and provide a detailed explanation with references to relevant legislation (like AB 2143 and AB 1104).

            Project Details:
            - Project Type: ${form.projectType}
            - System Size (AC): ${form.systemSize} kW
            - Is it a public work (e.g., for a school, city, or state agency)? ${form.isPublicWork ? 'Yes' : 'No'}
            - Does the project receive state funding or incentives (e.g., SGIP, SOMAH)? ${form.hasStateFunding ? 'Yes' : 'No'}
            - Is the contracting company a "small business" as defined by California law? ${form.isSmallBusiness ? 'Yes' : 'No'}

            Based on these details, determine if prevailing wage is required. Explain the reasoning clearly, breaking it down by each relevant factor. Format the response with clear markdown headings and bullet points.
        `;

        const result = await generateContent(prompt);
        if (result.startsWith('An error occurred')) {
            setError(result);
        } else {
            setResponse(result);
        }
        setIsLoading(false);
    }, [form]);

    return (
        <div className="space-y-8 animate-fade-in">
             <header>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Prevailing Wage Applicability Wizard</h1>
                <p className="text-text-secondary text-base mt-1">Answer a few questions to determine if PW applies to your project.</p>
            </header>

            <Card>
                <h2 className="text-xl font-semibold mb-4 text-primary">Project Details</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary">Project Type</label>
                        <select value={form.projectType} onChange={e => handleChange('projectType', e.target.value)} className="mt-1 block w-full p-2 border border-border rounded-md shadow-sm bg-surface">
                            <option value="solar">Solar PV</option>
                            <option value="storage">Energy Storage</option>
                            <option value="solar-storage">Solar + Storage</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-text-secondary">System Size (kW AC)</label>
                        <input type="number" value={form.systemSize} onChange={e => handleChange('systemSize', parseInt(e.target.value) || 0)} className="mt-1 block w-full p-2 border border-border rounded-md shadow-sm bg-surface" />
                    </div>
                    <div className="flex items-start">
                        <input id="isPublicWork" type="checkbox" checked={form.isPublicWork} onChange={e => handleChange('isPublicWork', e.target.checked)} className="h-4 w-4 mt-1 text-primary rounded border-border focus:ring-primary" />
                        <label htmlFor="isPublicWork" className="ml-3 text-sm text-text-primary">Is this a public work (e.g., for a school, city, or state agency)?</label>
                    </div>
                     <div className="flex items-start">
                        <input id="hasStateFunding" type="checkbox" checked={form.hasStateFunding} onChange={e => handleChange('hasStateFunding', e.target.checked)} className="h-4 w-4 mt-1 text-primary rounded border-border focus:ring-primary" />
                        <label htmlFor="hasStateFunding" className="ml-3 text-sm text-text-primary">Does the project receive state funding or incentives (e.g., SGIP, SOMAH)?</label>
                    </div>
                     <div className="flex items-start">
                        <input id="isSmallBusiness" type="checkbox" checked={form.isSmallBusiness} onChange={e => handleChange('isSmallBusiness', e.target.checked)} className="h-4 w-4 mt-1 text-primary rounded border-border focus:ring-primary" />
                        <label htmlFor="isSmallBusiness" className="ml-3 text-sm text-text-primary">Is your company a "small business" under California law (relevant for AB 1104)?</label>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition transform hover:scale-105 shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Analyzing...' : 'Determine Applicability'}
                    </button>
                </div>
            </Card>
            
            {(isLoading || error || response) && <GeminiResponse isLoading={isLoading} error={error} response={response} title="Applicability Analysis" />}
        </div>
    );
};

export default Applicability;