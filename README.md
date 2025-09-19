Integrity AI Frontend
An ethically-designed writing assistant built with Next.js, TypeScript, and Tailwind CSS. This project adheres to a strict no-backend policy, relying entirely on client-side state management, mock data, and Mock Service Worker (MSW) for API simulation.

Features
Ethical Design: Persistent banners and a "Responsible Use" interstitial.

Mocked APIs: Full client-side API simulation using Mock Service Worker (MSW).

Client-side State: Uses localStorage for history and user preferences.

Comprehensive UI: Fully navigable UI covering all required pages and features, including multi-tab tools, an API dashboard, and user account settings.

Accessibility: Designed with WCAG AA guidelines in mind (keyboard navigation, proper labeling, focus states).

Light Theme: A clean, professional light theme with no green hues.

Getting Started on Windows 11
Prerequisites
Node.js (v18 or higher)

VS Code

Git

Installation
Open a terminal in VS Code (e.g., PowerShell or Command Prompt).

Create a new folder for the project and navigate into it.

mkdir IntegrityAI
cd IntegrityAI

Create all the files listed in the provided response, ensuring the file paths and names match exactly. For example, create a package.json file in the root directory and a src/app/page.tsx file inside a src/app folder.

Install dependencies using npm.

npm install

Running the application
To start the development server with MSW mocks enabled, use the following command in your VS Code terminal:

npm run dev

The application will be available at http://localhost:3000.

Backend Compatibility
This frontend is designed to be compatible with any backend that exposes a REST API. The Mock Service Worker intercepts calls to /api/v1/... and provides mock responses. Once you build your Python backend, simply update the src/lib/apiClient.ts file to point to your new backend's URL, and remove the MSW setup, and it will work seamlessly.
=======
# IntegrityAI
IntegrityAI – An AI-powered framework for detecting, analyzing, and mitigating AI-generated or manipulated content with transparency, accuracy, and trust.
IntegrityAI

IntegrityAI is a cutting-edge AI framework designed to ensure the trustworthiness of digital content. It provides tools and models to detect AI-generated text, analyze integrity risks, and promote transparent use of large language models (LLMs) in research, enterprise, and public applications.

✨ Key Features

🔍 AI-Content Detection – Detect AI-generated or manipulated text using advanced LLM-based metrics.

📊 Analysis Dashboard – Interactive visualizations for perplexity, entropy, burstiness, and human-likeness scores.

⚖️ Bias & Fairness Checks – Evaluate content for fairness, factual consistency, and bias.

🧩 Modular Architecture – Works seamlessly with Python, JavaScript, and React-based pipelines.

🔐 Transparency First – Designed to support ethical AI use and content authenticity verification.

🚀 Tech Stack

Backend: Python (Flask/Django/FastAPI compatible)

Frontend: React + Tailwind

Integrations: Supports APIs, datasets, and third-party LLMs

📌 Use Cases

Academic integrity & plagiarism detection

Content authenticity verification for media & journalism

Enterprise AI compliance & audit trails

Research benchmarking for AI vs. human text
>>>>>>> 26973146f6caddfe63ddf5061745e47096d244e5
