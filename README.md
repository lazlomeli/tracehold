# Tracehold Landing Page

A modern, secure landing page for Tracehold built with Next.js 14, featuring blockchain-verifiable Bill of Lading solutions.

## Features

- ✅ **SEO Optimized**: Complete metadata, OG tags, Twitter cards, robots.txt, and sitemap
- ✅ **Secure Contact Form**: Zod validation, Cloudflare Turnstile captcha, GDPR compliance
- ✅ **Email Notifications**: Owner notification and user confirmation emails
- ✅ **Data Storage**: Google Sheets integration with exportable data service
- ✅ **Security**: Vercel security headers, HTTPS redirects, CSP
- ✅ **Responsive Design**: Mobile-first Tailwind CSS design
- ✅ **Additional Pages**: Thank you and privacy policy pages

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Email**: Nodemailer
- **Captcha**: Cloudflare Turnstile
- **Data Storage**: Google Sheets API
- **Deployment**: Vercel

## Quick Start

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `ENVIRONMENT_SETUP.md` for detailed instructions
   - Create `.env.local` with required variables

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Deploy to Vercel**:
   ```bash
   npx vercel
   ```

## Environment Variables

See `ENVIRONMENT_SETUP.md` for complete setup instructions.

Required variables:
- Email configuration (SMTP)
- Google Sheets API credentials
- Cloudflare Turnstile keys

## Project Structure

```
├── app/
│   ├── api/contact/route.ts    # Contact form API endpoint
│   ├── layout.tsx              # Root layout with SEO metadata
│   ├── page.tsx                # Main landing page
│   ├── privacy/page.tsx        # Privacy policy page
│   ├── thank-you/page.tsx      # Thank you page
│   ├── robots.ts               # SEO robots configuration
│   └── sitemap.ts              # SEO sitemap
├── lib/
│   ├── data-service.ts         # Abstracted data persistence layer
│   ├── email.ts                # Email service
│   ├── google-sheets.ts        # Google Sheets integration
│   └── validations.ts          # Zod validation schemas
├── vercel.json                 # Vercel configuration
└── ENVIRONMENT_SETUP.md        # Environment setup guide
```

## Security Features

- **Content Security Policy**: Restricts resource loading
- **Security Headers**: X-Content-Type-Options, Referrer-Policy, etc.
- **HTTPS Redirects**: Automatic www → apex domain redirect
- **Input Validation**: Zod schema validation
- **Bot Protection**: Cloudflare Turnstile integration
- **GDPR Compliance**: Privacy policy and consent handling

## Data Service Architecture

The `saveLead` function is abstracted through `lib/data-service.ts` to allow easy switching between data storage solutions:

- **Current**: Google Sheets integration
- **Future**: Postgres implementation (placeholder included)

To switch to Postgres, simply set `USE_POSTGRES=true` in environment variables and implement the `PostgresDataService` class.

## Deployment

This project is optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

The `vercel.json` configuration handles:
- Domain redirects (www → apex)
- Security headers
- Function timeout settings

## Contributing

1. Follow the existing code structure
2. Maintain security best practices
3. Update documentation for new features
4. Test thoroughly before deployment

## License

© 2024 Tracehold B.V. All rights reserved.
