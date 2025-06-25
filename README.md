
---
# 🚀 Job Application Tracker

A modern, full-stack job application tracking system built with **Next.js 14**, **TypeScript**, and **AI-powered job description analysis**. Manage your job search efficiently, analyze job descriptions with OpenAI, and stay organized.

![Job Tracker Demo](https://via.placeholder.com/800x400/1f2937/ffffff?text=Job+Application+Tracker)

---

## ✨ Features

### 🎯 Core Functionality
- 📝 Add, edit, delete, and track job applications
- 📊 Status monitoring: Applied, Interviewing, Rejected, Offer
- 🤖 AI-powered analysis of job descriptions (OpenAI)
- 📱 Fully responsive: Mobile-first UI
- 🌙 Dark theme with clean, modern styling

### 🛠️ Technical Highlights
- ⚡ Built on **Next.js 14** with App Router and Server Components
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for rapid UI development
- 🔄 Real-time UI updates
- 🛡️ Robust error handling and feedback
- 🧾 Logging support for easier debugging

---

## 🏗️ Tech Stack

| Category        | Technologies                             |
|----------------|-------------------------------------------|
| Frontend        | Next.js 14, React 18, TypeScript         |
| Styling         | Tailwind CSS, CSS Modules                |
| Backend         | Next.js API Routes, Node.js              |
| AI Integration  | OpenAI GPT-3.5-turbo                     |
| Data Storage    | In-memory store (easily replaceable)     |
| Dev Tools       | ESLint, Prettier, Hot Reload             |

---

## 📁 Project Structure

```bash
job-tracker/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/route.ts
│   │   │   └── jobs/
│   │   │       ├── route.ts
│   │   │       └── [id]/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── JobForm.tsx
│   │   ├── JobTable.tsx
│   │   ├── JobAnalyzer.tsx
│   │   ├── EditModal.tsx
│   │   └── DeleteModal.tsx
│   └── lib/
│       ├── types.ts
│       └── store.ts
├── public/
├── .env.local
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md

---

## 🚀 Quick Start

### Prerequisites

* Node.js ≥ 18.x – [Download](https://nodejs.org/)
* npm ≥ 9.x (comes with Node.js)
* Git – [Download](https://git-scm.com/)

### Installation

```bash
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker
npm install
cp .env.example .env.local
---

Update `.env.local` with your OpenAI key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Start development server:

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔧 Configuration

### `.env.local` Example

```env
OPENAI_API_KEY=sk-your-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/).

---

## 📖 Usage Guide

### ➕ Add Jobs

1. Fill the job title, company, link, and status.
2. Click **Add Job** to save.

### 🔧 Manage Jobs

* **Edit**: Modify job details
* **Delete**: Remove a job entry
* **View**: Visit the job posting

### 🤖 AI Job Analysis

1. Paste a job description.
2. Click **Analyze**.
3. Get insights, summary, and skill suggestions.

---

## 🔌 API Reference

### Jobs API

#### `GET /api/jobs`

```json
[
  {
    "id": "1",
    "title": "Frontend Developer",
    "company": "Tech Corp",
    "applicationLink": "...",
    "status": "Applied",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### `POST /api/jobs`

```json
{
  "title": "Backend Developer",
  "company": "StartupXYZ",
  "applicationLink": "https://example.com/job",
  "status": "Applied"
}
```

#### `PUT /api/jobs/[id]`

```json
{
  "status": "Interviewing"
}
```

#### `DELETE /api/jobs/[id]`

---

### AI Analysis API

#### `POST /api/analyze`

```json
{
  "jobDescription": "We are looking for a React developer..."
}
```

**Response:**

```json
{
  "summary": "This role focuses on React development...",
  "recommendedSkills": ["React", "TypeScript", "Node.js"],
  "isReal": true
}
```

---

## 🧪 Testing

```bash
npm install --save-dev jest @testing-library/react
npm test
```

Manual checks:

* Add/edit/delete job
* Analyze description
* Mobile responsiveness
* API and error validation

---

## 🚀 Deployment

### Recommended: **Vercel**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com), import the repo
3. Set env vars (`OPENAI_API_KEY`)
4. Deploy

Other options:

* Netlify (via static export)
* Railway
* DigitalOcean App Platform

---

## 🎨 Customization

* Tailwind: `tailwind.config.js`
* Global styles: `src/app/globals.css`
* Components: `src/components/`
* API: `src/app/api/`

### Use a Database

Replace in-memory store:

* Install Prisma/Drizzle
* Update `lib/store.ts`
* Add schema/migrations

---

## 🐛 Troubleshooting

### Tailwind Not Working?

```bash
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Common Fixes

* OpenAI issues: Check key, billing
* Port in use: `npm run dev -- -p 3001`
* Clear build cache: `rm -rf .next && npm run build`

### Debugging

Add in `.env.local`:

```env
DEBUG=true
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/foo`)
3. Commit changes with tests
4. Open a PR

### Coding Guidelines

* Use TypeScript
* Tailwind for styles
* Comment functions with JSDoc
* Prettier formatting

---

## 🗺️ Roadmap

* 🔐 User Auth (NextAuth.js)
* 🗃️ PostgreSQL + Prisma
* ✉️ Email reminders
* 📅 Interview scheduler
* 📦 Export to CSV/PDF
* 📱 React Native mobile app

---

## 📝 License

MIT License. See [LICENSE](LICENSE).

---

## 🙏 Acknowledgments

* [Next.js](https://nextjs.org)
* [Tailwind CSS](https://tailwindcss.com)
* [OpenAI](https://openai.com)
* [Vercel](https://vercel.com)

---

## 📬 Support

* 📄 Read this README
* 🐞 Report bugs via GitHub Issues
* 💬 GitHub Discussions for help
* 📧 Email: [your-email@example.com](mailto:your-email@example.com)

---

**Built with ❤️ using Next.js, TypeScript, and OpenAI**

*Last updated: January 2024*

```

---

### ✅ Suggested Follow-Up Actions

- [ ] Replace the placeholder demo image with a real screenshot
- [ ] Create a `.env.example` file
- [ ] Add a `LICENSE` file
- [ ] Update your `package.json` with project info (name, description, repo URL)


```
