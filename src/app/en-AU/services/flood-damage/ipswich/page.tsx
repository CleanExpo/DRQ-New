import { Metadata } from "next";
import { ServiceLocationPage } from "@/components/templates/ServiceLocationPage";
import { SERVICES } from "@/config/services";
import { LOCATIONS } from "@/config/locations";

export const metadata: Metadata = {
  title: "Flood Damage Restoration Ipswich | Expert Water Damage Services",
  description: "Professional flood damage restoration in Ipswich. 24/7 emergency service, fast response. Protect your property from water damage. Call now for immediate help.",
};

export default function IpswichFloodDamagePage() {
  const service = SERVICES['flood-damage'];
  const location = LOCATIONS['ipswich'];

  return (
    <ServiceLocationPage
      service={service}
      location={location}
    />
  );
}
