# NovaTech Business Platform

React + Vite based Uzbek business landing page and role-separated admin workspace.

## Features

- Responsive public landing page with editable services, statistics, testimonials, and contact form
- Separate User Admin and Director workspaces with role-based navigation
- Search, status filters, record creation, charts, notifications, and activity history
- Editable website content, admin account management, and security settings
- Dark/light themes and browser-local persistence
- Director data tools for JSON import/export

## Run locally

```sh
npm install
npm run dev
```

Quality checks:

```sh
npm run lint
npm run build
```

## Demo accounts

| Role | Email / account ID | Access code |
| --- | --- | --- |
| User Admin | `abduazizabumanonov6Gmail.com` | `123456789` |
| Director | `abduazizabdumanonov7` | `987654321` |

Both accounts can change their email and access code from **Settings → Security**. The Director can also manage or reset the User Admin account.

## Data and security

This frontend demo stores account data, credentials, and business records in browser `localStorage`. It has no server-side authentication, database, or authorization boundary. Do not use real customer data or deploy these demo credentials as a production security system. A production deployment must replace the local data layer with a secured API, server-side credential hashing, and enforced role-based access control.