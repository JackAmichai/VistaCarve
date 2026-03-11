# VistaCarve | Premium E-Commerce Portfolio

VistaCarve is a high-end e-commerce platform inspired by VistaPrint, specializing in custom carvings and engravings across various materials including wood, metal, stone, and marble. 

This project is a technical showcase of advanced Wix Headless integration, modern frontend architecture, and robust QA automation.

## 🚀 Key Features

- **Wix Headless Integration**: Fully integrated with Wix eCommerce, Checkout, and Site Management APIs.
- **Dynamic Product Filtering**: Smart filtering system that adapts to category-specific materials (e.g., Oak/Walnut for Wood, Granite/Marble for Stone).
- **Multi-Step B2B Wizard**: Automated Wix site provisioning tool with step-by-step progress tracking.
- **Modern UI/UX**: Built with Next.js 14, Tailwind CSS, and Framer Motion for smooth animations and a premium feel.
- **Onboarding Experience**: Integrated `driver.js` tour and adaptive chatbot assistant.
- **Full E2E Test Suite**: Comprehensive Playwright tests covering browsing, cart logic, B2B flows, and API error handling.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Lucide Icons, Framer Motion
- **CMS & Backend**: Wix Headless SDK (@wix/stores, @wix/ecom, @wix/sdk)
- **Testing**: Playwright E2E

## 🧪 Testing

The project includes a robust E2E test suite. To run the tests:

```bash
npx playwright test
```

Tests cover:
- **Journey A**: Browsing & Dynamic Filtering
- **Journey B**: Cart Functionality & API Integration
- **Journey C**: B2B Wix Site Provisioning Flow
- **Journey D**: Graceful Error Handling for API Failures

## 📦 Deployment

The application is deployed on Vercel:
[https://vistacarve-wix.vercel.app](https://vistacarve-wix.vercel.app)

---

Developed as a Senior Portfolio Piece.
