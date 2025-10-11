# Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

## Email Configuration
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@tracehold.com
```

## Google Sheets Configuration
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
```

## Cloudflare Turnstile
```bash
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

## Google Verification (optional)
```bash
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
```

## Setup Instructions

### 1. Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use your Gmail address and the generated app password

### 2. Google Sheets Setup
1. Create a new Google Sheet
2. Go to Google Cloud Console and create a new project
3. Enable Google Sheets API
4. Create a Service Account and download the JSON key
5. Share your Google Sheet with the service account email
6. Add headers to your sheet: Timestamp, Name, Email, Company, Message, GDPR Consent, Status

### 3. Cloudflare Turnstile Setup
1. Go to Cloudflare Dashboard → Turnstile
2. Create a new site
3. Add your domain
4. Copy the Site Key and Secret Key

### 4. Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!
