import React from 'react';
import Card from './common/Card';
import { ClipboardListIcon, ShieldCheckIcon, ArchiveBoxIcon } from './common/Icons';

const services = [
    {
        icon: <ClipboardListIcon className="w-10 h-10 text-primary mb-4" />,
        title: 'Pre-Construction & Bidding Strategy',
        description: 'Start your project on the right foot. We help with accurate PW cost estimation for bids, DIR registration verification, and setting up compliant record-keeping systems before you even break ground.',
        features: ['Bid & Cost Analysis', 'DIR Registration Setup', 'Compliance System Implementation']
    },
    {
        icon: <ShieldCheckIcon className="w-10 h-10 text-primary mb-4" />,
        title: 'Active Project Compliance Management',
        description: 'Focus on the job, not the paperwork. We offer outsourced management of Certified Payroll Records (CPRs), apprentice ratio monitoring, and on-site audit readiness to keep your project running smoothly.',
        features: ['CPR Preparation & Submission', 'On-Site Audit Prep', 'Apprentice Ratio Tracking']
    },
    {
        icon: <ArchiveBoxIcon className="w-10 h-10 text-primary mb-4" />,
        title: 'Project Closeout & Audit Defense',
        description: 'Finish strong and stay protected. We handle final records submission, fringe benefit statement reconciliation, and provide expert representation in the event of a DIR audit or labor dispute.',
        features: ['Final Records Archiving', 'Fringe Benefit Reconciliation', 'DIR Audit Representation']
    }
];

const ComplianceServices: React.FC = () => {
    return (
        <div className="space-y-10 animate-fade-in">
            <header className="text-center">
                <h1 className="text-4xl font-extrabold text-text-primary tracking-tight">Navigate Prevailing Wage with Confidence</h1>
                <p className="text-text-secondary text-lg mt-2 max-w-3xl mx-auto">Focus on building, let us handle the paperwork. Our expert services are designed to integrate seamlessly with your workflow, saving you time and mitigating risk.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map(service => (
                    <Card key={service.title} className="flex flex-col text-center items-center transform transition-all hover:scale-105 hover:shadow-xl">
                        {service.icon}
                        <h2 className="font-bold text-primary text-xl mb-3">{service.title}</h2>
                        <p className="text-text-secondary text-sm flex-grow">{service.description}</p>
                        <ul className="mt-4 space-y-2 text-sm text-left">
                            {service.features.map(feature => (
                                <li key={feature} className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    <span className="text-text-secondary">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>

            <Card>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-text-primary mb-4">How It Works</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-6">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary-light text-primary-dark rounded-full font-bold text-2xl mb-4">1</div>
                        <h3 className="font-semibold text-text-primary text-lg">Free Consultation</h3>
                        <p className="text-text-secondary text-sm mt-1">Contact us for a no-obligation call to discuss your specific challenges and business needs.</p>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center justify-center w-16 h-16 bg-primary-light text-primary-dark rounded-full font-bold text-2xl mb-4">2</div>
                        <h3 className="font-semibold text-text-primary text-lg">Custom Proposal</h3>
                        <p className="text-text-secondary text-sm mt-1">We'll provide a clear, tailored proposal outlining the scope of services and pricing for your review.</p>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center justify-center w-16 h-16 bg-primary-light text-primary-dark rounded-full font-bold text-2xl mb-4">3</div>
                        <h3 className="font-semibold text-text-primary text-lg">Dedicated Support</h3>
                        <p className="text-text-secondary text-sm mt-1">Once approved, you'll get a dedicated compliance expert as your single point of contact.</p>
                    </div>
                </div>
            {/* Fix: Changed closing tag from </Grid> to </Card> to match opening <Card> tag. */}
            </Card>
            
            <Card className="text-center bg-slate-800">
                <h2 className="text-2xl font-bold mb-4 text-white">Ready to streamline your compliance?</h2>
                <p className="text-slate-300 max-w-2xl mx-auto mb-6">
                    Let's talk. A short conversation is the first step towards saving hours of administrative work and protecting your business from costly errors.
                </p>
                <button className="px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition transform hover:scale-105 shadow-lg">
                    Schedule Your Free Consultation
                </button>
            </Card>
        </div>
    );
};

export default ComplianceServices;