import React, { useState, useCallback } from 'react';
import { generateContent } from '../services/geminiService';
import Card from './common/Card';
import GeminiResponse from './common/GeminiResponse';

type ProjectStage = 'pre-construction' | 'during-construction' | 'post-construction';

const Checklist: React.FC = () => {
    const [projectStage, setProjectStage] = useState<ProjectStage>('pre-construction');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        const prompt = `
            Generate a detailed prevailing wage compliance checklist for a California solar/storage contractor.
            The checklist should focus on the **${projectStage}** stage of a project.

            Please include specific, actionable items covering the following areas where applicable to the selected stage:
            - DIR Registration & Public Works Contractor Number
            - Wage Determinations (obtaining the correct one)
            - Certified Payroll Reporting (CPRs)
            - Apprentice Utilization and Ratios
            - On-site Postings and Worker Notices
            - Record Keeping Requirements
            - Fringe Benefit Statements

            Format the response as a clear, easy-to-follow checklist using markdown with headings and nested bullet points.
        `;

        const result = await generateContent(prompt);
        if (result.startsWith('An error occurred')) {
            setError(result);
        } else {
            setResponse(result);
        }
        setIsLoading(false);
    }, [projectStage]);

    return (
        <div className="space-y-8 animate-fade-in">
             <header>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Compliance Checklist Generator</h1>
                <p className="text-text-secondary text-base mt-1">Create a tailored checklist to ensure you stay compliant at every project stage.</p>
            </header>

            <Card>
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                    <div className="flex-grow">
                        <label htmlFor="project-stage-select" className="block text-sm font-medium text-text-secondary mb-1">Select Project Stage</label>
                        <select
                            id="project-stage-select"
                            value={projectStage}
                            onChange={e => setProjectStage(e.target.value as ProjectStage)}
                            className="block w-full p-2 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface"
                        >
                            <option value="pre-construction">Pre-Construction</option>
                            <option value="during-construction">During Construction</option>
                            <option value="post-construction">Post-Construction / Closeout</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full md:w-auto px-8 py-2.5 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition transform hover:scale-105 shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed self-end"
                    >
                        {isLoading ? 'Generating...' : 'Generate Checklist'}
                    </button>
                </div>
            </Card>

            {(isLoading || error || response) && <GeminiResponse isLoading={isLoading} error={error} response={response} title={`Compliance Checklist: ${projectStage.replace('-', ' ')}`} />}
        </div>
    );
};

export default Checklist;