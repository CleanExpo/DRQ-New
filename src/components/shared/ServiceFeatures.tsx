interface ServiceFeaturesProps {
  features: readonly string[];
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">Features & Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">
              {feature.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
