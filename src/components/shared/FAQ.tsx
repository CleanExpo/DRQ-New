'use client';

import { useState } from 'react';
import { FAQS } from '@/config/faqs';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  service: string;
  faqs?: FAQItem[];
}

export function FAQ({ service, faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = faqs || FAQS[service] || FAQS['default'];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {questions.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-lg">{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
