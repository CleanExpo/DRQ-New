interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Our Process</h2>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
