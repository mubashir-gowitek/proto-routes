# DVA (Data Value Accelerator) - Complete Technical Documentation

**Version:** 2.0  
**Last Updated:** July 2026  
**Stack:** React (Frontend) + Node.js/Express (Backend) + BigQuery (Database) + Firebase (Auth)

---

## Table of Contents

1. [Personalize](#1-personalize)
   - [1.1 Organization Profile](#11-organization-profile)
   - [1.2 Data Intake Surveys](#12-data-intake-surveys)
     - [1.2.1 Strategy Assessment](#121-strategy-assessment)
     - [1.2.2 Capabilities Review](#122-capabilities-review)
     - [1.2.3 Data Readiness](#123-data-readiness)
   - [1.3 Document Upload](#13-document-upload)
     - [1.3.1 Upload Documents](#131-upload-documents)
     - [1.3.2 Document Processing](#132-document-processing)
   - [1.4 Advanced Personalization](#14-advanced-personalization)
     - [1.4.1 Manage Weights](#141-manage-weights)
     - [1.4.2 Existing Initiatives Upload](#142-existing-initiatives-upload)

2. [Evaluate](#2-evaluate)
   - [2.1 Portfolio Intelligence](#21-portfolio-intelligence)
     - [2.1.1 Executive Summary](#211-executive-summary)
     - [2.1.2 Strategic Context](#212-strategic-context)
     - [2.1.3 Opportunity Landscape](#213-opportunity-landscape)
     - [2.1.4 Financial Impact](#214-financial-impact)
     - [2.1.5 Strategy Decision Canvas](#215-strategy-decision-canvas)
     - [2.1.6 Execution Roadmap](#216-execution-roadmap)
   - [2.2 Use Case Explorer](#22-use-case-explorer)
     - [2.2.1 Opportunity Portfolio](#221-opportunity-portfolio)
     - [2.2.2 Use Case Profile](#222-use-case-profile)
     - [2.2.3 ROI Model](#223-roi-model)
     - [2.2.4 Export](#224-export)
   - [2.3 Use Case Selection](#23-use-case-selection)

3. [Execute](#3-execute)
   - [3.1 Strategic Execution Plan](#31-strategic-execution-plan)
   - [3.2 Initiative Portfolio](#32-initiative-portfolio)
   - [3.3 Confidence Snapshot](#33-confidence-snapshot)
   - [3.4 Implementation Plan](#34-implementation-plan)
   - [3.5 Approval Artifacts](#35-approval-artifacts)
   - [3.6 Command Center](#36-command-center)

4. [Supporting Modules](#4-supporting-modules)
   - [4.1 Authentication](#41-authentication)
   - [4.2 Client Management](#42-client-management)
   - [4.3 Document Management](#43-document-management)
   - [4.4 Survey Engine](#44-survey-engine)
   - [4.5 Notifications](#45-notifications)
   - [4.6 Settings](#46-settings)
   - [4.7 Chat](#47-chat)

5. [Reference Sections](#5-reference-sections)
   - [Complete API Reference](#complete-api-reference)
   - [Database Reference](#database-reference)
   - [Page → API Mapping](#page--api-mapping)
   - [API → Database Mapping](#api--database-mapping)
   - [Complete User Journey](#complete-user-journey)

---


---

# 1. Personalize

The Personalize phase is the first step in the DVA journey. It establishes the organization's context through profile information, data intake surveys, and document uploads.

---

## 1.1 Organization Profile

### Overview
The Organization Profile section captures essential information about the healthcare organization being assessed.

### Purpose
- Establish the fundamental identity of the organization
- Provide context for all subsequent analysis
- Enable benchmarking against similar organizations

### UI Location
- **Route:** `/client-profile/:clientId`
- **Also accessible via:** `/setup/:clientId`, `/home`

### Frontend Page(s)
- `src/pages/ClientProfilePage.jsx`
- `src/pages/SetupPage.jsx`

### Frontend Service(s)
- `src/services/clientProfileService.js`

### Backend API(s) Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/client-profile/:clientId` | Fetch complete client profile |
| POST | `/api/v2/client-profile/run` | Trigger profile generation |
| GET | `/api/v2/clients/:clientId` | Get client details |
| PUT | `/api/v2/clients/:clientId` | Update client |

### Database Table(s)
- `dva_dataset.clients`

### Business Flow
1. User navigates to Client Profile
2. GET fetches existing profile
3. User edits and saves
4. PUT updates client information

### Validations
- Required: client_name, client_type_id, beds, address, primary_contact
- Beds must be positive integer

---

## 1.2 Data Intake Surveys

### UI Location
- **Route:** `/survey/:type` (type = strategy, capabilities, readiness)

### Frontend Page(s)
- `src/components/UnifiedSurvey.jsx`

### Frontend Service(s)
- `src/services/surveyService.js`

### Backend API(s) Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/survey/questions/:type` | Fetch questions |
| POST | `/survey/:type` | Submit response |
| GET | `/survey/progress/:clientId/all` | Get progress |

### Database Table(s)
- `dva_dataset.survey_strategy`
- `dva_dataset.survey_capabilities`
- `dva_dataset.survey_readiness`

---

### 1.2.1 Strategy Assessment

**Survey Type:** strategy  
**Questions:** 9  
**Database:** survey_strategy

---

### 1.2.2 Capabilities Review

**Survey Type:** capabilities  
**Questions:** 14  
**Database:** survey_capabilities

---

### 1.2.3 Data Readiness

**Survey Type:** readiness  
**Questions:** 14  
**Database:** survey_readiness

---

## 1.3 Document Upload

### UI Location
- **Route:** `/documents/:clientId`

### Backend API(s)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/documents/:clientId` | List documents |
| POST | `/api/v2/documents/upload` | Upload document |
| DELETE | `/api/v2/documents/:id` | Delete document |

### Database Table(s)
- `dva_dataset.client_documents`

---

## 1.4 Advanced Personalization

### 1.4.1 Manage Weights

**UI Route:** `/ea/weights`

**Frontend Page:** `EAWeightsPage.tsx`

**Backend API:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v2/weights/:clientId` | Get weights |
| PUT | `/api/v2/weights/:clientId` | Update weights |

---

### 1.4.2 Existing Initiatives Upload

**Frontend Component:** `InitiativesUploadBand.tsx`

**Backend API:** Initiatives upload endpoints

SECTION2_START

---

# 2. Evaluate

## 2.1 Portfolio Intelligence

### Overview
Portfolio Intelligence provides an executive-ready view of all opportunities.

### Backend API
| Method | Endpoint |
|--------|----------|
| GET | /api/v2/portfolio-intelligence/:clientId |
| GET | /api/v2/portfolio-intelligence/:clientId/executive-summary |
| GET | /api/v2/portfolio-intelligence/:clientId/strategic-context |
| GET | /api/v2/portfolio-intelligence/:clientId/opportunity-landscape |
| GET | /api/v2/portfolio-intelligence/:clientId/financial-impact |
| GET | /api/v2/portfolio-intelligence/:clientId/decision-canvas |
| GET | /api/v2/portfolio-intelligence/:clientId/roadmap |

### Frontend Service
src/prototype/services/portfolioIntelligenceService.ts

### Backend Controller
routes/v2/portfolioIntelligence.js

### Database Tables
- dva_dataset.clients
- dva_dataset.survey_strategy
- dva_dataset.survey_capabilities
- dva_dataset.survey_readiness
- dva_dataset.use_cases
- dva_dataset.client_use_case_profiles

## 2.2 Use Case Explorer

### Backend APIs
| Method | Endpoint |
|--------|----------|
| GET | /api/v2/use-case-explorer/:clientId/opportunities |
| GET | /api/v2/use-case-explorer/:clientId/opportunities/:useCaseId |
| GET | /api/v2/use-case-explorer/:clientId/selection |
| POST | /api/v2/use-case-explorer/:clientId/selection |
| DELETE | /api/v2/use-case-explorer/:clientId/selection/:useCaseId |

### Frontend Service
src/prototype/services/useCaseExplorerService.ts

## 2.3 Use Case Selection

### Backend APIs
| Method | Endpoint |
|--------|----------|
| POST | /api/v2/use-case-explorer/:clientId/selection |
| DELETE | /api/v2/use-case-explorer/:clientId/selection/:useCaseId |


---

# 3. Execute

## 3.1 Strategic Execution Plan (SEP)

### Overview
The Strategic Execution Plan synthesizes all selected use cases into a cohesive implementation roadmap.

### Backend APIs
| Method | Endpoint |
|--------|----------|
| GET | /api/v2/sep/:clientId |
| GET | /api/v2/sep/:clientId/executive-summary |
| GET | /api/v2/sep/:clientId/execution-approach |
| GET | /api/v2/sep/:clientId/roadmap |
| GET | /api/v2/sep/:clientId/governance |

### Frontend Components
- SEPSectionExecutiveSummary.tsx
- SEPSectionExecutionStrategy.tsx
- SEPSectionImplementationRoadmap.tsx
- SEPSectionGovernance.tsx

### Database Tables
- dva_dataset.use_cases (selected)
- dva_dataset.client_use_case_profiles

---

## 3.2 Initiative Portfolio

### Purpose
Manage the portfolio of initiatives selected for execution.

### Backend API
| Method | Endpoint |
|--------|----------|
| GET | /api/v2/sep/:clientId/initiatives |

---

## 3.3 Confidence Snapshot

### Purpose
Shows confidence levels for each initiative based on data completeness.

### Backend API
| Method | Endpoint |
|--------|----------|
| GET | /api/v2/scoring-rationale/:clientId/:useCaseId |

---

## 3.4 Implementation Plan

### Backend API
| Method | Endpoint |
|--------|----------|
| GET | /api/v2/roadmap/:clientId/:useCaseId |

---

## 3.5 Approval Artifacts

### Purpose
Documents required for approval workflow.

### Backend API
| Method | Endpoint |
|--------|----------|
| GET | /api/v2/export/profile/pdf |

---

## 3.6 Command Center

### UI Route
/ea/execute/:initiativeId

### Frontend Page
EAInitiativeCommandCenterPage.tsx

---

# 4. Supporting Modules

## 4.1 Authentication

### APIs
| Method | Endpoint |
|--------|----------|
| POST | /auth/login |
| POST | /auth/logout |
| GET | /auth/me |

### Firebase Auth
Frontend uses Firebase SDK for authentication.

---

## 4.2 Client Management

### Backend APIs
| Method | Endpoint |
|--------|----------|
| GET | /api/v2/clients |
| GET | /api/v2/clients/:id |
| POST | /api/v2/clients |
| PUT | /api/v2/clients/:id |

### Database Table
dva_dataset.clients

---

## 4.3 Document Management

### APIs
| Method | Endpoint |
|--------|----------|
| GET | /api/v2/documents/:clientId |
| POST | /api/v2/documents/upload |
| DELETE | /api/v2/documents/:id |

### Database Table
dva_dataset.client_documents

---

## 4.4 Survey Engine

### APIs
| Method | Endpoint |
|--------|----------|
| GET | /survey/questions/:type |
| POST | /survey/:type |
| GET | /survey/responses/:type/:clientId |
| GET | /survey/progress/:clientId/all |

### Database Tables
- dva_dataset.survey_strategy
- dva_dataset.survey_capabilities
- dva_dataset.survey_readiness
- dva_dataset.master_questions

---


---

# 5. Reference Sections

## Complete API Reference

### Personalize APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/v2/client-profile/:clientId | Fetch client profile |
| POST | /api/v2/client-profile/run | Run profile generation |
| GET | /api/v2/clients/:clientId | Get client details |
| PUT | /api/v2/clients/:clientId | Update client |
| GET | /survey/questions/:type | Get survey questions |
| POST | /survey/:type | Submit survey response |
| GET | /survey/responses/:type/:clientId | Get survey responses |
| GET | /survey/progress/:clientId/all | Get all survey progress |
| GET | /api/v2/documents/:clientId | List documents |
| POST | /api/v2/documents/upload | Upload document |
| DELETE | /api/v2/documents/:id | Delete document |
| GET | /api/v2/weights/:clientId | Get weights |
| PUT | /api/v2/weights/:clientId | Update weights |

### Evaluate APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/v2/portfolio-intelligence/:clientId | Full PI report |
| GET | /api/v2/portfolio-intelligence/:clientId/executive-summary | Executive summary |
| GET | /api/v2/portfolio-intelligence/:clientId/strategic-context | Strategic context |
| GET | /api/v2/portfolio-intelligence/:clientId/opportunity-landscape | Opportunity landscape |
| GET | /api/v2/portfolio-intelligence/:clientId/financial-impact | Financial impact |
| GET | /api/v2/portfolio-intelligence/:clientId/decision-canvas | Decision canvas |
| GET | /api/v2/portfolio-intelligence/:clientId/roadmap | Roadmap |
| GET | /api/v2/use-case-explorer/:clientId/opportunities | List opportunities |
| GET | /api/v2/use-case-explorer/:clientId/opportunities/:useCaseId | Get opportunity |
| GET | /api/v2/use-case-explorer/:clientId/selection | Get selection |
| POST | /api/v2/use-case-explorer/:clientId/selection | Add to selection |
| DELETE | /api/v2/use-case-explorer/:clientId/selection/:useCaseId | Remove from selection |
| GET | /api/v2/use-cases/:id | Get use case |
| GET | /api/v2/use-cases/:id/profile | Get profile |
| GET | /api/v2/use-cases/:id/scores | Get scores |
| GET | /api/v2/use-cases/:id/alignment | Get alignment |
| GET | /api/v2/use-cases/:id/risks | Get risks |
| GET | /api/v2/use-cases/:id/roadmap | Get roadmap |
| GET | /api/v2/use-cases/:id/feasibility | Get feasibility |
| GET | /api/v2/roi/:clientId/:useCaseId/calculations | Get ROI calculations |
| GET | /api/v2/roi/:clientId/:useCaseId/assumptions | Get ROI assumptions |
| GET | /api/v2/scoring-rationale/:clientId/:useCaseId | Get scoring rationale |
| GET | /api/v2/scoring-rationale/:clientId/:useCaseId/dimension/:categoryId | Get dimension rationale |
| GET | /api/v2/export/profile/pdf | Export as PDF |
| GET | /api/v2/export/profile/markdown | Export as Markdown |

### Execute APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/v2/sep/:clientId | Full SEP |
| GET | /api/v2/sep/:clientId/executive-summary | SEP executive summary |
| GET | /api/v2/sep/:clientId/roadmap | SEP roadmap |
| GET | /api/v2/sep/:clientId/governance | SEP governance |

### Shared APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /health | Health check |
| GET | /api/v2/health | V2 health check |

---

## Database Reference

### Core Tables

| Table | Purpose |
|-------|---------|
| clients | Organization/client information |
| use_cases | Master use case definitions |
| uc_categories | Use case categories |
| client_use_case_profiles | Per-client use case analysis |
| measures | All available measures |
| m_categories | Measure categories |
| measure_results | Client-specific measure scores |

### Survey Tables

| Table | Purpose |
|-------|---------|
| survey_strategy | Strategy survey responses |
| survey_capabilities | Capabilities survey responses |
| survey_readiness | Readiness survey responses |
| master_questions | Question definitions |

### Supporting Tables

| Table | Purpose |
|-------|---------|
| client_documents | Uploaded documents |
| weights | Measure weights per client |

---

## Page → API Mapping

| Page | APIs Used |
|------|-----------|
| /client-profile | GET /api/v2/client-profile/:clientId, PUT /api/v2/clients/:clientId |
| /survey/:type | GET /survey/questions/:type, POST /survey/:type |
| /ea/personalization | GET /api/v2/portfolio-intelligence/:clientId/strategic-context |
| /ea/opportunities | GET /api/v2/use-case-explorer/:clientId/opportunities |
| /ea/use-case/:id | GET /api/v2/use-cases/:id/profile, /scores, /alignment, /risks |
| /ea/roi-model/:id | GET /api/v2/roi/:clientId/:useCaseId/calculations |
| /ea/weights | GET/PUT /api/v2/weights/:clientId |
| /documents | GET/POST/DELETE /api/v2/documents |

---

## Complete User Journey

### Phase 1: Personalize
1. User completes Organization Profile
2. User takes Strategy Assessment survey
3. User takes Capabilities Review survey
4. User takes Data Readiness survey
5. User uploads relevant documents
6. User adjusts measure weights (optional)
7. User uploads existing initiatives (optional)

### Phase 2: Evaluate
1. System generates Portfolio Intelligence report
2. User reviews Executive Summary
3. User explores Opportunity Landscape
4. User browses Use Case Explorer
5. User views detailed Use Case Profile
6. User reviews ROI Model
7. User adds use cases to selection

### Phase 3: Execute
1. System generates Strategic Execution Plan
2. User reviews SEP sections
3. User finalizes initiative portfolio
4. User reviews confidence snapshot
5. User generates approval artifacts
6. User accesses Command Center for monitoring

---

*Document generated from codebase analysis - July 2026*
