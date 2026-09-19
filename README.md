# Ayush Swasthya Saathi (स्वास्थ्य साथी)

An ABDM-compliant, voice-first digital health platform inspired by traditional Indian art aesthetics and the Ministry of Ayush.

## Features
- **Voice-First & Multilingual**: Supports Hindi, Tamil, Telugu, Bengali, Marathi, and English with built-in voice interaction for low-literacy patient accessibility.
- **ABDM Digital Health Record**: Instant Ayush ABHA card generation, QR verification, and health records repository.
- **Ayush Remedies & Lifestyle**: Evidence-based Ayurveda, Yoga, Unani, Siddha, and Homeopathy recommendations.
- **Dual Console**: Dedicated Patient Interface and Clinician/Doctor Console.

## Deployment to GitHub Pages

### Option 1: GitHub Actions (Recommended)
1. Go to **Settings** > **Pages** in this repository.
2. Under **Source**, select **GitHub Actions**.
3. Any push to `main` will automatically build and deploy the app.

### Option 2: Deploy with gh-pages
```bash
npm install
npm run deploy
```
Then set GitHub Pages source to the `gh-pages` branch.
