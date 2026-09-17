/** Defines the narrow public and internal ROJ lookup contracts. */
export type Scenario = "RO_OPEN" | "RO_CLOSE";
export interface ValidatedLookupCommand { vin: string; scenario: Scenario; source: "COMPASS"; correlationId: string; apiKeyIdHash: string; }
export interface JourneyData { VIN?: string; dealer?: string; odometer?: number; roOpenDate?: string; roCloseDate?: string; roNumber?: string; daysDown?: number; repairCount?: number; cumulativeDays?: number; journeyStatus?: string; journeyId?: string; wiAdvisorServiceName?: string; wiAdvisorComplaint?: string; dsdiNarrative?: string; dsdiComplaint?: string; promiseDate?: string; }
export type LookupOutcome = { kind: "data"; data: JourneyData } | { kind: "no_result" } | { kind: "application_failure" } | { kind: "dependency_failure"; category: "bad_response" | "unreachable" | "timeout" | "breaker_open" | "bulkhead_full" };
export interface LookupService { execute(command: ValidatedLookupCommand): Promise<LookupOutcome>; }
