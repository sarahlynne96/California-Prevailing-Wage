import React from 'react';
import Card from './common/Card';
import { UsersIcon } from './common/Icons';

const TalentCard: React.FC<{ name: string; craft: string; experience: string; location: string }> = ({ name, craft, experience, location }) => (
    <Card className="hover:shadow-lg transition-shadow">
        <h3 className="font-bold text-lg text-text-primary">{name}</h3>
        <p className="text-primary font-semibold">{craft}</p>
        <div className="text-sm text-text-secondary mt-2 space-y-1">
            <p><strong>Experience:</strong> {experience}</p>
            <p><strong>Location:</strong> {location}</p>
        </div>
        <button className="w-full mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition">
            Contact
        </button>
    </Card>
);


const FindTalent: React.FC = () => {
    const talentPool = [
        { name: 'John Doe', craft: 'Certified Electrician', experience: '10+ Years', location: 'Los Angeles, CA' },
        { name: 'Jane Smith', craft: 'General Laborer', experience: '5 Years', location: 'San Francisco, CA' },
        { name: 'Mike Johnson', craft: 'Roofer', experience: '8 Years', location: 'Sacramento, CA' },
        { name: 'Emily Davis', craft: 'Project Manager', experience: '12 Years', location: 'San Diego, CA' },
        { name: 'Chris Lee', craft: 'Apprentice Electrician', experience: '2 Years', location: 'Oakland, CA' },
        { name: 'Sarah Wilson', craft: 'Carpenter', experience: '7 Years', location: 'Fresno, CA' },
    ];
    
    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex items-center gap-4">
                <UsersIcon className="w-10 h-10 text-primary" />
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Find Compliant Talent</h1>
                    <p className="text-text-secondary text-base mt-1">Browse our network of skilled workers with prevailing wage project experience.</p>
                </div>
            </header>
            
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="craft-filter" className="block text-sm font-medium text-text-secondary">Craft</label>
                        <select id="craft-filter" className="mt-1 block w-full p-2 border border-border rounded-md shadow-sm bg-surface">
                            <option>All Crafts</option>
                            <option>Electrician</option>
                            <option>Laborer</option>
                            <option>Roofer</option>
                            <option>Project Manager</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="location-filter" className="block text-sm font-medium text-text-secondary">Location</label>
                        <input type="text" id="location-filter" placeholder="e.g., Los Angeles" className="mt-1 block w-full p-2 border border-border rounded-md shadow-sm bg-surface" />
                    </div>
                    <div className="flex items-end">
                        <button className="w-full px-4 py-2 bg-accent text-white font-bold rounded-md hover:bg-accent-dark transition">
                            Search
                        </button>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {talentPool.map(talent => <TalentCard key={talent.name} {...talent} />)}
            </div>
        </div>
    );
};

export default FindTalent;