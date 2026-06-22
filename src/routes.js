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
  {
    path: '/florida-hardware-po-intelligence',
    file: '/pages/florida-hardware-po-intelligence.html',
    title: 'Florida Hardware — Purchase Order Intelligence',
    description: 'Florida Hardware revenue intelligence platform for purchase order analysis.',
  },
  {
    path: '/banner-solutions',
    file: '/pages/banner-solutions.html',
    title: 'Banner Solutions — AI Storefront',
    description: 'Interactive AI storefront prototype for Banner Solutions.',
  },
  {
    path: '/icici-pru-preventive-maintenance',
    file: '/pages/icici-pru-fm-dashboard.html',
    title: 'ICICI Prudential — Preventive Maintenance',
    description:
      'Facility manager dashboard and 52-week PPM tracker for ICICI Prudential preventive maintenance.',
  },
];

export default pages;
