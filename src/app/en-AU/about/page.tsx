import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Disaster Recovery QLD',
  description: 'Professional water damage restoration experts serving Southeast Queensland. Learn about our 24/7 emergency services and commitment to excellence.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <Image
            src="/images/water-damage-restoration.jpg"
            alt="About Disaster Recovery QLD"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Disaster Recovery QLD
            </h1>
            <p className="text-xl text-white/90">
              Your trusted partner in water damage restoration and emergency services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
              <h2>Our Commitment to Excellence</h2>
              <p>
                At Disaster Recovery QLD, we understand that water damage emergencies can strike at any time. 
                That&apos;s why we provide 24/7 emergency response services across Southeast Queensland, ensuring 
                rapid assistance when you need it most.
              </p>

              <h3>Professional Expertise</h3>
              <p>
                Our team consists of highly trained and certified technicians with extensive experience in 
                water damage restoration, flood cleanup, and mould remediation. We use industry-leading 
                equipment and follow best practices to ensure the highest quality results.
              </p>

              <h3>Comprehensive Services</h3>
              <ul>
                <li>24/7 Emergency Response</li>
                <li>Water Damage Restoration</li>
                <li>Flood Damage Cleanup</li>
                <li>Mould Remediation</li>
                <li>Storm Damage Repair</li>
                <li>Sewage Cleanup</li>
              </ul>

              <h3>Our Service Areas</h3>
              <p>
                We proudly serve the following areas in Southeast Queensland:
              </p>
              <ul>
                <li>Brisbane CBD & Inner Suburbs</li>
                <li>Western Brisbane Suburbs</li>
                <li>South Brisbane Suburbs</li>
                <li>Eastern Brisbane Suburbs</li>
                <li>Gold Coast & Hinterlands</li>
                <li>Ipswich & Surrounding Areas</li>
                <li>Logan City & Logan Village</li>
                <li>Redland Shire</li>
              </ul>

              <h3>Why Choose Us?</h3>
              <ul>
                <li>Available 24/7 for emergencies</li>
                <li>Rapid response times</li>
                <li>Certified technicians</li>
                <li>Industry-leading equipment</li>
                <li>Insurance claim assistance</li>
                <li>Satisfaction guaranteed</li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Need Emergency Assistance?</h3>
              <p className="text-lg mb-6">
                Our team is available 24/7 to help with your water damage emergency.
              </p>
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Call 1300 309 361
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
