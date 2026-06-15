// Central registry of HTML pages mounted as iframe routes.
// To add a new page in the future:
//   1. Drop the .html file into `public/pages/`.
//   2. Add an entry below.
//   3. (Optional) Restart the dev server.

const pages = [
  {
    path: '/nexusai-rfp',
    file: '/pages/nexusai-rfp.html',
    title: 'Nexus AI — RFP/RFQ Workflow',
    description: 'RFP/RFQ workflow prototype.',
  },
  {
    path: '/fenix-fleet-operations',
    file: '/pages/fenix-fleet-operations.html',
    title: 'Fenix Rail — Fleet Operations',
    description: 'ServitizeIQ fleet operations dashboard.',
  },
  {
    path: '/wine-industry',
    file: '/pages/wine-industry.html',
    title: 'Vinotech — Fleet Operations',
    description: 'ServitizeIQ fleet operations for the wine industry.',
  },
  {
    path: '/usled-cm-portfolio',
    file: '/pages/usled-cm-portfolio-dashboard.html',
    title: 'US LED — Customer Portfolio · Commercial',
    description: 'US LED commercial customer portfolio dashboard.',
  },
  {
    path: '/ecom-intelligence-platform',
    file: '/pages/l2-intelligence-demand.html',
    title: 'L2 Intelligence — E-com Intelligence Platform',
    description:
      'E-commerce intelligence platform with linked Demand, Channel, Inventory, and Sales Copilot views.',
  },
];

export default pages;
