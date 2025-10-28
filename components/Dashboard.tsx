import React from 'react';
import Card from './common/Card';
import { View } from '../types';
import { CalculatorIcon, DocumentIcon, ChecklistIcon, QuestionIcon, ArrowRightIcon, AcademicCapIcon } from './common/Icons';

interface DashboardProps {
    setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {

    const mainFeatures = [
        {
            view: 'calculator' as View,
            icon: <CalculatorIcon className="w-8 h-8 text-primary" />,
            title: 'Labor Cost Calculator',
            description: 'Estimate project labor costs with and without prevailing wage.'
        },
        {
            view: 'applicability' as View,
            icon: <DocumentIcon className="w-8 h-8 text-primary" />,
            title: 'Applicability Wizard',
            description: 'Determine if PW laws apply to your specific project.'
        },
        {
            view: 'checklist' as View,
            icon: <ChecklistIcon className="w-8 h-8 text-primary" />,
            title: 'Compliance Checklist',
            description: 'Generate tailored checklists for each project stage.'
        },
        {
            view: 'qa' as View,
            icon: <QuestionIcon className="w-8 h-8 text-primary" />,
            title: 'Regulatory Q&A',
            description: 'Ask our AI assistant about complex PW regulations.'
        },
        {
            view: 'apprenticeship' as View,
            icon: <AcademicCapIcon className="w-8 h-8 text-primary" />,
            title: 'Apprenticeship Resources',
            description: 'Find and hire skilled apprentices from state-approved programs.'
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Welcome, Contractor!</h1>
                <p className="text-text-secondary text-base mt-1">Your all-in-one tool for mastering California's prevailing wage.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainFeatures.map(feature => (
                    <button key={feature.view} onClick={() => setView(feature.view)} className="text-left">
                        <Card className="h-full flex flex-col justify-between hover:border-primary hover:shadow-lg transition-all transform hover:-translate-y-1">
                            <div>
                                {feature.icon}
                                <h2 className="text-lg font-bold text-text-primary mt-4">{feature.title}</h2>
                                <p className="text-sm text-text-secondary mt-1">{feature.description}</p>
                            </div>
                            <div className="flex items-center justify-end text-primary font-semibold mt-4">
                                Go <ArrowRightIcon className="w-4 h-4 ml-1" />
                            </div>
                        </Card>
                    </button>
                ))}
                 <Card className="h-full flex flex-col justify-between md:col-span-2 lg:col-span-1">
                    <div>
                        <h2 className="text-xl font-bold text-text-primary mb-2">Need Expert Help?</h2>
                        <p className="text-text-secondary mb-4 text-sm">Our compliance services can save you time and mitigate risks on complex projects.</p>
                    </div>
                    <button onClick={() => setView('services')} className="w-full text-center mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition shadow">
                        Explore Services
                    </button>
                </Card>
            </div>

            <Card>
                <h2 className="text-xl font-bold text-text-primary mb-2">Pro Tip of the Day</h2>
                <p className="text-text-secondary">
                   <strong>Keep Meticulous Records:</strong> Always document the "who, what, when, where, and how" for each worker on a daily basis. These daily logs are your best defense in an audit. Clearly separate travel time, non-covered work, and covered prevailing wage tasks.
                </p>
            </Card>

        </div>
    );
}

export default Dashboard;