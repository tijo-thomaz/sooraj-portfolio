# Sooraj's Developer Portfolio

A high-performance, backend-focused developer portfolio built with **React**, **Tailwind CSS**, and **shadcn/ui**. It features a unique **"Git-as-Backend"** content management system, allowing the owner to edit the portfolio configuration directly from the live website by committing changes to GitHub.

## 🚀 Features

-   **Backend-First Design**: Aesthetic tailored for backend engineers (.NET/Azure theme).
-   **Live Config Editor**: Edit your portfolio data (experience, projects, skills) directly on the live site.
-   **Git-as-Backend**: Changes made in the editor are committed directly to your GitHub repository—no database required.
-   **Type-Safe Configuration**: All data is validated against a Zod schema.
-   **Responsive & Accessible**: Built with shadcn/ui and Tailwind CSS.

## 🛠️ Tech Stack

-   **Framework**: React + Vite
-   **Styling**: Tailwind CSS v4 + shadcn/ui
-   **State Management**: Zustand (with persistence)
-   **Icons**: Lucide React
-   **API Integration**: Octokit (GitHub REST API)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/tijo-thomaz/sooraj-portfolio.git
    cd sooraj-portfolio
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    pnpm dev
    ```

## 🔐 How to Edit Content (CMS Mode)

This portfolio includes a built-in editor that allows you to update your information without touching code.

1.  **Go to the Footer**: Scroll to the bottom of the page.
2.  **Click the Lock Icon**: Locate the small lock icon near the social links.
3.  **Authenticate**:
    *   **Token**: Enter a **GitHub Personal Access Token (PAT)**.
        *   *Note*: The token must have `repo` (or specifically `Contents: Read & Write`) permissions.
    *   **Owner**: Enter the repository owner (e.g., `tijo-thomaz`).
    *   **Repo**: Enter the repository name (e.g., `sooraj-portfolio`).
4.  **Edit**: Click "Connect", then use the **Terminal** button (bottom-right) to open the editor.
5.  **Apply**: Click "Apply" to commit your changes to GitHub. The site will automatically rebuild and update in a few minutes (depending on your hosting provider).

## 📂 Project Structure

```
src/
├── shared/
│   └── config/
│       ├── portfolio.config.json  <-- The Source of Truth
│       ├── schema.ts              <-- Zod Validation Schema
│       └── store.ts               <-- Zustand Store & GitHub Logic
├── widgets/                       <-- Feature Sections
│   ├── hero/
│   ├── skills/
│   ├── experience/
│   ├── projects/
│   ├── config-editor/             <-- The CMS Component
│   └── footer/
└── pages/
    └── home/
```

## 🚢 Deployment

This project is optimized for **Vercel** or **Netlify**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  The build command is `pnpm run build`.
4.  **No Environment Variables needed**: The admin authentication happens client-side via the user's own GitHub Token.

## 📄 License

MIT
