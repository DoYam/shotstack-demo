# ⚡ 2026 Git Wrapped: Automated Video Pipeline with Shotstack

Automated personal developer recap video pipeline inspired by Spotify Wrapped[cite: 3]. It maps developer data into dynamic HTML/CSS terminal templates and triggers distributed cloud video rendering via the Shotstack Edit API[cite: 3].

---

## 🛠 About Shotstack

[Shotstack](https://shotstack.io) provides cloud-based video editing and rendering infrastructure accessible through REST APIs and SDKs[cite: 3].

- **What it does:** Automates video creation, editing, and rendering in the cloud using JSON/HTML templates without requiring local FFmpeg scripts or GPU server management[cite: 3].
- **Key Capabilities:** Dynamic HTML/CSS-to-video rendering, asset mixing, audio overlay, and timeline sequencing[cite: 3].
- **Docs & Resources:**
  - Documentation: [shotstack.io/docs/guide/](https://shotstack.io/docs/guide/)[cite: 3]
  - Studio SDK & Interactive Examples: [shotstack.io/docs/guide/studio-sdk/](https://shotstack.io/docs/guide/studio-sdk/)[cite: 3]
  - Sandbox: Free developer API key available at [shotstack.io](https://shotstack.io) (no credit card required)[cite: 3].

---

## 💡 Key Architecture

- **Input:** Developer statistics (commits, streak, language usage, LOC)[cite: 3].
- **Template:** Dynamic HTML/CSS with JetBrains Mono, p10k-style terminal prompts, and customized themes (Monokai Pro, Dracula).
- **Execution:** Dispatches concurrent batch render requests using Node.js and polls the render endpoint until MP4 generation completes[cite: 3].
- **Output:** Individual 1080x1920 (9:16) MP4 video files hosted on cloud storage[cite: 3].

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
git clone [https://github.com/DoYam/shotstack-demo.git](https://github.com/DoYam/shotstack-demo.git)
cd shotstack-demo
npm install