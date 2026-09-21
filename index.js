import 'dotenv/config';
import axios from 'axios';

// 환경 변수에서 API 키 로드 및 유효성 검증
const SHOTSTACK_API_KEY = process.env.SHOTSTACK_API_KEY?.trim();

if (!SHOTSTACK_API_KEY) {
  console.error('❌ Error: SHOTSTACK_API_KEY is not defined in environment variables.');
  console.error('Please configure your .env file before running the pipeline.');
  process.exit(1);
}

// 2명의 추가 개발자 프로필 (페르소나, 데이터, 컬러 테마 완전 차별화)
const developers = [
  {
    id: 'alex',
    username: 'Alex_Rustacean',
    commits: '2,340',
    streak: '89 Days',
    linesAdded: '+84,120 LOC',
    linesDeleted: '-62,400 LOC',
    peakTime: '05:40 AM',
    peakDesc: 'Dawn Committer 🌅',
    weekendRate: '18% Weekend',
    primaryLang: 'Rust',
    langRatio: '78%',
    mergedPRs: '142 PRs',
    badge: 'RUST CRAB & INFRA BEAST 🦀',
    punchline: 'Zero-cost abstractions. Zero compilation warnings at dawn.',
    theme: {
      bg: '#272822', // Monokai Pro Dark
      border: '#a6e22e',
      titlebar: '#1e1f1c',
      text: '#f8f8f2',
      promptSeg: '#a6e22e',
      accent: '#66d9ef',
      hl: '#fd971f',
      warn: '#f92672'
    }
  },
  {
    id: 'sarah',
    username: 'Sarah_PyTorch',
    commits: '980',
    streak: '31 Days',
    linesAdded: '+41,200 LOC',
    linesDeleted: '-8,950 LOC',
    peakTime: '11:20 PM',
    peakDesc: 'Hyperparameter Tuner 🤖',
    weekendRate: '68% Weekend',
    primaryLang: 'Python',
    langRatio: '82%',
    mergedPRs: '96 PRs',
    badge: 'GPU WHISPERER ⚡',
    punchline: 'Loss converged at midnight. Shipped checkpoint v4.',
    theme: {
      bg: '#282a36', // Dracula Dark
      border: '#bd93f9',
      titlebar: '#21222c',
      text: '#f8f8f2',
      promptSeg: '#bd93f9',
      accent: '#50fa7b',
      hl: '#ff79c6',
      warn: '#f1fa8c'
    }
  }
];

function p10kPrompt(user, path, cmd, cursor = false, segColor = '#007acc') {
  return `
    <div class="prompt-line">
      <span class="seg-user">${user}</span>
      <span class="arrow-user" style="background:${segColor}">▶</span>
      <span class="seg-path" style="background:${segColor}">${path}</span>
      <span class="arrow-path" style="color:${segColor}">▶</span>
      <span class="cmd-text">${cmd}</span>
      ${cursor ? '<span class="cursor"></span>' : ''}
    </div>
  `;
}

function buildUserPayload(dev) {
  const t = dev.theme;

  const termBaseCSS = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'JetBrains Mono', 'Fira Code', Menlo, monospace; }
    .screen { width: 1080px; height: 1920px; background: #07090e; display: flex; align-items: center; justify-content: center; }
    .term-window { width: 980px; height: 1200px; border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; background: ${t.bg}; border: 2px solid ${t.border}; box-shadow: 0 40px 100px rgba(0,0,0,0.85); }
    .titlebar { height: 60px; display: flex; align-items: center; padding: 0 24px; gap: 12px; background: ${t.titlebar}; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .dot { width: 18px; height: 18px; border-radius: 50%; }
    .term-content { flex: 1; padding: 44px 40px; font-size: 28px; line-height: 1.5; text-align: left; color: ${t.text}; }
    
    .prompt-line { display: flex; align-items: center; white-space: nowrap; margin-bottom: 28px; font-size: 26px; }
    .seg-user { background: #000000; color: #ffffff; padding: 4px 14px; font-weight: 800; border-radius: 4px 0 0 4px; }
    .arrow-user { color: #000000; font-size: 20px; padding: 4px 4px; }
    .seg-path { color: #000000; padding: 4px 14px; font-weight: 800; }
    .arrow-path { font-size: 20px; padding-left: 2px; }
    .cmd-text { color: #ffffff; font-weight: bold; margin-left: 14px; }
    .cursor { display: inline-block; width: 14px; height: 28px; background: ${t.accent}; margin-left: 6px; vertical-align: middle; }
    
    .log-line { margin: 10px 0; white-space: pre; }
    .ts { color: #6272a4; }
    .tag-info { color: ${t.accent}; font-weight: bold; }
    .tag-success { color: ${t.hl}; font-weight: bold; }
    .val { color: ${t.hl}; font-weight: bold; }
    .accent { color: ${t.accent}; font-weight: bold; }
  `;

  return {
    timeline: {
      soundtrack: {
        src: 'https://s3-ap-southeast-2.amazonaws.com/shotstack-assets/music/freeflow.mp3',
        effect: 'fadeOut'
      },
      background: '#07090e',
      tracks: [
        {
          clips: [
            // Scene 1: Init (0.0~7.0s)
            {
              asset: {
                type: 'html',
                html: `
                  <style>${termBaseCSS}</style>
                  <div class="screen"><div class="term-window">
                    <div class="titlebar"><div class="dot" style="background:#ff5555"></div><div class="dot" style="background:#ffbd2e"></div><div class="dot" style="background:#50fa7b"></div><span style="color:#888; font-size:20px; font-weight:bold; margin-left:15px;">${dev.username}@zsh</span></div>
                    <div class="term-content">${p10kPrompt(dev.username, '~/wrapped', `npx git-recap --target @${dev.username}`, true, t.promptSeg)}</div>
                  </div></div>
                `
              },
              start: 0,
              length: 1.5
            },
            {
              asset: {
                type: 'html',
                html: `
                  <style>${termBaseCSS}</style>
                  <div class="screen"><div class="term-window">
                    <div class="titlebar"><div class="dot" style="background:#ff5555"></div><div class="dot" style="background:#ffbd2e"></div><div class="dot" style="background:#50fa7b"></div><span style="color:#888; font-size:20px; font-weight:bold; margin-left:15px;">${dev.username}@zsh</span></div>
                    <div class="term-content">
                      ${p10kPrompt(dev.username, '~/wrapped', `npx git-recap --target @${dev.username}`, false, t.promptSeg)}
                      <p class="log-line"><span class="ts">[06:40:11]</span> <span class="tag-info">[AUTH]</span> Authenticated developer: <span class="val">@${dev.username}</span></p>
                      <p class="log-line"><span class="ts">[06:40:12]</span> <span class="tag-info">[FETCH]</span> Parsing tree objects & commit blobs...</p>
                      <p class="log-line"><span class="ts">[06:40:13]</span> <span class="tag-success">[DONE]</span> 365 Days telemetry compiled</p>
                      <br/>
                      <p class="log-line" style="color:${t.accent};">✔ Inspecting architecture throughput...</p>
                    </div>
                  </div></div>
                `
              },
              start: 1.5,
              length: 5.5,
              transition: { out: 'fadeFast' }
            },

            // Scene 2: Throughput (7.0~15.0s)
            {
              asset: {
                type: 'html',
                html: `
                  <style>${termBaseCSS}</style>
                  <div class="screen"><div class="term-window">
                    <div class="titlebar"><div class="dot" style="background:#ff5555"></div><div class="dot" style="background:#ffbd2e"></div><div class="dot" style="background:#50fa7b"></div><span style="color:#888; font-size:20px; font-weight:bold; margin-left:15px;">${dev.username}@zsh</span></div>
                    <div class="term-content">${p10kPrompt(dev.username, '~/wrapped', 'git stats --volume --diff', true, t.promptSeg)}</div>
                  </div></div>
                `
              },
              start: 7.0,
              length: 1.5,
              transition: { in: 'slideUpFast' }
            },
            {
              asset: {
                type: 'html',
                html: `
                  <style>
                    ${termBaseCSS}
                    .term-box { border-left: 5px solid ${t.accent}; background: rgba(255,255,255,0.05); padding: 22px 26px; margin: 24px 0; }
                  </style>
                  <div class="screen"><div class="term-window">
                    <div class="titlebar"><div class="dot" style="background:#ff5555"></div><div class="dot" style="background:#ffbd2e"></div><div class="dot" style="background:#50fa7b"></div><span style="color:#888; font-size:20px; font-weight:bold; margin-left:15px;">${dev.username}@zsh</span></div>
                    <div class="term-content">
                      ${p10kPrompt(dev.username, '~/wrapped', 'git stats --volume --diff', false, t.promptSeg)}
                      <div class="term-box">
                        <p class="log-line">> Total Commits   : <span class="accent">${dev.commits} PUSHES</span></p>
                        <p class="log-line">> Longest Streak  : <span class="accent">${dev.streak} ACTIVE 🔥</span></p>
                      </div>
                      <p class="log-line">> Code Insertions : <span class="accent">${dev.linesAdded}</span> (+++)</p>
                      <p class="log-line">> Code Deletions  : <span style="color:#ff5555;font-weight:bold;">${dev.linesDeleted}</span> (---)</p>
                    </div>
                  </div></div>
                `
              },
              start: 8.5,
              length: 6.5,
              transition: { out: 'fadeFast' }
            },

            // Scene 3: Schedule / Daemon (15.0~23.0s)
            {
              asset: {
                type: 'html',
                html: `
                  <style>${termBaseCSS}</style>
                  <div class="screen"><div class="term-window">
                    <div class="titlebar"><div class="dot" style="background:#ff5555"></div><div class="dot" style="background:#ffbd2e"></div><div class="dot" style="background:#50fa7b"></div><span style="color:#888; font-size:20px; font-weight:bold; margin-left:15px;">${dev.username}@zsh</span></div>
                    <div class="term-content">${p10kPrompt(dev.username, '~/wrapped', 'cat /var/log/runtime_daemon.log', true, t.promptSeg)}</div>
                  </div></div>
                `
              },
              start: 15.0,
              length: 1.5,
              transition: { in: 'slideUpFast' }
            },
            {
              asset: {
                type: 'html',
                html: `
                  <style>
                    ${termBaseCSS}
                    .term-box { border-left: 5px solid ${t.hl}; background: rgba(255,255,255,0.05); padding: 22px 26px; margin: 24px 0; }
                  </style>
                  <div class="screen"><div class="term-window">
                    <div class="titlebar"><div class="dot" style="background:#ff5555"></div><div class="dot" style="background:#ffbd2e"></div><div class="dot" style="background:#50fa7b"></div><span style="color:#888; font-size:20px; font-weight:bold; margin-left:15px;">${dev.username}@zsh</span></div>
                    <div class="term-content">
                      ${p10kPrompt(dev.username, '~/wrapped', 'cat /var/log/runtime_daemon.log', false, t.promptSeg)}
                      <div class="term-box">
                        <p class="log-line">> Peak Coding Hour : <span class="val">${dev.peakTime}</span></p>
                        <p class="log-line">> Active Profile   : <span class="val">${dev.peakDesc}</span></p>
                        <p class="log-line">> Weekend Ratio    : <span class="accent">${dev.weekendRate}</span></p>
                      </div>
                      <p class="log-line"><span style="color:${t.warn}">[SCHEDULE]</span> Autonomous daemon batch finished.</p>
                    </div>
                  </div></div>
                `
              },
              start: 16.5,
              length: 6.5,
              transition: { out: 'fadeFast' }
            },

            // Scene 4: Stack Table (23.0~31.5s)
            {
              asset: {
                type: 'html',
                html: `
                  <style>${termBaseCSS}</style>
                  <div class="screen"><div class="term-window">
                    <div class="titlebar"><div class="dot" style="background:#ff5555"></div><div class="dot" style="background:#ffbd2e"></div><div class="dot" style="background:#50fa7b"></div><span style="color:#888; font-size:20px; font-weight:bold; margin-left:15px;">${dev.username}@zsh</span></div>
                    <div class="term-content">${p10kPrompt(dev.username, '~/wrapped', 'gh repo audit --languages', true, t.promptSeg)}</div>
                  </div></div>
                `
              },
              start: 23.0,
              length: 1.5,
              transition: { in: 'slideUpFast' }
            },
            {
              asset: {
                type: 'html',
                html: `
                  <style>
                    ${termBaseCSS}
                    .table { width: 100%; border-collapse: collapse; margin-top: 24px; }
                    .table th, .table td { text-align: left; padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 26px; }
                    .table th { color: ${t.accent}; font-weight: bold; }
                    .hl { color: ${t.hl}; font-weight: bold; }
                  </style>
                  <div class="screen"><div class="term-window">
                    <div class="titlebar"><div class="dot" style="background:#ff5555"></div><div class="dot" style="background:#ffbd2e"></div><div class="dot" style="background:#50fa7b"></div><span style="color:#888; font-size:20px; font-weight:bold; margin-left:15px;">${dev.username}@zsh</span></div>
                    <div class="term-content">
                      ${p10kPrompt(dev.username, '~/wrapped', 'gh repo audit --languages', false, t.promptSeg)}
                      <table class="table">
                        <tr><th>STACK</th><th>USAGE</th><th>LEVEL</th></tr>
                        <tr><td>${dev.primaryLang}</td><td class="hl">${dev.langRatio} Dominance</td><td style="color:${t.accent}">PRIMARY</td></tr>
                        <tr><td>Merged PRs</td><td>${dev.mergedPRs}</td><td style="color:${t.accent}">APPROVED</td></tr>
                      </table>
                      <br/>
                      <p class="log-line"><span class="ts">[06:40:24]</span> <span class="tag-info">[AI]</span> Synthesizing official persona...</p>
                    </div>
                  </div></div>
                `
              },
              start: 24.5,
              length: 7.0,
              transition: { out: 'fadeFast' }
            },

            // Scene 5: AI Chat Finale (31.5~40.0s)
            {
              asset: {
                type: 'html',
                html: `
                  <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                    .screen { width: 1080px; height: 1920px; background: #07090e; display: flex; align-items: center; justify-content: center; }
                    .chat-window { width: 980px; height: 1200px; background: #202123; border-radius: 20px; border: 2px solid #343541; box-shadow: 0 40px 100px rgba(0,0,0,0.8); padding: 40px; display: flex; flex-direction: column; }
                    .header { display: flex; align-items: center; gap: 14px; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid #343541; }
                    .ai-icon { width: 44px; height: 44px; border-radius: 50%; background: ${t.accent}; display: flex; align-items: center; justify-content: center; color: #000; font-size: 22px; font-weight: bold; }
                    .title { color: #ececf1; font-size: 26px; font-weight: 700; }
                    .user-row { display: flex; justify-content: flex-end; width: 100%; margin-top: 20px; }
                    .user-bubble { background: #343541; color: #ececf1; font-size: 28px; padding: 22px 28px; border-radius: 24px 24px 4px 24px; max-width: 760px; line-height: 1.45; text-align: left; }
                  </style>
                  <div class="screen"><div class="chat-window">
                    <div class="header"><div class="ai-icon">✦</div><span class="title">Recap AI Agent</span></div>
                    <div class="user-row"><div class="user-bubble">Analyze my 2026 commits and assign my developer persona title.</div></div>
                  </div></div>
                `
              },
              start: 31.5,
              length: 1.7,
              transition: { in: 'slideUpFast' }
            },
            {
              asset: {
                type: 'html',
                html: `
                  <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                    .screen { width: 1080px; height: 1920px; background: #07090e; display: flex; align-items: center; justify-content: center; }
                    .chat-window { width: 980px; height: 1200px; background: #202123; border-radius: 20px; border: 2px solid #343541; box-shadow: 0 40px 100px rgba(0,0,0,0.8); padding: 40px; display: flex; flex-direction: column; }
                    .header { display: flex; align-items: center; gap: 14px; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid #343541; }
                    .ai-icon { width: 44px; height: 44px; border-radius: 50%; background: ${t.accent}; display: flex; align-items: center; justify-content: center; color: #000; font-size: 22px; font-weight: bold; flex-shrink: 0; }
                    .title { color: #ececf1; font-size: 26px; font-weight: 700; }
                    .thread { display: flex; flex-direction: column; gap: 30px; flex: 1; }
                    .user-row { display: flex; justify-content: flex-end; width: 100%; }
                    .user-bubble { background: #343541; color: #ececf1; font-size: 28px; padding: 22px 28px; border-radius: 24px 24px 4px 24px; max-width: 760px; line-height: 1.45; text-align: left; }
                    .ai-row { display: flex; align-items: flex-start; gap: 16px; width: 100%; }
                    .ai-bubble { background: #444654; border: 1.5px solid #565869; color: #ececf1; font-size: 27px; padding: 26px 30px; border-radius: 4px 24px 24px 24px; line-height: 1.5; text-align: left; max-width: 840px; }
                    .badge-pill { display: inline-block; background: ${t.accent}; color: #000000; font-weight: 900; font-size: 34px; padding: 8px 24px; border-radius: 10px; margin: 12px 0 16px 0; }
                    .punchline { color: #d1d5db; font-style: italic; margin-bottom: 16px; font-size: 26px; }
                    .footer-stats { font-size: 22px; color: #9ca3af; font-family: 'JetBrains Mono', monospace; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 14px; }
                    .profile-tag { display: inline-block; background: #202123; color: ${t.accent}; border: 1.5px solid ${t.accent}; padding: 6px 20px; border-radius: 20px; font-weight: bold; font-size: 20px; margin-top: 14px; }
                  </style>
                  <div class="screen"><div class="chat-window">
                    <div class="header"><div class="ai-icon">✦</div><span class="title">Recap AI Agent</span></div>
                    <div class="thread">
                      <div class="user-row"><div class="user-bubble">Analyze my 2026 commits and assign my developer persona title.</div></div>
                      <div class="ai-row">
                        <div class="ai-icon">✦</div>
                        <div class="ai-bubble">
                          <p>Based on your ${dev.commits} commits and ${dev.streak} streak:</p>
                          <div><span class="badge-pill">⚡ ${dev.badge}</span></div>
                          <p class="punchline">"${dev.punchline}"</p>
                          <p class="footer-stats">${dev.primaryLang} (${dev.langRatio}) • ${dev.mergedPRs} Merged • Peak: ${dev.peakTime}</p>
                          <div class="profile-tag">github.com/${dev.username}</div>
                        </div>
                      </div>
                    </div>
                  </div></div>
                `
              },
              start: 33.2,
              length: 6.8,
              transition: { in: 'fadeFast', out: 'fade' }
            }
          ]
        }
      ]
    },
    output: {
      format: 'mp4',
      resolution: 'hd',
      aspectRatio: '9:16',
      fps: 30
    }
  };
}

async function renderDeveloper(dev) {
  const payload = buildUserPayload(dev);
  console.log(`[HTTP] Sending POST /render for ${dev.username}...`);

  const res = await axios.post('https://api.shotstack.io/edit/stage/render', payload, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': SHOTSTACK_API_KEY }
  });

  const renderId = res.data.response.id;
  console.log(`[QUEUED] ${dev.username} | Job ID: ${renderId}`);

  let isDone = false;
  while (!isDone) {
    await new Promise((r) => setTimeout(r, 4500));
    const poll = await axios.get(`https://api.shotstack.io/edit/stage/render/${renderId}`, {
      headers: { 'x-api-key': SHOTSTACK_API_KEY }
    });
    const status = poll.data.response.status;
    console.log(`[POLL] ${dev.username}: ${status.toUpperCase()}`);

    if (status === 'done') {
      isDone = true;
      return { username: dev.username, url: poll.data.response.url };
    } else if (status === 'failed') {
      throw new Error(`Render failed for ${dev.username}: ${JSON.stringify(poll.data)}`);
    }
  }
}

async function runMultiRender() {
  console.log(`\n======================================================`);
  console.log(`[BATCH] Starting Concurrent Renders for 2 Developers`);
  console.log(`======================================================\n`);

  try {
    const results = await Promise.all(developers.map((d) => renderDeveloper(d)));
    console.log(`\n🎉 All Renders Completed Successfully!`);
    results.forEach((r) => {
      console.log(`• ${r.username}: ${r.url}`);
    });
  } catch (err) {
    console.error('Batch Render Error:', err.message);
  }
}

runMultiRender();