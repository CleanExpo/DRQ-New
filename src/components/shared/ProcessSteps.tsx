'use client';

export interface ProcessStepsProps {
  steps?: Array<{
    title: string;
    description: string;
  }>;
}

const defaultSteps = [
  {
    title: "24/7 Emergency Response",
    description: "Our team is available 24/7 to respond to your emergency. We'll be on-site within 60 minutes of your call."
  },
  {
    title: "Assessment & Planning",
    description: "We conduct a thorough assessment of the damage and develop a comprehensive restoration plan."
  },
  {
    title: "Professional Restoration",
    description: "Our certified technicians execute the restoration plan using industry-leading equipment and techniques."
  },
  {
    title: "Quality Assurance",
    description: "We perform detailed quality checks to ensure all restoration work meets our high standards."
  },
  {
    title: "Final Inspection",
    description: "A final walkthrough is conducted to ensure your complete satisfaction with our services."
  }
];

export function ProcessSteps({ steps = defaultSteps }: ProcessStepsProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
      <div className="max-w-4xl mx-auto">
        {steps.map((step, index) => (
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
