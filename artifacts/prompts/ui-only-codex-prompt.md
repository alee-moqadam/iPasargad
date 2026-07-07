# پرامپت مرجع برای تغییرات UI-only در کدکس

You are working on the iPasargad Angular project.

Important scope:
This task is UI/UX-only and mobile-first.

Do not change:
- real API services
- REST services
- interceptors
- route guards
- authentication logic
- payment logic
- Sejam logic
- token/session storage
- backend integration logic
- environment files
- route structure
- shared domain models

Allowed changes:
- component HTML
- component SCSS/CSS
- component TypeScript only for display helpers or local mock view data
- Persian UI text and microcopy
- layout hierarchy
- mobile-first visual states such as empty, loading, success, error

Mock data rule:
If online data is not available locally, add component-level mock data only.

Use this pattern:

readonly useMockViewData = true;

// UI preview mock data only. Do not use for production logic.
readonly mockItems = [];

Do not remove existing service calls.
Do not replace real services.
Do not break existing action buttons or routes.

Product principle:
The app already has real users. Keep existing journey entry points familiar. Improve clarity, hierarchy, readability and visual structure without confusing current users.

Mobile-first principle:
Design and review the first viewport for mobile before desktop. Prioritize:
- clear page purpose
- primary user action
- readable cards
- thumb-friendly controls
- bottom navigation familiarity
- avoiding visual overload
- keeping side features below primary flows

After changes:
- Report exactly which files changed.
- Explain any mock data added.
- Confirm no real service/API/auth/payment/Sejam logic was changed.
- Confirm the UI was checked with mobile-first layout assumptions.
