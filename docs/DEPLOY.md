# GitHub Pages Deployment Guide

## Setup

### 1. Push to GitHub

```bash
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to repo **Settings**, select **Pages**.
2. Under **Source**, select **GitHub Actions**.

### 3. Configure Custom Domain DNS

Add these records to DNS:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | haolamnm.github.io |

Refer to [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) for more details.

### 4. Enable Custom Domain in GitHub

1. **Settings** → **Pages** → Custom domain: `haolamnm.dev`
2. Check **Enforce HTTPS** (after DNS propagates)

## Verify Deployment

- Wait for DNS propagation (based on configuration).
- Visit [https://haolamnm.dev](https://haolamnm.dev).
- Check Actions tab for build status.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 Not Found | Wait for Actions build, check `dist/index.html` exists |
| DNS not configured | Verify records, wait for propagation |
| HTTPS not working | Ensure CNAME file in `public/`, wait for SSL cert |
