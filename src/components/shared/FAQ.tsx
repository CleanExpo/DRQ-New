'use client';

import { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  service: string;
  faqs?: FAQItem[];
}

const defaultFAQs: Record<string, FAQItem[]> = {
  'water-damage': [
    {
      question: "How quickly can you respond to water damage emergencies?",
      answer: "We provide 24/7 emergency response and aim to be on-site within 60 minutes of your call in the Brisbane metropolitan area."
    },
    {
      question: "What should I do while waiting for your team to arrive?",
      answer: "If safe to do so, turn off the water source, remove valuable items from wet areas, and start removing excess water. However, wait for our professionals to handle any electrical hazards or extensive water removal."
    },
    {
      question: "Do you work with insurance companies?",
      answer: "Yes, we work directly with all major insurance companies and can help manage your claim process from start to finish."
    }
  ],
  'flood-damage': [
    {
      question: "How long does flood damage cleanup take?",
      answer: "The timeline varies depending on the extent of damage, but typically ranges from 3-7 days for initial cleanup and several weeks for complete restoration."
    },
    {
      question: "Can you save my belongings after a flood?",
      answer: "Many items can be saved with quick action and proper restoration techniques. We'll assess each item and provide professional cleaning and restoration services where possible."
    }
  ],
  'mould-remediation': [
    {
      question: "Is mould dangerous?",
      answer: "Some types of mould can cause health issues, especially for those with allergies or respiratory conditions. Professional remediation is recommended for any significant mould growth."
    },
    {
      question: "How do you prevent mould from returning?",
      answer: "We address the root cause of moisture problems, properly clean and treat affected areas, and provide recommendations for preventing future mould growth."
    }
  ],
  'default': [
    {
      question: "Do you provide emergency services?",
      answer: "Yes, we offer 24/7 emergency response services across Southeast Queensland."
    },
    {
      question: "Are your technicians certified?",
      answer: "Yes, all our technicians are fully certified and undergo regular training to stay current with industry best practices."
    },
    {
      question: "Do you provide free quotes?",
      answer: "Yes, we provide free initial assessments and detailed quotes for all our services."
    }
  ]
};

export function FAQ({ service, faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = faqs || defaultFAQs[service] || defaultFAQs['default'];

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
