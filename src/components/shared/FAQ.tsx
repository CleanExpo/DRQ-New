'use client';

import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  faqs: FAQItem[];
}

export function FAQ({ title, faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2 text-center mb-12">
          {title}
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border rounded-lg overflow-hidden"
            >
              <button
                className="w-full text-left p-4 bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${openIndex === index ? 'max-h-96' : 'max-h-0'}
                `}
              >
                <div className="p-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
