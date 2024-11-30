import React from 'react';

const SERVICE_AREAS = [
  'Brisbane',
  'Gold Coast',
  'Ipswich',
  'Logan',
  'Redland',
  'Scenic Rim',
  'Somerset',
  'Gold Coast Hinterland'
] as const;

export function ServiceAreas() {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <h2 className="heading-2 text-center mb-12">
          Areas We Service
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {SERVICE_AREAS.map((area, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              {area}
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-gray-600">
          Serving all of South East Queensland with 24/7 emergency response
        </p>
      </div>
    </section>
  );
}
