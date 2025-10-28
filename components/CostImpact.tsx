

import React, { useState, useCallback } from 'react';
import { generateContent } from '../services/geminiService';
import Card from './common/Card';
import GeminiResponse from './common/GeminiResponse';

const CostImpact: React.FC = () => {
  const [companyFocus, setCompanyFocus] = useState<'efficiency' | 'growth' | 'quality'>('efficiency');
  const [crewExperience, setCrewExperience] = useState<'new' | 'mixed' | 'veteran'>('mixed');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    const prompt = `
      Provide a detailed Project Cost Impact Analysis for a California solar contractor dealing with prevailing wage requirements.
      The company's primary focus is on **${companyFocus}**, and their crew's experience level is **${crewExperience}**.

      Offer actionable advice in the following areas to help them manage prevailing wage costs effectively:
      1.  **Strategic Crew Composition:** (e.g., optimal journeyman-to-apprentice ratios, use of pre-fabrication)
      2.  **Productivity Optimization:** (e.g., specific tools, software, or workflow changes)
      3.  **Documentation & Administrative Efficiency:** (e.g., tips for managing CPRs, using software)
      4.  **Client Communication Strategies:** (e.g., how to explain PW costs to clients to maintain trust and win bids)

      Tailor the advice to the company's focus and crew experience. Format the response with clear markdown headings and bullet points.
    `;
    const result = await generateContent(prompt);

    if (result.startsWith('An error occurred')) {
      setError(result);
    } else {
      setResponse(result);
    }
    setIsLoading(false);
  }, [companyFocus, crewExperience]);

  return (
    <div className="space-y-8 animate-fade-in">
       <header>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Project Cost Impact Analysis</h1>
          <p className="text-text-secondary text-base mt-1">Get strategic advice on managing prevailing wage costs effectively.</p>
      </header>

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-primary">Company Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary">Primary Company Focus</label>
            <select
              value={companyFocus}
              onChange={e => setCompanyFocus(e.target.value as 'efficiency' | 'growth' | 'quality')}
              className="mt-1 block w-full p-2 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface"
            >
              <option value="efficiency">Operational Efficiency</option>
              <option value="growth">Rapid Growth & Scaling</option>
              <option value="quality">Highest Quality Installation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Typical Crew Experience</label>
            <select
              value={crewExperience}
              onChange={e => setCrewExperience(e.target.value as 'new' | 'mixed' | 'veteran')}
              className="mt-1 block w-full p-2 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface"
            >
              <option value="new">Mostly New / In-training</option>
              <option value="mixed">Mixed Experience Levels</option>
              <option value="veteran">Highly Experienced / Veteran</option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition transform hover:scale-105 shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Get Strategic Advice'}
          </button>
        </div>
      </Card>

      {(isLoading || error || response) && <GeminiResponse isLoading={isLoading} error={error} response={response} title="Cost Impact Analysis & Strategies" />}
    </div>
  );
};

export default CostImpact;