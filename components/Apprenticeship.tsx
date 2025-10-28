import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import { AcademicCapIcon, DocumentIcon, ShieldCheckIcon, UsersIcon } from './common/Icons';
import { CALIFORNIA_COUNTIES, APPRENTICESHIP_PROGRAMS } from '../constants';

const Apprenticeship: React.FC = () => {
    const [selectedCounty, setSelectedCounty] = useState<string>('Los Angeles');

    const programs = useMemo(() => {
        return APPRENTICESHIP_PROGRAMS[selectedCounty] || [];
    }, [selectedCounty]);

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Apprenticeship Resources</h1>
                <p className="text-text-secondary text-base mt-1">Build your skilled workforce by hiring from California's state-approved apprenticeship programs.</p>
            </header>

            <Card>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 text-center">How to Hire an Apprentice: A Contractor's Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary-light text-primary-dark rounded-full font-bold text-2xl mb-4 border-2 border-primary">1</div>
                        <h3 className="font-semibold text-text-primary text-lg">Find a Program</h3>
                        <p className="text-text-secondary text-sm mt-1">Use the tool below to find a state-approved program for the required trade in your project's county.</p>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center justify-center w-16 h-16 bg-primary-light text-primary-dark rounded-full font-bold text-2xl mb-4 border-2 border-primary">2</div>
                        <h3 className="font-semibold text-text-primary text-lg">Sign an Agreement</h3>
                        <p className="text-text-secondary text-sm mt-1">Contact the program and complete the necessary paperwork to become a signatory contractor, agreeing to their terms and standards.</p>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center justify-center w-16 h-16 bg-primary-light text-primary-dark rounded-full font-bold text-2xl mb-4 border-2 border-primary">3</div>
                        <h3 className="font-semibold text-text-primary text-lg">Request an Apprentice</h3>
                        <p className="text-text-secondary text-sm mt-1">Once approved, you can formally request apprentices from the program's dispatch hall for your project needs.</p>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center justify-center w-16 h-16 bg-primary-light text-primary-dark rounded-full font-bold text-2xl mb-4 border-2 border-primary">4</div>
                        <h3 className="font-semibold text-text-primary text-lg">Meet Ratio Requirements</h3>
                        <p className="text-text-secondary text-sm mt-1">Ensure you maintain the correct journeyman-to-apprentice ratio on the jobsite as required by California law.</p>
                    </div>
                </div>
            </Card>

            <Card>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">Key Requirements &amp; Ratios</h2>
                <p className="text-text-secondary mb-6">Before hiring an apprentice for a prevailing wage job, you must understand these critical state requirements:</p>
                <div className="space-y-5">
                    <div className="flex items-start gap-4">
                        <UsersIcon className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-text-primary">The Journeyman-to-Apprentice Ratio</h3>
                            <p className="text-sm text-text-secondary mt-1">For most trades, California law requires at least one hour of journeyman work for every hour of apprentice work on the job site, per craft. This is commonly known as the <strong>1-to-1 ratio</strong>. Some apprenticeship programs may have different approved ratios for their trade. Failure to maintain the proper ratio is a common and costly violation.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <ShieldCheckIcon className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-text-primary">Contractor Approval &amp; Program Contribution</h3>
                            <p className="text-sm text-text-secondary mt-1">You must be approved by the Division of Apprenticeship Standards (DAS) to employ apprentices. This typically means becoming a signatory to a local Joint Apprenticeship Committee (JAC) or having your own state-approved program. You are also required to make training fund contributions for every hour worked by both journeymen and apprentices.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <DocumentIcon className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-text-primary">Notification and Dispatch Paperwork</h3>
                            <p className="text-sm text-text-secondary mt-1">For each public works contract, you must submit a Contract Award Information form (<strong>DAS 140</strong>) to the relevant apprenticeship committee. To hire an apprentice, you must then submit an Apprentice Dispatch Request (<strong>DAS 142</strong>) to that committee.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    <strong>Official Source:</strong> For the most current and detailed regulations, always refer to the <a href="https://www.dir.ca.gov/public-works/apprenticeship-requirements.html" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">California DIR Apprenticeship Requirements page</a>.
                </div>
            </Card>


            <Card>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">Find a Program by County</h2>
                <div>
                    <label htmlFor="county-select" className="block text-sm font-medium text-text-secondary">Select your project county to see a list of approved programs.</label>
                    <select 
                        id="county-select" 
                        value={selectedCounty} 
                        onChange={e => setSelectedCounty(e.target.value)} 
                        className="mt-1 block w-full md:w-1/2 p-2 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface"
                    >
                        {CALIFORNIA_COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div className="mt-6 space-y-4">
                    {programs.length > 0 ? (
                        programs.map(program => (
                            <div key={program.name} className="p-4 border border-border rounded-lg bg-background">
                                <h3 className="font-bold text-lg text-text-primary">{program.name}</h3>
                                <p className="font-semibold text-primary text-sm">{program.trade}</p>
                                <p className="text-text-secondary text-sm mt-2">{program.contact}</p>
                                <a href={program.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline mt-2 inline-block">
                                    Visit Website &rarr;
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-6 bg-slate-50 rounded-lg">
                            <p className="text-text-secondary">No specific programs are listed for <strong className="text-text-primary">{selectedCounty}</strong> County in our database yet.</p>
                            <p className="text-sm text-text-tertiary mt-2">
                                For a complete, statewide list of all programs, please consult the official DIR database.
                            </p>
                            <a href="https://www.dir.ca.gov/databases/das/aigstart.asp" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-4 py-2 bg-primary text-white font-semibold text-sm rounded-md hover:bg-primary-dark transition">
                                Search CA DIR Database
                            </a>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Apprenticeship;