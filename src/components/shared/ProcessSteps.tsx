'use client';

import { PROCESS_STEPS, ProcessStep } from '@/config/process-steps';

export interface ProcessStepsProps {
  service?: string;
  steps?: ProcessStep[];
}

export function ProcessSteps({ service, steps }: ProcessStepsProps) {
  const processSteps = steps || PROCESS_STEPS[service || 'default'] || PROCESS_STEPS['default'];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
      <div className="max-w-4xl mx-auto">
        {processSteps.map((step, index) => (
          <div key={index} className="flex items-start mb-8 last:mb-0">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
