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
];

export default pages;
