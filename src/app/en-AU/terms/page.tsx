import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Disaster Recovery QLD',
  description: 'Read our terms of service to understand the conditions for using Disaster Recovery QLD services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg">
            <p>
              These terms of service outline the rules and regulations for using Disaster Recovery QLD&apos;s services.
            </p>

            <h2>Service Agreement</h2>
            <p>
              By engaging our services, you agree to:
            </p>
            <ul>
              <li>Provide accurate information about the damage</li>
              <li>Grant necessary access to the property</li>
              <li>Pay for services as agreed</li>
              <li>Cooperate with our technicians</li>
              <li>Follow safety instructions</li>
            </ul>

            <h2>Service Delivery</h2>
            <p>
              We commit to:
            </p>
            <ul>
              <li>Respond promptly to emergency calls</li>
              <li>Provide professional services</li>
              <li>Use industry-standard equipment and techniques</li>
              <li>Follow safety protocols</li>
              <li>Maintain necessary licenses and insurance</li>
            </ul>

            <h2>Payment Terms</h2>
            <p>
              Our payment terms include:
            </p>
            <ul>
              <li>Clear pricing communication</li>
              <li>Insurance claim assistance</li>
              <li>Payment upon service completion</li>
              <li>Multiple payment options</li>
            </ul>

            <h2>Liability</h2>
            <p>
              While we take every precaution:
            </p>
            <ul>
              <li>We maintain comprehensive insurance coverage</li>
              <li>We are not liable for pre-existing damage</li>
              <li>We document property conditions before work begins</li>
              <li>We follow industry best practices</li>
            </ul>

            <h2>Service Warranty</h2>
            <p>
              Our services include:
            </p>
            <ul>
              <li>Satisfaction guarantee</li>
              <li>Quality assurance checks</li>
              <li>Follow-up inspections as needed</li>
              <li>Prompt resolution of any issues</li>
            </ul>

            <h2>Cancellation Policy</h2>
            <p>
              Our cancellation policy includes:
            </p>
            <ul>
              <li>24-hour notice for non-emergency services</li>
              <li>Flexible rescheduling options</li>
              <li>Emergency service priority</li>
            </ul>

            <h2>Contact Information</h2>
            <p>
              For questions about these terms:
            </p>
            <ul>
              <li>Phone: 1300 309 361</li>
              <li>Email: terms@disasterrecoveryqld.au</li>
              <li>Address: 17 Tile St, Wacol QLD 4076</li>
            </ul>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our services 
              constitutes acceptance of updated terms.
            </p>

            <p className="text-sm text-gray-600 mt-8">
              Last updated: {new Date().toLocaleDateString('en-AU', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
