/* ============================================
   SYNESTHETIC DESIGN SYSTEM — APP LOGIC v2
   Step-switching with dynamic canvas + right panel
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  let currentStep = 3;

  // ── STEP DATA ────────────────────────────────
  const STEPS = {

    1: {
      title: 'Import Canvas',
      badge: 'Step 01 — Import Branding Guidance',
      canvasHTML: () => `
        <div class="canvas-section" style="animation-delay:0s">
          <div class="section-label-float">SOURCE SELECTION</div>
          <div class="import-drop-zone" id="dropZone">
            <div class="import-drop-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="4" y="10" width="28" height="20" rx="2" stroke="var(--accent-a)" stroke-width="1.4"/>
                <path d="M18 6v14M12 12l6-6 6 6" stroke="var(--accent-a)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="import-drop-title">Drop files or connect a source</div>
            <div class="import-drop-sub">Supports: .fig, .pdf, .json, .tokens, .svg, Notion URLs</div>
          </div>
          <div class="source-cards">
            <div class="source-card">
              <div class="source-card-icon">🎨</div>
              <div class="source-card-name">BrandKit_v3.fig</div>
              <div class="source-card-meta">Figma · 12.4 MB · 3 pages</div>
              <div class="source-card-tag tag-ok">✓ Synced</div>
            </div>
            <div class="source-card">
              <div class="source-card-icon">📄</div>
              <div class="source-card-name">Brand_Guidelines.pdf</div>
              <div class="source-card-meta">PDF · 4.8 MB · 48 pages</div>
              <div class="source-card-tag tag-ok">✓ Parsed</div>
            </div>
            <div class="source-card">
              <div class="source-card-icon">⚙️</div>
              <div class="source-card-name">design-tokens.json</div>
              <div class="source-card-meta">JSON · 84 KB · 142 tokens</div>
              <div class="source-card-tag tag-warn">⚠ 3 conflicts</div>
            </div>
          </div>
        </div>
        <div class="canvas-terminal" style="margin-top:16px;animation:fadeUp 0.4s ease 0.2s both">
          <div class="terminal-header">
            <span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span>
            <span class="terminal-title">Import Log</span>
          </div>
          <div class="terminal-body">
            <div class="log-line"><span class="log-time">13:58:02</span><span class="log-tag ok">OK</span> BrandKit_v3.fig — Figma API connected</div>
            <div class="log-line"><span class="log-time">13:58:04</span><span class="log-tag ok">OK</span> PDF parsed — 48 pages, 12 colour mentions extracted</div>
            <div class="log-line"><span class="log-time">13:58:06</span><span class="log-tag ok">OK</span> design-tokens.json loaded — 142 tokens indexed</div>
            <div class="log-line"><span class="log-time">13:58:07</span><span class="log-tag warn">!!</span> Token conflict: --color-neutral-100 defined in 2 sources</div>
            <div class="log-line"><span class="log-time">13:58:08</span><span class="log-tag info">··</span> Awaiting conflict resolution to proceed to Step 02</div>
          </div>
        </div>`,
      rightHTML: () => `
        <div class="sidebar-section-label">SOURCE SUMMARY</div>
        <div class="rp-stat-row">
          <div class="rp-stat-item"><span class="rp-stat-label">Files connected</span><span class="rp-stat-val ok">3</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Tokens indexed</span><span class="rp-stat-val">142</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Conflicts</span><span class="rp-stat-val err">3</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">PDF pages parsed</span><span class="rp-stat-val">48</span></div>
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">READINESS CHECK</div>
        <div class="rp-checklist">
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Figma source connected</div>
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>PDF ingested</div>
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Token file loaded</div>
          <div class="rp-check-item pending-item"><div class="rp-chk unchecked">○</div>Resolve token conflicts</div>
          <div class="rp-check-item pending-item"><div class="rp-chk unchecked">○</div>Approve source priority</div>
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">FILE PREVIEW</div>
        <div class="rp-mini-preview">
          <div style="width:80%;height:60%;display:flex;gap:6px;align-items:flex-end;padding:8px">
            ${['#C8A97E','#2D2926','#6BBFB5','#E8E0D5','#D95A3C','#8C7FA8']
              .map((c,i)=>`<div style="flex:1;background:${c};border-radius:3px;height:${50+i*8}%"></div>`).join('')}
          </div>
          <div class="rp-mini-label">Palette preview — BrandKit_v3</div>
        </div>`,
    },

    2: {
      title: 'Analysis Canvas',
      badge: 'Step 02 — AI Analysis',
      canvasHTML: () => `
        <div class="canvas-section" style="animation-delay:0s">
          <div class="section-label-float">COLOUR INTELLIGENCE</div>
          <div class="ai-analysis-grid">
            <div class="analysis-card">
              <div class="analysis-card-title">Extracted Palette</div>
              <div class="palette-row">
                ${['#C8A97E','#2D2926','#6BBFB5','#E8E0D5','#D95A3C','#8C7FA8']
                  .map(c=>`<div class="pal-chip" style="background:${c}"></div>`).join('')}
              </div>
              <div class="pal-label"><span>Warm-neutral dominant</span><span>6 primaries</span></div>
            </div>
            <div class="analysis-card">
              <div class="analysis-card-title">Tone Distribution</div>
              <div class="tone-bars">
                <div class="tone-row"><span class="tone-name">Warm</span><div class="tone-bar"><div class="tone-fill" style="width:68%;background:var(--accent-a)"></div></div><span class="tone-pct">68%</span></div>
                <div class="tone-row"><span class="tone-name">Cool</span><div class="tone-bar"><div class="tone-fill" style="width:22%;background:var(--accent-b)"></div></div><span class="tone-pct">22%</span></div>
                <div class="tone-row"><span class="tone-name">Neutral</span><div class="tone-bar"><div class="tone-fill" style="width:10%;background:var(--text-sec)"></div></div><span class="tone-pct">10%</span></div>
              </div>
            </div>
          </div>
          <div class="ai-insight-box">
            <div class="ai-insight-header"><span class="ai-tag">AI Insight</span><span class="ai-insight-title">Brand Character Assessment</span></div>
            <div class="ai-insight-body">Strong warm-earth identity with a refined hospitality register. The sand/espresso axis suggests a premium tactile brand voice — ideal for material specification in lobbies, reception volumes, and wayfinding systems. Teal accent used sparingly indicates moments of discovery or transition.</div>
          </div>
        </div>
        <div class="canvas-section output-section" style="margin-top:16px;animation:fadeUp 0.4s ease 0.15s both">
          <div class="section-label-float output">TYPOGRAPHY HIERARCHY</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${[
              ['Display / Hero','Syne 800','48px / 1.0','#E8E4DC','800'],
              ['Section Title','Syne 600','24px / 1.2','#C8A97E','600'],
              ['Body Copy','DM Mono 400','14px / 1.6','#8A8B91','400'],
              ['Label / Caption','DM Mono 300','11px / 1.4','#4E5058','300'],
            ].map(([role,font,size,col,wt])=>`
              <div style="display:flex;align-items:center;gap:16px;padding:10px 14px;background:var(--bg-raised);border:1px solid var(--border);border-radius:8px">
                <div style="font-family:var(--font-mono);font-size:9px;color:var(--text-muted);min-width:90px">${role}</div>
                <div style="flex:1;font-size:15px;color:${col};font-weight:${wt}">${font}</div>
                <div style="font-family:var(--font-mono);font-size:9px;color:var(--text-sec)">${size}</div>
              </div>`).join('')}
          </div>
        </div>`,
      rightHTML: () => `
        <div class="sidebar-section-label">ANALYSIS RESULTS</div>
        <div class="rp-stat-row">
          <div class="rp-stat-item"><span class="rp-stat-label">Colour accuracy</span><span class="rp-stat-val ok">94%</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Type levels found</span><span class="rp-stat-val">4</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Brand tone score</span><span class="rp-stat-val ok">Warm</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">AI confidence</span><span class="rp-stat-val ok">91%</span></div>
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">PALETTE SWATCH</div>
        <div class="rp-mini-preview">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);width:85%;height:70%;gap:4px">
            ${['#C8A97E','#2D2926','#6BBFB5','#E8E0D5','#D95A3C','#8C7FA8']
              .map(c=>`<div style="background:${c};border-radius:4px"></div>`).join('')}
          </div>
          <div class="rp-mini-label">6 primaries — AI verified</div>
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">ANALYSIS CHECKS</div>
        <div class="rp-checklist">
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Palette extracted</div>
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Tone mapping complete</div>
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Typography hierarchy</div>
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Brand character model</div>
        </div>`,
    },

    3: {
      title: 'Translation Canvas',
      badge: 'Step 03 — Data Translation',
      canvasHTML: () => `
        <div class="canvas-section" style="animation-delay:0s">
          <div class="section-label-float">INPUT — DESIGN TOKENS</div>
          <div class="token-grid">
            ${[
              ['--color-sand-400','#C8A97E','Primary Warm'],
              ['--color-espresso','#2D2926','Base Dark'],
              ['--color-teal-300','#6BBFB5','Accent Cool'],
              ['--color-linen','#E8E0D5','Surface Light'],
              ['--color-terracotta','#D95A3C','Alert / CTA'],
              ['--color-lavender','#8C7FA8','Secondary'],
            ].map(([name,hex,tag])=>`
              <div class="token-card" style="--tc:${hex}">
                <div class="token-swatch"></div>
                <div class="token-info">
                  <div class="token-name">${name}</div>
                  <div class="token-val">${hex}</div>
                </div>
                <div class="token-tag">${tag}</div>
              </div>`).join('')}
          </div>
        </div>
        <div class="canvas-arrow">
          <div class="arrow-line"></div>
          <div class="arrow-label">AI Translation Engine — 62% complete</div>
          <div class="arrow-progress"><div class="ap-fill" id="arrowProgress"></div></div>
        </div>
        <div class="canvas-section output-section" style="animation-delay:0.15s">
          <div class="section-label-float output">OUTPUT — SPATIAL RULE MAPPING</div>
          <div class="rule-cards">
            <div class="rule-card">
              <div class="rule-header"><span class="rule-icon">◈</span><span class="rule-title">Material Luminance</span><span class="rule-status done">Mapped</span></div>
              <div class="rule-desc">Sand-400 → Surface emissive at 0.42 intensity. Used for ceiling panels and wayfinding glow strips.</div>
              <div class="rule-preview lum-preview"></div>
            </div>
            <div class="rule-card">
              <div class="rule-header"><span class="rule-icon">◈</span><span class="rule-title">Spatial Accent Zones</span><span class="rule-status done">Mapped</span></div>
              <div class="rule-desc">Teal-300 applied to interactive surfaces: door frames, kiosk borders, and floor inlay markers.</div>
              <div class="rule-preview zone-preview"></div>
            </div>
            <div class="rule-card pending-card">
              <div class="rule-header"><span class="rule-icon">◇</span><span class="rule-title">Depth Stratification</span><span class="rule-status pending">Processing</span></div>
              <div class="rule-desc">Generating foreground/midground/background layer weights from token hierarchy tree…</div>
              <div class="rule-processing"><div class="processing-bar"></div></div>
            </div>
            <div class="rule-card pending-card">
              <div class="rule-header"><span class="rule-icon">◇</span><span class="rule-title">Typographic Volumetrics</span><span class="rule-status pending">Queued</span></div>
              <div class="rule-desc">Converting font weight hierarchy to signage scale ratios for 3D environment.</div>
              <div class="rule-processing"><div class="processing-bar" style="animation-delay:0.4s"></div></div>
            </div>
          </div>
        </div>
        <div class="canvas-terminal" style="margin-top:16px;animation:fadeUp 0.4s ease 0.3s both">
          <div class="terminal-header">
            <span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span>
            <span class="terminal-title">Translation Log</span>
          </div>
          <div class="terminal-body" id="terminalBody">
            <div class="log-line"><span class="log-time">14:22:07</span><span class="log-tag ok">OK</span> Loaded 6 color tokens from BrandKit_v3.fig</div>
            <div class="log-line"><span class="log-time">14:22:09</span><span class="log-tag ok">OK</span> Typography scale extracted — 4 levels detected</div>
            <div class="log-line"><span class="log-time">14:22:11</span><span class="log-tag ok">OK</span> Luminance mapping complete → 2 spatial rules written</div>
            <div class="log-line"><span class="log-time">14:22:14</span><span class="log-tag info">··</span> Running depth stratification model (est. 38s remaining)</div>
            <div class="log-line"><span class="log-time">14:22:15</span><span class="log-tag info">··</span> Typographic volumetrics queued — awaiting depth output</div>
          </div>
        </div>`,
      rightHTML: () => `
        <div class="sidebar-section-label">PLUGIN STATUS</div>
        <div class="plugin-list">
          ${[
            ['green','Figma Bridge','Synced · v2.4.1','Config',''],
            ['green','AI Core Engine','Active · GPU node 3','Logs',''],
            ['yellow','Unreal Exporter','Standby · awaiting Step 4','Wake',''],
            ['yellow','Rhino 3D Link','Idle · last sync 2h ago','Sync',''],
            ['red','XR Viewer','Auth error — reconnect','Fix','err'],
          ].map(([dot,name,status,btn,cls])=>`
            <div class="plugin-item">
              <div class="plugin-dot ${dot}"></div>
              <div class="plugin-info">
                <div class="plugin-name">${name}</div>
                <div class="plugin-status">${status}</div>
              </div>
              <button class="plugin-btn ${cls}">${btn}</button>
            </div>`).join('')}
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">TRANSLATION METRICS</div>
        <div class="metrics-grid">
          <div class="metric-cell"><div class="metric-val">62<span class="metric-unit">%</span></div><div class="metric-label">Pipeline Progress</div></div>
          <div class="metric-cell"><div class="metric-val">14</div><div class="metric-label">Rules Generated</div></div>
          <div class="metric-cell"><div class="metric-val">6</div><div class="metric-label">Token Sources</div></div>
          <div class="metric-cell"><div class="metric-val">3<span class="metric-unit">s</span></div><div class="metric-label">AI Latency</div></div>
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">SPATIAL PREVIEW</div>
        <div class="preview-viewport">
          <div class="vp-scene" id="vpScene">
            <div class="vp-floor"></div><div class="vp-wall-back"></div>
            <div class="vp-panel vp-panel-a"></div><div class="vp-panel vp-panel-b"></div>
            <div class="vp-strip"></div>
            <div class="vp-label">Lobby — Material Pass</div>
          </div>
          <div class="vp-controls">
            <button class="vp-btn">↺ Orbit</button>
            <button class="vp-btn">⊞ Grid</button>
            <button class="vp-btn">▶ Animate</button>
          </div>
        </div>`,
    },

    4: {
      title: 'Mapping Canvas',
      badge: 'Step 04 — Visual & Object Mapping',
      canvasHTML: () => `
        <div class="canvas-section" style="animation-delay:0s">
          <div class="section-label-float">OBJECT LIBRARY — MATCHED</div>
          <div class="object-map-grid">
            ${[
              ['Reception Desk','Sand-400 surface · Espresso base','#C8A97E44','#C8A97E'],
              ['Wayfinding Pylon','Teal-300 edge glow · Espresso body','#6BBFB544','#6BBFB5'],
              ['Feature Wall Panel','Linen face · Sand-400 reveal','#E8E0D544','#E8E0D5'],
              ['Kiosk Terminal','Terracotta CTA strip · Linen field','#D95A3C44','#D95A3C'],
            ].map(([name,desc,bg,border])=>`
              <div class="obj-card">
                <div class="obj-card-preview" style="background:${bg};border-bottom:1px solid ${border}40">
                  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
                    <div style="width:48px;height:32px;border:1.5px solid ${border};border-radius:4px;opacity:0.8"></div>
                  </div>
                </div>
                <div class="obj-card-body">
                  <div class="obj-card-name">${name}</div>
                  <div class="obj-card-meta">${desc}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <div class="canvas-section output-section" style="margin-top:16px;animation:fadeUp 0.4s ease 0.15s both">
          <div class="section-label-float output">TOKEN → OBJECT MAPPING TABLE</div>
          <div class="mapping-table">
            <div class="map-row"><span style="color:var(--text-muted)">DESIGN TOKEN</span><span></span><span style="color:var(--text-muted)">SPATIAL OBJECT PROPERTY</span></div>
            ${[
              ['--color-sand-400','Material: emissive surface'],
              ['--color-espresso','Material: base / shadow'],
              ['--color-teal-300','Edge lighting / active indicator'],
              ['--color-terracotta','CTA strip / alert surface'],
              ['--color-linen','Primary face material'],
              ['--font-weight-hero','Signage scale 1:1 (hero)'],
              ['--font-weight-body','Signage scale 0.6 (secondary)'],
            ].map(([src,tgt])=>`
              <div class="map-row">
                <span class="map-source">${src}</span>
                <span class="map-arrow">→</span>
                <span class="map-target">${tgt}</span>
              </div>`).join('')}
          </div>
        </div>`,
      rightHTML: () => `
        <div class="sidebar-section-label">MAPPING STATUS</div>
        <div class="rp-stat-row">
          <div class="rp-stat-item"><span class="rp-stat-label">Objects mapped</span><span class="rp-stat-val ok">4 / 6</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Token rules applied</span><span class="rp-stat-val">7</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Unresolved objects</span><span class="rp-stat-val warn">2</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Unreal assets ready</span><span class="rp-stat-val ok">Yes</span></div>
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">OBJECT PREVIEW</div>
        <div class="rp-mini-preview">
          <div style="width:80%;height:75%;position:relative">
            <div style="position:absolute;bottom:0;left:0;right:0;height:30%;background:rgba(200,169,126,0.15);border:1px solid rgba(200,169,126,0.3);border-radius:3px"></div>
            <div style="position:absolute;bottom:30%;left:10px;width:20px;height:55%;background:rgba(107,191,181,0.12);border:1px solid rgba(107,191,181,0.35);border-radius:2px"></div>
            <div style="position:absolute;bottom:30%;right:10px;width:20px;height:40%;background:rgba(107,191,181,0.12);border:1px solid rgba(107,191,181,0.35);border-radius:2px"></div>
          </div>
          <div class="rp-mini-label">Lobby layout — object pass</div>
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">MAPPING CHECKLIST</div>
        <div class="rp-checklist">
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Reception Desk</div>
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Wayfinding Pylon</div>
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Feature Wall</div>
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Kiosk Terminal</div>
          <div class="rp-check-item pending-item"><div class="rp-chk unchecked">○</div>Ceiling Rig</div>
          <div class="rp-check-item pending-item"><div class="rp-chk unchecked">○</div>Floor Inlay</div>
        </div>`,
    },

    5: {
      title: 'Simulation Canvas',
      badge: 'Step 05 — Live Simulation',
      canvasHTML: () => `
        <div class="canvas-section" style="animation-delay:0s">
          <div class="section-label-float">REAL-TIME RENDER — LOBBY SCENE</div>
          <div class="sim-viewport">
            <div class="sim-grid"></div>
            <div class="sim-room">
              <div class="sim-obj sim-obj-a"></div>
              <div class="sim-obj sim-obj-b"></div>
              <div class="sim-obj sim-obj-c"></div>
            </div>
            <div class="sim-label-overlay">SCENE_01 · Lobby · Material Pass v4</div>
            <div class="sim-fps" id="simFps">60 fps</div>
          </div>
          <div class="sim-controls-row">
            <button class="sim-ctrl-btn primary">▶ Play</button>
            <button class="sim-ctrl-btn">⏸ Pause</button>
            <button class="sim-ctrl-btn">↺ Reset Camera</button>
            <button class="sim-ctrl-btn">⊞ Toggle Grid</button>
          </div>
        </div>
        <div class="canvas-section output-section" style="margin-top:0;animation:fadeUp 0.4s ease 0.15s both">
          <div class="section-label-float output">RENDER PASSES</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
            ${[
              ['Material','#C8A97E','Complete'],
              ['Lighting','#6BBFB5','Complete'],
              ['Shadow','#8C7FA8','Running'],
              ['Reflection','#D95A3C','Queued'],
              ['Ambient Occ.','#E8E0D5','Queued'],
              ['Final Comp.','#2D2926','Queued'],
            ].map(([name,col,status])=>`
              <div style="background:var(--bg-raised);border:1px solid var(--border);border-radius:8px;overflow:hidden">
                <div style="height:36px;background:${col}22;border-bottom:1px solid ${col}30;display:flex;align-items:center;justify-content:center">
                  <div style="width:20px;height:20px;border:1.5px solid ${col};border-radius:3px;opacity:0.7"></div>
                </div>
                <div style="padding:8px 10px">
                  <div style="font-size:11px;font-weight:600">${name}</div>
                  <div style="font-family:var(--font-mono);font-size:9px;color:${status==='Complete'?'var(--green)':status==='Running'?'var(--yellow)':'var(--text-muted)'};margin-top:2px">${status}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>`,
      rightHTML: () => `
        <div class="sidebar-section-label">RENDER ENGINE</div>
        <div class="rp-stat-row">
          <div class="rp-stat-item"><span class="rp-stat-label">Engine</span><span class="rp-stat-val ok">Unreal 5.3</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Frame rate</span><span class="rp-stat-val ok">60 fps</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">GPU utilisation</span><span class="rp-stat-val warn">78%</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Scene objects</span><span class="rp-stat-val">24</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Material passes</span><span class="rp-stat-val">2 / 6</span></div>
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">LIVE PREVIEW</div>
        <div class="rp-mini-preview" style="background:#070809">
          <div style="width:90%;height:80%;position:relative">
            <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(107,191,181,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(107,191,181,0.05) 1px,transparent 1px);background-size:14px 14px"></div>
            <div style="position:absolute;bottom:10%;left:15%;right:15%;height:40%;border:1px solid rgba(200,169,126,0.25);border-radius:2px"></div>
          </div>
          <div class="rp-mini-label">Lobby — live render feed</div>
        </div>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">EXPORT TARGETS</div>
        <div class="rp-checklist">
          <div class="rp-check-item done"><div class="rp-chk checked">✓</div>Unreal Package (.uasset)</div>
          <div class="rp-check-item pending-item"><div class="rp-chk unchecked">○</div>glTF Export</div>
          <div class="rp-check-item pending-item"><div class="rp-chk unchecked">○</div>XR Preview Bundle</div>
          <div class="rp-check-item pending-item"><div class="rp-chk unchecked">○</div>PDF Report</div>
        </div>`,
    },
  };

  // ── RENDER ───────────────────────────────────
  function renderStep(num, instant = false) {
    const data = STEPS[num];
    if (!data) return;
    const canvasEl = document.getElementById('step-canvas-content');
    const rightEl  = document.getElementById('right-panel-content');
    const badge    = document.querySelector('.workspace-badge');
    const titleEl  = document.querySelector('.workspace-title');

    if (instant) {
      canvasEl.innerHTML = data.canvasHTML();
      rightEl.innerHTML  = data.rightHTML();
      if (badge)   badge.textContent  = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      postRender(num);
      return;
    }

    canvasEl.classList.add('fade-out');
    rightEl.classList.add('fade-out');

    setTimeout(() => {
      canvasEl.innerHTML = data.canvasHTML();
      rightEl.innerHTML  = data.rightHTML();
      if (badge)   badge.textContent  = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      canvasEl.classList.remove('fade-out');
      canvasEl.classList.add('fade-in');
      rightEl.classList.remove('fade-out');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        canvasEl.classList.remove('fade-in');
        postRender(num);
      }));
    }, 220);
  }

  function postRender(num) {
    // Arrow progress (step 3)
    const ap = document.getElementById('arrowProgress');
    if (ap) setTimeout(() => { ap.style.width = '62%'; }, 100);

    // VP orbit (step 3)
    const vp = document.getElementById('vpScene');
    if (vp) {
      const a = vp.querySelector('.vp-panel-a');
      const b = vp.querySelector('.vp-panel-b');
      let angle = 0;
      (function orbit() {
        if (!document.getElementById('vpScene')) return;
        angle += 0.005;
        if (a) a.style.transform = `translateY(${Math.sin(angle)*4}px)`;
        if (b) b.style.transform = `translateY(${Math.cos(angle)*3}px)`;
        requestAnimationFrame(orbit);
      })();
    }

    // VP buttons
    document.querySelectorAll('.vp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.vp-btn').forEach(b => { b.style.color=''; b.style.borderColor=''; });
        btn.style.color = 'var(--accent-b)';
        btn.style.borderColor = 'rgba(107,191,181,0.4)';
      });
    });

    // FPS ticker (step 5)
    const fps = document.getElementById('simFps');
    if (fps) {
      setInterval(() => { fps.textContent = `${58 + Math.floor(Math.random()*4)} fps`; }, 1200);
    }

    // Sim control buttons
    document.querySelectorAll('.sim-ctrl-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sim-ctrl-btn').forEach(b => b.classList.remove('primary'));
        btn.classList.add('primary');
      });
    });

    // Terminal stream (step 3)
    if (num === 3) startTerminalStream();
  }

  // ── TERMINAL STREAM ──────────────────────────
  let termTimer = null;
  const liveLines = [
    { time: '14:22:18', tag: 'info', msg: 'Depth stratification — 12% complete...' },
    { time: '14:22:24', tag: 'info', msg: 'Depth stratification — 31% complete...' },
    { time: '14:22:31', tag: 'info', msg: 'Depth stratification — 55% complete...' },
    { time: '14:22:39', tag: 'ok',   msg: 'Depth stratification — COMPLETE → 4 layers defined' },
    { time: '14:22:40', tag: 'info', msg: 'Starting typographic volumetrics pass...' },
    { time: '14:22:44', tag: 'ok',   msg: 'Syne 700 → 1:1 hero; Syne 400 → 0.6 secondary' },
    { time: '14:22:46', tag: 'ok',   msg: 'All translation rules written — Step 03 complete' },
    { time: '14:22:47', tag: 'info', msg: 'Handing off to Visual & Object Mapping...' },
  ];

  function startTerminalStream() {
    if (termTimer) clearTimeout(termTimer);
    let idx = 0;
    function schedule() {
      if (idx >= liveLines.length) return;
      termTimer = setTimeout(() => {
        const tb = document.getElementById('terminalBody');
        if (!tb) return;
        const l = liveLines[idx];
        const div = document.createElement('div');
        div.className = 'log-line';
        div.style.cssText = 'opacity:0;transform:translateX(-6px);transition:opacity 0.3s,transform 0.3s';
        div.innerHTML = `<span class="log-time">${l.time}</span><span class="log-tag ${l.tag}">${l.tag==='ok'?'OK':'··'}</span><span>${l.msg}</span>`;
        tb.appendChild(div);
        requestAnimationFrame(() => requestAnimationFrame(() => { div.style.opacity='1'; div.style.transform='translateX(0)'; }));
        tb.scrollTop = tb.scrollHeight;
        const all = tb.querySelectorAll('.log-line');
        if (all.length > 10) all[0].remove();
        idx++;
        schedule();
      }, 1400 + Math.random() * 900);
    }
    setTimeout(schedule, 800);
  }

  // ── SIDEBAR STEP CLICKS ──────────────────────
  const stepEls = document.querySelectorAll('.workflow-steps .step');
  stepEls.forEach(step => {
    step.addEventListener('click', () => {
      const num = parseInt(step.dataset.step, 10);
      stepEls.forEach(s => {
        s.classList.remove('active');
        const icon = s.querySelector('.step-icon');
        if (icon) icon.classList.remove('pulse');
      });
      step.classList.add('active');
      currentStep = num;
      renderStep(num);
    });
  });

  // ── HEADER NAV ───────────────────────────────
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── RIGHT PANEL TABS ─────────────────────────
  document.querySelectorAll('.rtab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const el = document.getElementById(`tab-${tab.dataset.tab}`);
      if (el) el.classList.add('active');
    });
  });

  // ── SHARE BUTTON ─────────────────────────────
  const shareBtn = document.querySelector('.share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const orig = shareBtn.textContent;
      shareBtn.textContent = '✓ Link Copied';
      shareBtn.style.background = 'var(--green)';
      shareBtn.style.color = '#fff';
      setTimeout(() => { shareBtn.textContent=orig; shareBtn.style.background=''; shareBtn.style.color=''; }, 2000);
    });
  }

  // ── BOOT ─────────────────────────────────────
  renderStep(3, true);

});