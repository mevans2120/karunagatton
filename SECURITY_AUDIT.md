# Security Audit Report
**Date:** October 27, 2025
**Site:** Karuna Shamanic Healing Website
**Technology Stack:** Next.js 14.2.29, React 18.2.0, TypeScript

## Executive Summary

**Overall Risk Level:** MODERATE

Your Next.js website has good foundational security practices but contains several important vulnerabilities that should be addressed. The site benefits from a minimal attack surface (static site, no database, no authentication), but has critical missing security headers and vulnerable dependencies.

---

## Critical & High Priority Issues

### 1. Vulnerable Dependencies (HIGH PRIORITY)
**Location:** `package.json:22`

**Issues Found:**
- **Next.js 14.2.29** contains 4 security vulnerabilities:
  - Information exposure in dev server due to lack of origin verification
  - Cache key confusion for Image Optimization API routes
  - Improper middleware redirect handling leading to SSRF
  - Content injection vulnerability for image optimization
- **brace-expansion 2.0.0-2.0.1** has Regular Expression Denial of Service vulnerability

**Risk Level:** Moderate
**Impact:** These vulnerabilities could be exploited if running in development mode or through image optimization endpoints

**Recommended Fix:**
```bash
npm audit fix
npm update next
```

---

### 2. Missing Critical Security Headers (HIGH PRIORITY)
**Location:** `next.config.js:26-60`

**Issues Found:**
The site is missing essential security headers that protect against common web vulnerabilities:

| Header | Status | Purpose |
|--------|--------|---------|
| Content-Security-Policy | ❌ Missing | Prevents XSS, code injection attacks |
| X-Content-Type-Options | ❌ Missing | Prevents MIME-type sniffing attacks |
| Strict-Transport-Security | ❌ Missing | Enforces HTTPS connections |
| Referrer-Policy | ❌ Missing | Controls referrer information leakage |
| Permissions-Policy | ❌ Missing | Restricts browser features |
| X-Frame-Options | ✅ Present (DENY) | Prevents clickjacking |
| X-DNS-Prefetch-Control | ✅ Present (on) | DNS prefetch optimization |

**Risk Level:** High
**Impact:** Site is vulnerable to XSS attacks, clickjacking (partially mitigated), MIME-type attacks, and lacks HTTPS enforcement

**Current Implementation:**
```javascript
// Only two security headers currently implemented
{
  key: 'X-DNS-Prefetch-Control',
  value: 'on'
},
{
  key: 'X-Frame-Options',
  value: 'DENY'
}
```

**Recommended Implementation:**
Add to `next.config.js` headers array:
```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://formspree.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://formspree.io; frame-ancestors 'none';"
},
{
  key: 'X-Content-Type-Options',
  value: 'nosniff'
},
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains'
},
{
  key: 'Referrer-Policy',
  value: 'strict-origin-when-cross-origin'
},
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=()'
}
```

---

### 3. Unsafe Inline HTML (MEDIUM PRIORITY)
**Location:** `src/app/layout.tsx:76-127`

**Issues Found:**
- `dangerouslySetInnerHTML` used for inline critical CSS (lines 76-80)
- `dangerouslySetInnerHTML` used for Google Analytics script (lines 118-127)

**Risk Level:** Medium
**Impact:** While the current implementation appears safe, this pattern bypasses React's built-in XSS protections. Combined with missing Content-Security-Policy headers, this creates unnecessary vulnerability surface.

**Code Examples:**
```typescript
// Line 76-80: Inline CSS
<style dangerouslySetInnerHTML={{
  __html: `...critical CSS...`
}} />

// Line 118-127: Google Analytics
<script defer dangerouslySetInnerHTML={{
  __html: `...GA code...`
}} />
```

**Recommended Fix:**
1. Extract inline CSS to an external CSS file or use Next.js styled-jsx
2. Use `next/script` component for Google Analytics instead of dangerouslySetInnerHTML
3. If inline scripts are necessary, implement strict CSP with nonces

---

### 4. Third-Party Form Service Security (LOW-MEDIUM PRIORITY)
**Location:** `src/app/get-in-touch/page.tsx:179`

**Issues Found:**
- Contact form uses Formspree (https://formspree.io/f/manepoek)
- No client-side input validation beyond HTML5 `required` attribute
- No visible CSRF protection
- No rate limiting implemented on client side
- Form submits directly to third-party service

**Risk Level:** Low-Medium
**Impact:** Potential for spam abuse, no input sanitization before submission

**Current Implementation:**
```typescript
<form
  action="https://formspree.io/f/manepoek"
  className="fs-form"
  target="_top"
  method="POST"
>
  <input className="fs-input" id="name" name="name" required />
  <input className="fs-input" id="email" name="email" required />
  <textarea className="fs-textarea" id="message" name="message" required></textarea>
</form>
```

**Recommended Improvements:**
1. Add honeypot field for spam prevention
2. Implement client-side email validation
3. Add Google reCAPTCHA v3
4. Configure Formspree rate limiting settings
5. Add input length restrictions (maxLength attributes)

---

## Positive Security Findings

### What's Working Well ✅

1. **Clickjacking Protection**
   - `X-Frame-Options: DENY` properly configured (`next.config.js:37-38`)
   - Prevents site from being embedded in iframes

2. **Environment Variable Protection**
   - `.env*` files properly gitignored (`.gitignore:34`)
   - No environment variables exposed in client-side code

3. **Minimal Attack Surface**
   - No authentication system (reduces credential attack vectors)
   - No API routes (no backend to exploit)
   - No database (eliminates SQL injection risk)
   - No file upload functionality
   - Static site generation

4. **SVG Security**
   - Content-Security-Policy for SVG images (`next.config.js:23`)
   - `dangerouslyAllowSVG: true` with proper CSP sandbox

5. **Production Optimizations**
   - Console logs removed in production (`next.config.js:8`)
   - Prevents information leakage via browser console

6. **Caching Configuration**
   - Long-term caching for static assets (1 year)
   - Proper cache headers for fonts and images

7. **Compression**
   - Compression enabled (`next.config.js:120`)

8. **HTTPS Upgrade**
   - Images served with WebP and AVIF formats
   - Next.js automatically upgrades HTTP to HTTPS

9. **SEO & Metadata**
   - Proper robots.txt configuration
   - XML sitemap present

10. **Dependency Management**
    - Modern browserslist configuration
    - TypeScript for type safety

---

## Attack Surface Analysis

### Exposure Level: LOW

**Public Endpoints:**
1. Static HTML pages (GET only)
2. Contact form (POST to Formspree)
3. Image optimization API (Next.js built-in)

**No Exposure:**
- ❌ No user authentication
- ❌ No database queries
- ❌ No file uploads
- ❌ No cookies (except Google Analytics)
- ❌ No session management
- ❌ No API routes
- ❌ No server-side processing of user input

### Most Likely Attack Vectors:

1. **Cross-Site Scripting (XSS)** - Missing CSP headers
2. **Contact Form Abuse** - Spam, phishing attempts
3. **Dependency Vulnerabilities** - Outdated Next.js version
4. **HTTPS Downgrade** - Missing HSTS header
5. **Analytics Tracking** - Third-party script from Google

---

## Compliance & Privacy Notes

### GDPR Compliance
- ✅ Minimal data collection (only contact form)
- ✅ No user tracking beyond Google Analytics
- ⚠️ **Issue:** Google Analytics loads without cookie consent banner
  - **Risk:** May violate GDPR/CCPA for EU visitors
  - **Recommendation:** Implement cookie consent banner or switch to privacy-focused analytics

### Data Storage
- Contact form data: Stored by Formspree (third-party)
- Analytics data: Stored by Google Analytics (third-party)
- No first-party data storage

### Cookies
- ✅ No first-party cookies set by your code
- ⚠️ Google Analytics sets third-party cookies (_ga, _gid)

---

## Detailed Recommendations

### Immediate Actions (Do Now)

#### 1. Update Dependencies
```bash
# Update vulnerable packages
npm audit fix

# Specifically update Next.js
npm install next@latest

# Verify fixes
npm audit --production
```

#### 2. Add Security Headers
Edit `next.config.js`, replace the headers section with:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://formspree.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://formspree.io; frame-ancestors 'none';"
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), payment=()'
        }
      ],
    },
    // ... keep existing font and image cache headers
  ];
}
```

### Short-Term Actions (This Week)

#### 3. Improve Form Security
Add to contact form in `src/app/get-in-touch/page.tsx`:

```typescript
// Add honeypot field (hidden from users, spam bots will fill it)
<input
  type="text"
  name="_gotcha"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// Add input validation
<input
  className="fs-input"
  id="email"
  name="email"
  type="email"
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  maxLength={254}
  required
/>

<input
  className="fs-input"
  id="name"
  name="name"
  maxLength={100}
  minLength={2}
  required
/>

<textarea
  className="fs-textarea"
  id="message"
  name="message"
  maxLength={5000}
  minLength={10}
  required
></textarea>
```

#### 4. Replace dangerouslySetInnerHTML
Use Next.js `<Script>` component for Google Analytics:

```typescript
import Script from 'next/script';

// In layout.tsx, remove the dangerouslySetInnerHTML scripts and add:
<Script
  strategy="afterInteractive"
  src="https://www.googletagmanager.com/gtag/js?id=G-FV6QM4YNNN"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-FV6QM4YNNN');
  `}
</Script>
```

### Medium-Term Actions (This Month)

#### 5. Add Cookie Consent Banner
Consider implementing:
- [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent)
- Or a custom GDPR-compliant cookie banner

#### 6. Configure Formspree Security
Log into Formspree dashboard and:
- Enable reCAPTCHA
- Set submission rate limits
- Add email notifications for high-volume submissions

#### 7. Security Monitoring
Set up:
- Dependabot alerts (GitHub)
- Regular npm audit checks (weekly)
- Vercel security headers verification

---

## Testing & Verification

### Security Headers Test
After implementing headers, verify with:
- https://securityheaders.com/
- https://observatory.mozilla.org/

**Target Score:** A+ rating

### Vulnerability Scanning
```bash
# Check dependencies
npm audit

# Deep scan
npx snyk test
```

### Manual Testing Checklist
- [ ] Verify CSP headers in browser DevTools
- [ ] Test contact form with various inputs
- [ ] Check HTTPS enforcement
- [ ] Verify X-Frame-Options (try embedding in iframe)
- [ ] Test on mobile devices
- [ ] Verify no console errors in production

---

## Maintenance Schedule

### Weekly
- [ ] Check for npm security advisories
- [ ] Monitor Formspree submission logs

### Monthly
- [ ] Run `npm audit`
- [ ] Update dependencies: `npm update`
- [ ] Review access logs (if available via Vercel)

### Quarterly
- [ ] Full security audit review
- [ ] Update this document
- [ ] Review and update CSP headers
- [ ] Test all security measures

---

## Additional Resources

### Security Tools
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/pages/building-your-application/configuring/content-security-policy)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [Security Headers](https://securityheaders.com/)

### Documentation
- [Next.js Headers Documentation](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Formspree Security Features](https://help.formspree.io/hc/en-us/articles/360056076314)

---

## Conclusion

Your website has a solid security foundation with minimal attack surface. The primary concerns are:

1. **Vulnerable dependencies** - Easy fix with `npm audit fix`
2. **Missing security headers** - Critical for XSS protection
3. **Form security** - Could be enhanced to prevent abuse

**Estimated Time to Address All Issues:** 2-4 hours

**Priority Order:**
1. Update dependencies (15 minutes)
2. Add security headers (30 minutes)
3. Improve form validation (1 hour)
4. Replace dangerouslySetInnerHTML (1 hour)
5. Add cookie consent (1-2 hours)

After implementing these recommendations, the site will have an **excellent security posture** for a static marketing website.

---

**Audit Completed By:** Claude Code
**Next Review Date:** January 27, 2026
