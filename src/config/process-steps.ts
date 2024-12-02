export interface ProcessStep {
  title: string;
  description: string;
}

export const PROCESS_STEPS: Record<string, ProcessStep[]> = {
  'default': [
    {
      title: "24/7 Emergency Response",
      description: "Our team is available 24/7 to respond to your emergency. We'll be on-site within 60 minutes of your call."
    },
    {
      title: "Assessment & Planning",
      description: "We conduct a thorough assessment of the damage and develop a comprehensive restoration plan."
    },
    {
      title: "Professional Restoration",
      description: "Our certified technicians execute the restoration plan using industry-leading equipment and techniques."
    },
    {
      title: "Quality Assurance",
      description: "We perform detailed quality checks to ensure all restoration work meets our high standards."
    },
    {
      title: "Final Inspection",
      description: "A final walkthrough is conducted to ensure your complete satisfaction with our services."
    }
  ],
  'flood-damage': [
    {
      title: "Emergency Response",
      description: "Our flood damage team arrives quickly to assess the situation and prevent further damage."
    },
    {
      title: "Water Extraction",
      description: "We use professional-grade equipment to remove standing water and begin the drying process."
    },
    {
      title: "Damage Assessment",
      description: "A detailed assessment of structural damage and affected contents is performed."
    },
    {
      title: "Drying & Dehumidification",
      description: "Industrial-grade dehumidifiers and air movers are used to thoroughly dry the affected areas."
    },
    {
      title: "Restoration & Repairs",
      description: "We restore and repair damaged areas to their pre-flood condition."
    }
  ],
  'water-damage': [
    {
      title: "Rapid Response",
      description: "We arrive quickly to stop the water source and prevent further damage."
    },
    {
      title: "Water Removal",
      description: "Professional extraction equipment is used to remove all standing water."
    },
    {
      title: "Property Assessment",
      description: "We assess the extent of water damage and document affected areas."
    },
    {
      title: "Drying Process",
      description: "Advanced drying equipment is deployed to ensure thorough moisture removal."
    },
    {
      title: "Restoration",
      description: "We restore your property to its pre-damage condition."
    }
  ]
};
