# پرامپت کدکس برای بهبود UI داشبورد

You are working on the iPasargad Angular project.

Target:
projects/client/src/app/features/dashboard

Task:
Improve the dashboard UI only.

Important:
This is a UI/UX-only and mobile-first task.

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
- dashboard component HTML
- dashboard component SCSS/CSS
- dashboard component TypeScript only for display helpers and local mock view data

Product principle:
The app already has real users. Keep existing journey entry points familiar. Do not remove or hide existing primary actions.

Dashboard role:
Dashboard should be a real dashboard:
- overall asset status
- urgent status or pending requests
- primary actions
- concise overview of the 4 main funds
- recent activity
- secondary services lower on the page

Mobile-first requirements:
First mobile viewport should prioritize:
1. Total asset summary
2. Important status or pending request if any
3. Primary actions:
   - سرمایه‌گذاری
   - برداشت
   - تبدیل صندوق

Lower sections:
4. Four main fund cards
5. Recent activity
6. Secondary services:
   - افزودن کارت بانکی آی‌پاسارگاد
   - سرمایه‌گذاری خودکار
   - پرداخت مستقیم / دایرکت دبیت

Mock data rule:
If online data is not available locally, add component-level mock data only.

Use this pattern:

readonly useMockViewData = true;

// UI preview mock data only. Do not use for production logic.
readonly mockDashboardFunds = [];

Do not remove existing service calls.
Do not replace real services.
Do not break existing action buttons, modals, or routes.

Acceptance criteria:
- Runs with:
  npx ng serve client --configuration development --host 0.0.0.0 --port 4200
- Dashboard renders with useful mock visual data if APIs are unavailable.
- Existing primary actions remain available.
- Secondary services are not in the first viewport.
- No real service/API/auth/payment/Sejam logic changed.
- RTL Persian layout remains correct.
- Mobile-first layout is readable and not overloaded.
