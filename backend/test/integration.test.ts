import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";
import { LookupServiceImpl } from "../src/services/lookup.service";
import type { CompassAdapter } from "../src/domain/contracts";
const config={port:8000,maxRequestBytes:256,apiKeys:["valid-key"],allowedOrigins:["http://localhost:5173"],compassBaseUrl:"http://localhost:9000",compassCredential:"test"};
describe("composed lookup integration",()=>{it("flows gateway through service and allow-listed data envelope",async()=>{let vin="";const adapter:CompassAdapter={async lookup(command){vin=command.vin;return {kind:"data",data:{VIN:command.vin,dealer:"Test Dealer"}};}};const response=await request(createApp({config,lookupService:new LookupServiceImpl(adapter)})).post("/api/csms/getROJInfo").set("x-api-key","valid-key").set("Accept","application/json").set("Content-Type","application/json").send({VIN:" V ",PARAM_1:"RO_CLOSE",SOURCE:"COMPASS"});expect(response.status).toBe(200);expect(vin).toBe("V");expect(response.body.data).toEqual({VIN:"V",dealer:"Test Dealer"});});});