import React from 'react';
import Spinner from './Spinner';
import { GeminiIcon } from './Icons';
import Card from './Card';

interface GeminiResponseProps {
  isLoading: boolean;
  error: string | null;
  response: string | null;
  title: string;
}

const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    // This is a very basic parser. A library like 'react-markdown' would be better for a real app.
    const createMarkup = (line: string) => {
        // Bold
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic
        line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
        return { __html: line };
    };

    return (
        <div className="prose prose-slate max-w-none text-text-secondary">
            {text.split('\n').map((line, index) => {
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-text-primary">{line.substring(4)}</h3>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-semibold mt-6 mb-3 text-text-primary">{line.substring(3)}</h2>;
                }
                if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold mt-8 mb-4 text-text-primary">{line.substring(2)}</h1>;
                }
                if (line.match(/^\s*[-*] /)) {
                    return <li key={index} className="ml-6 list-disc" dangerouslySetInnerHTML={createMarkup(line.replace(/^\s*[-*] /, ''))} />;
                }
                if (line.trim() === '') {
                    return <br key={index} />;
                }
                return <p key={index} dangerouslySetInnerHTML={createMarkup(line)} />;
            })}
        </div>
    );
};

const GeminiResponse: React.FC<GeminiResponseProps> = ({ isLoading, error, response, title }) => {
  return (
    <div className="mt-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
            <GeminiIcon className="w-8 h-8"/>
            <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
        </div>
        <Card>
            {isLoading && (
            <div className="flex items-center justify-center gap-4 p-8">
                <Spinner />
                <p className="text-text-secondary">Generating response from Gemini...</p>
            </div>
            )}
            {error && <div className="text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}
            {response && <div className="space-y-4"><SimpleMarkdown text={response} /></div>}
        </Card>
    </div>
  );
};

export default GeminiResponse;