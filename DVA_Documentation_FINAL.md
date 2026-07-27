# DVA (Data Value Accelerator) - Complete Technical Documentation

**Version:** 2.0  
**Last Updated:** July 2026  
**Stack:** React (Frontend) + Node.js/Express (Backend) + BigQuery (Database) + Firebase (Auth)

---

## Table of Contents

1. [Personalize](#1-personalize)
2. [Evaluate](#2-evaluate)
3. [Execute](#3-execute)
4. [Supporting Modules](#4-supporting-modules)
5. [Complete API Reference](#5-complete-api-reference)
6. [Database Reference](#6-database-reference)
7. [Page → API Mapping](#7-page--api-mapping)
8. [Complete User Journey](#8-complete-user-journey)

---

# 1. Personalize

The Personalize phase establishes the organization's context through profile information, data intake surveys, and document uploads.

---

## 1.1 Organization Profile

### Overview
Captures essential information about the healthcare organization being assessed.

### Purpose
- Establish fundamental identity of the organization
- Provide context for all subsequent analysis
- Enable benchmarking against similar organizations

### UI Location
| Route | Description |
|-------|-------------|
| `/client-profile/:clientId` | Main profile page |
| `/setup/:clientId` | Initial setup flow |
| `/home` | Client profile button |

### Frontend Pages
- `src/pages/ClientProfilePage.jsx`
- `src/pages/SetupPage.jsx`

### Frontend Services
- `src/services/clientProfileService.js`

### Backend Controller
`routes/v2/clientProfile.js`

---

### API: GET /api/v2/client-profile/:clientId

**Purpose:** Fetch complete client profile

**Response:**
```json
{
  "success": true,
  "data": {
    "client_id": "101",
    "client_name": "Acme Healthcare",
    "organization_name": "Acme Healthcare",
    "client_type_id": 1,
    "organization_type": "Health System",
    "beds": 500,
    "lives_under_vbc_agreements": 100000,
    "address": "123 Main St",
    "primary_contact": "john@acme.com",
    "organizational_npis": ["1234567890"],
    "profile_generated": false,
    "updated_at": "2026-07-27T10:00:00Z"
  }
}
```

---

### API: PUT /api/v2/client-profile/:clientId

**Purpose:** Update client profile

**Request Body:**
```json
{
  "client_name": "Acme Healthcare",
  "client_type_id": 1,
  "beds": 500,
  "lives_under_vbc_agreements": 100000,
  "address": "123 Main St",
  "primary_contact": "john@acme.com",
  "organizational_npis": ["1234567890"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Client profile updated"
}
```

---

### API: GET /api/v2/client-profile/:clientId/readiness

**Purpose:** Check profile completion and return readiness score

**Response:**
```json
{
  "success": true,
  "data": {
    "profile_completion_percent": 85,
    "required_fields_complete": true,
    "missing_fields": ["organizational_npis"],
    "readiness_score": {
      "overall": 85,
      "profile": 100,
      "surveys": 75,
      "documents": 50
    }
  }
}
```

---

### API: POST /api/v2/client-profile/:clientId/run

**Purpose:** Trigger profile generation/updates (async)

**Response:**
```json
{
  "success": true,
  "auditId": "uuid-xxx",
  "runId": "run_123456_101",
  "message": "Generation started"
}
```

---

### Database Table: dva_dataset.clients

| Column | Type | Description |
|--------|------|-------------|
| client_id | STRING | Primary key |
| client_name | STRING | Organization name |
| organization_name | STRING | Alias for client_name |
| client_type_id | INTEGER | Type ID (1-5) |
| organization_type | STRING | Type name |
| beds | INTEGER | Number of beds |
| lives_under_vbc_agreements | INTEGER | Lives under VBC |
| address | STRING | Full address |
| primary_contact | STRING | Contact email |
| organizational_npis | STRING | JSON array of NPIs |
| profile_generated | BOOLEAN | Generation status |
| updated_at | TIMESTAMP | Last update time |

---

## 1.2 Data Intake Surveys

### Overview
Three survey types collect strategic priorities, capabilities, and readiness.

### UI Location
| Route | Description |
|-------|-------------|
| `/survey/strategy` | Strategy Assessment |
| `/survey/capabilities` | Capabilities Review |
| `/survey/readiness` | Data Readiness |

### Frontend Pages
- `src/components/UnifiedSurvey.jsx` (primary)
- `src/components/StrategicPrioritiesSurvey.jsx` (legacy)

### Frontend Services
- `src/services/surveyService.js`

---

### API: GET /survey/questions/:type

**Purpose:** Fetch survey questions

**Response (type=strategy):**
```json
{
  "success": true,
  "survey_type": "strategy",
  "questions": [
    {
      "question_id": "strategy_q1",
      "question_text": "What is your organization's primary strategic focus?",
      "response_type": "text_long",
      "required": true,
      "order": 1
    }
  ],
  "total_questions": 9
}
```

---

### API: POST /survey/strategy

**Purpose:** Submit strategy survey response

**Request:**
```json
{
  "client_id": "101",
  "user_id": "user123",
  "question_id": "strategy_q1",
  "question_text": "What is your organization's primary strategic focus?",
  "response": "Digital transformation and data-driven decision making",
  "response_type": "text_long",
  "submitted_at": "2026-07-27T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Response saved successfully"
}
```

---

### API: POST /survey/capabilities

**Purpose:** Submit capabilities survey response

**Request:**
```json
{
  "client_id": "101",
  "user_id": "user123",
  "question_id": "capabilities_q1",
  "question_text": "How would you rate your current data infrastructure?",
  "response": "Good",
  "response_type": "likert_1_5",
  "submitted_at": "2026-07-27T10:00:00Z"
}
```

---

### API: POST /survey/readiness

**Purpose:** Submit readiness survey response

**Request:**
```json
{
  "client_id": "101",
  "user_id": "user123",
  "question_id": "readiness_q1",
  "question_text": "How mature is your data governance framework?",
  "response": "Moderate",
  "response_type": "likert_1_5",
  "submitted_at": "2026-07-27T10:00:00Z"
}
```

---

### API: GET /survey/responses/:type/:clientId

**Purpose:** Get existing responses for a client

**Response:**
```json
{
  "success": true,
  "responses": {
    "strategy_q1": "Digital transformation",
    "strategy_q2": "Healthcare analytics"
  },
  "completed": true,
  "last_updated": "2026-07-27T10:00:00Z"
}
```

---

### API: GET /survey/progress/:clientId/all

**Purpose:** Get all survey progress for a client

**Response:**
```json
{
  "success": true,
  "progress": {
    "strategy": {
      "total": 9,
      "answered": 9,
      "completed": true,
      "completion_percent": 100
    },
    "capabilities": {
      "total": 14,
      "answered": 10,
      "completed": false,
      "completion_percent": 71
    },
    "readiness": {
      "total": 14,
      "answered": 7,
      "completed": false,
      "completion_percent": 50
    }
  },
  "overall_percent": 74
}
```

---

### Database Tables

#### survey_strategy
| Column | Type |
|--------|------|
| response_id | INTEGER |
| client_id | STRING |
| user_id | STRING |
| question_id | STRING |
| question_text | STRING |
| response | STRING |
| response_type | STRING |
| submitted_at | TIMESTAMP |

#### survey_capabilities
(same schema as survey_strategy)

#### survey_readiness
(same schema as survey_strategy)

---

## 1.3 Document Upload

### UI Location
- `/documents/:clientId`
- `/documents` (main documents page)

### Frontend Pages
- `src/pages/DocumentManagementPage.jsx`
- `src/pages/DocumentsPage.jsx`

---

### API: GET /api/v2/documents/:clientId

**Purpose:** List all documents for a client

**Response:**
```json
{
  "success": true,
  "documents": [
    {
      "id": "doc_xxx",
      "client_id": "101",
      "filename": "strategic_plan.pdf",
      "file_type": "application/pdf",
      "file_size": 1024000,
      "uploaded_by": "user123",
      "uploaded_at": "2026-07-27T10:00:00Z",
      "document_type": "strategic_plan"
    }
  ]
}
```

---

### API: POST /api/v2/documents/upload

**Purpose:** Upload a new document

**Content-Type:** multipart/form-data

**Request:**
- `file`: (binary file)
- `client_id`: string
- `document_type`: string (optional)
- `description`: string (optional)

**Response:**
```json
{
  "success": true,
  "document": {
    "id": "doc_xxx",
    "client_id": "101",
    "filename": "strategic_plan.pdf",
    "uploaded_at": "2026-07-27T10:00:00Z"
  }
}
```

---

### API: DELETE /api/v2/documents/:documentId

**Purpose:** Delete a document

**Response:**
```json
{
  "success": true,
  "message": "Document deleted"
}
```

---

### Database Table: dva_dataset.client_documents

| Column | Type |
|--------|------|
| id | STRING |
| client_id | STRING |
| filename | STRING |
| file_type | STRING |
| file_size | INTEGER |
| document_type | STRING |
| description | STRING |
| uploaded_by | STRING |
| uploaded_at | TIMESTAMP |
| gcs_path | STRING |

---

## 1.4 Advanced Personalization

### 1.4.1 Manage Weights

### UI Location
- `/ea/weights`

### Frontend Pages
- `src/prototype/pages/EAWeightsPage.tsx`

### Frontend Components
- `src/prototype/components/WeightingConfigurationBand.tsx`
- `src/prototype/components/CategoryWeightManagementPanel.tsx`

---

### API: GET /api/v2/weights/:clientId

**Purpose:** Get current measure weights

**Response:**
```json
{
  "success": true,
  "weights": {
    "strategic_alignment": 0.25,
    "financial_impact": 0.25,
    "technical_feasibility": 0.20,
    "organizational_readiness": 0.15,
    "regulatory_compliance": 0.15
  },
  "total": 1.0,
  "last_updated": "2026-07-27T10:00:00Z"
}
```

---

### API: PUT /api/v2/weights/:clientId

**Purpose:** Update measure weights

**Request:**
```json
{
  "weights": {
    "strategic_alignment": 0.30,
    "financial_impact": 0.25,
    "technical_feasibility": 0.20,
    "organizational_readiness": 0.15,
    "regulatory_compliance": 0.10
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Weights updated",
  "total": 1.0
}
```

---

### 1.4.2 Existing Initiatives Upload

### Frontend Components
- `src/prototype/components/InitiativesUploadBand.tsx`

### API: POST /api/v2/portfolio-intelligence/:clientId/initiatives

**Purpose:** Upload existing initiatives

**Request:**
```json
{
  "initiatives": [
    {
      "name": "EHR Integration Project",
      "status": "in_progress",
      "start_date": "2026-01-01",
      "budget": 500000,
      "description": "Integrate EHR with data warehouse"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "imported_count": 1,
  "duplicates_skipped": 0
}
```

---

# 2. Evaluate

## 2.1 Portfolio Intelligence

### Overview
Aggregated, executive-ready view of all opportunities.

### UI Location
- `/ea/personalization` (main PI view)
- `/ea/opportunities`

### Frontend Pages
- `src/prototype/pages/EAPersonalizationPage.tsx`

### Frontend Components
- `src/prototype/components/oir/OIRExecutiveSummary.tsx`
- `src/prototype/components/oir/OIRStrategicContext.tsx`
- `src/prototype/components/oir/OIRWorkbenchHeader.tsx`

### Frontend Service
`src/prototype/services/portfolioIntelligenceService.ts`

### Backend Controller
`routes/v2/portfolioIntelligence.js`

---

### API: GET /api/v2/portfolio-intelligence/:clientId

**Purpose:** Get complete PI report

**Response:**
```json
{
  "success": true,
  "data": {
    "executive_summary": { ... },
    "strategic_context": { ... },
    "opportunity_landscape": { ... },
    "financial_impact": { ... },
    "decision_canvas": { ... },
    "roadmap": { ... }
  }
}
```

---

### API: GET /api/v2/portfolio-intelligence/:clientId/executive-summary

**Purpose:** Executive summary section

**Response:**
```json
{
  "success": true,
  "data": {
    "portfolio_value_low": 1000000,
    "portfolio_value_high": 5000000,
    "use_case_count": 45,
    "quick_win_count": 8,
    "routine_initiative_count": 12,
    "top_10_value_low": 500000,
    "top_10_value_high": 2000000,
    "top_recommended": [
      {
        "use_case_id": 77,
        "name": "Population Health Analytics",
        "roi_low": 2.5,
        "roi_high": 4.2,
        "quick_win": true,
        "execution_posture": "launch_now",
        "confidence_level": "high"
      }
    ]
  }
}
```

**Execution Posture Values:**
| Posture | Description |
|---------|-------------|
| `launch_now` | High value, easy implementation |
| `pilot` | High value, harder implementation |
| `scale` | Lower value, easy implementation |
| `defer` | Lower value, harder implementation |

---

### API: GET /api/v2/portfolio-intelligence/:clientId/strategic-context

**Purpose:** Strategic context section

**Response:**
```json
{
  "success": true,
  "data": {
    "organization_name": "Acme Healthcare",
    "organization_type_id": 1,
    "personalization_score": 85,
    "personalization_level": "high",
    "executive_summary_text": "The organization is focused on...",
    "strategic_priorities": [
      "Reduce operational costs",
      "Improve patient outcomes",
      "Data-driven decision making"
    ],
    "key_constraints": [
      "Limited IT budget",
      "Regulatory compliance required"
    ],
    "strategic_themes": [
      "Value-based care",
      "Population health"
    ],
    "recommended_next_steps": [
      "Complete data readiness survey",
      "Upload strategic documents"
    ]
  }
}
```

---

### API: GET /api/v2/portfolio-intelligence/:clientId/opportunity-landscape

**Purpose:** Opportunity landscape section

**Response:**
```json
{
  "success": true,
  "data": {
    "strategic_domain_count": 5,
    "total_use_cases": 45,
    "largest_domain": "Clinical Operations",
    "domains": [
      {
        "name": "Clinical Operations",
        "use_case_count": 15,
        "use_case_ids": [1, 2, 3, 77]
      }
    ],
    "strategic_themes": [
      "Efficiency improvement",
      "Cost reduction"
    ]
  }
}
```

---

### API: GET /api/v2/portfolio-intelligence/:clientId/financial-impact

**Purpose:** Financial impact section

**Response:**
```json
{
  "success": true,
  "data": {
    "portfolio_value_low": 1000000,
    "portfolio_value_high": 5000000,
    "top_10_value_low": 500000,
    "top_10_value_high": 2000000,
    "estimated_payback_months": 18,
    "waterfall": {
      "conservative": 800000,
      "base": 1500000,
      "aggressive": 3000000
    },
    "initiatives": [
      {
        "use_case_id": 77,
        "name": "Population Health Analytics",
        "roi_low": 2.5,
        "roi_high": 4.2,
        "annual_benefit": 250000,
        "annual_cost": 80000,
        "roi_ratio": 3.1
      }
    ]
  }
}
```

---

### API: GET /api/v2/portfolio-intelligence/:clientId/decision-canvas

**Purpose:** Strategy decision canvas

**Response:**
```json
{
  "success": true,
  "data": {
    "initiatives": [
      {
        "use_case_id": 77,
        "name": "Population Health Analytics",
        "rank": 1,
        "annual_value_low": 200000,
        "annual_value_high": 500000,
        "quick_win": true,
        "execution_posture": "launch_now",
        "value_score": 85,
        "implementation_score": 72,
        "confidence_level": "high",
        "category": "Clinical Operations"
      }
    ],
    "posture_summary": {
      "launch_now": 8,
      "pilot": 12,
      "scale": 15,
      "defer": 10
    },
    "value_by_category": [
      {
        "category": "Clinical Operations",
        "total_value": 1500000,
        "use_case_count": 15
      }
    ]
  }
}
```

---

### API: GET /api/v2/portfolio-intelligence/:clientId/roadmap

**Purpose:** Execution roadmap

**Response:**
```json
{
  "success": true,
  "data": {
    "phases": {
      "launch_now": {
        "label": "Launch Now",
        "description": "High value, easy to implement",
        "count": 8,
        "initiatives": [
          {
            "use_case_id": 77,
            "name": "Population Health Analytics",
            "category": "Clinical Operations",
            "rank": 1,
            "quick_win": true,
            "annual_value_low": 200000,
            "annual_value_high": 500000,
            "milestones": [
              {
                "label": "Phase 1",
                "months_from_start": 3,
                "value_note": "Initial deployment"
              }
            ]
          }
        ]
      },
      "pilot": { ... },
      "scale": { ... },
      "defer": { ... }
    }
  }
}
```

---

## 2.2 Use Case Explorer

### Overview
Browse, filter, and analyze individual use cases.

### UI Location
- `/ea/opportunities`

### Frontend Pages
- `src/prototype/pages/EAOpportunitiesPage.tsx`

### Frontend Services
- `src/prototype/services/useCaseExplorerService.ts`

### Backend Controller
`routes/v2/useCaseExplorer.js`

---

### API: GET /api/v2/use-case-explorer/:clientId/opportunities

**Purpose:** List all opportunities with filtering

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| limit | int | Max results (default 20) |
| offset | int | Pagination offset |
| category_id | int | Filter by category |
| priority_label | string | Filter by priority |
| posture | string | Filter by execution posture |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "use_case_id": 77,
      "name": "Population Health Analytics",
      "description": "Analytics platform for population health...",
      "category_id": 1,
      "category_name": "Clinical Operations",
      "priority_label": "high",
      "value_score": 85.5,
      "implementation_score": 72.3,
      "total_score": 78.9,
      "bv_axis": 0.8,
      "ie_axis": 0.5,
      "execution_posture": "launch_now",
      "quick_win": true,
      "estimated_roi_range": "2.5-4.0x",
      "estimated_time_to_roi_months": 12
    }
  ],
  "meta": {
    "total": 45,
    "limit": 20,
    "offset": 0,
    "has_more": true
  }
}
```

---

### API: GET /api/v2/use-case-explorer/:clientId/opportunities/:useCaseId

**Purpose:** Get detailed opportunity information

**Response:**
```json
{
  "success": true,
  "data": {
    "use_case_id": 77,
    "name": "Population Health Analytics",
    "description": "...",
    "category_id": 1,
    "category_name": "Clinical Operations",
    "priority_label": "high",
    "value_score": 85.5,
    "implementation_score": 72.3,
    "total_score": 78.9,
    "estimated_roi_range": "2.5-4.0x",
    "estimated_time_to_roi_months": 12,
    "problem_statement": "...",
    "value_prop": "...",
    "data_requirements": "...",
    "risks": "...",
    "implementation_timeline": "...",
    "tags": ["population-health", "analytics"]
  }
}
```

---

### API: GET /api/v2/use-case-explorer/:clientId/opportunities/:useCaseId/evaluation

**Purpose:** Full evaluation data for a use case

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": { ... },
    "alignment": { ... },
    "roi": { ... },
    "feasibility": { ... },
    "risks": { ... },
    "roadmap": { ... },
    "scoring": { ... }
  }
}
```

---

### API: GET /api/v2/use-case-explorer/:clientId/opportunities/:useCaseId/roi-model

**Purpose:** ROI model for a use case

**Response:**
```json
{
  "success": true,
  "data": {
    "scenarios": {
      "conservative": {
        "annual_benefit": 150000,
        "annual_cost": 60000,
        "roi_ratio": 2.5,
        "payback_months": 14
      },
      "base": {
        "annual_benefit": 250000,
        "annual_cost": 80000,
        "roi_ratio": 3.1,
        "payback_months": 12
      },
      "aggressive": {
        "annual_benefit": 400000,
        "annual_cost": 100000,
        "roi_ratio": 4.0,
        "payback_months": 9
      },
      "custom": { ... }
    },
    "assumptions": [
      "Assumption 1...",
      "Assumption 2..."
    ],
    "risks": [
      "Risk 1...",
      "Risk 2..."
    ]
  }
}
```

---

## 2.3 Use Case Profile

### Overview
Detailed view of a single use case.

### UI Location
- `/ea/use-case/:id/brief`

### Frontend Pages
- `src/prototype/pages/EAUseCaseBriefPage.tsx`
- `src/prototype/pages/EAScoringRationalizationPage.tsx`
- `src/prototype/pages/EAROIModelPage.tsx`

### Backend Controller
`routes/v2/useCases.js`

---

### API: GET /api/v2/use-cases/:id

**Purpose:** Get use case details

**Response:**
```json
{
  "success": true,
  "data": {
    "use_case_id": 77,
    "name": "Population Health Analytics",
    "description": "...",
    "category_id": 1,
    "category_name": "Clinical Operations",
    "priority_label": "high",
    "value_score": 85.5,
    "implementation_score": 72.3,
    "total_score": 78.9,
    "estimated_roi_range": "2.5-4.0x",
    "estimated_time_to_roi": "12 months",
    "problem_statement": "...",
    "value_prop": "...",
    "buyer_personas": "...",
    "data_requirements": "...",
    "risks": "...",
    "tags": ["population-health", "analytics"],
    "implementation_steps": "...",
    "implementation_timeline": "..."
  }
}
```

---

### API: GET /api/v2/use-cases/:id/profile

**Purpose:** Get use case profile data

**Response:**
```json
{
  "success": true,
  "data": {
    "strategic_alignment_score": 85,
    "executive_summary": "...",
    "strategic_narrative": "...",
    "roi_narrative": "...",
    "data_assets": [...],
    "recommendation": "...",
    "implementation": "...",
    "measure_scores": [
      {
        "measure_id": 1,
        "measure_name": "Data Quality",
        "score": 75,
        "weight": 0.2
      }
    ],
    "playbook_sections": [...]
  }
}
```

---

### API: GET /api/v2/use-cases/:id/scores

**Purpose:** Get scoring details

**Response:**
```json
{
  "success": true,
  "data": {
    "total_score": 78.9,
    "value_score": 85.5,
    "implementation_score": 72.3,
    "dimension_scores": {
      "strategic_alignment": 85,
      "financial_impact": 78,
      "technical_feasibility": 72,
      "organizational_readiness": 68,
      "regulatory_compliance": 75
    },
    "measure_scores": [
      {
        "measure_id": 1,
        "measure_name": "Data Quality",
        "score": 75,
        "weight": 0.2,
        "weighted_score": 15
      }
    ]
  }
}
```

---

### API: GET /api/v2/use-cases/:id/alignment

**Purpose:** Get strategic alignment data

---

### API: GET /api/v2/use-cases/:id/risks

**Purpose:** Get risk assessment

**Response:**
```json
{
  "success": true,
  "data": {
    "overall_risk_level": "medium",
    "risks": [
      {
        "category": "Technical",
        "description": "Integration complexity with existing EHR",
        "likelihood": "high",
        "impact": "medium",
        "mitigation": "Phased implementation approach"
      }
    ]
  }
}
```

---

### API: GET /api/v2/feasibility/:clientId/:useCaseId

**Purpose:** Get feasibility assessment

**Response:**
```json
{
  "success": true,
  "data": {
    "overall_feasibility_score": 72,
    "dimensions": {
      "technical": {
        "score": 75,
        "findings": ["EHR integration feasible", "Cloud infrastructure ready"]
      },
      "organizational": {
        "score": 68,
        "findings": ["IT team available", "Training required"]
      },
      "regulatory": {
        "score": 80,
        "findings": ["HIPAA compliant", "No major concerns"]
      }
    }
  }
}
```

---

### API: GET /api/v2/roi/:clientId/:useCaseId/calculations

**Purpose:** Get ROI calculations

---

### API: GET /api/v2/roi/:clientId/:useCaseId/assumptions

**Purpose:** Get ROI assumptions

---

## 2.3.8 Scoring Rationalization

### UI Location
- `/ea/use-case/:id/rationale`

### Frontend Pages
- `src/prototype/pages/EAScoringRationalizationPage.tsx`

### Backend Controller
`routes/v2/scoringRationale.js`

---

### API: GET /api/v2/scoring-rationale/:clientId/:useCaseId

**Purpose:** Get complete scoring rationale

**Response:**
```json
{
  "success": true,
  "data": {
    "use_case_id": 77,
    "overall_score": 78.9,
    "dimensions": {
      "data_readiness": {
        "score": 72,
        "max_score": 100,
        "findings": [
          "EHR data available",
          "Data quality needs improvement"
        ],
        "evidence": "Survey responses and document analysis"
      },
      "organizational_readiness": {
        "score": 68,
        "max_score": 100,
        "findings": [...],
        "evidence": "..."
      },
      "regulatory_compliance": {
        "score": 80,
        "max_score": 100,
        "findings": [...],
        "evidence": "..."
      },
      "financial_impact": {
        "score": 85,
        "max_score": 100,
        "findings": [...],
        "evidence": "..."
      },
      "strategic_alignment": {
        "score": 88,
        "max_score": 100,
        "findings": [...],
        "evidence": "..."
      },
      "technical_feasibility": {
        "score": 75,
        "max_score": 100,
        "findings": [...],
        "evidence": "..."
      }
    }
  }
}
```

---

## 2.4 Use Case Selection

### API: GET /api/v2/use-case-explorer/:clientId/selection

**Purpose:** Get user's selected use cases

**Response:**
```json
{
  "success": true,
  "selected_use_cases": [
    {
      "use_case_id": 77,
      "name": "Population Health Analytics",
      "selected_at": "2026-07-27T10:00:00Z"
    }
  ],
  "total_selected": 1
}
```

---

### API: POST /api/v2/use-case-explorer/:clientId/selection

**Purpose:** Add use case to selection

**Request:**
```json
{
  "use_case_id": 77
}
```

**Response:**
```json
{
  "success": true,
  "message": "Use case added to selection"
}
```

---

### API: DELETE /api/v2/use-case-explorer/:clientId/selection/:useCaseId

**Purpose:** Remove use case from selection

**Response:**
```json
{
  "success": true,
  "message": "Use case removed from selection"
}
```

---

# 3. Execute

## 3.1 Strategic Execution Plan (SEP)

### Overview
Cohesive implementation roadmap for selected use cases.

### Frontend Components (src/prototype/components/sep/)
- `SEPSectionExecutiveSummary.tsx`
- `SEPSectionExecutionStrategy.tsx`
- `SEPSectionImplementationRoadmap.tsx`
- `SEPSectionGovernance.tsx`
- `SEPSectionPortfolioImpact.tsx`
- `SEPSectionInitiativePortfolio.tsx`
- `SEPSectionResourcePlan.tsx`
- `SEPSectionExecutionSequencing.tsx`
- `SEPSectionDependenciesRisk.tsx`

---

### API: GET /api/v2/sep/:clientId

**Purpose:** Get complete SEP

---

### API: GET /api/v2/sep/:clientId/executive-summary

**Purpose:** SEP executive summary

---

### API: GET /api/v2/sep/:clientId/execution-approach

**Purpose:** Execution approach section

---

### API: GET /api/v2/sep/:clientId/governance

**Purpose:** Governance & approval framework

---

## 3.6 Command Center

### UI Location
- `/ea/execute/:initiativeId`

### Frontend Pages
- `src/prototype/pages/EAInitiativeCommandCenterPage.tsx`

### Backend Controller
`routes/v2/actions.js`

---

### API: GET /api/v2/actions/:clientId/:useCaseId

**Purpose:** Get recommended actions for a use case

**Response:**
```json
{
  "success": true,
  "data": {
    "use_case_id": 77,
    "recommended_actions": [
      {
        "id": "action_1",
        "title": "Complete data readiness survey",
        "description": "Finish the data readiness assessment",
        "priority": "high",
        "estimated_time": "30 minutes",
        "status": "pending"
      }
    ],
    "next_steps": [
      "Review ROI calculations",
      "Get stakeholder approval"
    ]
  }
}
```

---

# 4. Supporting Modules

## 4.1 Authentication

### Frontend
- Firebase SDK for authentication
- `src/contexts/AuthContext.jsx`

### Backend Controllers
- `routes/auth/` (if separate)
- Firebase Admin SDK

---

## 4.2 Client Management

### Backend Controller
`routes/v2/clients.js`

---

### API: GET /api/v2/clients

**Purpose:** List all clients (admin)

**Response:**
```json
{
  "success": true,
  "clients": [
    {
      "client_id": "101",
      "client_name": "Acme Healthcare",
      "client_type_id": 1,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

### API: POST /api/v2/clients

**Purpose:** Create new client

**Request:**
```json
{
  "client_name": "New Healthcare Org",
  "client_type_id": 1,
  "beds": 200
}
```

---

# 5. Complete API Reference

## Personalize APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/v2/client-profile/:clientId | Fetch client profile |
| PUT | /api/v2/client-profile/:clientId | Update profile |
| GET | /api/v2/client-profile/:clientId/readiness | Get readiness |
| POST | /api/v2/client-profile/:clientId/run | Trigger generation |
| GET | /api/v2/weights/:clientId | Get weights |
| PUT | /api/v2/weights/:clientId | Update weights |
| GET | /survey/questions/:type | Get questions |
| POST | /survey/:type | Submit response |
| GET | /survey/responses/:type/:clientId | Get responses |
| GET | /survey/progress/:clientId/all | Get all progress |
| GET | /api/v2/documents/:clientId | List documents |
| POST | /api/v2/documents/upload | Upload document |
| DELETE | /api/v2/documents/:id | Delete document |

## Evaluate APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/v2/portfolio-intelligence/:clientId | Full PI report |
| GET | /api/v2/portfolio-intelligence/:clientId/executive-summary | Exec summary |
| GET | /api/v2/portfolio-intelligence/:clientId/strategic-context | Strategic context |
| GET | /api/v2/portfolio-intelligence/:clientId/opportunity-landscape | Landscape |
| GET | /api/v2/portfolio-intelligence/:clientId/financial-impact | Financial impact |
| GET | /api/v2/portfolio-intelligence/:clientId/decision-canvas | Decision canvas |
| GET | /api/v2/portfolio-intelligence/:clientId/roadmap | Roadmap |
| GET | /api/v2/use-case-explorer/:clientId/opportunities | List opportunities |
| GET | /api/v2/use-case-explorer/:clientId/opportunities/:useCaseId | Opportunity details |
| GET | /api/v2/use-case-explorer/:clientId/opportunities/:useCaseId/evaluation | Full evaluation |
| GET | /api/v2/use-case-explorer/:clientId/opportunities/:useCaseId/roi-model | ROI model |
| GET | /api/v2/use-case-explorer/:clientId/selection | Get selection |
| POST | /api/v2/use-case-explorer/:clientId/selection | Add to selection |
| DELETE | /api/v2/use-case-explorer/:clientId/selection/:useCaseId | Remove |
| GET | /api/v2/use-cases/:id | Get use case |
| GET | /api/v2/use-cases/:id/profile | Get profile |
| GET | /api/v2/use-cases/:id/scores | Get scores |
| GET | /api/v2/use-cases/:id/alignment | Get alignment |
| GET | /api/v2/use-cases/:id/risks | Get risks |
| GET | /api/v2/use-cases/:id/feasibility | Get feasibility |
| GET | /api/v2/roi/:clientId/:useCaseId/calculations | ROI calculations |
| GET | /api/v2/roi/:clientId/:useCaseId/assumptions | ROI assumptions |
| GET | /api/v2/scoring-rationale/:clientId/:useCaseId | Scoring rationale |
| GET | /api/v2/export/profile/pdf | Export PDF |
| GET | /api/v2/export/profile/markdown | Export Markdown |

## Execute APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/v2/sep/:clientId | Full SEP |
| GET | /api/v2/sep/:clientId/executive-summary | SEP exec summary |
| GET | /api/v2/sep/:clientId/execution-approach | Approach |
| GET | /api/v2/sep/:clientId/roadmap | SEP roadmap |
| GET | /api/v2/sep/:clientId/governance | Governance |
| GET | /api/v2/actions/:clientId/:useCaseId | Get actions |

## Shared APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /health | Health check |
| GET | /api/v2/health | V2 health check |

---

# 6. Database Reference

## Core Tables

### clients
**Purpose:** Organization/client information

| Column | Type | Description |
|--------|------|-------------|
| client_id | STRING | Primary key |
| client_name | STRING | Organization name |
| organization_name | STRING | Alias |
| client_type_id | INTEGER | Type ID (1-5) |
| beds | INTEGER | Number of beds |
| lives_under_vbc_agreements | INTEGER | VBC lives |
| address | STRING | Full address |
| primary_contact | STRING | Contact email |
| organizational_npis | STRING | JSON array |
| profile_generated | BOOLEAN | Generation status |
| updated_at | TIMESTAMP | Last update |

### use_cases
**Purpose:** Master use case definitions

| Column | Type |
|--------|------|
| use_case_id | INTEGER |
| name | STRING |
| description | STRING |
| category_id | INTEGER |
| priority_label | STRING |
| value_score | FLOAT |
| implementation_score | FLOAT |
| total_score | FLOAT |
| estimated_roi_range | STRING |
| estimated_time_to_roi | STRING |
| problem_statement | STRING |
| value_prop | STRING |
| buyer_personas | STRING |
| data_requirements | STRING |
| risks | STRING |
| tags | STRING |
| implementation_steps | STRING |
| implementation_timeline | STRING |
| overall_rationalization | STRING |

### uc_categories
**Purpose:** Use case categories

| Column | Type |
|--------|------|
| category_id | INTEGER |
| category_name | STRING |
| type | STRING |

### measures
**Purpose:** All available measures

| Column | Type |
|--------|------|
| measure_id | INTEGER |
| measure_name | STRING |
| category_id | INTEGER |
| description | STRING |
| weight | FLOAT |
| axis | STRING |

### measure_results
**Purpose:** Client-specific measure scores

| Column | Type |
|--------|------|
| result_id | INTEGER |
| client_id | STRING |
| use_case_id | INTEGER |
| measure_id | INTEGER |
| score | FLOAT |
| notes | STRING |

### client_use_case_profiles
**Purpose:** Per-client use case analysis

| Column | Type |
|--------|------|
| profile_id | INTEGER |
| client_id | STRING |
| use_case_id | INTEGER |
| strategic_alignment_score | FLOAT |
| executive_summary | STRING |
| strategic_narrative | STRING |
| roi_narrative | STRING |
| data_assets | STRING |
| recommendation | STRING |
| implementation | STRING |
| measure_scores | STRING |
| playbook_sections | STRING |

## Survey Tables

### survey_strategy
**Purpose:** Strategy survey responses

### survey_capabilities
**Purpose:** Capabilities survey responses

### survey_readiness
**Purpose:** Readiness survey responses

All survey tables share:
| Column | Type |
|--------|------|
| response_id | INTEGER |
| client_id | STRING |
| user_id | STRING |
| question_id | STRING |
| question_text | STRING |
| response | STRING |
| response_type | STRING |
| submitted_at | TIMESTAMP |

### master_questions
**Purpose:** Question definitions

| Column | Type |
|--------|------|
| question_id | STRING |
| survey_type | STRING |
| question_text | STRING |
| response_type | STRING |
| required | BOOLEAN |
| order_num | INTEGER |

## Supporting Tables

### client_documents
**Purpose:** Uploaded documents

| Column | Type |
|--------|------|
| id | STRING |
| client_id | STRING |
| filename | STRING |
| file_type | STRING |
| file_size | INTEGER |
| document_type | STRING |
| description | STRING |
| uploaded_by | STRING |
| uploaded_at | TIMESTAMP |
| gcs_path | STRING |

---

# 7. Page → API Mapping

| Page/Route | APIs Used |
|-----------|-----------|
| `/client-profile/:clientId` | GET/PUT /api/v2/client-profile/:clientId |
| `/survey/:type` | GET /survey/questions/:type, POST /survey/:type |
| `/ea/personalization` | GET /api/v2/portfolio-intelligence/:clientId/strategic-context |
| `/ea/opportunities` | GET /api/v2/use-case-explorer/:clientId/opportunities |
| `/ea/use-case/:id/brief` | GET /api/v2/use-cases/:id, /profile, /scores, /alignment |
| `/ea/use-case/:id/rationale` | GET /api/v2/scoring-rationale/:clientId/:useCaseId |
| `/ea/roi-model/:id` | GET /api/v2/roi/:clientId/:useCaseId/calculations |
| `/ea/weights` | GET/PUT /api/v2/weights/:clientId |
| `/documents/:clientId` | GET/POST/DELETE /api/v2/documents |
| `/ea/execute/:initiativeId` | GET /api/v2/actions/:clientId/:useCaseId |

---

# 8. Complete User Journey

## Phase 1: Personalize

```
User → Organization Profile → Data Intake Surveys → Document Upload → Advanced Personalization
         ↓                        ↓                      ↓                    ↓
    /client-profile      /survey/:type          /documents         /ea/weights
                              ↓                      ↓               /ea/initiatives
                    Complete questions     Upload files     Adjust weights
                              ↓                      ↓
                    POST /survey/:type    POST /documents
                              ↓
                    Survey progress tracked
```

## Phase 2: Evaluate

```
User → Portfolio Intelligence → Use Case Explorer → Use Case Details → ROI Model → Selection
           ↓                        ↓                    ↓                ↓            ↓
    /ea/personalization      /ea/opportunities   /ea/use-case/:id  /ea/roi-model  POST selection
           ↓                        ↓                    ↓                ↓
    GET /pi/:clientId      GET /explorer/:clientId  GET /use-cases/:id  GET /roi/:clientId
           ↓                        ↓                    ↓                ↓
    Review summary         Browse & filter      View details      View scenarios
```

## Phase 3: Execute

```
User → Strategic Execution Plan → Review & Approve → Command Center
           ↓                           ↓                 ↓
    /ea/activate              Generate artifacts    /ea/execute/:id
           ↓                           ↓                 ↓
    GET /sep/:clientId        GET /export/pdf       GET /actions
           ↓                           ↓                 ↓
    Review SEP sections        Download             Monitor actions
```

---

*Document generated from codebase analysis - July 2026*
