import { useState } from "react";
import { LookupView } from "./views/LookupView";
import type { ApiFailure, ApiSuccess } from "./types";
/** Owns the initial lookup view until outcome-specific views are available. */
export default function App(): React.JSX.Element { const [message, setMessage] = useState<string>(""); return <><LookupView onResolved={(response) => setMessage("error" in response.body ? response.body.error.message : response.body.data ? "Journey found." : "No journey found; review the lookup.")} />{message && <p className="visually-hidden" aria-live="polite">{message}</p>}</>; }
