import { Metadata } from 'next';
import Image from 'next/image';
import { GoogleMap } from '@/components/maps/GoogleMap';

export const metadata: Metadata = {
  title: 'Contact Us | Disaster Recovery QLD',
  description: '24/7 emergency water damage restoration services in Southeast Queensland. Contact us for immediate assistance with water damage, flood cleanup, or mould remediation.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <Image
            src="/images/water-damage-restoration.jpg"
            alt="Contact Disaster Recovery QLD"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/90">
              Available 24/7 for emergency water damage restoration services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              
              {/* Emergency Contact */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Emergency Service</h3>
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-lg"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  1300 309 361
                </a>
                <p className="mt-2 text-gray-600">
                  Available 24/7 for emergency response
                </p>
              </div>

              {/* Office Location */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Head Office</h3>
                <address className="not-italic">
                  <p>17 Tile St</p>
                  <p>Wacol, QLD 4076</p>
                  <p>Australia</p>
                </address>
              </div>

              {/* Business Hours */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Emergency Service:</span>
                    <br />24/7 Availability
                  </p>
                  <p>
                    <span className="font-medium">Office Hours:</span>
                    <br />Monday - Friday: 8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>

              {/* Service Areas */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Service Areas</h3>
                <ul className="space-y-2">
                  <li>Brisbane</li>
                  <li>Gold Coast</li>
                  <li>Ipswich</li>
                  <li>Sunshine Coast</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Our Location</h2>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <GoogleMap
                center={{ lat: -27.5598, lng: 152.9169 }}
                zoom={15}
                markers={[
                  {
                    position: { lat: -27.5598, lng: 152.9169 },
                    title: 'Disaster Recovery QLD'
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
