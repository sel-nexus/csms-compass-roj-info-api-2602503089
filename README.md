# CSMS Compass ROJ Info API

Private proprietary internal operator application for protected Compass ROJ lookup.

## Run
Install dependencies in `backend/` and `frontend/`, then run `npm run dev` in each. The UI is served on Vite's port and proxies `/api` to the backend.

## API
`POST /api/csms/getROJInfo` requires JSON, `Accept: application/json`, and `x-api-key`. Its closed body is `{ "VIN": "...", "PARAM_1": "RO_OPEN|RO_CLOSE", "SOURCE": "COMPASS" }`.

## License
Private and proprietary.
