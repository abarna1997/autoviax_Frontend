import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — AutoViaX" },
      {
        name: "description",
        content:
          "The terms governing use of the AutoViaX website and Autonomous Mobility Intelligence platform, including licences, obligations and liability.",
      },
      { property: "og:title", content: "AutoViaX Terms & Conditions" },
      {
        property: "og:description",
        content: "Licence terms, acceptable use, service levels, liability and governing law.",
      },
    ],
  }),
  component: Terms,
});

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of terms",
    body: [
      "By accessing autoviax.net (https://autoviax.net) or using any service provided by AutoViaX (“AutoViaX”, “we”, “us”, operated globally by Autoviax Mobility (Pvt) Ltd and Autoviax Automotive Systems Inc., founded 10 May 2023), you agree to these Terms & Conditions. If you are agreeing on behalf of an organisation, you confirm you have authority to bind that organisation.",
      "Where a signed master services agreement exists between your organisation and AutoViaX, that agreement prevails over these terms in the event of conflict.",
    ],
  },
  {
    id: "services",
    title: "2. The services",
    body: [
      "AutoViaX provides an Autonomous Mobility Intelligence platform including perception fusion, fleet orchestration, route intelligence and compliance modules, together with related documentation and support.",
      "The platform is decision-support infrastructure. It does not replace your legal responsibility for the safe operation of vehicles, personnel and facilities.",
    ],
  },
  {
    id: "licence",
    title: "3. Licence and restrictions",
    list: [
      "We grant a non-exclusive, non-transferable right to use the platform for your internal business operations during the subscription term.",
      "You may not reverse engineer, resell, sublicense or benchmark the platform for publication without written consent.",
      "You may not use the platform to build a competing autonomous mobility intelligence product.",
      "All intellectual property in the platform, models and documentation remains with AutoViaX.",
    ],
  },
  {
    id: "customer",
    title: "4. Customer responsibilities",
    list: [
      "Maintain accurate account information and safeguard credentials.",
      "Ensure you hold the rights and consents needed for data you submit to the platform.",
      "Operate vehicles and facilities in line with applicable law, homologation and insurer requirements.",
      "Configure retention, access and residency settings appropriate to your regulatory environment.",
    ],
  },
  {
    id: "data",
    title: "5. Customer data",
    body: [
      "You retain ownership of all data you submit. We process it to provide the services, and in aggregated, de-identified form to improve platform performance and safety models. On termination we return or delete customer data in line with the agreed retention schedule.",
    ],
  },
  {
    id: "availability",
    title: "6. Availability and support",
    body: [
      "Production environments target 99.9% monthly availability, excluding scheduled maintenance notified in advance. Support tiers, response times and escalation paths are defined in your order form.",
    ],
  },
  {
    id: "fees",
    title: "7. Fees and payment",
    body: [
      "Fees are set out in the applicable order form and are payable within 30 days of invoice unless otherwise agreed. Fees exclude taxes. Late payment may result in suspension after written notice.",
    ],
  },
  {
    id: "warranty",
    title: "8. Warranties and disclaimers",
    body: [
      "We warrant that the services will be provided with reasonable skill and care and in line with the documentation. Except as expressly stated, the services are provided without further warranties of any kind, including fitness for a particular purpose.",
    ],
  },
  {
    id: "liability",
    title: "9. Limitation of liability",
    body: [
      "Neither party is liable for indirect, incidental or consequential loss. Our aggregate liability is limited to the fees paid in the twelve months preceding the claim. Nothing limits liability for death or personal injury caused by negligence, fraud, or any liability that cannot be limited by law.",
    ],
  },
  {
    id: "term",
    title: "10. Term and termination",
    body: [
      "Subscriptions run for the term stated in the order form and renew unless either party gives notice. Either party may terminate for material breach unremedied within 30 days of written notice, or on insolvency.",
    ],
  },
  {
    id: "law",
    title: "11. Governing law",
    body: [
      "These terms are governed by the applicable laws of the jurisdiction of the contracting AutoViaX entity (Autoviax Automotive Systems Inc. in the United States or Autoviax Mobility (Pvt) Ltd in Sri Lanka), without prejudice to mandatory consumer protections in your country of residence.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact & Corporate Information",
    body: [
      "For questions, notices, or formal communications regarding these Terms & Conditions, please contact us at legal@autoviax.net or via our corporate offices:",
    ],
    list: [
      "Company Name: Autoviax (Founded: 10 May 2023) | Website: https://autoviax.net",
      "Sri Lanka Office & Legal Entity: Autoviax Mobility (Pvt) Ltd — 75 Station Road, Nugegoda, Sri Lanka — Phone: +94 11 267 9834",
      "USA Office & Legal Entity: Autoviax Automotive Systems Inc. — 500 North Brand Boulevard, Suite 1800, Glendale, CA 91203, USA — Phone: +1 818 555 6319",
      "Legal Enquiries: legal@autoviax.net",
    ],
  },
];

function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="Last updated: 1 September 2026"
      intro="These terms govern your use of the AutoViaX website and platform. They are written to be read, not skimmed past."
      sections={SECTIONS}
    />
  );
}
