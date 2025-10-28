import React, { useState, useMemo } from 'react';
import { LineItem, CalculationResult } from '../types';
import { CALIFORNIA_COUNTIES, CRAFT_TYPES, PW_RATES_BY_COUNTY, MARKUPS } from '../constants';
import Card from './common/Card';
import Modal from './common/Modal';
import { InfoIcon } from './common/Icons';
import { v4 as uuidv4 } from 'uuid';

const Calculator: React.FC = () => {
    const [lineItems, setLineItems] = useState<LineItem[]>([
        { id: uuidv4(), craft: "Electrician (General)", isPrevailingWage: false, hours: 160, numWorkers: 2 },
        { id: uuidv4(), craft: "Laborer (General)", isPrevailingWage: false, hours: 80, numWorkers: 1 },
    ]);
    const [county, setCounty] = useState<string>("Los Angeles");
    const [systemSize, setSystemSize] = useState<number>(50);
    const [materialCostPerWatt, setMaterialCostPerWatt] = useState<number>(1.25);
    const [results, setResults] = useState<CalculationResult | null>(null);
    const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);

    const handleAddItem = () => {
        setLineItems([...lineItems, { id: uuidv4(), craft: "Electrician (General)", isPrevailingWage: false, hours: 0, numWorkers: 1 }]);
    };

    const handleRemoveItem = (id: string) => {
        setLineItems(lineItems.filter(item => item.id !== id));
    };

    const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
        setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item));
    };
    
    const calculateLaborCosts = (items: LineItem[]) => {
        let totalHours = 0, totalDirectLaborCost = 0;
        let hasPrevailingWage = false;

        const resultLineItems = items.map(item => {
            const craftInfo = CRAFT_TYPES.find(c => c.name === item.craft);
            if (!craftInfo) return null;

            let rate = craftInfo.nonPwRate;
            if (item.isPrevailingWage) {
                hasPrevailingWage = true;
                rate = PW_RATES_BY_COUNTY[county]?.[item.craft] ?? craftInfo.pwRate;
            }

            const itemCost = item.hours * item.numWorkers * rate;
            totalHours += item.hours * item.numWorkers;
            totalDirectLaborCost += itemCost;

            return { id: item.id, craft: item.craft, hours: item.hours, numWorkers: item.numWorkers, rate, cost: itemCost };
        }).filter(Boolean) as CalculationResult['lineItems'];

        const marginRate = hasPrevailingWage ? MARKUPS.MARGIN_PW : MARKUPS.MARGIN_NON_PW;
        const adminCost = totalDirectLaborCost * MARKUPS.ADMIN;
        const insuranceCost = totalDirectLaborCost * MARKUPS.INSURANCE;
        const margin = (totalDirectLaborCost + adminCost + insuranceCost) * marginRate;
        const laborGrandTotal = totalDirectLaborCost + adminCost + insuranceCost + margin;
        
        return { totalHours, totalDirectLaborCost, adminCost, insuranceCost, margin, laborGrandTotal, lineItems: resultLineItems, marginRate };
    };


    const calculateCosts = () => {
        // 1. Calculate labor costs with user's selections
        const actualLaborResults = calculateLaborCosts(lineItems);

        // 2. Calculate baseline non-PW labor costs
        const nonPwLineItems = lineItems.map(item => ({ ...item, isPrevailingWage: false }));
        const nonPwLaborResults = calculateLaborCosts(nonPwLineItems);

        // 3. Calculate project-level costs
        const nonLaborCost = systemSize * 1000 * materialCostPerWatt;
        const totalProjectCost = nonLaborCost + actualLaborResults.laborGrandTotal;
        const prevailingWageImpact = actualLaborResults.laborGrandTotal - nonPwLaborResults.laborGrandTotal;

        setResults({
            ...actualLaborResults,
            nonLaborCost,
            totalProjectCost,
            prevailingWageImpact,
        });
    };

    const getRateSourceText = (craft: string) => {
        if (PW_RATES_BY_COUNTY[county]?.[craft]) {
            return `Source: ${county} County specific rate (2025-26 dataset).`;
        }
        return `Source: General statewide estimate. Verify with DIR for ${county} County.`;
    };

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Total Project Cost Calculator</h1>
                <p className="text-text-secondary text-base mt-1">Estimate total project costs including materials, labor, and prevailing wage impacts.</p>
            </header>

            <Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label htmlFor="county-select" className="block text-sm font-medium text-text-secondary">Project County</label>
                        <select id="county-select" value={county} onChange={e => setCounty(e.target.value)} className="mt-1 block w-full p-2 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface">
                            {CALIFORNIA_COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="system-size" className="block text-sm font-medium text-text-secondary">System Size (kW AC)</label>
                        <input id="system-size" type="number" value={systemSize} onChange={e => setSystemSize(parseFloat(e.target.value) || 0)} className="mt-1 block w-full p-2 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface" />
                    </div>
                     <div>
                        <label htmlFor="material-cost" className="block text-sm font-medium text-text-secondary">Material & Other Costs ($/W)</label>
                        <input id="material-cost" type="number" step="0.01" value={materialCostPerWatt} onChange={e => setMaterialCostPerWatt(parseFloat(e.target.value) || 0)} className="mt-1 block w-full p-2 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-surface" />
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mt-8 mb-2">Labor Breakdown</h3>
                <div className="space-y-4">
                    {lineItems.map((item) => {
                        const craftInfo = CRAFT_TYPES.find(c => c.name === item.craft);
                        let rate = 0;
                        if (craftInfo) {
                            rate = item.isPrevailingWage
                                ? (PW_RATES_BY_COUNTY[county]?.[item.craft] ?? craftInfo.pwRate)
                                : craftInfo.nonPwRate;
                        }
                        
                        return (
                            <div key={item.id} className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-12 gap-3 items-end p-3 rounded-lg bg-background border border-border relative">
                                <div className="col-span-2 sm:col-span-4 md:col-span-4">
                                    <label htmlFor={`craft-${item.id}`} className="text-xs text-text-secondary block">Craft</label>
                                    <select id={`craft-${item.id}`} value={item.craft} onChange={e => handleItemChange(item.id, 'craft', e.target.value)} className="w-full p-2 border border-border rounded-md bg-surface">
                                        {CRAFT_TYPES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor={`hours-${item.id}`} className="text-xs text-text-secondary block">Hours</label>
                                    <input id={`hours-${item.id}`} type="number" value={item.hours} onChange={e => handleItemChange(item.id, 'hours', parseInt(e.target.value) || 0)} className="w-full p-2 border border-border rounded-md bg-surface" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor={`workers-${item.id}`} className="text-xs text-text-secondary block">Workers</label>
                                    <input id={`workers-${item.id}`} type="number" value={item.numWorkers} onChange={e => handleItemChange(item.id, 'numWorkers', parseInt(e.target.value) || 0)} className="w-full p-2 border border-border rounded-md bg-surface" />
                                </div>
                                <div className="col-span-2 sm:col-span-2 md:col-span-2">
                                    <label className="text-xs text-text-secondary block">Rate</label>
                                    <div className="w-full p-2 bg-slate-200 border border-transparent rounded-md text-text-primary text-center font-medium">
                                        {formatCurrency(rate)}
                                    </div>
                                </div>
                                <div className="col-span-2 sm:col-span-2 md:col-span-2 flex items-center h-10">
                                    <input type="checkbox" id={`pw-${item.id}`} checked={item.isPrevailingWage} onChange={e => handleItemChange(item.id, 'isPrevailingWage', e.target.checked)} className="h-4 w-4 text-primary rounded border-border focus:ring-primary" />
                                    <label htmlFor={`pw-${item.id}`} className="ml-2 text-sm text-text-secondary">Prevailing Wage?</label>
                                </div>
                                <div className="col-span-2 sm:col-span-2 md:col-span-1 flex items-center justify-end h-10">
                                    {lineItems.length > 1 && (
                                        <button onClick={() => handleRemoveItem(item.id)} className="text-slate-400 hover:text-red-500 text-3xl font-bold transition-colors leading-none" aria-label="Remove item">&times;</button>
                                    )}
                                </div>
                                {item.isPrevailingWage && (
                                    <div className="col-span-full md:col-start-5 md:col-span-8 text-right -mt-2">
                                        <p className="text-xs text-text-tertiary italic">{getRateSourceText(item.craft)}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button onClick={handleAddItem} className="w-full sm:w-auto px-4 py-2 bg-slate-200 text-text-secondary font-semibold rounded-md hover:bg-slate-300 transition">+ Add Item</button>
                    <button onClick={calculateCosts} className="w-full sm:w-auto px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition transform hover:scale-105 shadow-lg">Calculate</button>
                </div>
            </Card>

            {results && (
                <Card className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Project Cost Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-background p-4 rounded-lg text-center border border-border">
                            <p className="text-sm text-text-secondary">Total Project Cost</p>
                            <p className="text-2xl sm:text-3xl font-bold text-primary">{formatCurrency(results.totalProjectCost)}</p>
                        </div>
                         <div className="bg-background p-4 rounded-lg text-center border border-border">
                            <div className="flex items-center justify-center">
                                <p className="text-sm text-text-secondary">Prevailing Wage Impact</p>
                                <InfoIcon onClick={() => setIsImpactModalOpen(true)} className="w-4 h-4 ml-2 text-text-tertiary cursor-pointer hover:text-primary"/>
                            </div>
                            <p className={`text-2xl sm:text-3xl font-bold ${results.prevailingWageImpact > 0 ? 'text-red-600' : 'text-text-primary'}`}>
                                {formatCurrency(results.prevailingWageImpact)}
                            </p>
                        </div>
                        <div className="bg-background p-4 rounded-lg text-center border border-border">
                            <p className="text-sm text-text-secondary">Total Labor Cost</p>
                            <p className="text-2xl sm:text-3xl font-bold text-text-primary">{formatCurrency(results.laborGrandTotal)}</p>
                        </div>
                    </div>
                    <div className="mt-6 space-y-2 text-sm text-text-secondary bg-background p-4 rounded-lg border border-border">
                       <h3 className="font-bold text-text-primary mb-2">Cost Breakdown:</h3>
                       <p><strong className="text-text-primary w-48 inline-block">Non-Labor Costs:</strong> {formatCurrency(results.nonLaborCost)}</p>
                       <p><strong className="text-text-primary w-48 inline-block">Direct Labor Cost:</strong> {formatCurrency(results.totalDirectLaborCost)}</p>
                       <p><strong className="text-text-primary w-48 inline-block">Admin ({MARKUPS.ADMIN * 100}% of direct labor):</strong> {formatCurrency(results.adminCost)}</p>
                       <p><strong className="text-text-primary w-48 inline-block">Insurance ({MARKUPS.INSURANCE * 100}% of direct labor):</strong> {formatCurrency(results.insuranceCost)}</p>
                       <p><strong className="text-text-primary w-48 inline-block">Margin ({ (results.marginRate) * 100}% of subtotal):</strong> {formatCurrency(results.margin)}</p>
                    </div>
                </Card>
            )}

            <Modal isOpen={isImpactModalOpen} onClose={() => setIsImpactModalOpen(false)} title="Understanding Prevailing Wage Impact">
                <div className="space-y-4 text-text-secondary">
                    <p>The <strong className="text-text-primary">Prevailing Wage Impact</strong> is the total additional cost your project incurs due to prevailing wage laws. This includes not only the direct increase in hourly wages but also the associated increase in administrative costs, insurance, and contractor margin.</p>
                    <h4 className="font-semibold text-text-primary">How is it calculated?</h4>
                    <p>We calculate the total labor cost (including all markups) twice:</p>
                    <ol className="list-decimal list-inside space-y-1 pl-2">
                        <li>Based on your "Prevailing Wage" selections.</li>
                        <li>Assuming no prevailing wage is applied.</li>
                    </ol>
                    <p>The difference between these two totals is the value you see. It represents the true financial impact of prevailing wage on your project's bottom line.</p>
                     <div className="text-xs text-slate-500 pt-4 mt-4 border-t border-border">
                        <strong>Disclaimer:</strong> This information is for estimation purposes only and is not a substitute for legal counsel. Always consult the official <a href="https://www.dir.ca.gov/Public-Works/Prevailing-Wage.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CA Department of Industrial Relations (DIR)</a> for the most current and authoritative wage determinations.
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Calculator;