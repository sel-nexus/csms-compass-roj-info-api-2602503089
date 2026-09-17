import { useState } from "react";
import { LookupView } from "./views/LookupView";
import { DetailsView } from "./views/DetailsView";
import { StatusView } from "./views/StatusView";
import type { ApiFailure, ApiSuccess, JourneyData } from "./types";
/** Routes operator responses to the only three permitted views. */
export default function App(): React.JSX.Element { const [screen,setScreen]=useState<"lookup"|"details"|"status">("lookup"); const [journey,setJourney]=useState<JourneyData>({}); const [message,setMessage]=useState(""); const resolved=(response:{status:number;body:ApiSuccess|ApiFailure})=>{if("error" in response.body){setMessage(response.body.error.message);setScreen("status");}else if(response.body.data){setJourney(response.body.data);setScreen("details");}else{setMessage("No journey found; review the lookup.");setScreen("status");}}; if(screen==="details")return <DetailsView journey={journey} onNew={()=>setScreen("lookup")}/>; if(screen==="status")return <StatusView message={message} onNew={()=>setScreen("lookup")}/>; return <LookupView onResolved={resolved}/>; }
