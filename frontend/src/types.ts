/** Defines API envelopes and display-safe journey fields for the operator UI. */
export type Scenario = "RO_OPEN" | "RO_CLOSE";
export interface JourneyData { VIN?: string; dealer?: string; odometer?: number; roOpenDate?: string; roCloseDate?: string; roNumber?: string; daysDown?: number; repairCount?: number; cumulativeDays?: number; journeyStatus?: string; journeyId?: string; wiAdvisorServiceName?: string; wiAdvisorComplaint?: string; dsdiNarrative?: string; dsdiComplaint?: string; promiseDate?: string; }
export interface ApiFailure { error: { code: string; message: string; retryable: boolean }; meta: { correlationId: string }; }
export interface ApiSuccess { data: JourneyData | null; meta: { correlationId: string; outcome?: "no_result" }; }
