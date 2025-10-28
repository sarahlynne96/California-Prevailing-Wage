import React, { useState } from 'react';
import Card from './common/Card';
import { ClipboardListIcon, ShieldCheckIcon, ArchiveBoxIcon, PaperAirplaneIcon } from './common/Icons';
import Spinner from './common/Spinner';

const services = [
    {
        icon: <ClipboardListIcon className="w-10 h-10 text-primary mb-4" />,
        title: 'Pre-Construction & Bidding Strategy',
        description: 'Start your project right. We help with accurate PW cost estimation, DIR registration, and setting up compliant record-keeping systems before you break ground.',
        bestFor: 'Contractors who are new to prevailing wage or want to ensure their bids are both competitive and compliant from day one.',
        features: ['Bid & Cost Analysis', 'DIR Registration Setup', 'Compliance System Implementation', 'Wage Determination Analysis']
    },
    {
        icon: <ShieldCheckIcon className="w-10 h-10 text-primary mb-4" />,
        title: 'Active Project Compliance Management',
        description: 'Focus on the job, not the paperwork. We offer outsourced management of Certified Payroll Records (CPRs), apprentice monitoring, and on-site audit readiness.',
        bestFor: 'Busy contractors who want to offload the weekly administrative burden of CPRs and ongoing compliance tasks.',
        features: ['CPR Preparation & Submission', 'On-Site Audit Prep', 'Apprentice Ratio Tracking', 'Fringe Benefit Management']
    },
    {
        icon: <ArchiveBoxIcon className="w-10 h-10 text-primary mb-4" />,
        title: 'Project Closeout & Audit Defense',
        description: 'Finish strong and stay protected. We handle final records submission, fringe benefit reconciliation, and provide expert representation in case of a DIR audit.',
        bestFor: 'Contractors seeking peace of mind after project completion and robust support in the face of regulatory scrutiny.',
        features: ['Final Records Archiving', 'Fringe Benefit Reconciliation', 'DIR Audit Representation', 'Labor Dispute Support']
    }
];

const faqs = [
    {
        q: "Who are these services for?",
        a: "Our services are designed for California-based solar and energy storage contractors of all sizes, from small businesses to large commercial installers, who are navigating the complexities of prevailing wage."
    },
    {
        q: "How much do your services cost?",
        a: "Pricing is tailored to your specific needs. We offer project-based fees, monthly retainers, and hourly consulting. We provide a clear, custom proposal after our initial free consultation."
    },
    {
        q: "Why can't I just use software?",
        a: "Software is a great tool, but it can't replace expert oversight. We use software to improve efficiency, but our value lies in strategic advice, audit defense, and navigating the gray areas of PW law that software can't handle."
    },
    {
        q: "How do I get started?",
        a: "Simply fill out the contact form below! We'll reach out to schedule a free, no-obligation 30-minute consultation to discuss your specific challenges and how we can help."
    }
];

const ComplianceServices: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', service: 'not-sure', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting || isSubmitted) return;
        setIsSubmitting(true);

        const recipient = 'sarah@megawattbros.com';
        const subject = `New Consultation Request from ${formData.company || formData.name}`;
        const body = `A new consultation request has been submitted from the Prevailing Wage Assistant tool.

Details:
- Name: ${formData.name}
- Company: ${formData.company}
- Email: ${formData.email}
- Phone: ${formData.phone || 'N/A'}
- Service of Interest: ${formData.service}

Message:
${formData.message || 'No message provided.'}
        `;

        // Construct the mailto link, ensuring components are properly encoded
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
        
        // Open the user's default email client
        window.location.href = mailtoLink;

        // After attempting to open the mail client, update the UI to show the success state.
        // A brief timeout gives the browser a moment to process the mailto link before the UI re-renders.
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 500);
    };

    return (
        <div className="space-y-12 animate-fade-in">
            <header className="text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">Navigate Prevailing Wage with Confidence</h1>
                <p className="text-text-secondary text-base sm:text-lg mt-2 max-w-3xl mx-auto">Focus on building, let us handle the paperwork. Our expert services are designed to integrate seamlessly with your workflow, saving you time and mitigating risk.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map(service => (
                    <Card key={service.title} className="flex flex-col text-center items-center transform transition-all hover:scale-[1.02] hover:shadow-xl">
                        {service.icon}
                        <h2 className="font-bold text-primary text-xl mb-3">{service.title}</h2>
                        <p className="text-text-secondary text-sm flex-grow">{service.description}</p>
                         <p className="text-xs text-text-tertiary italic mt-4 p-2 bg-slate-50 rounded-md w-full"><strong className="font-semibold">Best For:</strong> {service.bestFor}</p>
                        <ul className="mt-4 space-y-2 text-sm text-left w-full">
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
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 text-center">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {faqs.map(faq => (
                        <div key={faq.q}>
                            <h3 className="font-semibold text-text-primary">{faq.q}</h3>
                            <p className="text-text-secondary text-sm mt-1">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                {isSubmitted ? (
                    <div className="text-center p-8">
                        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-text-primary mt-4">Thank You!</h2>
                        <p className="text-text-secondary mt-2">Your request has been sent. Our team will get back to you within one business day to schedule your consultation.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2 text-center">Request a Free Consultation</h2>
                        <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">Take the first step towards simplifying your compliance. Fill out the form below and we'll be in touch.</p>
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" name="name" placeholder="Full Name" required onChange={handleInputChange} className="w-full p-3 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface" />
                                <input type="text" name="company" placeholder="Company Name" required onChange={handleInputChange} className="w-full p-3 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface" />
                                <input type="email" name="email" placeholder="Email Address" required onChange={handleInputChange} className="w-full p-3 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface" />
                                <input type="tel" name="phone" placeholder="Phone Number (Optional)" onChange={handleInputChange} className="w-full p-3 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Service of Interest</label>
                                <select name="service" onChange={handleInputChange} className="w-full p-3 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface">
                                    <option value="not-sure">Not Sure / General Inquiry</option>
                                    <option value="bidding">Pre-Construction & Bidding</option>
                                    <option value="management">Active Project Management</option>
                                    <option value="closeout">Project Closeout & Audit Defense</option>
                                </select>
                            </div>
                             <div>
                                <textarea name="message" placeholder="Tell us about your project or compliance needs..." rows={4} onChange={handleInputChange} className="w-full p-3 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface"></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-10 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition transform hover:scale-105 shadow-lg disabled:bg-slate-300 disabled:cursor-wait">
                                    {isSubmitting ? <><Spinner className="w-5 h-5 border-white"/> Submitting...</> : <>Send Request <PaperAirplaneIcon className="w-5 h-5 -rotate-45"/></>}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </Card>
        </div>
    );
};

export default ComplianceServices;