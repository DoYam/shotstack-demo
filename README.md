# ⚡ 2026 Git Wrapped: Automated Video Pipeline with Shotstack

Automated personal developer recap video pipeline inspired by Spotify Wrapped. Instead of maintaining complex FFmpeg CLI scripts and GPU rendering clusters, this workflow renders personalized dynamic 9:16 short-form videos via the Shotstack Cloud Video API and Node.js concurrent batch calls.

---

## 💡 The Problem vs Solution

- **Traditional Workflow:** Setting up raw FFmpeg commands, provisioning EC2 GPU instances, handling video encoding concurrency, and tuning memory limits per container.
- **API-First Architecture:** Injecting developer stats directly into dynamic HTML/CSS templates and triggering distributed cloud rendering with a single REST API call.

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
git clone https://github.com/DoYam/shotstack-demo
cd <REPO_NAME>
npm install