
import { useState } from "react";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied ? "#4A4E49" : "transparent",
        border: "1px solid #2E2E2E",
        borderRadius: "0",
        padding: "6px 12px",
        cursor: "pointer",
        color: copied ? "#D1F0C9" : "#A0A6B2",
        fontSize: "12px",
        fontFamily: "'Roboto Mono', monospace",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s",
      }}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>Copied</span>
        </>
      ) : (
        <>
          <span>📋</span>
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

const phases = [
  {
    id: "prelude",
    icon: "⚡",
    title: "The Prelude",
    subtitle: "Before You Touch a Tool",
    color: "#F5F5F5",
    accent: "#8b5e3c",
  },
  {
    id: "idea",
    icon: "💡",
    title: "Phase 1: Idea",
    subtitle: "Claude Chat → Concept Clarity",
    color: "#d4e8d5",
    accent: "#3c7a45",
  },
  {
    id: "design",
    icon: "🎨",
    title: "Phase 2: UX Design",
    subtitle: "Pencil.dev → Visual Blueprint",
    color: "#d5dce8",
    accent: "#3c4f7a",
  },
  {
    id: "prd",
    icon: "📋",
    title: "Phase 3: PRD + Arch",
    subtitle: "Claude Chat → The Master Doc",
    color: "#e8d5e8",
    accent: "#7a3c7a",
  },
  {
    id: "scaffold",
    icon: "🏗️",
    title: "Phase 4: Scaffold",
    subtitle: "Claude Code → Project Skeleton",
    color: "#e8e0d5",
    accent: "#7a6a3c",
  },
  {
    id: "build",
    icon: "🚀",
    title: "Phase 5: Build Night",
    subtitle: "Claude Code CLI → Autonomous Build",
    color: "#d5e8e0",
    accent: "#3c7a6a",
  },
  {
    id: "deploy",
    icon: "🛰️",
    title: "Phase 6: Deploy",
    subtitle: "Railway + Supabase → Production",
    color: "#e8d5d5",
    accent: "#7a3c3c",
  },
];

const phaseContent = {
  prelude: {
    blocks: [
      {
        type: "callout",
        text: 'This is the most important phase. Everything that follows — the autonomous overnight build, the clean Railway deploy — lives or dies based on how thoroughly you prep here. Think of it as "loading the context." Claude can\'t invent your business logic. You must hand it everything it needs.',
      },
      {
        type: "heading",
        text: "What You Must Gather (The Upfront Package)",
      },
      {
        type: "checklist",
        items: [
          "App name, one-sentence purpose, and target user persona",
          "Core user stories (3–5 max). What does the user actually DO in this app?",
          "Tech stack decision — pick one: (A) Next.js 17 + TypeScript + Tailwind + Supabase — best for rapid full-stack apps, Railway auto-detects everything. (B) Angular 17+ + TypeScript + Supabase — better fit if you want an opinionated, enterprise-style structure. Railway supports Angular fully, but you'll need to update the package.json start script to point to the SSR output (see Phase 6 notes). Both use Supabase for the database layer.",
          "Railway account created + a free project ready",
          "Supabase account created + a project spun up (note your Project URL and anon key)",
          "GitHub account with a repo created (even if empty)",
          "Any brand assets: logo, color hex codes, fonts — even rough ones",
          "API keys for any third-party services your app will call",
          "A rough sketch or screenshot of what the app should look like (even a napkin drawing photographed works)",
        ],
      },
      {
        type: "heading",
        text: "The Golden Rule of This Playbook",
      },
      {
        type: "text",
        text: "Claude Chat is your thinking partner and document generator. Pencil.dev is your visual design canvas. Claude Code CLI is your autonomous builder. Use each tool where it is strongest. Don't ask Claude Code to design UX. Don't ask Pencil to write backend logic. Routing work to the right tool is 80% of the battle.",
      },
    ],
  },
  idea: {
    blocks: [
      {
        type: "callout",
        text: "Tool: Claude Chat (claude.ai). This is where you refine a raw idea into something buildable. No code yet. No files. Just conversation.",
      },
      {
        type: "heading",
        text: "Step 1.1 — Idea Refinement Session",
      },
      {
        type: "prompt",
        label: "Starter prompt for Claude Chat:",
        text: 'I want to build a web app. Here\'s my raw idea: [YOUR IDEA]. Help me refine this into a clear product concept. Ask me clarifying questions one at a time. Don\'t suggest features I didn\'t ask for. Help me define: the core problem, the target user, and the ONE core workflow that makes this app valuable.',
      },
      {
        type: "text",
        text: "Answer Claude's questions. This back-and-forth is fast — 5 minutes max. The output is a crisp problem statement and a single happy-path user journey.",
      },
      {
        type: "heading",
        text: "Step 1.2 — User Stories",
      },
      {
        type: "prompt",
        label: "Follow-up prompt:",
        text: "Now write 3–5 user stories in the format: As a [user], I want to [action], so that [value]. Keep them tight. No epic-level stories. These are the atomic units of work.",
      },
      {
        type: "heading",
        text: "Step 1.3 — Feasibility Gut-Check",
      },
      {
        type: "prompt",
        label: "Final prompt before moving on:",
        text: "Given these user stories and this tech stack [YOUR CHOSEN STACK + Supabase + Railway], flag any features that are significantly harder than they look. Be honest. I want to know what to cut or simplify before I start building.",
      },
      {
        type: "output",
        text: "Output of Phase 1: A document (copy it from Claude Chat) containing your refined idea, user stories, and the feasibility notes. Save this. It becomes the input to Phase 3.",
      },
    ],
  },
  design: {
    blocks: [
      {
        type: "callout",
        text: "Tool: Pencil.dev. This is the design-in-code canvas that lives inside your IDE. It outputs production-ready HTML/CSS/React. Think Figma, but git-versioned and code-adjacent.",
      },
      {
        type: "heading",
        text: "Step 2.1 — Install & Connect Pencil",
      },
      {
        type: "checklist",
        items: [
          "Install the Pencil extension in VS Code, Cursor, or Antigravity IDE",
          "⚠️ Antigravity note: it IS a VS Code fork and supports Claude + Pencil for interactive work. But it does NOT support DevContainers (missing from Open VSX marketplace), and there is an active bug with the Claude Code extension inside it. Use Antigravity for daytime design and scaffolding phases. For the Phase 5 overnight autonomous build, fall back to VS Code with DevContainers or run Claude Code CLI directly in a Docker container.",
          "Create a Pencil project (it will live as .pen files in your repo)",
          "If you have brand assets (logo, colors), import them into Pencil as your design kit",
          "If you have Figma sketches, use Pencil's paste-from-Figma to bring them in",
        ],
      },
      {
        type: "heading",
        text: "Step 2.2 — Design Your Core Screens",
      },
      {
        type: "text",
        text: "Use the Pencil canvas to design 2–4 screens maximum. Don't go crazy. You need: the landing/home screen, the main interaction screen (the one screen where the core user story happens), and optionally a settings or profile screen. Use Pencil's AI generation: describe the screen in a prompt and let it generate a starting layout. Then tweak it visually on the canvas. This is where you burn 0 Claude Code tokens doing pixel work.",
      },
      {
        type: "heading",
        text: "Step 2.3 — Hand Off to Claude Code (No Export Needed)",
      },
      {
        type: "text",
        text: "This is where Pencil is different from Figma. There is no export step. Pencil connects to Claude Code via MCP with full read/write access — it is a bidirectional live canvas. Your .pen design files live in the repo like any other source file. When you're ready to turn a screen into real code, simply tell Claude Code: 'Implement this screen using the design in Pencil.' Claude reads the canvas directly through MCP, sees the layout, spacing, and components, and writes production code that matches. If you then tweak colors or spacing on the canvas, the loop stays closed — no rebuild, no file juggling. This is the key token-saver: pixel-level iteration costs nothing here.",
      },
      {
        type: "output",
        text: "Output of Phase 2: 2–4 screen designs as .pen files in your repo, connected to Claude Code via MCP. These are your live visual spec — Claude reads them directly during the build phase. No exported files needed.",
      },
    ],
  },
  prd: {
    blocks: [
      {
        type: "callout",
        text: "Tool: Claude Chat. This is where your Phase 1 idea + Phase 2 designs get turned into the Master Document — the single file that Claude Code will execute against. This is THE most important document in the entire playbook.",
      },
      {
        type: "heading",
        text: "Step 3.1 — Generate the PRD",
      },
      {
        type: "prompt",
        label: "Prompt for Claude Chat:",
        text: "I'm building a web app. Here is my concept: [PASTE Phase 1 output]. Here are my core screens (described): [DESCRIBE what each Pencil screen shows]. Tech stack: [YOUR CHOSEN STACK — e.g. Next.js 17 + TypeScript + Tailwind CSS, or Angular 17 + TypeScript] + Supabase (PostgreSQL) + Railway for hosting.\n\nWrite me a Product Requirements Document (PRD) that includes:\n1. App name and purpose\n2. User stories (from Phase 1)\n3. Database schema — every table, every column, every relationship\n4. API routes — list every endpoint the frontend will call\n5. Auth flow — how users sign up / log in (use Supabase Auth)\n6. Page-by-page breakdown of what each route shows\n7. Environment variables the app will need\n8. Anything that is explicitly OUT OF SCOPE for v1",
      },
      {
        type: "heading",
        text: "Step 3.2 — Architecture Decisions",
      },
      {
        type: "prompt",
        label: "Follow-up:",
        text: "Now write me the architecture decisions section. For each major decision (e.g., should auth use Supabase Auth or custom? Should the API be Next.js API routes or a separate service?), give me the recommendation and the WHY. Keep it opinionated. I don't want options, I want the right answer for this stack.",
      },
      {
        type: "heading",
        text: "Step 3.3 — The CLAUDE.md File",
      },
      {
        type: "prompt",
        label: "Critical prompt:",
        text: "Now generate the CLAUDE.md file for this project. This is the file that Claude Code reads automatically at the start of every session. Include: the tech stack, the bash commands to run (npm run dev, npm run build, etc.), code style rules, the database patterns we're using, and any constraints Claude must follow (e.g., 'never modify the auth middleware directly, always use the useAuth hook').",
      },
      {
        type: "output",
        text: "Output of Phase 3: PRD document + CLAUDE.md file. Save both. The PRD is your spec. The CLAUDE.md goes in the root of your repo and is the first thing Claude Code reads.",
      },
    ],
  },
  scaffold: {
    blocks: [
      {
        type: "callout",
        text: "Tool: Claude Code (interactive mode — NOT the overnight build yet). This phase creates the project skeleton: folder structure, package.json, Supabase migrations, environment config. You stay in the loop here.",
      },
      {
        type: "heading",
        text: "Step 4.1 — Initialize the Project",
      },
      {
        type: "code",
        text: `# In your terminal, cd into your project folder
claude

# Then in Claude Code, paste this prompt:
"Read the CLAUDE.md file and the PRD document. 
Set up the Next.js project with:
- npx create-next-app with TypeScript and Tailwind
- Install all dependencies we'll need (supabase client, etc.)
- Create the folder structure matching our architecture
- Generate the .env.local file with ALL environment variables (use placeholders)
- Create the Supabase migration files for our schema
Do NOT write application code yet. Just the skeleton."`,
      },
      {
        type: "heading",
        text: "Step 4.2 — Connect Supabase via MCP",
      },
      {
        type: "code",
        text: `# Connect Supabase MCP so Claude Code can talk to your DB directly
claude mcp add supabase

# Follow the OAuth flow in browser
# Then verify:
claude mcp list
# You should see supabase listed as connected`,
      },
      {
        type: "heading",
        text: "Step 4.3 — Verify the Skeleton",
      },
      {
        type: "text",
        text: "Run 'npm run dev' and confirm it starts. Run the Supabase migrations and confirm tables exist in your Supabase dashboard. Commit this skeleton to GitHub. This is your safe checkpoint before the big autonomous build.",
      },
      {
        type: "output",
        text: "Output of Phase 4: A working project skeleton (Next.js or Angular, per your stack choice), all migrations applied, MCP connected, committed to GitHub. The app starts but has no real functionality yet.",
      },
    ],
  },
  build: {
    blocks: [
      {
        type: "callout",
        text: "Tool: Claude Code CLI with --dangerously-skip-permissions. This is the overnight autonomous build. You set it up, give it everything it needs, and let it run. But ONLY after proper isolation and guardrails.",
      },
      {
        type: "heading",
        text: "Step 5.1 — Safety First: The Container",
      },
      {
        type: "text",
        text: "Before using --dangerously-skip-permissions, you MUST isolate Claude. The community consensus and Anthropic's own recommendation is to run this inside a Docker container or DevContainer. Your host machine stays untouched.",
      },
      {
        type: "code",
        text: `# Option A: DevContainer (recommended if using VS Code)
# Create .devcontainer/devcontainer.json in your repo
# See the DevContainer setup in the checklist below

# Option B: Docker directly  
# Create a Dockerfile that has Node.js + your project mounted
# Run Claude Code inside the container

# Option C: Vagrant VM (simplest mental model)
# vagrant up → vagrant ssh → claude --dangerously-skip-permissions
# The VM is disposable. If Claude goes sideways, destroy it.`,
      },
      {
        type: "heading",
        text: "Step 5.2 — The Overnight Build Prompt",
      },
      {
        type: "text",
        text: "This is the single most important prompt in the entire playbook. It needs to be thorough, specific, and include explicit checkpoints. Here's the structure:",
      },
      {
        type: "prompt",
        label: "The Master Build Prompt (customize for your app):",
        text: `You are building a complete web application. Read CLAUDE.md first, then follow this plan exactly.

PHASE A — Core Pages & Components
- Implement every page route defined in the PRD
- Use the screen designs in /designs/ as your visual targets
- Use Supabase Auth for sign-up and login
- Implement the database layer using the Supabase client

PHASE B — API & Business Logic  
- Wire up every API route listed in the PRD
- Implement all CRUD operations against Supabase
- Add input validation (use Zod)

PHASE C — Polish & Tests
- Add basic error handling on every API route
- Write at least one integration test per core feature
- Make sure 'npm run build' passes with ZERO errors

PHASE D — Pre-Deploy Checklist
- Run 'npm run build' and fix ALL errors
- Verify all env vars are documented in .env.local.example
- Commit everything to GitHub with a clean commit message
- Update the README

RULES:
- Think hard before starting each phase. Plan, then build.
- Use subagents for isolated tasks: "Use a subagent to write the tests for the auth module"
- If you hit an error you can't fix in 3 attempts, add a TODO comment and move on
- Never modify files outside the /src and /migrations directories
- Run 'npm run build' at the end of each phase as a checkpoint`,
      },
      {
        type: "heading",
        text: "Step 5.3 — Launch It",
      },
      {
        type: "code",
        text: `# Inside your container/VM:
claude --dangerously-skip-permissions -p "$(cat BUILD_PROMPT.md)"

# Or interactively inside Claude Code:
claude --dangerously-skip-permissions
# Then paste your master build prompt

# Now go to sleep. Or do something else.
# Claude will work through Phases A → D autonomously.`,
      },
      {
        type: "heading",
        text: "Step 5.4 — Morning Review",
      },
      {
        type: "checklist",
        items: [
          "Does 'npm run build' pass cleanly?",
          "Does 'npm run dev' start and show your app?",
          "Check the TODO comments Claude left — these are the gaps",
          "Run through your user stories manually in the browser",
          "If something is broken, start a NEW Claude Code session (context is fresh) and paste the specific bug. Don't try to fix everything in one session.",
        ],
      },
      {
        type: "output",
        text: "Output of Phase 5: A fully built application. It may have rough edges (it almost certainly will), but the core flows work. Committed to GitHub.",
      },
    ],
  },
  deploy: {
    blocks: [
      {
        type: "callout",
        text: "Tool: Railway + Supabase dashboards (+ Claude Code for any last fixes). This phase takes 15 minutes if Phase 5 went well.",
      },
      {
        type: "heading",
        text: "Step 6.1 — Railway Deployment",
      },
      {
        type: "checklist",
        items: [
          "Go to railway.app → your project",
          "Click 'New Service' → 'Deploy from GitHub repo'",
          "Select your repo and branch (main)",
          "If Next.js: Railway auto-detects and sets the build command. You're good.",
          "If Angular: Railway supports it but does NOT auto-configure SSR. You must update package.json: rename the current 'start' script to 'dev', then set 'start' to 'node dist/YOUR-APP-NAME/server/server.mjs'. This is what Railway calls to run production. Claude Code can do this for you if you tell it your app name.",
          "Add ALL your environment variables in Railway's env panel (copy from .env.local, replace placeholders with real values)",
          "The Supabase URL and keys go here — never hardcoded in code",
          "Click Deploy. Wait 2 minutes.",
        ],
      },
      {
        type: "heading",
        text: "Step 6.2 — Supabase Production Config",
      },
      {
        type: "checklist",
        items: [
          "Go to your Supabase dashboard",
          "Settings → Auth: set the Site URL to your Railway app URL (e.g., https://your-app.up.railway.app)",
          "Add your Railway URL to the Allowed Redirect URLs",
          "Verify Row Level Security (RLS) policies are enabled on all tables",
          "Run a quick query to confirm data is flowing",
        ],
      },
      {
        type: "heading",
        text: "Step 6.3 — Smoke Test in Production",
      },
      {
        type: "checklist",
        items: [
          "Open your Railway URL in a fresh browser (incognito)",
          "Walk through your core user story end to end",
          "Sign up → do the thing → verify it stuck in Supabase",
          "If something breaks, Railway shows live logs — check them first",
          "If it's a code bug, go back to Claude Code with the specific error and fix it. Push to GitHub. Railway auto-deploys.",
        ],
      },
      {
        type: "output",
        text: "🎉 You're live. TW = DW. The app is in production. Now iterate.",
      },
    ],
  },
};

const toolGuide = [
  {
    tool: "Claude Chat",
    icon: "💬",
    when: "Thinking, planning, generating documents, refining ideas",
    notWhen: "Writing application code, running commands, deploying",
    tips: [
      "Use it as a conversation — ask one thing at a time",
      "Copy outputs into files immediately (PRD, CLAUDE.md)",
      "It has no memory of your repo. You must provide context in the prompt",
      "Perfect for generating the CLAUDE.md that Claude Code will later read",
    ],
  },
  {
    tool: "Pencil.dev",
    icon: "🎨",
    when: "UX design, screen layouts, visual prototyping, component design",
    notWhen: "Backend logic, database design, API routes",
    tips: [
      "Lives inside your IDE (VS Code / Cursor / Antigravity — see Phase 2.1 for Antigravity caveats)",
      "Design files are .pen format, git-versioned — they live in your repo like source code",
      "Import from Figma via copy-paste if you already have designs",
      "No export step — Claude Code reads your canvas live via MCP. Just say 'implement this screen' and it sees the design directly",
      "Saves Claude Code tokens: pixel-level tweaks on the canvas cost nothing",
      "Bidirectional MCP: Claude can read AND write to the canvas programmatically",
    ],
  },
  {
    tool: "Claude Code UI",
    icon: "🖥️",
    when: "Interactive scaffolding, debugging, reviewing Claude's work",
    notWhen: "Overnight autonomous builds (use CLI for that)",
    tips: [
      "Use Shift+Tab to auto-accept permissions for faster interactive work",
      "Use /clear between unrelated tasks to reset context",
      "Good for Phase 4 (scaffolding) where you want to stay in the loop",
      "Use 'think hard' or 'ultrathink' to trigger deeper reasoning on complex problems",
    ],
  },
  {
    tool: "Claude Code CLI",
    icon: "⌨️",
    when: "Autonomous overnight builds, headless automation, CI/CD",
    notWhen: "Quick interactive work (use UI for that)",
    tips: [
      "--dangerously-skip-permissions = YOLO mode. ALWAYS use inside a container",
      "-p flag lets you pass a prompt directly from command line",
      "Use subagents: 'Use a subagent to review the auth code for security issues'",
      "Use 'think' / 'think hard' / 'think harder' / 'ultrathink' for escalating reasoning depth",
      "CLAUDE.md is automatically loaded — make it comprehensive",
      "Use /clear between phases to prevent context rot",
    ],
  },
];

const subAgentGuide = [
  {
    title: "When TO Use Subagents",
    items: [
      "Task produces verbose output (test runs, log analysis) — keeps main context clean",
      "Work is self-contained: 'Use a subagent to write all the test files'",
      "You want to enforce tool restrictions: a read-only security reviewer",
      "Parallel research: 'Use 3 subagents to research these 3 independent topics'",
    ],
  },
  {
    title: "When NOT TO Use Subagents",
    items: [
      "Simple tasks that take <30 seconds",
      "Tasks that depend heavily on the current conversation context",
      "When you need the subagent to spawn other subagents (not supported)",
      "Quick bug fixes or one-liners",
    ],
  },
  {
    title: "Custom Subagent Example (save in .claude/agents/)",
    items: [
      "security-reviewer.md — Read-only agent that scans for SQL injection, XSS, exposed secrets",
      "test-writer.md — Focused agent that writes integration tests for a given module",
      "deploy-checker.md — Verifies build passes, env vars are set, README is updated",
    ],
  },
];

export default function Playbook() {
  const [activePhase, setActivePhase] = useState("prelude");
  const [activeTab, setActiveTab] = useState("phases");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#252629",
        color: "#F5F5F5",
        fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#2E2F33",
          borderBottom: "1px solid #2E2E2E",
          padding: "28px 24px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#A0A6B2",
            marginBottom: "8px",
            fontFamily: "'Roboto Mono', monospace",
          }}
        >
          CMR Services Playbook
        </div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "500",
            color: "#F5F5F5",
            margin: "0 0 6px",
          }}
        >
          Idea → Production
        </h1>
        <p
          style={{
            color: "#A0A6B2",
            fontSize: "13px",
            margin: 0,
            fontWeight: "normal",
          }}
        >
          The autonomous build playbook for Claude + Pencil.dev + Railway + Supabase
        </p>
      </div>

      {/* Tab Nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          padding: "16px 24px",
          background: "#2E2F33",
          borderBottom: "1px solid #2E2E2E",
        }}
      >
        {[
          { id: "phases", label: "📍 Phases" },
          { id: "tools", label: "🛠️ Tool Guide" },
          { id: "subagents", label: "🤖 Sub-Agents" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background:
                activeTab === tab.id
                  ? "#0F5FFE"
                  : "transparent",
              border:
                activeTab === tab.id
                  ? "1px solid #0F5FFE"
                  : "1px solid transparent",
              color: activeTab === tab.id ? "#F5F5F5" : "#A0A6B2",
              borderRadius: "0",
              padding: "10px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Phases Tab */}
      {activeTab === "phases" && (
        <div style={{ display: "flex", minHeight: "calc(100vh - 160px)" }}>
          {/* Phase Sidebar */}
          <div
            style={{
              width: "220px",
              minWidth: "220px",
              background: "#2E2F33",
              borderRight: "1px solid #2E2E2E",
              padding: "12px 8px",
              overflowY: "auto",
            }}
          >
            {phases.map((phase, i) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background:
                    activePhase === phase.id
                      ? "#1F1F1F"
                      : "transparent",
                  border:
                    activePhase === phase.id
                      ? "1px solid #0F5FFE"
                      : "1px solid transparent",
                  borderLeft:
                    activePhase === phase.id
                      ? "2px solid #0F5FFE"
                      : "2px solid transparent",
                  borderRadius: "0",
                  padding: "10px 12px",
                  cursor: "pointer",
                  marginBottom: "4px",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{phase.icon}</span>
                  <div>
                    <div
                      style={{
                        color:
                          activePhase === phase.id ? "#0F5FFE" : "#A0A6B2",
                        fontSize: "13px",
                        fontWeight: "bold",
                        fontFamily: "'Roboto Mono', monospace",
                      }}
                    >
                      {phase.title}
                    </div>
                    <div
                      style={{
                        color: "#A0A6B2",
                        fontSize: "10px",
                        marginTop: "2px",
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      {phase.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Phase Content */}
          <div
            style={{
              flex: 1,
              padding: "28px 32px",
              overflowY: "auto",
              maxWidth: "760px",
            }}
          >
            {(() => {
              const phase = phases.find((p) => p.id === activePhase);
              const content = phaseContent[activePhase];
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "24px",
                    }}
                  >
                    <span style={{ fontSize: "32px" }}>{phase.icon}</span>
                    <div>
                      <h2
                        style={{
                          margin: 0,
                          fontSize: "22px",
                          fontWeight: "500",
                          color: "#0F5FFE",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        {phase.title}
                      </h2>
                      <p
                        style={{
                          margin: 0,
                          color: "#A0A6B2",
                          fontSize: "13px",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        {phase.subtitle}
                      </p>
                    </div>
                  </div>

                  {content.blocks.map((block, idx) => {
                    if (block.type === "callout")
                      return (
                        <div
                          key={idx}
                          style={{
                            background: "#3C4352",
                            border: "1px solid #2E2E2E",
                            borderLeft: "2px solid #B2CCFF",
                            borderRadius: "0",
                            padding: "14px 16px",
                            marginBottom: "20px",
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              color: "#B2CCFF",
                              fontSize: "14px",
                              lineHeight: 1.5,
                              fontFamily: "'Roboto', sans-serif",
                            }}
                          >
                            {block.text}
                          </p>
                        </div>
                      );
                    if (block.type === "heading")
                      return (
                        <h3
                          key={idx}
                          style={{
                            color: "#F5F5F5",
                            fontSize: "18px",
                            fontWeight: "500",
                            borderBottom: "1px solid #2E2E2E",
                            paddingBottom: "6px",
                            marginTop: "24px",
                            marginBottom: "12px",
                            fontFamily: "'Roboto', sans-serif",
                          }}
                        >
                          {block.text}
                        </h3>
                      );
                    if (block.type === "text")
                      return (
                        <p
                          key={idx}
                          style={{
                            color: "#A0A6B2",
                            fontSize: "14px",
                            lineHeight: 1.5,
                            margin: "0 0 16px",
                            fontFamily: "'Roboto', sans-serif",
                          }}
                        >
                          {block.text}
                        </p>
                      );
                    if (block.type === "checklist")
                      return (
                        <div key={idx} style={{ marginBottom: "16px" }}>
                          {block.items.map((item, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                padding: "5px 0",
                              }}
                            >
                              <span
                                style={{
                                  color: "#0F5FFE",
                                  marginTop: "2px",
                                  fontSize: "14px",
                                  flexShrink: 0,
                                }}
                              >
                                ▸
                              </span>
                              <span
                                style={{
                                  color: "#A0A6B2",
                                  fontSize: "14px",
                                  lineHeight: 1.5,
                                  fontFamily: "'Roboto', sans-serif",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    if (block.type === "prompt")
                      return (
                        <div
                          key={idx}
                          style={{
                            background: "#252629",
                            border: "1px solid #2E2E2E",
                            borderRadius: "0",
                            marginBottom: "16px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              background: "#2E2F33",
                              padding: "8px 14px",
                              borderBottom: "1px solid #2E2E2E",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "12px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <span style={{ color: "#B2CCFF", fontSize: "11px" }}>
                                💬
                              </span>
                              <span
                                style={{
                                  color: "#B2CCFF",
                                  fontSize: "11px",
                                  fontFamily: "'Roboto Mono', monospace",
                                  letterSpacing: "1px",
                                  textTransform: "uppercase",
                                }}
                              >
                                {block.label}
                              </span>
                            </div>
                            <CopyButton text={block.text} />
                          </div>
                          <pre
                            style={{
                              margin: 0,
                              padding: "14px 16px",
                              color: "#A0A6B2",
                              fontSize: "13px",
                              lineHeight: 1.5,
                              whiteSpace: "pre-wrap",
                              fontFamily: "'Roboto Mono', monospace",
                            }}
                          >
                            {block.text}
                          </pre>
                        </div>
                      );
                    if (block.type === "code")
                      return (
                        <div
                          key={idx}
                          style={{
                            background: "#1F1F1F",
                            border: "1px solid #2E2E2E",
                            borderRadius: "0",
                            marginBottom: "16px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              background: "#252629",
                              padding: "6px 14px",
                              borderBottom: "1px solid #2E2E2E",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "6px",
                              }}
                            >
                              <span
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  background: "#A62911",
                                }}
                              />
                              <span
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  background: "#F5E1CE",
                                }}
                              />
                              <span
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  background: "#D1F0C9",
                                }}
                              />
                            </div>
                            <CopyButton text={block.text} />
                          </div>
                          <pre
                            style={{
                              margin: 0,
                              padding: "14px 16px",
                              color: "#D1F0C9",
                              fontSize: "13px",
                              lineHeight: 1.5,
                              whiteSpace: "pre-wrap",
                              fontFamily: "'Roboto Mono', monospace",
                            }}
                          >
                            {block.text}
                          </pre>
                        </div>
                      );
                    if (block.type === "output")
                      return (
                        <div
                          key={idx}
                          style={{
                            background: "#4A4E49",
                            border: "1px solid #D1F0C9",
                            borderLeft: "2px solid #D1F0C9",
                            borderRadius: "0",
                            padding: "12px 16px",
                            marginTop: "24px",
                            marginBottom: "8px",
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              color: "#D1F0C9",
                              fontSize: "14px",
                              fontWeight: "500",
                              fontFamily: "'Roboto', sans-serif",
                            }}
                          >
                            ✓ {block.text}
                          </p>
                        </div>
                      );
                    return null;
                  })}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Tool Guide Tab */}
      {activeTab === "tools" && (
        <div style={{ padding: "24px 28px", maxWidth: "780px", margin: "0 auto" }}>
          <p
            style={{
              color: "#A0A6B2",
              fontSize: "14px",
              marginTop: 0,
              marginBottom: "24px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            When to use which tool — the routing decisions that make or break your
            workflow.
          </p>
          {toolGuide.map((tool, i) => (
            <div
              key={i}
              style={{
                background: "#1F1F1F",
                border: "1px solid #2E2E2E",
                borderRadius: "0",
                marginBottom: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#2E2F33",
                  padding: "14px 18px",
                  borderBottom: "1px solid #2E2E2E",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "22px" }}>{tool.icon}</span>
                <div>
                  <div
                    style={{
                      color: "#F5F5F5",
                      fontSize: "16px",
                      fontWeight: "500",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {tool.tool}
                  </div>
                </div>
              </div>
              <div style={{ padding: "14px 18px", background: "#1F1F1F" }}>
                <div style={{ marginBottom: "10px" }}>
                  <span
                    style={{
                      color: "#D1F0C9",
                      fontSize: "11px",
                      fontFamily: "'Roboto Mono', monospace",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    ✓ USE FOR
                  </span>
                  <p
                    style={{
                      color: "#A0A6B2",
                      fontSize: "14px",
                      margin: "4px 0 0",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {tool.when}
                  </p>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <span
                    style={{
                      color: "#F5C4CC",
                      fontSize: "11px",
                      fontFamily: "'Roboto Mono', monospace",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    ✗ NOT FOR
                  </span>
                  <p
                    style={{
                      color: "#A0A6B2",
                      fontSize: "14px",
                      margin: "4px 0 0",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {tool.notWhen}
                  </p>
                </div>
                <div
                  style={{
                    borderTop: "1px solid #2E2E2E",
                    paddingTop: "12px",
                  }}
                >
                  <span
                    style={{
                      color: "#A0A6B2",
                      fontSize: "11px",
                      fontFamily: "'Roboto Mono', monospace",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    Tips
                  </span>
                  {tool.tips.map((tip, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        padding: "4px 0",
                      }}
                    >
                      <span
                        style={{
                          color: "#0F5FFE",
                          marginTop: "2px",
                          fontSize: "12px",
                          flexShrink: 0,
                        }}
                      >
                        →
                      </span>
                      <span
                        style={{
                          color: "#A0A6B2",
                          fontSize: "13px",
                          lineHeight: 1.5,
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-Agents Tab */}
      {activeTab === "subagents" && (
        <div style={{ padding: "24px 28px", maxWidth: "780px", margin: "0 auto" }}>
          <p
            style={{
              color: "#A0A6B2",
              fontSize: "14px",
              marginTop: 0,
              marginBottom: "8px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Subagents run in isolated context windows. They prevent context rot
            and let Claude parallelize work. The Task tool is how Claude
            orchestrates them internally.
          </p>

          <div
            style={{
              background: "#1F1F1F",
              border: "1px solid #2E2E2E",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#8fbc8f",
                lineHeight: 1.8,
              }}
            >
              <div style={{ color: "#A0A6B2", marginBottom: "4px" }}>
                // How to invoke subagents in your prompt:
              </div>
              <div>
                "Use a subagent to write integration tests for the auth
                module"
              </div>
              <div>
                "Use a subagent to do a security review of
                /src/api/routes/"
              </div>
              <div>
                "Use 3 subagents in parallel: one researches Next.js
                caching, one checks Supabase RLS patterns, one reviews our
                error handling"
              </div>
            </div>
          </div>

          {subAgentGuide.map((section, i) => (
            <div
              key={i}
              style={{
                background: "#1F1F1F",
                border: "1px solid #2E2E2E",
                borderRadius: "10px",
                marginBottom: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#252018",
                  padding: "12px 18px",
                  borderBottom: "1px solid #2E2E2E",
                }}
              >
                <span
                  style={{
                    color: "#F5F5F5",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {section.title}
                </span>
              </div>
              <div style={{ padding: "12px 18px" }}>
                {section.items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      padding: "5px 0",
                    }}
                  >
                    <span
                      style={{
                        color: "#A0A6B2",
                        marginTop: "2px",
                        fontSize: "12px",
                        flexShrink: 0,
                      }}
                    >
                      ▸
                    </span>
                    <span
                      style={{
                        color: "#b0a490",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Thinking Levels */}
          <div
            style={{
              background: "#1F1F1F",
              border: "1px solid #2E2E2E",
              borderRadius: "10px",
              marginTop: "24px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#252018",
                padding: "12px 18px",
                borderBottom: "1px solid #2E2E2E",
              }}
            >
              <span
                style={{
                  color: "#F5F5F5",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                🧠 Thinking Depth Levels (Claude Code)
              </span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <p
                style={{
                  color: "#A0A6B2",
                  fontSize: "12px",
                  marginTop: 0,
                  marginBottom: "12px",
                }}
              >
                These keywords trigger progressively deeper reasoning. Use them
                in your prompts when the task is complex.
              </p>
              {[
                { word: '"think"', depth: "Basic", color: "#6b8f6b" },
                { word: '"think hard"', depth: "Medium", color: "#8fbc8f" },
                {
                  word: '"think harder"',
                  depth: "Deep",
                  color: "#a8d5a8",
                },
                {
                  word: '"ultrathink"',
                  depth: "Maximum",
                  color: "#c8e8c8",
                },
              ].map((level, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "6px 0",
                    borderBottom:
                      i < 3 ? "1px solid rgba(42,37,32,0.5)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: `${(i + 1) * 18}px`,
                      height: "8px",
                      borderRadius: "4px",
                      background: level.color,
                      transition: "width 0.3s",
                    }}
                  />
                  <span
                    style={{
                      color: level.color,
                      fontFamily: "monospace",
                      fontSize: "13px",
                      fontWeight: "bold",
                      minWidth: "130px",
                    }}
                  >
                    {level.word}
                  </span>
                  <span
                    style={{ color: "#A0A6B2", fontSize: "12px" }}
                  >
                    {level.depth}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #2E2E2E",
          padding: "16px 24px",
          textAlign: "center",
          background: "#2E2F33",
        }}
      >
        <p
          style={{
            color: "#A0A6B2",
            fontSize: "12px",
            margin: 0,
            fontFamily: "'Roboto Mono', monospace",
          }}
        >
          TW = DW — Team Work makes the Dream Work
        </p>
      </div>
    </div>
  );
}
