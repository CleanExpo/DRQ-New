import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Disaster Recovery QLD',
  description: 'Learn about how Disaster Recovery QLD protects your privacy and handles your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg">
            <p>
              At Disaster Recovery QLD, we take your privacy seriously. This privacy policy explains how we collect, 
              use, and protect your personal information.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Property address and details</li>
              <li>Insurance information (if applicable)</li>
              <li>Service history and preferences</li>
              <li>Communication records</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul>
              <li>Provide our restoration services</li>
              <li>Process insurance claims</li>
              <li>Communicate about your service</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized 
              access, alteration, disclosure, or destruction.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Insurance companies (with your consent)</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal and regulatory authorities when required</li>
            </ul>

            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our privacy policy or your personal information, please contact us:
            </p>
            <ul>
              <li>Phone: 1300 309 361</li>
              <li>Email: privacy@disasterrecoveryqld.au</li>
              <li>Address: 17 Tile St, Wacol QLD 4076</li>
            </ul>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The latest version will always be available 
              on our website.
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
