import type { Scenario } from "../types";
/** Defines in-memory-only values used while an operator performs one lookup. */
export interface LookupForm { vin: string; scenario: Scenario; environment: string; apiKey: string; }
export interface LookupState { form: LookupForm; errors: Partial<Record<keyof LookupForm, string>>; pending: boolean; }
export type LookupAction = { type: "EDIT"; field: keyof LookupForm; value: string } | { type: "VALIDATE" } | { type: "SUBMIT" } | { type: "SETTLED" } | { type: "CLEAR" };
/** Supplies the zero-sensitive-data state for initial, clear, and settled flows. */
export const initialLookupState: LookupState = { form: { vin: "", scenario: "RO_OPEN", environment: "test", apiKey: "" }, errors: {}, pending: false };
/** Validates the minimum operator inputs without treating client checks as authority. */
export function validateForm(form: LookupForm): LookupState["errors"] { const errors: LookupState["errors"] = {}; if (!form.vin.trim()) errors.vin = "VIN is required"; if (!form.environment) errors.environment = "Select an environment"; if (!form.apiKey) errors.apiKey = "API key is required"; return errors; }
/** Transitions the lookup form while ensuring every terminal path erases its API key. */
export function lookupReducer(state: LookupState, action: LookupAction): LookupState { if (action.type === "CLEAR" || action.type === "SETTLED") return initialLookupState; if (action.type === "EDIT") return { ...state, form: { ...state.form, [action.field]: action.value }, errors: { ...state.errors, [action.field]: undefined } }; if (action.type === "VALIDATE") return { ...state, errors: validateForm(state.form) }; if (action.type === "SUBMIT") { const errors = validateForm(state.form); return Object.keys(errors).length ? { ...state, errors } : { ...state, pending: true }; } return state; }
