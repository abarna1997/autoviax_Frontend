import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AutoViaX" },
      {
        name: "description",
        content:
          "How AutoViaX collects, processes, secures and retains personal and vehicle telemetry data across our Autonomous Mobility Intelligence platform.",
      },
      { property: "og:title", content: "AutoViaX Privacy Policy" },
      {
        property: "og:description",
        content: "Our commitments on data collection, processing, retention, security and your rights.",
      },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    body: [
      "AutoViaX (“AutoViaX”, “we”, “us”, founded 10 May 2023), operated globally by Autoviax Mobility (Pvt) Ltd (Sri Lanka) and Autoviax Automotive Systems Inc. (USA), provides an Autonomous Mobility Intelligence platform to automotive and logistics organisations. This policy explains what data we handle, why we handle it, and the choices available to you.",
      "It applies to autoviax.net (https://autoviax.net), our marketing communications, and the AutoViaX platform when we act as a data controller. Where we process customer fleet data on behalf of a customer, we act as a processor under that customer's instructions and the terms of their agreement.",
    ],
  },
  {
    id: "collect",
    title: "2. Data we collect",
    list: [
      "Contact data: name, work email, company, role and any message you send us through forms or email.",
      "Usage data: pages visited, referrer, approximate region and device type, collected in aggregate.",
      "Platform data: fleet telemetry, sensor-derived events, route and energy records processed on behalf of our customers.",
      "Support data: correspondence, tickets and session notes generated when you contact our teams.",
    ],
  },
  {
    id: "use",
    title: "3. How we use data",
    list: [
      "To respond to enquiries, arrange demonstrations and provide the services requested.",
      "To operate, secure, monitor and improve the platform and its safety-critical functions.",
      "To produce aggregated analytics and environmental reporting for customers.",
      "To meet legal, regulatory, homologation and audit obligations.",
    ],
  },
  {
    id: "basis",
    title: "4. Legal bases",
    body: [
      "We rely on legitimate interests for operating and improving our services and for business communications; on contract performance where processing is necessary to deliver the platform; on consent where required for marketing; and on legal obligation where retention or disclosure is mandated.",
    ],
  },
  {
    id: "sharing",
    title: "5. Sharing and sub-processors",
    body: [
      "We do not sell personal data. We share data with vetted sub-processors for hosting, communications and analytics, each bound by written data processing terms and audited for security posture. A current sub-processor list is available on request.",
    ],
  },
  {
    id: "retention",
    title: "6. Retention",
    body: [
      "Contact data is retained for up to 24 months after last interaction unless you ask us to erase it earlier. Platform and evidence records are retained according to customer configuration and applicable safety or regulatory requirements, and are deleted or returned at the end of the engagement.",
    ],
  },
  {
    id: "security",
    title: "7. Security",
    list: [
      "Encryption in transit and at rest across all environments.",
      "Role-based access control with least-privilege defaults and full audit trails.",
      "Regional data residency options for platform deployments.",
      "Continuous monitoring, penetration testing and documented incident response.",
    ],
  },
  {
    id: "rights",
    title: "8. Your rights",
    body: [
      "Depending on your jurisdiction you may request access, correction, erasure, restriction, portability, or object to certain processing. Where AutoViaX acts as a processor, we will forward your request to the relevant controller. Contact privacy@autoviax.net and we will respond within one month.",
    ],
  },
  {
    id: "transfers",
    title: "9. International transfers",
    body: [
      "Where data leaves its region of origin, we use recognised transfer mechanisms including Standard Contractual Clauses along with supplementary technical measures such as regional key management.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact",
    body: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to our team at privacy@autoviax.net or contact our regional offices below:",
    ],
    list: [
      "Company Name: Autoviax (Founded: 10 May 2023) | Website: https://autoviax.net",
      "Sri Lanka Office & Legal Entity: Autoviax Mobility (Pvt) Ltd — 75 Station Road, Nugegoda, Sri Lanka — Phone: +94 11 267 9834",
      "USA Office & Legal Entity: Autoviax Automotive Systems Inc. — 500 North Brand Boulevard, Suite 1800, Glendale, CA 91203, USA — Phone: +1 818 555 6319",
      "Data Protection Enquiries: privacy@autoviax.net",
      "Regulatory Authority: If you are unsatisfied with our response, you may lodge a complaint with your local supervisory authority.",
    ],
  },
];

function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="Last updated: 1 September 2026"
      intro="We handle mobility data that is operationally sensitive and, in some cases, personal. This policy sets out exactly how, in plain language."
      sections={SECTIONS}
    />
  );
}
