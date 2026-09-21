# ⚡ 2026 Git Wrapped: Automated Video Pipeline with Shotstack

Automated personal developer recap video pipeline inspired by Spotify Wrapped. Instead of maintaining complex FFmpeg CLI scripts and GPU rendering clusters, this workflow renders personalized dynamic 9:16 short-form videos via the Shotstack Cloud Video API and Node.js concurrent batch calls.

---

## 💡 The Problem vs Solution

- **Traditional Workflow:** Setting up raw FFmpeg commands, provisioning EC2 GPU instances, handling video encoding concurrency, and tuning memory limits per container.
- **API-First Architecture:** Injecting developer stats directly into dynamic HTML/CSS templates and triggering distributed cloud rendering with a single REST API call.

---

## 🛠 Powered by Shotstack

[Shotstack](https://shotstack.io) is a cloud-native video editing and rendering infrastructure built for developers. It abstracts the heavy lifting of media processing—video stitching, HTML/CSS canvas rendering, transitions, audio mixing, and AI video workflows—into scalable, language-agnostic REST APIs and SDKs.

- **Developer Docs:** [docs.shotstack.io](https://shotstack.io/docs/guide/)
- **Interactive Studio & SDKs:** [shotstack.io/docs/guide/studio-sdk/](https://shotstack.io/docs/guide/studio-sdk/)
- **Community & Sandbox:** Grab a free sandbox API key directly at [shotstack.io](https://shotstack.io) (no credit card required) to prototype programmatic media pipelines instantly.

---

## ✨ Features

- **Persona & Dynamic Theming:** Automatically adapts terminal styling, Monokai/Dracula color palettes, badges, and stats per developer.
- **Code-Driven Video Composition:** Uses HTML5/CSS3 keyframe layouts compiled directly into 1080x1920 MP4 assets.
- **Parallel Batch Rendering:** Dispatches multiple video renders concurrently using `Promise.all` and polls for cloud completion status.
- **Zero Server Overhead:** Serverless cloud scale with $0 ongoing infrastructure management.

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
git clone [https://github.com/DoYam/shotstack-demo.git](https://github.com/DoYam/shotstack-demo.git)
cd shotstack-demo
npm install