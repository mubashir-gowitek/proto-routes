# DVA System Documentation

**DVA (Data Value Accelerator)** — Enterprise Architecture & Portfolio Intelligence Platform

---

## 📁 Frontend: dva-frontend-vite (`redesign/ea_prototype` branch)

### Base URL
```
VITE_API_URL / VITE_BACKEND_URL = http://localhost:8080 (or production URL)
```

### Frontend Architecture

#### Main Pages (`src/pages/`)

| Page | File | Purpose |
|------|------|---------|
| **Home** | `HomePage.jsx` | Dashboard home with survey overview |
| **Matrix** | `MatrixPage.jsx` | Strategic Alignment Matrix view |
| **Client Configurator** | `ClientConfiguratorPage.jsx` | Client/organization setup |
| **Client Profile** | `ClientProfilePage.jsx` | Client profile management |
| **Use Case Results** | `UseCaseResults.jsx` | Use case listing with scores |
| **Use Case Profile** | `UseCaseProfilePage.jsx` | Individual use case details |
| **Use Case Selector** | `UseCaseSelector.jsx` | Select use cases |
| **Use Case QA Dashboard** | `UseCaseQADashboard.jsx` | Q&A for use cases |
| **Capabilities Summary** | `CapabilitiesSummaryPage.jsx` | Capabilities overview |
| **Comprehensive Strategy** | `ComprehensiveStrategySummaryPage.jsx` | Full strategy document |
| **Strategy Summary** | `StrategySummaryPage.jsx` | Strategy summary view |
| **Financial QA** | `FinancialQAPage.jsx` | Financial questions & answers |
| **Chat** | `ChatPage.jsx` | Chat interface |
| **Documents** | `DocumentsPage.jsx` | Document management |
| **Document Management** | `DocumentManagementPage.jsx` | Document upload/manage |
| **Messages** | `MessagesPage.jsx` | User messages |
| **Playbook Page** | `PlaybookPage.jsx` | Playbook view |
| **Playbook Builder** | `PlaybookBuilderPage.jsx` | Build playbooks |
| **Playbook Draft** | `PlaybookDraftPage.jsx` | Draft playbooks |
| **Client Playbooks** | `ClientPlaybooksPage.jsx` | Client-specific playbooks |
| **Strategic Alignment** | `StrategicAlignmentDashboard.jsx` | Alignment dashboard |
| **Tools** | `ToolsPage.jsx` | Various tools |
| **Action Board** | `ActionBoard.jsx` | Action items |
| **Action Board Priority** | `ActionBoardPriority.jsx` | Prioritized actions |
| **Setup** | `SetupPage.jsx` | Initial setup flow |
| **Settings** | `SettingsPage.jsx` | User settings |
| **Matrix** | `MatrixPage.jsx` | 2x2 prioritization matrix |

#### Auth Pages (`src/pages/`)

| Page | File | Purpose |
|------|------|---------|
| Login | `LoginPage.tsx` | User login |
| Signup | `SignupPage.jsx` | User registration |
| Forgot Password | `ForgotPasswordPage.tsx` | Password recovery |
| Verify Email | `VerifyEmailPage.jsx` | Email verification |
| Verify Invitation | `VerifyInvitationPage.jsx` | Invitation verification |
| Logout | `LogoutPage.jsx` | Logout page |
| Subscription Success | `SubscriptionSuccessPage.tsx` | Payment success |
| Subscription Cancelled | `SubscriptionCancelledPage.tsx` | Payment cancelled |
| Subscription Management | `SubscriptionManagementPage.tsx` | Manage subscription |

#### Freemium Pages (`src/pages/freemium/`)

| Page | File | Purpose |
|------|------|---------|
| Data Strategy Overview | `DataStrategyOverview.jsx` | Freemium overview |
| Upgrade to Pro | `UpgradeToProPage.jsx` | Upgrade prompt |

#### Pro Flow Pages (`src/pages/pro/`)

| Page | File | Purpose |
|------|------|---------|
| ROI Modeling | `ROIModelingPage.jsx` | ROI calculations |
| Roadmap | `RoadmapPage.jsx` | Implementation roadmap |
| Approval | `ApprovalPage.jsx` | Approval workflow |
| Execution | `ExecutionPage.jsx` | Execution tracking |
| Resource Center | `ResourceCenterPage.jsx` | Resources |

#### Prototype/EA Pages (`src/prototype/pages/`)

| Page | File | Purpose |
|------|------|---------|
| EA Personalization | `EAPersonalizationPage.tsx` | Step 1: Personalization |
| EA Opportunities | `EAOpportunitiesPage.tsx` | Step 2: Evaluate & Shortlist |
| EA Decisions | `EADecisionsPage.tsx` | Deprecated (redirects) |
| EA Validation | `EAValidationPage.tsx` | Validation page |
| EA Activate | `EAActivatePage.tsx` | Step 3: Activate |
| EA ROI Model | `EAROIModelPage.tsx` | ROI modeling |
| EA Use Case Brief | `EAUseCaseBriefPage.tsx` | Use case profile |
| EA Scoring Rationalization | `EAScoringRationalizationPage.tsx` | Score explanations |
| EA Measure Weighting | `EAMeasureWeightingPage.tsx` | Weight configuration |
| EA Weights | `EAWeightsPage.tsx` | Weight settings |
| EA Context | `EAContextPage.tsx` | Context review |
| EA Initiative Command Center | `EAInitiativeCommandCenterPage.tsx` | Initiative drill-down |
| EA Upgrade | `EAUpgradePage.tsx` | Upgrade prompt |

#### Frontend Services (`src/services/`)

| Service | File | Purpose |
|---------|------|---------|
| API Service | `apiService.js` | Core API calls (survey, use cases, ROI) |
| Session Service | `sessionService.js` | Session management |
| Sessions API | `sessionsApiService.js` | Client/user session creation |
| HTTP Client | `http.js` | Axios-based HTTP client |
| Survey Service | `surveyService.js` | Survey CRUD operations |
| Client Profile | `clientProfileService.js` | Client profile operations |
| Subscription | `subscriptionService.js` | Subscription management |
| Mock Data | `mockData.js` | Development mock data |

#### Prototype Services (`src/prototype/services/`)

| Service | File | Purpose |
|---------|------|---------|
| Portfolio Intelligence | `portfolioIntelligenceService.ts` | PI section APIs |
| Use Case Explorer | `useCaseExplorerService.ts` | UC explorer APIs |

---

## 🖥️ Backend: dva-backend (`stage` branch)

### Base URL
```
http://localhost:8080 (local)
https://dva-backend-staging-xxx.run.app (staging)
```

### Backend Stack
- **Runtime**: Node.js with Express
- **Database**: BigQuery (`dva_dataset`)
- **Authentication**: Firebase Admin SDK
- **Port**: 8080

### Main Endpoints

#### Health
```
GET /health
GET /healthz
```

#### Use Cases (`/api/v2/useCases`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/useCases/list` | List all use cases |
| GET | `/api/v2/useCases/:id` | Get use case details |
| GET | `/api/v2/useCases/:id/profile` | Get use case profile |
| GET | `/api/v2/useCases/:id/sections` | Get sections |
| GET | `/api/v2/useCases/:id/scores` | Get scores |
| GET | `/api/v2/useCases/:id/rationalizations` | Get rationalizations |
| GET | `/api/v2/useCases/:id/roi` | Get ROI data |
| GET | `/api/v2/useCases/:id/risks` | Get risks |
| GET | `/api/v2/useCases/:id/alignment` | Get alignment |
| GET | `/api/v2/useCases/:id/roadmap` | Get roadmap |
| GET | `/api/v2/useCases/:id/feasibility` | Get feasibility |
| GET | `/api/v2/useCases/:id/artifact` | Get artifact |
| GET | `/api/v2/useCases/:id/qa` | Get Q&A |

#### Portfolio Intelligence (`/api/v2/portfolio-intelligence`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/portfolio-intelligence/:clientId` | Full PI report |
| GET | `/api/v2/portfolio-intelligence/:clientId/executive-summary` | Executive summary |
| GET | `/api/v2/portfolio-intelligence/:clientId/strategic-context` | Strategic context |
| GET | `/api/v2/portfolio-intelligence/:clientId/opportunity-landscape` | Opportunity landscape |
| GET | `/api/v2/portfolio-intelligence/:clientId/financial-impact` | Financial impact |
| GET | `/api/v2/portfolio-intelligence/:clientId/decision-canvas` | Decision canvas |
| GET | `/api/v2/portfolio-intelligence/:clientId/roadmap` | Roadmap |

#### Use Case Explorer (`/api/v2/use-case-explorer`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/use-case-explorer/:clientId/opportunities` | List opportunities |
| GET | `/api/v2/use-case-explorer/:clientId/opportunities/:useCaseId` | Get opportunity |
| GET | `/api/v2/use-case-explorer/:clientId/opportunities/:useCaseId/evaluation` | Get evaluation |
| GET | `/api/v2/use-case-explorer/:clientId/opportunities/:useCaseId/roi-model` | ROI model |
| GET | `/api/v2/use-case-explorer/:clientId/selection` | Get selected UCs |
| POST | `/api/v2/use-case-explorer/:clientId/selection` | Add UC to selection |
| DELETE | `/api/v2/use-case-explorer/:clientId/selection/:useCaseId` | Remove UC |

#### ROI (`/api/v2/roi`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/roi/:clientId/:useCaseId/calculations` | Get ROI calculations |
| GET | `/api/v2/roi/:clientId/:useCaseId/assumptions` | Get assumptions |

#### Roadmap (`/api/v2/roadmap`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/roadmap/:clientId/:useCaseId` | Get roadmap |

#### Feasibility (`/api/v2/feasibility`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/feasibility/:clientId/:useCaseId` | Get feasibility |

#### Scoring (`/api/v2/scoring`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/scoring/scores` | Get all scores |
| GET | `/api/v2/scoring/matrix` | Get scoring matrix |
| GET | `/api/v2/scoring-rationale/:clientId/:useCaseId` | Get rationale |

#### Measures (`/api/v2/measures`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/measures` | Get all measures |
| GET | `/api/v2/measures/list` | List measures |
| GET | `/api/v2/measures/compare` | Compare measures |
| GET | `/api/v2/measure-categories` | Get categories |

#### Client Profile (`/api/v2/client-profile`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/client-profile/:clientId` | Get profile |
| POST | `/api/v2/client-profile/run` | Run profile generation |

#### Documents (`/api/v2/documents`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/documents/:clientId` | List documents |
| POST | `/api/v2/documents/upload` | Upload document |
| DELETE | `/api/v2/documents/:id` | Delete document |

#### Clients (`/api/v2/clients`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/clients` | List clients |
| GET | `/api/v2/clients/:id` | Get client |
| POST | `/api/v2/clients` | Create client |
| PUT | `/api/v2/clients/:id` | Update client |

#### Survey (`/survey`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/survey/strategy` | Submit strategy response |
| POST | `/survey/capabilities` | Submit capabilities response |
| POST | `/survey/readiness` | Submit readiness response |
| GET | `/survey/questions/:type` | Get questions |
| GET | `/survey/responses/:type/:clientId` | Get responses |
| GET | `/survey/progress/:clientId/all` | Get progress |

#### Summary (`/api/summary`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/summary/:clientId` | Get summary |

---

## 🗄️ BigQuery Tables (`dva_dataset`)

### Core Tables

| Table | Purpose |
|-------|---------|
| `use_cases` | Master list of use cases with scores |
| `uc_categories` | Use case categories |
| `m_categories` | Measure categories |
| `measures` | All measures |
| `measure_results` | Client-specific measure results |
| `survey_strategy` | Strategy survey responses |
| `survey_capabilities` | Capabilities survey responses |
| `survey_readiness` | Readiness survey responses |
| `client_use_case_profiles` | Per-client, per-UC profile data |
| `clients` | Client/organization data |

### Key Table Schemas

#### `use_cases`
```
use_case_id (INT)
name (STRING)
description (STRING)
category_id (INT)
priority_label (STRING)
value_score (FLOAT)
implementation_score (FLOAT)
total_score (FLOAT)
estimated_roi_range (STRING)
estimated_time_to_roi (STRING)
problem_statement (STRING)
value_prop (STRING)
buyer_personas (STRING)
data_requirements (STRING)
risks (STRING)
tags (STRING)
implementation_steps (STRING)
implementation_timeline (STRING)
overall_rationalization (STRING)
```

#### `measures`
```
measure_id (INT)
measure_name (STRING)
category_id (INT)
description (STRING)
weight (FLOAT)
axis (STRING)
```

#### `measure_results`
```
result_id (INT)
client_id (INT)
use_case_id (INT)
measure_id (INT)
score (FLOAT)
notes (STRING)
```

#### `survey_strategy`
```
response_id (INT)
client_id (INT)
user_id (STRING)
question_id (STRING)
question_text (STRING)
response (STRING)
response_type (STRING)
submitted_at (TIMESTAMP)
```

---

## 🔗 API-to-Page Mapping

| Frontend Page | Backend API(s) Used |
|---------------|---------------------|
| HomePage | `/survey/progress`, `/api/v2/clients` |
| MatrixPage | `/api/v2/use-cases`, `/api/v2/scoring/matrix` |
| ClientProfilePage | `/api/v2/client-profile/:id` |
| UseCaseResults | `/api/v2/useCases/list` |
| UseCaseProfilePage | `/api/v2/useCases/:id/profile`, `/api/v2/useCases/:id/scores` |
| CapabilitiesSummaryPage | `/api/v2/measures`, `/api/v2/survey/capabilities/responses` |
| StrategySummaryPage | `/api/summary/:clientId`, `/api/v2/survey/strategy/responses` |
| FinancialQAPage | `/api/v2/roi/:clientId/:useCaseId` |
| RoadmapPage | `/api/v2/roadmap/:clientId/:useCaseId` |
| EAOpportunitiesPage | `/api/v2/use-case-explorer/:clientId/opportunities` |
| EAPersonalizationPage | `/api/v2/portfolio-intelligence/:clientId/strategic-context` |
| EAActivatePage | `/api/v2/portfolio-intelligence/:clientId` |
| EAROIModelPage | `/api/v2/use-case-explorer/:clientId/opportunities/:id/roi-model` |
| EAScoringRationalizationPage | `/api/v2/scoring-rationale/:clientId/:useCaseId` |
| EAWeightsPage | `/api/v2/weights/:clientId` |

---

## 🔑 Key Data Flows

### Survey Completion Flow
1. User starts survey → `GET /survey/questions/:type`
2. User answers → `POST /survey/:type` (strategy/capabilities/readiness)
3. Progress tracked → `GET /survey/progress/:clientId/all`
4. Completion → `POST /survey/complete`

### Use Case Selection Flow
1. Browse opportunities → `GET /api/v2/use-case-explorer/:clientId/opportunities`
2. View details → `GET /api/v2/use-case-explorer/:clientId/opportunities/:id`
3. View ROI → `GET /api/v2/use-case-explorer/:clientId/opportunities/:id/roi-model`
4. Select UC → `POST /api/v2/use-case-explorer/:clientId/selection`

### Portfolio Intelligence Flow
1. Generate report → `GET /api/v2/portfolio-intelligence/:clientId`
2. View sections → Executive Summary, Strategic Context, etc.
3. Drill down → Decision Canvas, Roadmap, Financial Impact

---

## 📝 Notes

- **client_id** is required for most API calls (string, for BigQuery compatibility)
- Frontend stores session in Firebase, passes `client_id` in requests
- Backend uses Firebase Admin SDK for authentication
- BigQuery used for analytical data, Firestore for some session data
- Scoring calculated on backend, cached in BigQuery tables
