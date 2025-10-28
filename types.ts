export type View = 'dashboard' | 'calculator' | 'applicability' | 'checklist' | 'qa' | 'services' | 'apprenticeship';

export interface LineItem {
  id: string;
  craft: string;
  isPrevailingWage: boolean;
  hours: number;
  numWorkers: number;
}

export interface CalculationResult {
  // Labor cost breakdown
  totalHours: number;
  totalDirectLaborCost: number;
  adminCost: number;
  insuranceCost: number;
  margin: number;
  laborGrandTotal: number;
  lineItems: {
    id: string;
    craft: string;
    hours: number;
    numWorkers: number;
    rate: number;
    cost: number;
  }[];

  // Project-level cost summary
  nonLaborCost: number;
  totalProjectCost: number;
  prevailingWageImpact: number;
}