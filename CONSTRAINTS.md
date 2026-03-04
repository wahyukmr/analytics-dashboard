# Project Constraints

This project intentionally limits scope to preserve architectural clarity.

## Technical Constraints

- No real backend integration
- No authentication system
- No SSR or server-side data processing
- No global state management unless justified
- No unnecessary third-party abstraction layers

## Data Constraints

- Dataset is mocked and static
- All transformations are deterministic
- No real-time updates or streaming data

## Scope Constraints

- Focused on analytics for a SaaS product context
- Core metrics: user activity, feature usage, conversion
- No enterprise-level role management
- No multi-tenant logic

## Performance Constraints

- Must remain responsive on low-end devices
- Avoid unnecessary re-renders
- Avoid premature optimization without reasoning 