/* ============================================
   SYNESTHETIC DESIGN SYSTEM — APP LOGIC v2
   Step-switching with dynamic canvas + right panel
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  let currentStep = 1;

  // ── STEP DATA ────────────────────────────────
  const STEPS = {

    1: {
      title: 'Import Branding Guidance',
      badge: 'Step 01 — Import Branding Guidance',
      canvasHTML: () => `

        <!-- ① DROP ZONE -->
        <div class="canvas-section ibg-drop-section" style="animation-delay:0s">
          <div class="section-label-float">UPLOAD SOURCE MATERIAL</div>
          <div class="ibg-dropzone" id="ibgDropzone">
            <div class="ibg-dz-inner">
              <div class="ibg-dz-icon">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect x="6" y="14" width="32" height="24" rx="3" stroke="var(--accent-a)" stroke-width="1.5" stroke-dasharray="4 3"/>
                  <path d="M22 8v18" stroke="var(--accent-a)" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M15 15l7-7 7 7" stroke="var(--accent-a)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="22" cy="31" r="2" fill="var(--accent-a)" opacity="0.5"/>
                </svg>
              </div>
              <div class="ibg-dz-title">Drop branding files here</div>
              <div class="ibg-dz-sub">PDF, Figma, AI, Notion export, or brand token JSON</div>
              <div class="ibg-dz-actions">
                <button class="ibg-btn-outline" id="browseBtn">Browse files</button>
                <span class="ibg-dz-or">or</span>
                <button class="ibg-btn-outline">Paste URL</button>
                <button class="ibg-btn-outline">Connect Figma</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ② UPLOADED FILE CARD -->
        <div class="canvas-section ibg-file-section" style="animation-delay:0.08s">
          <div class="section-label-float">UPLOADED FILE</div>
          <div class="ibg-file-card" id="ibgFileCard">
            <div class="ibg-file-thumb">
              <div class="ibg-pdf-icon">
                <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
                  <path d="M2 2h16l8 8v22a2 2 0 01-2 2H2a2 2 0 01-2-2V4a2 2 0 012-2z" fill="var(--bg-raised)" stroke="var(--border-mid)" stroke-width="1.2"/>
                  <path d="M18 2v8h8" stroke="var(--border-mid)" stroke-width="1.2" stroke-linejoin="round"/>
                  <rect x="5" y="16" width="12" height="1.5" rx="0.75" fill="var(--accent-a)" opacity="0.7"/>
                  <rect x="5" y="20" width="18" height="1.5" rx="0.75" fill="var(--text-muted)"/>
                  <rect x="5" y="24" width="15" height="1.5" rx="0.75" fill="var(--text-muted)"/>
                </svg>
              </div>
              <div class="ibg-pdf-badge">PDF</div>
            </div>
            <div class="ibg-file-meta">
              <div class="ibg-file-name">Brand Identity Guidance.pdf</div>
              <div class="ibg-file-details">
                <span class="ibg-detail-chip">62 pages</span>
                <span class="ibg-detail-chip">8.3 MB</span>
                <span class="ibg-detail-chip">Uploaded just now</span>
              </div>
              <div class="ibg-file-progress">
                <div class="ibg-fp-bar"><div class="ibg-fp-fill" id="ibgFpFill"></div></div>
                <span class="ibg-fp-label" id="ibgFpLabel">Parsing…</span>
              </div>
            </div>
            <div class="ibg-file-actions">
              <button class="ibg-icon-btn" title="Preview">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M1 7c1.5-3.5 9.5-3.5 12 0-2.5 3.5-10.5 3.5-12 0z" stroke="currentColor" stroke-width="1.3"/></svg>
              </button>
              <button class="ibg-icon-btn" title="Remove">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- ③ EXTRACTED BRAND CONTENT -->
        <div class="canvas-section ibg-content-section" style="animation-delay:0.16s">
          <div class="section-label-float output">EXTRACTED BRAND CONTENT</div>

          <div class="ibg-content-grid">

            <!-- Keywords -->
            <div class="ibg-content-card ibg-keywords-card">
              <div class="ibg-cc-header">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M6.5 1v11" stroke="var(--accent-b)" stroke-width="1.4" stroke-linecap="round"/></svg>
                <span class="ibg-cc-title">Brand Keywords</span>
                <span class="ibg-cc-source">p.4 — Identity Section</span>
              </div>
              <div class="ibg-keyword-chips">
                <div class="ibg-kw-chip kw-a">reflective</div>
                <div class="ibg-kw-chip kw-b">immersive</div>
                <div class="ibg-kw-chip kw-c">futuristic</div>
                <div class="ibg-kw-chip kw-d">calm</div>
                <div class="ibg-kw-chip kw-e">precise</div>
                <div class="ibg-kw-chip kw-f">considered</div>
              </div>
            </div>

            <!-- Tone -->
            <div class="ibg-content-card ibg-tone-card">
              <div class="ibg-cc-header">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="var(--accent-a)" stroke-width="1.3"/><path d="M4 6.5h5M6.5 4v5" stroke="var(--accent-a)" stroke-width="1.3" stroke-linecap="round"/></svg>
                <span class="ibg-cc-title">Tone of Voice</span>
                <span class="ibg-cc-source">p.7 — Voice & Messaging</span>
              </div>
              <div class="ibg-tone-statement">
                <div class="ibg-tone-primary">"Minimal and atmospheric"</div>
                <div class="ibg-tone-desc">The brand communicates through restraint — silence is as meaningful as language. Avoid urgency; favour considered, deliberate phrasing.</div>
              </div>
              <div class="ibg-tone-sliders">
                <div class="ibg-ts-row">
                  <span class="ibg-ts-label">Formal</span>
                  <div class="ibg-ts-track"><div class="ibg-ts-fill" style="width:72%"></div></div>
                  <span class="ibg-ts-label">Casual</span>
                </div>
                <div class="ibg-ts-row">
                  <span class="ibg-ts-label">Sparse</span>
                  <div class="ibg-ts-track"><div class="ibg-ts-fill" style="width:80%"></div></div>
                  <span class="ibg-ts-label">Rich</span>
                </div>
                <div class="ibg-ts-row">
                  <span class="ibg-ts-label">Abstract</span>
                  <div class="ibg-ts-track"><div class="ibg-ts-fill" style="width:55%"></div></div>
                  <span class="ibg-ts-label">Concrete</span>
                </div>
              </div>
            </div>

            <!-- Brand Goal -->
            <div class="ibg-content-card ibg-goal-card">
              <div class="ibg-cc-header">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="var(--accent-d)" stroke-width="1.3"/><circle cx="6.5" cy="6.5" r="2.5" stroke="var(--accent-d)" stroke-width="1.3"/></svg>
                <span class="ibg-cc-title">Brand Goal</span>
                <span class="ibg-cc-source">p.2 — Vision Statement</span>
              </div>
              <div class="ibg-goal-statement">
                "Connect identity with spatial experience"
              </div>
              <div class="ibg-goal-tags">
                <span class="ibg-goal-tag">Identity → Space</span>
                <span class="ibg-goal-tag">Experience Design</span>
                <span class="ibg-goal-tag">Sensory Coherence</span>
              </div>
            </div>

            <!-- Raw excerpt -->
            <div class="ibg-content-card ibg-excerpt-card">
              <div class="ibg-cc-header">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="2" width="11" height="9" rx="1" stroke="var(--text-sec)" stroke-width="1.2"/><path d="M3.5 5h6M3.5 7.5h4" stroke="var(--text-sec)" stroke-width="1.2" stroke-linecap="round"/></svg>
                <span class="ibg-cc-title">Source Excerpt</span>
                <span class="ibg-cc-source">p.4, para 1</span>
              </div>
              <div class="ibg-excerpt-text">
                <span class="ibg-excerpt-quote">"</span>
                Our spaces are an extension of brand consciousness — not decoration applied to architecture, but identity expressed as atmosphere. Every material choice, every threshold, every moment of stillness or movement is a continuation of who we are.
                <span class="ibg-excerpt-quote">"</span>
              </div>
            </div>

          </div>
        </div>

        <!-- ④ RUN AI ANALYSIS CTA -->
        <div class="ibg-cta-row" style="animation:fadeUp 0.4s ease 0.28s both">
          <div class="ibg-cta-info">
            <div class="ibg-cta-info-title">Ready to analyse</div>
            <div class="ibg-cta-info-sub">1 file parsed · 4 primary keywords · tone model loaded</div>
          </div>
          <button class="ibg-run-btn" id="runAiBtn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 5l5 2.5-5 2.5V5z" fill="currentColor"/></svg>
            Run AI Analysis
          </button>
        </div>
      `,

      rightHTML: () => `
        <!-- Plugin card -->
        <div class="sidebar-section-label">ACTIVE PLUGIN</div>
        <div class="ibg-plugin-card">
          <div class="ibg-plugin-header">
            <div class="ibg-plugin-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="2" stroke="var(--accent-b)" stroke-width="1.3"/>
                <path d="M6 9h6M9 6v6" stroke="var(--accent-b)" stroke-width="1.3" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="ibg-plugin-name-group">
              <div class="ibg-plugin-name">Branding Analysis Plugin</div>
              <div class="ibg-plugin-ver">v1.8.2 — Loaded</div>
            </div>
            <div class="plugin-dot green" style="margin-left:auto;flex-shrink:0"></div>
          </div>
          <div class="ibg-plugin-caps">
            <div class="ibg-cap-item"><span class="ibg-cap-dot"></span>PDF deep-parse</div>
            <div class="ibg-cap-item"><span class="ibg-cap-dot"></span>Keyword extraction (NLP)</div>
            <div class="ibg-cap-item"><span class="ibg-cap-dot"></span>Tone vector mapping</div>
            <div class="ibg-cap-item"><span class="ibg-cap-dot"></span>Spatial intent scoring</div>
          </div>
          <div class="ibg-plugin-footer">
            <span class="ibg-pf-stat"><span class="ibg-pf-val ok">Ready</span></span>
            <span class="ibg-pf-stat">Est. run time <span class="ibg-pf-val">~12s</span></span>
          </div>
        </div>

        <div class="sidebar-divider"></div>

        <!-- Collaborator card -->
        <div class="sidebar-section-label">COLLABORATOR INPUT</div>
        <div class="ibg-collab-card">
          <div class="ibg-collab-header">
            <div class="avatar av1" style="width:32px;height:32px;font-size:11px">MO</div>
            <div class="ibg-collab-info">
              <div class="ibg-collab-name">Mira Osei</div>
              <div class="ibg-collab-role">Branding Designer</div>
            </div>
            <div class="ibg-collab-status">
              <span class="status-dot live" style="width:6px;height:6px"></span>
              <span style="font-family:var(--font-mono);font-size:9px;color:var(--green)">Online</span>
            </div>
          </div>
          <div class="ibg-collab-note">
            <div class="ibg-collab-note-label">Latest annotation</div>
            <div class="ibg-collab-note-body">"The 'calm' and 'reflective' keywords are load-bearing for the spatial concept — please weight these above 'futuristic' in the AI pass."</div>
            <div class="ibg-collab-note-time">Posted 6 minutes ago</div>
          </div>
          <div class="ibg-collab-actions">
            <button class="ibg-btn-sm">Reply</button>
            <button class="ibg-btn-sm">View thread</button>
          </div>
        </div>

        <div class="sidebar-divider"></div>

        <!-- Quick stats -->
        <div class="sidebar-section-label">IMPORT SUMMARY</div>
        <div class="rp-stat-row">
          <div class="rp-stat-item"><span class="rp-stat-label">Files uploaded</span><span class="rp-stat-val ok">1</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Pages parsed</span><span class="rp-stat-val">62</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Keywords found</span><span class="rp-stat-val ok">6</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Tone model</span><span class="rp-stat-val ok">Loaded</span></div>
        </div>
      `,
    },

    2: {
      title: 'AI Analysis',
      badge: 'Step 02 — AI Analysis',

      canvasHTML: () => `

        <!-- ① SCAN HEADER -->
        <div class="canvas-section s2-scan-section" style="animation-delay:0s">
          <div class="section-label-float">AI ANALYSIS ENGINE</div>
          <div class="s2-scan-header">
            <div class="s2-scan-file">
              <div class="s2-scan-file-icon">
                <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                  <path d="M2 2h12l6 6v16a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="var(--accent-a)" stroke-width="1.2" fill="none"/>
                  <path d="M14 2v6h6" stroke="var(--accent-a)" stroke-width="1.2" stroke-linejoin="round"/>
                  <rect x="4" y="12" width="9" height="1.2" rx="0.6" fill="var(--accent-a)" opacity="0.6"/>
                  <rect x="4" y="15" width="14" height="1.2" rx="0.6" fill="var(--text-muted)"/>
                  <rect x="4" y="18" width="11" height="1.2" rx="0.6" fill="var(--text-muted)"/>
                </svg>
              </div>
              <div class="s2-scan-file-meta">
                <div class="s2-scan-file-name">Brand Identity Guidance.pdf</div>
                <div class="s2-scan-file-sub">62 pages · 8.3 MB · imported 4 min ago</div>
              </div>
            </div>
            <div class="s2-scan-badge">
              <span class="s2-scan-dot" id="s2ScanDot"></span>
              <span class="s2-scan-status" id="s2ScanStatus">Scanning document…</span>
            </div>
          </div>

          <!-- Animated scan strip -->
          <div class="s2-scan-strip-wrap">
            <div class="s2-doc-preview">
              <div class="s2-doc-line s2-dl-1"></div>
              <div class="s2-doc-line s2-dl-2"></div>
              <div class="s2-doc-line s2-dl-3"></div>
              <div class="s2-doc-line s2-dl-4"></div>
              <div class="s2-doc-line s2-dl-5"></div>
              <div class="s2-doc-line s2-dl-6"></div>
              <div class="s2-doc-line s2-dl-7"></div>
              <div class="s2-doc-line s2-dl-8"></div>
              <!-- scan beam -->
              <div class="s2-scan-beam" id="s2ScanBeam"></div>
              <!-- highlight markers that appear during scan -->
              <div class="s2-highlight s2-hl-1" id="s2Hl1"></div>
              <div class="s2-highlight s2-hl-2" id="s2Hl2"></div>
              <div class="s2-highlight s2-hl-3" id="s2Hl3"></div>
            </div>
            <div class="s2-scan-sidebar">
              <div class="s2-scan-log" id="s2ScanLog">
                <div class="s2-log-line s2-ll-init"><span class="s2-log-dot"></span>Initialising semantic parser…</div>
              </div>
              <div class="s2-scan-metrics">
                <div class="s2-metric"><span class="s2-metric-val" id="s2MetricPages">0</span><span class="s2-metric-lbl">pages read</span></div>
                <div class="s2-metric"><span class="s2-metric-val" id="s2MetricSignals">0</span><span class="s2-metric-lbl">signals found</span></div>
                <div class="s2-metric"><span class="s2-metric-val" id="s2MetricConf">—</span><span class="s2-metric-lbl">confidence</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- ② EXTRACTED INSIGHT CARDS (hidden until scan completes) -->
        <div class="s2-cards-section" id="s2CardsSection" style="display:none">
          <div class="s2-cards-header">
            <div class="section-label-float output" style="position:relative;top:auto;left:auto;display:inline-flex;margin-bottom:12px">EXTRACTED BRAND INTELLIGENCE</div>
            <div class="s2-cards-meta">5 dimensions identified · 91% confidence</div>
          </div>
          <div class="s2-insight-grid">

            <div class="s2-insight-card s2-ic-emotion" data-index="0">
              <div class="s2-ic-accent-bar"></div>
              <div class="s2-ic-header">
                <div class="s2-ic-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2"/><path d="M5 9.5s1 1.5 3 1.5 3-1.5 3-1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/></svg>
                </div>
                <div class="s2-ic-title-group">
                  <div class="s2-ic-label">Emotional Tone</div>
                  <div class="s2-ic-score" id="s2Score0">—</div>
                </div>
                <div class="s2-ic-badge">Extracted</div>
              </div>
              <div class="s2-ic-body">Quiet confidence and deliberate calm. The brand avoids urgency — its emotional register is one of considered stillness, drawing people inward rather than demanding attention.</div>
              <div class="s2-ic-tags">
                <span class="s2-tag">calm</span><span class="s2-tag">inward</span><span class="s2-tag">deliberate</span>
              </div>
              <div class="s2-ic-spectrum">
                <span class="s2-spec-pole">Urgent</span>
                <div class="s2-spec-track"><div class="s2-spec-fill s2-spec-fill-0"></div></div>
                <span class="s2-spec-pole">Serene</span>
              </div>
            </div>

            <div class="s2-insight-card s2-ic-color" data-index="1">
              <div class="s2-ic-accent-bar"></div>
              <div class="s2-ic-header">
                <div class="s2-ic-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2"/><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/><circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.3"/></svg>
                </div>
                <div class="s2-ic-title-group">
                  <div class="s2-ic-label">Colour Mood</div>
                  <div class="s2-ic-score" id="s2Score1">—</div>
                </div>
                <div class="s2-ic-badge">Extracted</div>
              </div>
              <div class="s2-ic-body">Warm earth tones anchor the palette with a sense of weight and permanence. Sparse cool accents act as breath — signalling transition or discovery without disrupting the warmth.</div>
              <div class="s2-ic-palette-strip">
                <div class="s2-pal-seg" style="background:#C8A97E;flex:3"></div>
                <div class="s2-pal-seg" style="background:#2D2926;flex:2"></div>
                <div class="s2-pal-seg" style="background:#E8E0D5;flex:2"></div>
                <div class="s2-pal-seg" style="background:#6BBFB5;flex:1"></div>
                <div class="s2-pal-seg" style="background:#8C7FA8;flex:0.5"></div>
              </div>
              <div class="s2-ic-tags">
                <span class="s2-tag">earth-warm</span><span class="s2-tag">tactile</span><span class="s2-tag">grounded</span>
              </div>
            </div>

            <div class="s2-insight-card s2-ic-material" data-index="2">
              <div class="s2-ic-accent-bar"></div>
              <div class="s2-ic-header">
                <div class="s2-ic-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M2 6h12M6 2v12" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/></svg>
                </div>
                <div class="s2-ic-title-group">
                  <div class="s2-ic-label">Material Feeling</div>
                  <div class="s2-ic-score" id="s2Score2">—</div>
                </div>
                <div class="s2-ic-badge">Extracted</div>
              </div>
              <div class="s2-ic-body">Natural, matte, and subtly textured. The brand resists gloss and spectacle in favour of surfaces that invite touch — linen, stone, brushed timber, polished concrete. Weight without heaviness.</div>
              <div class="s2-ic-tags">
                <span class="s2-tag">matte</span><span class="s2-tag">natural</span><span class="s2-tag">tactile</span><span class="s2-tag">weighted</span>
              </div>
              <div class="s2-ic-spectrum">
                <span class="s2-spec-pole">Gloss</span>
                <div class="s2-spec-track"><div class="s2-spec-fill s2-spec-fill-2"></div></div>
                <span class="s2-spec-pole">Matte</span>
              </div>
            </div>

            <div class="s2-insight-card s2-ic-rhythm" data-index="3">
              <div class="s2-ic-accent-bar"></div>
              <div class="s2-ic-header">
                <div class="s2-ic-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8h2l2-5 2 10 2-7 2 4 2-2h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="s2-ic-title-group">
                  <div class="s2-ic-label">Spatial Rhythm</div>
                  <div class="s2-ic-score" id="s2Score3">—</div>
                </div>
                <div class="s2-ic-badge">Extracted</div>
              </div>
              <div class="s2-ic-body">Slow, elongated cadence. Generous negative space is a primary design gesture — not absence, but presence of silence. Transition zones should breathe. Arrivals should feel unhurried.</div>
              <div class="s2-ic-rhythm-bars">
                <div class="s2-rb" style="height:24px"></div>
                <div class="s2-rb" style="height:36px"></div>
                <div class="s2-rb" style="height:18px"></div>
                <div class="s2-rb" style="height:48px"></div>
                <div class="s2-rb" style="height:12px"></div>
                <div class="s2-rb" style="height:32px"></div>
                <div class="s2-rb" style="height:20px"></div>
                <div class="s2-rb" style="height:40px"></div>
                <div class="s2-rb" style="height:16px"></div>
                <div class="s2-rb" style="height:28px"></div>
              </div>
              <div class="s2-ic-tags">
                <span class="s2-tag">elongated</span><span class="s2-tag">slow</span><span class="s2-tag">breathable</span>
              </div>
            </div>

            <div class="s2-insight-card s2-ic-reflective s2-ic-wide" data-index="4">
              <div class="s2-ic-accent-bar"></div>
              <div class="s2-ic-header">
                <div class="s2-ic-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M3 4l5 4-5 4M13 4L8 8l5 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/><circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.2"/></svg>
                </div>
                <div class="s2-ic-title-group">
                  <div class="s2-ic-label">Reflective Surface Potential</div>
                  <div class="s2-ic-score" id="s2Score4">—</div>
                </div>
                <div class="s2-ic-badge s2-badge-hi">High Signal</div>
              </div>
              <div class="s2-ic-body">The word "reflective" appears 9 times across 62 pages — the highest frequency of any single spatial descriptor. Combined with "immersive", this indicates a strong brief for surfaces that mirror, absorb and re-emit the space around them. Water, polished stone, and low-emissive glass are all candidates.</div>
              <div class="s2-ic-reflect-vis">
                <div class="s2-rv-surface">
                  <div class="s2-rv-reflection"></div>
                  <div class="s2-rv-object"></div>
                </div>
                <div class="s2-rv-stats">
                  <div class="s2-rv-stat"><span class="s2-rv-val">9×</span><span class="s2-rv-lbl">keyword frequency</span></div>
                  <div class="s2-rv-stat"><span class="s2-rv-val">p.4,7,12,19,28,31,44,56,61</span><span class="s2-rv-lbl">source pages</span></div>
                  <div class="s2-rv-stat"><span class="s2-rv-val ok">High</span><span class="s2-rv-lbl">spatial relevance</span></div>
                </div>
              </div>
              <div class="s2-ic-tags">
                <span class="s2-tag s2-tag-hi">reflective</span><span class="s2-tag">immersive</span><span class="s2-tag">mirror</span><span class="s2-tag">re-emission</span>
              </div>
            </div>

          </div>
        </div>

        <!-- ③ TRANSLATE CTA (hidden until scan completes) -->
        <div class="s2-cta-row" id="s2CtaRow" style="display:none;animation:fadeUp 0.4s ease both">
          <div class="s2-cta-left">
            <div class="s2-cta-title">Analysis complete</div>
            <div class="s2-cta-sub">5 brand intelligence dimensions ready to translate into spatial data blocks</div>
          </div>
          <button class="s2-translate-btn" id="s2TranslateBtn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5h11M9 3.5l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Translate into Data Blocks
          </button>
        </div>
      `,

      rightHTML: () => `
        <!-- Plugin status -->
        <div class="sidebar-section-label">ACTIVE PLUGIN</div>
        <div class="s2-rp-plugin-card">
          <div class="s2-rp-plugin-top">
            <div class="s2-rp-plugin-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="2" stroke="var(--accent-b)" stroke-width="1.3"/>
                <path d="M6 9h6M9 6v6" stroke="var(--accent-b)" stroke-width="1.3" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <div class="s2-rp-plugin-name">Branding Analysis Plugin</div>
              <div class="s2-rp-plugin-ver">v1.8.2 · Running</div>
            </div>
            <div class="plugin-dot green" style="margin-left:auto;flex-shrink:0"></div>
          </div>
          <div class="s2-rp-plugin-phase" id="s2RpPhase">
            <div class="s2-phase-bar"><div class="s2-phase-fill" id="s2PhaseFill"></div></div>
            <div class="s2-phase-label" id="s2PhaseLabel">Scanning…</div>
          </div>
        </div>

        <div class="sidebar-divider"></div>

        <!-- AI Confidence -->
        <div class="sidebar-section-label">AI CONFIDENCE</div>
        <div class="s2-confidence-card">
          <div class="s2-conf-dial-wrap">
            <svg class="s2-conf-dial" width="88" height="88" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="34" fill="none" stroke="var(--border)" stroke-width="6"/>
              <circle cx="44" cy="44" r="34" fill="none"
                stroke="url(#confGrad)" stroke-width="6"
                stroke-linecap="round"
                stroke-dasharray="213.6"
                stroke-dashoffset="213.6"
                id="s2ConfArc"
                transform="rotate(-90 44 44)"/>
              <defs>
                <linearGradient id="confGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="var(--accent-a)"/>
                  <stop offset="100%" stop-color="var(--accent-b)"/>
                </linearGradient>
              </defs>
              <text x="44" y="49" text-anchor="middle"
                font-family="Syne, sans-serif" font-size="16" font-weight="700"
                fill="var(--text-primary)" id="s2ConfText">—</text>
            </svg>
          </div>
          <div class="s2-conf-breakdown">
            <div class="s2-cb-row"><span class="s2-cb-label">Semantic parsing</span><span class="s2-cb-val" id="s2CbA">—</span></div>
            <div class="s2-cb-row"><span class="s2-cb-label">Tone modelling</span><span class="s2-cb-val" id="s2CbB">—</span></div>
            <div class="s2-cb-row"><span class="s2-cb-label">Spatial mapping</span><span class="s2-cb-val" id="s2CbC">—</span></div>
          </div>
        </div>

        <div class="sidebar-divider"></div>

        <!-- System AI Assistant -->
        <div class="sidebar-section-label">SYSTEM COLLABORATOR</div>
        <div class="s2-ai-collab-card">
          <div class="s2-ai-collab-header">
            <div class="s2-ai-avatar">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="var(--accent-b)" stroke-width="1.2"/>
                <circle cx="9" cy="9" r="3" fill="var(--accent-b)" opacity="0.3"/>
                <circle cx="9" cy="9" r="1.2" fill="var(--accent-b)"/>
                <path d="M9 1v2M9 15v2M1 9h2M15 9h2" stroke="var(--accent-b)" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
              </svg>
            </div>
            <div class="s2-ai-info">
              <div class="s2-ai-name">System AI Assistant</div>
              <div class="s2-ai-role">Branding Intelligence Module</div>
            </div>
            <div style="display:flex;align-items:center;gap:4px;margin-left:auto">
              <span class="status-dot live" style="width:6px;height:6px"></span>
              <span style="font-family:var(--font-mono);font-size:9px;color:var(--green)">Active</span>
            </div>
          </div>
          <div class="s2-ai-message" id="s2AiMessage">
            <div class="s2-ai-msg-label">Current activity</div>
            <div class="s2-ai-msg-body" id="s2AiMsgBody">Initialising analysis pipeline…</div>
          </div>
          <div class="s2-ai-caps">
            <div class="s2-ai-cap-item"><span class="ibg-cap-dot" style="background:var(--accent-b)"></span>NLP semantic engine</div>
            <div class="s2-ai-cap-item"><span class="ibg-cap-dot" style="background:var(--accent-b)"></span>Spatial intent classifier</div>
            <div class="s2-ai-cap-item"><span class="ibg-cap-dot" style="background:var(--accent-b)"></span>Brand vector modelling</div>
          </div>
        </div>

        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">SESSION LOG</div>
        <div class="rp-stat-row" style="margin-bottom:0">
          <div class="rp-stat-item"><span class="rp-stat-label">File processed</span><span class="rp-stat-val ok">1</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Dimensions</span><span class="rp-stat-val" id="s2RpDims">0 / 5</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Run time</span><span class="rp-stat-val" id="s2RpTime">0s</span></div>
        </div>
      `,
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

  // ── GUIDED TRANSITION: Step 1 → Step 2 ─────
  function showAnalysisOverlay() {
    // Create the full-screen overlay
    const overlay = document.createElement('div');
    overlay.id = 'analysisOverlay';
    overlay.innerHTML = `
      <div class="ao-inner">
        <div class="ao-ring-wrap">
          <div class="ao-ring ao-ring-1"></div>
          <div class="ao-ring ao-ring-2"></div>
          <div class="ao-ring ao-ring-3"></div>
          <div class="ao-core">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="var(--accent-a)" stroke-width="1.5" stroke-dasharray="3 2"/>
              <circle cx="14" cy="14" r="7" fill="none" stroke="var(--accent-b)" stroke-width="1.5"/>
              <circle cx="14" cy="14" r="2.5" fill="var(--accent-a)"/>
            </svg>
          </div>
        </div>
        <div class="ao-label" id="aoLabel">Initialising AI engine…</div>
        <div class="ao-progress-wrap">
          <div class="ao-progress-bar"><div class="ao-progress-fill" id="aoFill"></div></div>
          <span class="ao-pct" id="aoPct">0%</span>
        </div>
        <div class="ao-steps-list" id="aoStepsList"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Animate overlay in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('ao-visible'));
    });

    // Sequence of messages + progress
    const sequence = [
      { pct: 12, label: 'Loading brand token vocabulary…',     delay: 0    },
      { pct: 28, label: 'Parsing PDF semantic structure…',     delay: 520  },
      { pct: 44, label: 'Extracting keyword intent vectors…',  delay: 1050 },
      { pct: 60, label: 'Mapping tone to spatial registers…',  delay: 1600 },
      { pct: 78, label: 'Building brand character model…',     delay: 2100 },
      { pct: 91, label: 'Cross-referencing spatial database…', delay: 2600 },
      { pct: 100,label: 'Analysis complete — generating report', delay: 3100 },
    ];

    const fill   = document.getElementById('aoFill');
    const label  = document.getElementById('aoLabel');
    const pctEl  = document.getElementById('aoPct');
    const list   = document.getElementById('aoStepsList');

    sequence.forEach((step, i) => {
      setTimeout(() => {
        if (!document.getElementById('analysisOverlay')) return;
        if (fill)  fill.style.width  = step.pct + '%';
        if (pctEl) pctEl.textContent = step.pct + '%';
        if (label) {
          label.style.opacity = '0';
          setTimeout(() => {
            if (label) { label.textContent = step.label; label.style.opacity = '1'; }
          }, 120);
        }
        // Append completed step to list
        if (i > 0 && list) {
          const prev = sequence[i - 1];
          const item = document.createElement('div');
          item.className = 'ao-step-item';
          item.innerHTML = `<span class="ao-step-check">✓</span><span>${prev.label}</span>`;
          list.appendChild(item);
          item.style.opacity = '0';
          item.style.transform = 'translateX(-8px)';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }));
          // Keep max 4 items visible
          const items = list.querySelectorAll('.ao-step-item');
          if (items.length > 4) items[0].remove();
        }
      }, step.delay);
    });

    // After sequence finishes, dismiss overlay and switch step
    setTimeout(() => dismissOverlayAndAdvance(overlay), 3800);
  }

  function dismissOverlayAndAdvance(overlay) {
    // 1. Sidebar: mark step 01 completed, activate step 02
    const stepEls = document.querySelectorAll('.workflow-steps .step');
    stepEls.forEach(s => s.classList.remove('active'));
    const s1 = document.querySelector('.step[data-step="01"]');
    const s2 = document.querySelector('.step[data-step="02"]');
    if (s1) {
      s1.classList.remove('active');
      s1.classList.add('completed');
      // swap icon to checkmark
      const icon = s1.querySelector('.step-icon');
      if (icon) icon.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      // fill progress bar
      const bar = s1.querySelector('.bar-fill');
      if (bar) bar.style.width = '100%';
    }
    if (s2) s2.classList.add('active');

    // 2. Fade out the workspace before overlay leaves
    const canvasEl = document.getElementById('step-canvas-content');
    const rightEl  = document.getElementById('right-panel-content');
    if (canvasEl) canvasEl.classList.add('fade-out');
    if (rightEl)  rightEl.classList.add('fade-out');

    // 3. Fade out overlay
    setTimeout(() => {
      if (overlay) overlay.classList.add('ao-exit');
      setTimeout(() => {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        // 4. Render step 2 content
        currentStep = 2;
        const data = STEPS[2];
        if (!data) return;
        const badge   = document.querySelector('.workspace-badge');
        const titleEl = document.querySelector('.workspace-title');
        if (canvasEl) canvasEl.innerHTML = data.canvasHTML();
        if (rightEl)  rightEl.innerHTML  = data.rightHTML();
        if (badge)    badge.textContent  = data.badge;
        if (titleEl)  titleEl.textContent = data.title;
        // 5. Fade content back in
        if (canvasEl) {
          canvasEl.classList.remove('fade-out');
          canvasEl.classList.add('fade-in');
          if (rightEl) rightEl.classList.remove('fade-out');
          requestAnimationFrame(() => requestAnimationFrame(() => {
            canvasEl.classList.remove('fade-in');
            postRender(2);
          }));
        }
      }, 500);
    }, 400);
  }

  // ── GUIDED TRANSITION: Step 2 → Step 3 ─────
  function showTranslationOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'translationOverlay';
    overlay.innerHTML = `
      <div class="ao-inner">
        <div class="tro-blocks-wrap" id="troBlocks">
          <div class="tro-block tro-b1"></div>
          <div class="tro-block tro-b2"></div>
          <div class="tro-block tro-b3"></div>
          <div class="tro-block tro-b4"></div>
          <div class="tro-block tro-b5"></div>
        </div>
        <div class="ao-label" id="troLabel">Packaging brand intelligence…</div>
        <div class="ao-progress-wrap">
          <div class="ao-progress-bar"><div class="ao-progress-fill" id="troFill"></div></div>
          <span class="ao-pct" id="troPct">0%</span>
        </div>
        <div class="ao-steps-list" id="troStepsList"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('ao-visible')));

    const fill   = document.getElementById('troFill');
    const label  = document.getElementById('troLabel');
    const pctEl  = document.getElementById('troPct');
    const list   = document.getElementById('troStepsList');
    const blocks = document.getElementById('troBlocks');

    const sequence = [
      { pct: 16, label: 'Encoding Emotional Tone…',              delay: 0    },
      { pct: 32, label: 'Encoding Colour Mood…',                 delay: 460  },
      { pct: 50, label: 'Encoding Material Feeling…',            delay: 920  },
      { pct: 68, label: 'Encoding Spatial Rhythm…',              delay: 1380 },
      { pct: 84, label: 'Encoding Reflective Surface data…',     delay: 1840 },
      { pct: 96, label: 'Writing spatial rule grammar…',         delay: 2280 },
      { pct: 100,label: 'Data blocks ready — handing to engine', delay: 2700 },
    ];

    // Block fill animation — each block fills as its dimension encodes
    const blockColors = [
      'rgba(107,191,181,0.7)',  // teal   — Emotion
      'rgba(200,169,126,0.7)',  // sand   — Colour
      'rgba(140,127,168,0.7)',  // lavender — Material
      'rgba(76,175,125,0.7)',   // green  — Rhythm
      'rgba(200,169,126,0.55)', // sand 2 — Reflective
    ];

    sequence.forEach((step, i) => {
      setTimeout(() => {
        if (!document.getElementById('translationOverlay')) return;
        if (fill)  fill.style.width  = step.pct + '%';
        if (pctEl) pctEl.textContent = step.pct + '%';
        if (label) {
          label.style.opacity = '0';
          setTimeout(() => {
            if (label) { label.textContent = step.label; label.style.opacity = '1'; }
          }, 100);
        }
        // Fill a block per dimension
        if (i < 5 && blocks) {
          const b = blocks.children[i];
          if (b) {
            b.style.background  = blockColors[i];
            b.style.borderColor = blockColors[i].replace('0.7','0.9').replace('0.55','0.8');
            b.classList.add('tro-block-filled');
          }
        }
        // Log completed step
        if (i > 0 && list) {
          const prev = sequence[i - 1];
          const item = document.createElement('div');
          item.className = 'ao-step-item';
          item.innerHTML = `<span class="ao-step-check">✓</span><span>${prev.label}</span>`;
          item.style.cssText = 'opacity:0;transform:translateX(-8px);transition:opacity 0.25s ease,transform 0.25s ease';
          list.appendChild(item);
          requestAnimationFrame(() => requestAnimationFrame(() => {
            item.style.opacity = '1'; item.style.transform = 'translateX(0)';
          }));
          const all = list.querySelectorAll('.ao-step-item');
          if (all.length > 4) all[0].remove();
        }
      }, step.delay);
    });

    setTimeout(() => dismissTranslationOverlay(overlay), 3400);
  }

  function dismissTranslationOverlay(overlay) {
    // 1. Update sidebar: mark step 02 completed, activate step 03
    const allSteps = document.querySelectorAll('.workflow-steps .step');
    allSteps.forEach(s => s.classList.remove('active'));

    const checkSVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    ['.step[data-step="01"]', '.step[data-step="02"]'].forEach(sel => {
      const s = document.querySelector(sel);
      if (!s) return;
      s.classList.remove('active', 'pending');
      s.classList.add('completed');
      const icon = s.querySelector('.step-icon');
      if (icon) { icon.innerHTML = checkSVG; icon.classList.remove('pulse'); }
      const bar = s.querySelector('.bar-fill');
      if (bar)  bar.style.width = '100%';
    });

    const s3el = document.querySelector('.step[data-step="03"]');
    if (s3el) {
      s3el.classList.remove('pending');
      s3el.classList.add('active');
    }

    // 2. Fade workspace out
    const canvasEl = document.getElementById('step-canvas-content');
    const rightEl  = document.getElementById('right-panel-content');
    if (canvasEl) canvasEl.classList.add('fade-out');
    if (rightEl)  rightEl.classList.add('fade-out');

    // 3. Dismiss overlay, render step 3
    setTimeout(() => {
      if (overlay) overlay.classList.add('ao-exit');
      setTimeout(() => {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);

        currentStep = 3;
        const data = STEPS[3];
        if (!data) return;

        const badge   = document.querySelector('.workspace-badge');
        const titleEl = document.querySelector('.workspace-title');
        if (canvasEl) canvasEl.innerHTML = data.canvasHTML();
        if (rightEl)  rightEl.innerHTML  = data.rightHTML();
        if (badge)    badge.textContent  = data.badge;
        if (titleEl)  titleEl.textContent = data.title;

        if (canvasEl) {
          canvasEl.classList.remove('fade-out');
          canvasEl.classList.add('fade-in');
          if (rightEl) rightEl.classList.remove('fade-out');
          requestAnimationFrame(() => requestAnimationFrame(() => {
            canvasEl.classList.remove('fade-in');
            postRender(3);
          }));
        }
      }, 480);
    }, 380);
  }

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

  // ── STEP 2 — Scan animation + card reveal ────
  function runStep2ScanAnimation() {
    const scanStatus  = document.getElementById('s2ScanStatus');
    const scanDot     = document.getElementById('s2ScanDot');
    const scanLog     = document.getElementById('s2ScanLog');
    const metricPages = document.getElementById('s2MetricPages');
    const metricSigs  = document.getElementById('s2MetricSignals');
    const metricConf  = document.getElementById('s2MetricConf');
    const cardsSection= document.getElementById('s2CardsSection');
    const ctaRow      = document.getElementById('s2CtaRow');
    const phaseFill   = document.getElementById('s2PhaseFill');
    const phaseLabel  = document.getElementById('s2PhaseLabel');
    const aiMsgBody   = document.getElementById('s2AiMsgBody');
    const rpDims      = document.getElementById('s2RpDims');
    const rpTime      = document.getElementById('s2RpTime');

    let elapsed = 0;
    const timeInterval = setInterval(() => {
      elapsed++;
      if (rpTime) rpTime.textContent = elapsed + 's';
    }, 1000);

    // Scan log messages
    const logMessages = [
      { t: 300,  msg: 'Loading PDF structure tree…' },
      { t: 800,  msg: 'Tokenising 62-page corpus…' },
      { t: 1400, msg: 'Running NLP entity extraction…' },
      { t: 1900, msg: 'Mapping emotional tone vectors…' },
      { t: 2400, msg: 'Classifying colour mood signals…' },
      { t: 2900, msg: 'Analysing material language…' },
      { t: 3400, msg: 'Computing spatial rhythm index…' },
      { t: 3800, msg: 'Scoring reflective surface potential…' },
      { t: 4200, msg: 'Building confidence model…' },
    ];

    const appendLog = (msg) => {
      if (!scanLog) return;
      const d = document.createElement('div');
      d.className = 's2-log-line';
      d.innerHTML = `<span class="s2-log-dot"></span>${msg}`;
      d.style.cssText = 'opacity:0;transform:translateX(-5px);transition:opacity 0.25s,transform 0.25s';
      scanLog.appendChild(d);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        d.style.opacity = '1'; d.style.transform = 'translateX(0)';
      }));
      // Keep max 5
      const all = scanLog.querySelectorAll('.s2-log-line');
      if (all.length > 5) all[0].style.opacity = '0.3';
      if (all.length > 6) all[0].remove();
    };

    logMessages.forEach(({t, msg}) => setTimeout(() => appendLog(msg), t));

    // Page counter with tick flash
    const pageTarget = 62, sigTarget = 47;
    let pages = 0, sigs = 0;
    const flashTick = (el) => {
      if (!el) return;
      el.classList.remove('s2-tick');
      void el.offsetWidth; // reflow
      el.classList.add('s2-tick');
    };
    const countInterval = setInterval(() => {
      pages = Math.min(pages + 3, pageTarget);
      sigs  = Math.min(sigs + 2, sigTarget);
      if (metricPages) { metricPages.textContent = pages; flashTick(metricPages); }
      if (metricSigs)  { metricSigs.textContent  = sigs;  flashTick(metricSigs); }
      if (pages >= pageTarget && sigs >= sigTarget) clearInterval(countInterval);
    }, 100);

    // Phase bar ticks
    const phases = [
      { t: 400,  pct: 15, label: 'NLP parsing…',        aiMsg: 'Parsing document semantics and entity structure…' },
      { t: 1200, pct: 35, label: 'Tone extraction…',    aiMsg: 'Extracting emotional tone vectors from keyword clusters…' },
      { t: 2000, pct: 55, label: 'Colour mapping…',     aiMsg: 'Mapping colour mood signals to spatial archetypes…' },
      { t: 2800, pct: 72, label: 'Material analysis…',  aiMsg: 'Classifying material language and surface descriptors…' },
      { t: 3500, pct: 88, label: 'Rhythm scoring…',     aiMsg: 'Computing spatial rhythm index from pacing patterns…' },
      { t: 4000, pct: 96, label: 'Building model…',     aiMsg: 'Assembling brand intelligence model and confidence scores…' },
    ];
    phases.forEach(({t, pct, label, aiMsg}) => {
      setTimeout(() => {
        if (phaseFill)  phaseFill.style.width = pct + '%';
        if (phaseLabel) phaseLabel.textContent = label;
        if (aiMsgBody)  aiMsgBody.textContent  = aiMsg;
      }, t);
    });

    // Reveal scan highlights mid-scan (slide-in via class)
    const revealHL = (id, delay) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.classList.add('s2-hl-visible');
      }, delay);
    };
    revealHL('s2Hl1', 880);
    revealHL('s2Hl2', 1780);
    revealHL('s2Hl3', 2680);

    // Complete at 4600ms
    setTimeout(() => {
      clearInterval(timeInterval);
      if (metricConf)   metricConf.textContent  = '91%';
      if (metricConf)   metricConf.style.color  = 'var(--green)';
      if (phaseFill)    phaseFill.style.width   = '100%';
      if (phaseFill)    phaseFill.style.background = 'var(--green)';
      if (phaseLabel)   phaseLabel.textContent  = 'Complete';
      if (phaseLabel)   phaseLabel.style.color  = 'var(--green)';
      if (scanStatus)   scanStatus.textContent  = 'Analysis complete — 91% confidence';
      if (scanStatus)   scanStatus.style.color  = 'var(--green)';
      if (scanDot)      scanDot.classList.add('s2-dot-done');
      if (aiMsgBody)    aiMsgBody.textContent   = 'Analysis complete. 5 brand intelligence dimensions extracted with 91% confidence. Ready to translate.';
      if (rpDims)       rpDims.textContent      = '5 / 5';
      if (rpDims)       rpDims.style.color      = 'var(--green)';

      // Animate confidence dial
      animateConfDial(91);

      // Show insight cards with staggered entrance
      if (cardsSection) {
        cardsSection.style.display = 'block';
        cardsSection.style.opacity = '0';
        cardsSection.style.transform = 'translateY(12px)';
        cardsSection.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          cardsSection.style.opacity = '1';
          cardsSection.style.transform = 'translateY(0)';
        }));

        // Stagger card appearances with flash animation + score fills
        document.querySelectorAll('.s2-insight-card').forEach((card, i) => {
          const scores    = [94, 89, 87, 92, 96];
          const specFills = [82, 0, 78, 0, 0];
          // Start invisible
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '';
            card.classList.add('s2-card-flash');
            // score counter
            const scoreEl = document.getElementById('s2Score' + i);
            if (scoreEl) setTimeout(() => animateScore(scoreEl, scores[i]), 160);
            // spectrum fill
            const sf = card.querySelector('.s2-spec-fill');
            if (sf && specFills[i]) setTimeout(() => { sf.style.width = specFills[i] + '%'; }, 280);
            // rhythm bars: animate heights after card appears
            if (i === 3) {
              card.querySelectorAll('.s2-rb').forEach(bar => {
                const h = parseInt(bar.style.height);
                bar.style.height = '4px';
                setTimeout(() => { bar.style.height = h + 'px'; }, 200);
              });
            }
          }, 80 + i * 140);
        });

        // Confidence breakdown values
        setTimeout(() => {
          animateScore(document.getElementById('s2CbA'), 94);
          animateScore(document.getElementById('s2CbB'), 89);
          animateScore(document.getElementById('s2CbC'), 88);
        }, 200);
      }

      // Show CTA
      setTimeout(() => {
        if (ctaRow) {
          ctaRow.style.display = 'flex';
          // wire up translate button
          const btn = document.getElementById('s2TranslateBtn');
          if (btn) {
            btn.addEventListener('click', () => {
              btn.disabled = true;
              btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="spin-icon"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4" stroke-dasharray="10 8"/></svg> Building data blocks…`;
              setTimeout(() => showTranslationOverlay(), 550);
            });
          }
        }
      }, 600);

    }, 4600);
  }

  function animateConfDial(target) {
    const arc  = document.getElementById('s2ConfArc');
    const text = document.getElementById('s2ConfText');
    if (!arc && !text) return;
    const circumference = 213.6;
    let current = 0;
    const iv = setInterval(() => {
      current = Math.min(current + 2, target);
      const offset = circumference - (current / 100) * circumference;
      if (arc)  arc.style.strokeDashoffset = offset;
      if (text) text.textContent = current + '%';
      if (current >= target) clearInterval(iv);
    }, 18);
  }

  function animateScore(el, target) {
    if (!el) return;
    let v = 0;
    const iv = setInterval(() => {
      v = Math.min(v + 3, target);
      el.textContent = v + '%';
      if (v >= target) {
        clearInterval(iv);
        el.style.color = 'var(--green)';
      }
    }, 16);
  }

  // ── STEP 2 — Particle field (processing aura) ───
  function startParticleField() {
    const preview = document.querySelector('.s2-doc-preview');
    if (!preview) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.7;transition:opacity 0.5s';
    preview.appendChild(canvas);

    const resize = () => {
      canvas.width  = preview.offsetWidth;
      canvas.height = preview.offsetHeight;
    };
    resize();

    const ctx = canvas.getContext('2d');
    const particles = [];
    const COLORS = [
      'rgba(107,191,181,',  // teal
      'rgba(200,169,126,',  // sand
      'rgba(140,127,168,',  // lavender
    ];

    // spawn particles
    for (let i = 0; i < 28; i++) {
      particles.push({
        x:   Math.random() * canvas.width,
        y:   Math.random() * canvas.height,
        vx:  (Math.random() - 0.5) * 0.3,
        vy:  -(0.08 + Math.random() * 0.18), // drift upward
        r:   0.8 + Math.random() * 1.4,
        alpha: 0.1 + Math.random() * 0.45,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random(),   // 0–1 phase offset
        speed: 0.004 + Math.random() * 0.006,
      });
    }

    let rafId;
    let active = true;

    function draw() {
      if (!active || !canvas.parentNode) {
        cancelAnimationFrame(rafId);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.life += p.speed;
        if (p.life > 1) {
          // respawn at bottom
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 2;
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = -(0.08 + Math.random() * 0.18);
        }
        const fadeCurve = Math.sin(p.life * Math.PI); // fade in then out
        const a = p.alpha * fadeCurve;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a + ')';
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    draw();

    // stop particles when step changes
    const observer = new MutationObserver(() => {
      if (!canvas.parentNode) { active = false; observer.disconnect(); }
    });
    observer.observe(document.getElementById('step-canvas-content') || document.body, { childList: true });
  }

  function postRender(num) {
    // Step 1 — file parse progress bar + Run AI button
    if (num === 1) {
      const fill  = document.getElementById('ibgFpFill');
      const label = document.getElementById('ibgFpLabel');
      if (fill && label) {
        let pct = 0;
        const iv = setInterval(() => {
          pct = Math.min(pct + (2 + Math.random() * 3), 100);
          fill.style.width = pct + '%';
          if (pct >= 100) {
            clearInterval(iv);
            label.textContent = 'Parsed — ready';
            label.style.color = 'var(--green)';
            fill.style.background = 'var(--green)';
          } else {
            label.textContent = `Parsing… ${Math.round(pct)}%`;
          }
        }, 80);
      }

      // Drop zone hover feedback
      const dz = document.getElementById('ibgDropzone');
      if (dz) {
        dz.addEventListener('dragover',  e => { e.preventDefault(); dz.classList.add('dz-hover'); });
        dz.addEventListener('dragleave', () => dz.classList.remove('dz-hover'));
        dz.addEventListener('drop',      e => { e.preventDefault(); dz.classList.remove('dz-hover'); });
      }

      // Run AI Analysis button
      const runBtn = document.getElementById('runAiBtn');
      if (runBtn) {
        runBtn.addEventListener('click', () => {
          runBtn.classList.add('running');
          runBtn.disabled = true;
          runBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="spin-icon"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4" stroke-dasharray="10 8"/></svg> Starting analysis…`;
          setTimeout(() => showAnalysisOverlay(), 600);
        });
      }
    }

    // ── Step 2 — AI scan animation ──────────────
    if (num === 2) {
      runStep2ScanAnimation();
      startParticleField();
    }

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
  // Set sidebar step 1 as active visually
  const initStep = document.querySelector('.step[data-step="01"]');
  if (initStep) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    initStep.classList.add('active');
  }
  renderStep(1, true);

});