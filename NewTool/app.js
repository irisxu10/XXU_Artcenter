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
      title: 'Data Translation',
      badge: 'Step 03 — Data Translation',

      canvasHTML: () => `

        <!-- ① HEADER STRIP -->
        <div class="dt-header-strip canvas-section" style="animation-delay:0s">
          <div class="section-label-float">TRANSLATED DATA BLOCKS</div>
          <div class="dt-header-inner">
            <div class="dt-header-left">
              <div class="dt-origin-chip">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="var(--accent-b)" stroke-width="1.1"/><circle cx="5.5" cy="5.5" r="1.8" fill="var(--accent-b)" opacity="0.5"/></svg>
                Source: Brand Identity Guidance.pdf
              </div>
              <div class="dt-origin-chip">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="1" width="9" height="9" rx="1.5" stroke="var(--accent-a)" stroke-width="1.1"/><path d="M3.5 5.5h4M5.5 3.5v4" stroke="var(--accent-a)" stroke-width="1" stroke-linecap="round"/></svg>
                AI Analysis: 91% confidence
              </div>
            </div>
            <div class="dt-header-right">
              <span class="dt-block-count" id="dtBlockCount">0 / 5 blocks active</span>
              <div class="dt-view-toggle">
                <button class="dt-vt-btn dt-vt-active" id="dtViewGrid" title="Grid view">⊞</button>
                <button class="dt-vt-btn" id="dtViewList" title="List view">☰</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ② DATA BLOCK GRID -->
        <div class="dt-blocks-grid" id="dtBlocksGrid">

          <!-- BLOCK 01 — Tone Intensity -->
          <div class="dt-block dt-b-tone" data-block="0" data-type="numeric" tabindex="0">
            <div class="dt-b-gutter"></div>
            <div class="dt-b-inner">
              <div class="dt-b-top">
                <div class="dt-b-index">01</div>
                <div class="dt-b-badges">
                  <span class="dt-type-badge dt-type-numeric">Numeric</span>
                  <span class="dt-status-badge dt-status-ready">Ready</span>
                </div>
              </div>
              <div class="dt-b-title">Tone Intensity</div>
              <div class="dt-b-desc">Encodes the overall emotional weight of the brand voice as a scalar between 0 (silent / absent) and 1 (forceful / dominant). Drives ambient light level and material opacity across spatial layers.</div>
              <div class="dt-b-visual">
                <div class="dt-numeric-display">
                  <span class="dt-num-val" id="dtVal0">0.72</span>
                  <div class="dt-num-bar"><div class="dt-num-fill" style="width:72%"></div></div>
                  <span class="dt-num-range">0.0 → 1.0</span>
                </div>
              </div>
              <div class="dt-b-footer">
                <span class="dt-b-source">← Emotional Tone · AI Analysis</span>
                <div class="dt-b-actions">
                  <button class="dt-act-btn" title="Edit value">Edit</button>
                  <button class="dt-act-btn" title="Link to output">Link</button>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCK 02 — Reflective Behaviour -->
          <div class="dt-block dt-b-reflect" data-block="1" data-type="spatial" tabindex="0">
            <div class="dt-b-gutter"></div>
            <div class="dt-b-inner">
              <div class="dt-b-top">
                <div class="dt-b-index">02</div>
                <div class="dt-b-badges">
                  <span class="dt-type-badge dt-type-spatial">Spatial</span>
                  <span class="dt-status-badge dt-status-editable">Editable</span>
                </div>
              </div>
              <div class="dt-b-title">Reflective Behaviour</div>
              <div class="dt-b-desc">Defines how surfaces in the spatial environment receive, absorb, and re-emit surrounding conditions. Informed by the 9× keyword frequency of "reflective" in source material.</div>
              <div class="dt-b-visual">
                <div class="dt-reflect-vis">
                  <div class="dt-rv-col dt-rv-in">
                    <div class="dt-rv-bar" style="height:60%"></div>
                    <span>Absorb</span>
                  </div>
                  <div class="dt-rv-col dt-rv-mid">
                    <div class="dt-rv-bar dt-rv-active" style="height:85%"></div>
                    <span>Reflect</span>
                  </div>
                  <div class="dt-rv-col dt-rv-out">
                    <div class="dt-rv-bar" style="height:42%"></div>
                    <span>Emit</span>
                  </div>
                </div>
              </div>
              <div class="dt-b-footer">
                <span class="dt-b-source">← Reflective Surface Potential · AI Analysis</span>
                <div class="dt-b-actions">
                  <button class="dt-act-btn">Edit</button>
                  <button class="dt-act-btn">Link</button>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCK 03 — Light Rhythm -->
          <div class="dt-block dt-b-rhythm" data-block="2" data-type="temporal" tabindex="0">
            <div class="dt-b-gutter"></div>
            <div class="dt-b-inner">
              <div class="dt-b-top">
                <div class="dt-b-index">03</div>
                <div class="dt-b-badges">
                  <span class="dt-type-badge dt-type-temporal">Temporal</span>
                  <span class="dt-status-badge dt-status-ready">Ready</span>
                </div>
              </div>
              <div class="dt-b-title">Light Rhythm</div>
              <div class="dt-b-desc">Translates the brand's "slow and elongated cadence" into a temporal light modulation curve. Long dwell times with low-frequency oscillation — light breathes rather than pulses.</div>
              <div class="dt-b-visual">
                <div class="dt-rhythm-wave" id="dtRhythmWave">
                  <canvas class="dt-wave-canvas" id="dtWaveCanvas" width="240" height="44"></canvas>
                </div>
                <div class="dt-rhythm-meta">
                  <span class="dt-rm-item">Period <b>8.4s</b></span>
                  <span class="dt-rm-item">Amplitude <b>0.28</b></span>
                  <span class="dt-rm-item">Curve <b>Sine</b></span>
                </div>
              </div>
              <div class="dt-b-footer">
                <span class="dt-b-source">← Spatial Rhythm · AI Analysis</span>
                <div class="dt-b-actions">
                  <button class="dt-act-btn">Edit</button>
                  <button class="dt-act-btn">Link</button>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCK 04 — Colour Temperature -->
          <div class="dt-block dt-b-temp" data-block="3" data-type="visual" tabindex="0">
            <div class="dt-b-gutter"></div>
            <div class="dt-b-inner">
              <div class="dt-b-top">
                <div class="dt-b-index">04</div>
                <div class="dt-b-badges">
                  <span class="dt-type-badge dt-type-visual">Visual</span>
                  <span class="dt-status-badge dt-status-linked">Linked</span>
                </div>
              </div>
              <div class="dt-b-title">Colour Temperature</div>
              <div class="dt-b-desc">Warm dominant palette (68%) converted to a Kelvin range of 2700K–3200K for material lighting. Cool accent moments (22%) mapped to 5500K–6000K for threshold and transition zones.</div>
              <div class="dt-b-visual">
                <div class="dt-temp-gradient">
                  <div class="dt-tg-bar"></div>
                  <div class="dt-tg-markers">
                    <div class="dt-tg-mark" style="left:15%">
                      <div class="dt-tg-tick"></div>
                      <span>2700K</span>
                    </div>
                    <div class="dt-tg-mark" style="left:40%">
                      <div class="dt-tg-tick"></div>
                      <span>3200K</span>
                    </div>
                    <div class="dt-tg-mark dt-tg-mark-cool" style="left:68%">
                      <div class="dt-tg-tick"></div>
                      <span>5500K</span>
                    </div>
                    <div class="dt-tg-mark dt-tg-mark-cool" style="left:88%">
                      <div class="dt-tg-tick"></div>
                      <span>6000K</span>
                    </div>
                  </div>
                  <div class="dt-tg-range-warm"></div>
                  <div class="dt-tg-range-cool"></div>
                </div>
              </div>
              <div class="dt-b-footer">
                <span class="dt-b-source">← Colour Mood · AI Analysis</span>
                <div class="dt-b-actions">
                  <button class="dt-act-btn">Edit</button>
                  <button class="dt-act-btn dt-act-linked">Linked ↗</button>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCK 05 — Surface Response -->
          <div class="dt-block dt-b-surface" data-block="4" data-type="spatial" tabindex="0">
            <div class="dt-b-gutter"></div>
            <div class="dt-b-inner">
              <div class="dt-b-top">
                <div class="dt-b-index">05</div>
                <div class="dt-b-badges">
                  <span class="dt-type-badge dt-type-spatial">Spatial</span>
                  <span class="dt-status-badge dt-status-editable">Editable</span>
                </div>
              </div>
              <div class="dt-b-title">Surface Response</div>
              <div class="dt-b-desc">Defines how physical materials react to occupant presence and environmental input. Matte surfaces with high tactility index (0.84) — touch-responsive, not visually demanding.</div>
              <div class="dt-b-visual">
                <div class="dt-surface-matrix">
                  <div class="dt-sm-axis dt-sm-y">Tactility</div>
                  <div class="dt-sm-grid">
                    <div class="dt-sm-cell dt-sm-active" style="grid-area:1/3"></div>
                    <div class="dt-sm-cell dt-sm-active" style="grid-area:2/3"></div>
                    <div class="dt-sm-cell dt-sm-mid"    style="grid-area:1/2"></div>
                    <div class="dt-sm-cell"              style="grid-area:2/2"></div>
                    <div class="dt-sm-cell"              style="grid-area:1/1"></div>
                    <div class="dt-sm-cell"              style="grid-area:2/1"></div>
                    <div class="dt-sm-dot"               id="dtSurfaceDot"></div>
                  </div>
                  <div class="dt-sm-axis dt-sm-x">Reflectivity</div>
                </div>
              </div>
              <div class="dt-b-footer">
                <span class="dt-b-source">← Material Feeling · AI Analysis</span>
                <div class="dt-b-actions">
                  <button class="dt-act-btn">Edit</button>
                  <button class="dt-act-btn">Link</button>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCK 06 — Spatial Depth Index -->
          <div class="dt-block dt-b-depth" data-block="5" data-type="numeric" tabindex="0">
            <div class="dt-b-gutter"></div>
            <div class="dt-b-inner">
              <div class="dt-b-top">
                <div class="dt-b-index">06</div>
                <div class="dt-b-badges">
                  <span class="dt-type-badge dt-type-numeric">Numeric</span>
                  <span class="dt-status-badge dt-status-ready">Ready</span>
                </div>
              </div>
              <div class="dt-b-title">Spatial Depth Index</div>
              <div class="dt-b-desc">Stratifies the environment into weighted foreground, midground, and background layers. Derived from the "considered stillness" tone — depth is expressed through recession, not complexity.</div>
              <div class="dt-b-visual">
                <div class="dt-depth-layers">
                  <div class="dt-dl-layer dt-dl-fg">
                    <span class="dt-dl-label">Foreground</span>
                    <span class="dt-dl-val">0.85</span>
                    <div class="dt-dl-bar"><div class="dt-dl-fill" style="width:85%"></div></div>
                  </div>
                  <div class="dt-dl-layer dt-dl-mid">
                    <span class="dt-dl-label">Midground</span>
                    <span class="dt-dl-val">0.55</span>
                    <div class="dt-dl-bar"><div class="dt-dl-fill" style="width:55%"></div></div>
                  </div>
                  <div class="dt-dl-layer dt-dl-bg">
                    <span class="dt-dl-label">Background</span>
                    <span class="dt-dl-val">0.30</span>
                    <div class="dt-dl-bar"><div class="dt-dl-fill" style="width:30%"></div></div>
                  </div>
                </div>
              </div>
              <div class="dt-b-footer">
                <span class="dt-b-source">← Spatial Rhythm · AI Analysis</span>
                <div class="dt-b-actions">
                  <button class="dt-act-btn">Edit</button>
                  <button class="dt-act-btn">Link</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- ③ OPEN VISUAL WORKSPACE CTA -->
        <div class="dt-cta-row" style="animation:fadeUp 0.4s ease 0.35s both">
          <div class="dt-cta-left">
            <div class="dt-cta-title">6 data blocks ready</div>
            <div class="dt-cta-sub">All blocks translated and available for visualisation output mapping</div>
          </div>
          <button class="dt-open-btn" id="dtOpenBtn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="2" y="2" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.3"/>
              <path d="M5 7.5h5M7.5 5v5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
            Open Visual Workspace
          </button>
        </div>
      `,

      rightHTML: () => `
        <!-- Plugin cards -->
        <div class="sidebar-section-label">INSTALLED PLUGINS</div>
        <div class="dt-rp-plugins">

          <div class="dt-rp-plugin-card dt-rp-active">
            <div class="dt-rpp-left">
              <div class="dt-rpp-icon" style="background:rgba(107,191,181,0.1);border-color:rgba(107,191,181,0.25)">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="var(--accent-b)" stroke-width="1.2"/><path d="M4 7h6M7 4v6" stroke="var(--accent-b)" stroke-width="1.2" stroke-linecap="round"/></svg>
              </div>
              <div>
                <div class="dt-rpp-name">Data Block Engine</div>
                <div class="dt-rpp-ver">v3.1.0 · Active</div>
              </div>
            </div>
            <span class="dt-rpp-dot green"></span>
          </div>

          <div class="dt-rp-plugin-card">
            <div class="dt-rpp-left">
              <div class="dt-rpp-icon" style="background:rgba(200,169,126,0.1);border-color:rgba(200,169,126,0.25)">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11L7 3l5 8H2z" stroke="var(--accent-a)" stroke-width="1.2" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <div class="dt-rpp-name">Visual Workspace</div>
                <div class="dt-rpp-ver">v2.0.4 · Ready</div>
              </div>
            </div>
            <span class="dt-rpp-dot green"></span>
          </div>

          <div class="dt-rp-plugin-card">
            <div class="dt-rpp-left">
              <div class="dt-rpp-icon" style="background:rgba(140,127,168,0.1);border-color:rgba(140,127,168,0.25)">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="var(--accent-d)" stroke-width="1.2"/><path d="M7 4v3l2 2" stroke="var(--accent-d)" stroke-width="1.2" stroke-linecap="round"/></svg>
              </div>
              <div>
                <div class="dt-rpp-name">Temporal Mapper</div>
                <div class="dt-rpp-ver">v1.4.2 · Standby</div>
              </div>
            </div>
            <span class="dt-rpp-dot yellow"></span>
          </div>

          <div class="dt-rp-plugin-card">
            <div class="dt-rpp-left">
              <div class="dt-rpp-icon" style="background:rgba(76,175,125,0.08);border-color:rgba(76,175,125,0.2)">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h2l2-4 2 8 2-4 2 4h2" stroke="var(--green)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <div class="dt-rpp-name">Spatial Rule Writer</div>
                <div class="dt-rpp-ver">v2.2.0 · Active</div>
              </div>
            </div>
            <span class="dt-rpp-dot green"></span>
          </div>

        </div>

        <div class="sidebar-divider"></div>

        <!-- Collaborator -->
        <div class="sidebar-section-label">COLLABORATOR</div>
        <div class="dt-rp-collab-card">
          <div class="dt-rp-collab-header">
            <div class="avatar" style="width:32px;height:32px;font-size:11px;background:#1E2A3A;color:var(--accent-b);border:1.5px solid rgba(107,191,181,0.3)">JT</div>
            <div class="dt-rp-collab-info">
              <div class="dt-rp-collab-name">Jun Tanaka</div>
              <div class="dt-rp-collab-role">Media Designer</div>
            </div>
            <div style="display:flex;align-items:center;gap:4px;margin-left:auto">
              <span class="status-dot live" style="width:6px;height:6px"></span>
              <span style="font-family:var(--font-mono);font-size:9px;color:var(--green)">Online</span>
            </div>
          </div>
          <div class="dt-rp-collab-note">
            <div class="dt-rp-note-label">Assigned to this step</div>
            <div class="dt-rp-note-body">"Ready to begin visual output mapping. Will start with Tone Intensity and Light Rhythm blocks once workspace opens."</div>
            <div class="dt-rp-note-time">Now online · Media Designer</div>
          </div>
        </div>

        <div class="sidebar-divider"></div>

        <!-- Block summary -->
        <div class="sidebar-section-label">BLOCK SUMMARY</div>
        <div class="dt-rp-summary-card">
          <div class="dt-rps-title">Available for visualisation</div>
          <div class="dt-rps-body">6 data blocks have been successfully translated from AI analysis output and are now ready for visualisation and output mapping in the Visual Workspace.</div>
          <div class="dt-rps-stats">
            <div class="dt-rps-stat"><span class="dt-rps-val ok">3</span><span class="dt-rps-lbl">Ready</span></div>
            <div class="dt-rps-stat"><span class="dt-rps-val warn">2</span><span class="dt-rps-lbl">Editable</span></div>
            <div class="dt-rps-stat"><span class="dt-rps-val">1</span><span class="dt-rps-lbl">Linked</span></div>
          </div>
        </div>

        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">BLOCK TYPES</div>
        <div class="rp-stat-row" style="margin-bottom:0">
          <div class="rp-stat-item"><span class="rp-stat-label">Numeric</span><span class="rp-stat-val">2</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Spatial</span><span class="rp-stat-val">2</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Temporal</span><span class="rp-stat-val">1</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Visual</span><span class="rp-stat-val">1</span></div>
        </div>
      `,
    },

    4: {
      title: 'Visual & Object Mapping',
      badge: 'Step 04 — Visual & Object Mapping',

      canvasHTML: () => `

        <!-- HEADER -->
        <div class="canvas-section vom-header-section" style="animation-delay:0s">
          <div class="section-label-float">VISUAL & OBJECT MAPPING CANVAS</div>
          <div class="vom-header-row">
            <div class="vom-header-left">
              <span class="vom-origin-chip">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="0.5" y="0.5" width="9" height="9" rx="1.5" stroke="var(--accent-d)" stroke-width="1"/></svg>
                6 data blocks loaded
              </span>
              <span class="vom-origin-chip">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.5" stroke="var(--accent-a)" stroke-width="1"/></svg>
                Object library: 12 assets
              </span>
              <span class="vom-origin-chip vom-chip-live">
                <span class="vom-live-dot"></span>
                2 collaborators active
              </span>
            </div>
            <div class="vom-header-right">
              <button class="vom-layout-btn" id="vomAutoLayout">Auto-layout</button>
              <button class="vom-layout-btn" id="vomClearLinks">Clear links</button>
            </div>
          </div>
        </div>

        <!-- THREE-COLUMN MAPPING CANVAS -->
        <div class="vom-canvas" id="vomCanvas">

          <!-- SVG connection lines layer (drawn by JS) -->
          <svg class="vom-connections-svg" id="vomSvg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;overflow:visible">
            <defs>
              <marker id="vom-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0 0L6 3L0 6" fill="none" stroke="rgba(107,191,181,0.5)" stroke-width="0.8"/>
              </marker>
            </defs>
          </svg>

          <!-- COLUMN A — Data Blocks -->
          <div class="vom-col vom-col-a">
            <div class="vom-col-header">
              <span class="vom-col-label">Data Blocks</span>
              <span class="vom-col-count">6 available</span>
            </div>
            <div class="vom-col-items" id="vomColA">

              <div class="vom-node vom-node-data vom-n-tone" data-node="tone" data-col="a">
                <div class="vom-n-port vom-n-port-out" data-from="tone"></div>
                <div class="vom-n-body">
                  <div class="vom-n-icon vom-icon-tone"></div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Tone Intensity</div>
                    <div class="vom-n-sub">Numeric · 0.72</div>
                  </div>
                </div>
              </div>

              <div class="vom-node vom-node-data vom-n-reflect" data-node="reflect" data-col="a">
                <div class="vom-n-port vom-n-port-out" data-from="reflect"></div>
                <div class="vom-n-body">
                  <div class="vom-n-icon vom-icon-reflect"></div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Reflective Behaviour</div>
                    <div class="vom-n-sub">Spatial · 0.85 reflect</div>
                  </div>
                </div>
              </div>

              <div class="vom-node vom-node-data vom-n-rhythm" data-node="rhythm" data-col="a">
                <div class="vom-n-port vom-n-port-out" data-from="rhythm"></div>
                <div class="vom-n-body">
                  <div class="vom-n-icon vom-icon-rhythm"></div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Light Rhythm</div>
                    <div class="vom-n-sub">Temporal · 8.4s sine</div>
                  </div>
                </div>
              </div>

              <div class="vom-node vom-node-data vom-n-temp" data-node="temp" data-col="a">
                <div class="vom-n-port vom-n-port-out" data-from="temp"></div>
                <div class="vom-n-body">
                  <div class="vom-n-icon vom-icon-temp"></div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Colour Temperature</div>
                    <div class="vom-n-sub">Visual · 2700–6000K</div>
                  </div>
                </div>
              </div>

              <div class="vom-node vom-node-data vom-n-surface" data-node="surface" data-col="a">
                <div class="vom-n-port vom-n-port-out" data-from="surface"></div>
                <div class="vom-n-body">
                  <div class="vom-n-icon vom-icon-surface"></div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Surface Response</div>
                    <div class="vom-n-sub">Spatial · tactility 0.84</div>
                  </div>
                </div>
              </div>

              <div class="vom-node vom-node-data vom-n-depth" data-node="depth" data-col="a">
                <div class="vom-n-port vom-n-port-out" data-from="depth"></div>
                <div class="vom-n-body">
                  <div class="vom-n-icon vom-icon-depth"></div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Spatial Depth Index</div>
                    <div class="vom-n-sub">Numeric · FG 0.85</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- COLUMN B — Visual Output Modules -->
          <div class="vom-col vom-col-b">
            <div class="vom-col-header">
              <span class="vom-col-label">Visual Outputs</span>
              <span class="vom-col-count">3 modules</span>
            </div>
            <div class="vom-col-items" id="vomColB">

              <div class="vom-node vom-node-visual vom-nv-gradient" data-node="gradient" data-col="b">
                <div class="vom-n-port vom-n-port-in"  data-to="gradient"></div>
                <div class="vom-n-port vom-n-port-out" data-from="gradient"></div>
                <div class="vom-n-body">
                  <div class="vom-nv-preview vom-prev-gradient"></div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Light Gradient Animation</div>
                    <div class="vom-n-sub">Warm ↔ cool wash · 8.4s cycle</div>
                  </div>
                  <div class="vom-n-status-badge vom-status-mapped">Mapped</div>
                </div>
              </div>

              <div class="vom-node vom-node-visual vom-nv-particles" data-node="particles" data-col="b">
                <div class="vom-n-port vom-n-port-in"  data-to="particles"></div>
                <div class="vom-n-port vom-n-port-out" data-from="particles"></div>
                <div class="vom-n-body">
                  <div class="vom-nv-preview vom-prev-particles" id="vomParticlePreview"></div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Reflective Particle Field</div>
                    <div class="vom-n-sub">Scatter density 0.85 · sand palette</div>
                  </div>
                  <div class="vom-n-status-badge vom-status-mapped">Mapped</div>
                </div>
              </div>

              <div class="vom-node vom-node-visual vom-nv-screen" data-node="screen" data-col="b">
                <div class="vom-n-port vom-n-port-in"  data-to="screen"></div>
                <div class="vom-n-port vom-n-port-out" data-from="screen"></div>
                <div class="vom-n-body">
                  <div class="vom-nv-preview vom-prev-screen" id="vomScreenPreview"></div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Screen Motion Rhythm</div>
                    <div class="vom-n-sub">Sine oscillation · minimal content</div>
                  </div>
                  <div class="vom-n-status-badge vom-status-review">Review</div>
                </div>
              </div>

            </div>
          </div>

          <!-- COLUMN C — Physical Object Modules -->
          <div class="vom-col vom-col-c">
            <div class="vom-col-header">
              <span class="vom-col-label">Physical Objects</span>
              <span class="vom-col-count">3 modules</span>
            </div>
            <div class="vom-col-items" id="vomColC">

              <div class="vom-node vom-node-physical vom-np-spotlight" data-node="spotlight" data-col="c">
                <div class="vom-n-port vom-n-port-in" data-to="spotlight"></div>
                <div class="vom-n-body">
                  <div class="vom-np-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v3M10 15v3M4.2 4.2l2.1 2.1M13.7 13.7l2.1 2.1M2 10h3M15 10h3M4.2 15.8l2.1-2.1M13.7 6.3l2.1-2.1" stroke="var(--accent-a)" stroke-width="1.2" stroke-linecap="round"/><circle cx="10" cy="10" r="3" stroke="var(--accent-a)" stroke-width="1.2"/></svg>
                  </div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Adjustable Spotlight</div>
                    <div class="vom-n-sub">DMX · warm · ceiling rig</div>
                  </div>
                  <div class="vom-n-status-badge vom-status-mapped">Mapped</div>
                </div>
              </div>

              <div class="vom-node vom-node-physical vom-np-mirror" data-node="mirror" data-col="c">
                <div class="vom-n-port vom-n-port-in" data-to="mirror"></div>
                <div class="vom-n-body">
                  <div class="vom-np-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="12" rx="1.5" stroke="var(--accent-b)" stroke-width="1.2"/><path d="M8 10h4M10 8v4" stroke="var(--accent-b)" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/><path d="M3 10h14" stroke="var(--accent-b)" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.4"/></svg>
                  </div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Kinetic Mirror Panel</div>
                    <div class="vom-n-sub">Servo-actuated · 180° arc</div>
                  </div>
                  <div class="vom-n-status-badge vom-status-mapped">Mapped</div>
                </div>
              </div>

              <div class="vom-node vom-node-physical vom-np-projection" data-node="projection" data-col="c">
                <div class="vom-n-port vom-n-port-in" data-to="projection"></div>
                <div class="vom-n-body">
                  <div class="vom-np-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="10" rx="1" stroke="var(--accent-d)" stroke-width="1.2"/><path d="M6 9h8M6 12h5" stroke="var(--accent-d)" stroke-width="1" stroke-linecap="round" opacity="0.6"/><path d="M10 15v3M7 18h6" stroke="var(--accent-d)" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/></svg>
                  </div>
                  <div class="vom-n-text">
                    <div class="vom-n-title">Projection Wall</div>
                    <div class="vom-n-sub">4K surface · tone-responsive</div>
                  </div>
                  <div class="vom-n-status-badge vom-status-review">Review</div>
                </div>
              </div>

            </div>
          </div>

        </div><!-- /vom-canvas -->

        <!-- CTA ROW -->
        <div class="vom-cta-row" style="animation:fadeUp 0.4s ease 0.35s both">
          <div class="vom-cta-summary">
            <div class="vom-cta-dots">
              <span class="vom-dot-mapped"></span>
              <span class="vom-dot-mapped"></span>
              <span class="vom-dot-review"></span>
              <span class="vom-dot-mapped"></span>
              <span class="vom-dot-mapped"></span>
              <span class="vom-dot-review"></span>
            </div>
            <div class="vom-cta-text">
              <div class="vom-cta-title">4 mappings confirmed · 2 under review</div>
              <div class="vom-cta-sub">Visual and physical outputs ready for spatial simulation</div>
            </div>
          </div>
          <button class="vom-sim-btn" id="vomSimBtn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <polygon points="3,2 13,7.5 3,13" fill="currentColor" opacity="0.9"/>
            </svg>
            Send to Simulation
          </button>
        </div>
      `,

      rightHTML: () => `
        <!-- Active collaborators -->
        <div class="sidebar-section-label">ACTIVE COLLABORATORS</div>

        <div class="vom-rp-collab-list">

          <div class="vom-rp-collab">
            <div class="vom-rp-avatar" style="background:#1E2A3A;border-color:rgba(107,191,181,0.35);color:var(--accent-b)">JT</div>
            <div class="vom-rp-collab-info">
              <div class="vom-rp-collab-name">Jun Tanaka</div>
              <div class="vom-rp-collab-role">Media Designer</div>
              <div class="vom-rp-collab-task">Mapping visual output modules</div>
            </div>
            <div class="vom-rp-collab-live">
              <span class="status-dot live" style="width:6px;height:6px"></span>
            </div>
          </div>

          <div class="vom-rp-collab">
            <div class="vom-rp-avatar" style="background:#1C2A20;border-color:rgba(76,175,125,0.35);color:var(--green)">SH</div>
            <div class="vom-rp-collab-info">
              <div class="vom-rp-collab-name">Sadia Hasan</div>
              <div class="vom-rp-collab-role">Space Designer</div>
              <div class="vom-rp-collab-task">Reviewing physical object specs</div>
            </div>
            <div class="vom-rp-collab-live">
              <span class="status-dot live" style="width:6px;height:6px"></span>
            </div>
          </div>

        </div>

        <div class="sidebar-divider"></div>

        <!-- Installed plugins -->
        <div class="sidebar-section-label">INSTALLED PLUGINS</div>

        <div class="vom-rp-plugin-list">

          <div class="vom-rp-plugin active-plugin">
            <div class="vom-rpp-icon" style="background:rgba(140,127,168,0.1);border-color:rgba(140,127,168,0.25)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h4l2-4 2 8 2-4 2 1" stroke="var(--accent-d)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="vom-rpp-text">
              <div class="vom-rpp-name">Visual Mapping Pack</div>
              <div class="vom-rpp-status">v2.3 · Active</div>
            </div>
            <span class="vom-rpp-dot green"></span>
          </div>

          <div class="vom-rp-plugin active-plugin">
            <div class="vom-rpp-icon" style="background:rgba(200,169,126,0.1);border-color:rgba(200,169,126,0.25)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="2" stroke="var(--accent-a)" stroke-width="1.2"/><path d="M5 7h4M7 5v4" stroke="var(--accent-a)" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/></svg>
            </div>
            <div class="vom-rpp-text">
              <div class="vom-rpp-name">Spatial Output Pack</div>
              <div class="vom-rpp-status">v1.9 · Active</div>
            </div>
            <span class="vom-rpp-dot green"></span>
          </div>

          <div class="vom-rp-plugin">
            <div class="vom-rpp-icon" style="background:rgba(107,191,181,0.08);border-color:rgba(107,191,181,0.2)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="var(--accent-b)" stroke-width="1.2"/><path d="M5 7l2 2 3-3" stroke="var(--accent-b)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/></svg>
            </div>
            <div class="vom-rpp-text">
              <div class="vom-rpp-name">Simulation Bridge</div>
              <div class="vom-rpp-status">v3.0 · Ready</div>
            </div>
            <span class="vom-rpp-dot green"></span>
          </div>

          <div class="vom-rp-plugin">
            <div class="vom-rpp-icon" style="background:rgba(212,165,32,0.08);border-color:rgba(212,165,32,0.2)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v2M7 10v2M2 7h2M10 7h2" stroke="var(--yellow)" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/><circle cx="7" cy="7" r="2.5" stroke="var(--yellow)" stroke-width="1.2"/></svg>
            </div>
            <div class="vom-rpp-text">
              <div class="vom-rpp-name">DMX Controller</div>
              <div class="vom-rpp-status">v1.2 · Standby</div>
            </div>
            <span class="vom-rpp-dot yellow"></span>
          </div>

        </div>

        <div class="sidebar-divider"></div>

        <!-- Mapping stats -->
        <div class="sidebar-section-label">MAPPING PROGRESS</div>
        <div class="vom-rp-progress">
          <div class="vom-rpp-row">
            <span class="vom-rpp-label">Visual → Physical</span>
            <div class="vom-rpp-track"><div class="vom-rpp-fill vom-rpf-confirm" id="vomRpFill1"></div></div>
            <span class="vom-rpp-val">4/6</span>
          </div>
          <div class="vom-rpp-row">
            <span class="vom-rpp-label">Connections active</span>
            <div class="vom-rpp-track"><div class="vom-rpp-fill vom-rpf-connect" id="vomRpFill2"></div></div>
            <span class="vom-rpp-val">7</span>
          </div>
          <div class="vom-rpp-row">
            <span class="vom-rpp-label">Review queue</span>
            <div class="vom-rpp-track"><div class="vom-rpp-fill vom-rpf-review" id="vomRpFill3"></div></div>
            <span class="vom-rpp-val">2</span>
          </div>
        </div>

        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">SESSION</div>
        <div class="rp-stat-row" style="margin-bottom:0">
          <div class="rp-stat-item"><span class="rp-stat-label">Blocks used</span><span class="rp-stat-val ok">6</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Modules</span><span class="rp-stat-val">6</span></div>
          <div class="rp-stat-item"><span class="rp-stat-label">Connections</span><span class="rp-stat-val ok">7</span></div>
        </div>
      `,
    },
    5: {
      title: 'Live Simulation',
      badge: 'Step 05 — Live Simulation',

      canvasHTML: () => `

        <!-- ① SCENE VIEWPORT -->
        <div class="canvas-section ls-viewport-section" style="animation-delay:0s">
          <div class="section-label-float">LIVE SIMULATION — SCENE_01 · Lobby</div>

          <div class="ls-scene" id="lsScene">

            <!-- Background layer: grid floor + walls -->
            <div class="ls-bg">
              <div class="ls-grid-floor"></div>
              <div class="ls-wall-back"></div>
              <div class="ls-wall-left"></div>
              <div class="ls-wall-right"></div>
            </div>

            <!-- PROJECTION WALL — back wall, animated content -->
            <div class="ls-obj ls-projection-wall" id="lsProjectionWall">
              <div class="ls-pw-content" id="lsPwContent"></div>
              <div class="ls-pw-label">Projection Wall</div>
              <div class="ls-obj-badge ls-badge-purple">Visual Output</div>
            </div>

            <!-- KINETIC MIRROR PANEL — right side -->
            <div class="ls-obj ls-mirror-panel" id="lsMirrorPanel">
              <div class="ls-mp-surface" id="lsMpSurface">
                <div class="ls-mp-reflection" id="lsMpReflection"></div>
              </div>
              <div class="ls-mp-base"></div>
              <div class="ls-obj-badge ls-badge-teal">Kinetic Mirror</div>
            </div>

            <!-- ADJUSTABLE SPOTLIGHT — ceiling rig -->
            <div class="ls-obj ls-spotlight-rig" id="lsSpotlightRig">
              <div class="ls-sp-track"></div>
              <div class="ls-sp-head" id="lsSpHead">
                <div class="ls-sp-body"></div>
                <div class="ls-sp-beam" id="lsSpBeam"></div>
              </div>
              <div class="ls-obj-badge ls-badge-warm">Spotlight</div>
            </div>

            <!-- Data overlay readouts -->
            <div class="ls-readout ls-ro-tone" id="lsRoTone">
              <span class="ls-ro-label">Tone Intensity</span>
              <span class="ls-ro-val" id="lsRoToneVal">0.72</span>
            </div>
            <div class="ls-readout ls-ro-rhythm" id="lsRoRhythm">
              <span class="ls-ro-label">Light Rhythm</span>
              <span class="ls-ro-val" id="lsRoRhythmVal">8.4s</span>
            </div>
            <div class="ls-readout ls-ro-reflect" id="lsRoReflect">
              <span class="ls-ro-label">Reflection</span>
              <span class="ls-ro-val" id="lsRoReflectVal">0.85</span>
            </div>

            <!-- FPS counter -->
            <div class="ls-fps-badge" id="lsFps">
              <span class="ls-fps-dot"></span>
              <span id="lsFpsVal">60</span> fps
            </div>

          </div>

          <!-- CONTROL BAR -->
          <div class="ls-controls" id="lsControls">
            <div class="ls-ctrl-left">
              <button class="ls-ctrl-btn ls-btn-play" id="lsPlayBtn">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><polygon points="2,1 10,5.5 2,10" fill="currentColor"/></svg>
                Play Simulation
              </button>
              <button class="ls-ctrl-btn" id="lsPauseBtn">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1.5" y="1" width="3" height="9" rx="1" fill="currentColor"/><rect x="6.5" y="1" width="3" height="9" rx="1" fill="currentColor"/></svg>
                Pause
              </button>
              <button class="ls-ctrl-btn" id="lsReplayBtn">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M9 5.5A4 4 0 112 5.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M9 2.5v3h-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Replay Flow
              </button>
            </div>
            <div class="ls-ctrl-right">
              <span class="ls-time-badge" id="lsTimeBadge">00:00</span>
              <button class="ls-ctrl-btn ls-btn-icon" id="lsGridBtn" title="Toggle grid">⊞</button>
              <button class="ls-ctrl-btn ls-btn-icon" id="lsFullBtn" title="Fullscreen">⛶</button>
            </div>
          </div>
        </div>

        <!-- ② OBJECT STATUS STRIP -->
        <div class="ls-status-strip canvas-section" style="animation-delay:0.1s">
          <div class="section-label-float output">ACTIVE OBJECT STATES</div>
          <div class="ls-obj-status-grid">

            <div class="ls-obj-status ls-os-spotlight">
              <div class="ls-os-preview">
                <div class="ls-os-sp-vis" id="lsOsSpVis"></div>
              </div>
              <div class="ls-os-info">
                <div class="ls-os-name">Adjustable Spotlight</div>
                <div class="ls-os-params">
                  <span>Intensity <b id="lsOsSpInt">72%</b></span>
                  <span>Angle <b id="lsOsSpAngle">24°</b></span>
                  <span>Temp <b>2900K</b></span>
                </div>
              </div>
              <div class="ls-os-live-dot"></div>
            </div>

            <div class="ls-obj-status ls-os-mirror">
              <div class="ls-os-preview">
                <div class="ls-os-mp-vis" id="lsOsMpVis"></div>
              </div>
              <div class="ls-os-info">
                <div class="ls-os-name">Kinetic Mirror Panel</div>
                <div class="ls-os-params">
                  <span>Angle <b id="lsOsMpAngle">45°</b></span>
                  <span>Speed <b>0.28</b></span>
                  <span>Arc <b>72%</b></span>
                </div>
              </div>
              <div class="ls-os-live-dot"></div>
            </div>

            <div class="ls-obj-status ls-os-projection">
              <div class="ls-os-preview">
                <canvas class="ls-os-pw-canvas" id="lsOsPwCanvas" width="60" height="40"></canvas>
              </div>
              <div class="ls-os-info">
                <div class="ls-os-name">Projection Wall</div>
                <div class="ls-os-params">
                  <span>Brightness <b>78%</b></span>
                  <span>Mode <b>Tone-Resp.</b></span>
                  <span>Temp <b id="lsOsPwTemp">2.9K</b></span>
                </div>
              </div>
              <div class="ls-os-live-dot"></div>
            </div>

          </div>
        </div>

      `,

      rightHTML: () => `

        <!-- Simulation state -->
        <div class="sidebar-section-label">SIMULATION STATE</div>
        <div class="ls-rp-state-card" id="lsRpStateCard">
          <div class="ls-rp-state-top">
            <div class="ls-rp-state-icon" id="lsRpStateIcon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="var(--text-muted)" stroke-width="1.2"/><polygon points="6,5 12,8 6,11" fill="var(--text-muted)"/></svg>
            </div>
            <div class="ls-rp-state-info">
              <div class="ls-rp-state-label" id="lsRpStateLabel">Standby</div>
              <div class="ls-rp-state-sub" id="lsRpStateSub">Press Play to begin</div>
            </div>
            <div class="ls-rp-state-dot" id="lsRpStateDot"></div>
          </div>
          <div class="ls-rp-timecode">
            <span class="ls-rp-tc-label">Timecode</span>
            <span class="ls-rp-tc-val" id="lsRpTc">00:00:00</span>
          </div>
        </div>

        <div class="sidebar-divider"></div>

        <!-- Active outputs -->
        <div class="sidebar-section-label">ACTIVE OUTPUTS</div>
        <div class="ls-rp-outputs">
          <div class="ls-rpo-item">
            <div class="ls-rpo-dot" style="background:var(--accent-a)"></div>
            <div class="ls-rpo-info">
              <div class="ls-rpo-name">Adjustable Spotlight</div>
              <div class="ls-rpo-sub">DMX ch.1–4 · 2900K · <span id="lsRpoDmxVal">72%</span></div>
            </div>
            <div class="ls-rpo-live"></div>
          </div>
          <div class="ls-rpo-item">
            <div class="ls-rpo-dot" style="background:var(--accent-b)"></div>
            <div class="ls-rpo-info">
              <div class="ls-rpo-name">Kinetic Mirror Panel</div>
              <div class="ls-rpo-sub">Servo · <span id="lsRpoMirrorAngle">45°</span> · flow mode</div>
            </div>
            <div class="ls-rpo-live"></div>
          </div>
          <div class="ls-rpo-item">
            <div class="ls-rpo-dot" style="background:var(--accent-d)"></div>
            <div class="ls-rpo-info">
              <div class="ls-rpo-name">Projection Wall</div>
              <div class="ls-rpo-sub">4K · tone-responsive · 78%</div>
            </div>
            <div class="ls-rpo-live"></div>
          </div>
        </div>

        <div class="sidebar-divider"></div>

        <!-- Plugins -->
        <div class="sidebar-section-label">CONNECTED PLUGINS</div>
        <div class="ls-rp-plugins">
          ${[
            ['Simulation Bridge',  'v3.0',  'green', 'Streaming'],
            ['Visual Mapping Pack','v2.3',  'green', 'Active'],
            ['DMX Controller',     'v1.2',  'green', 'Broadcasting'],
            ['XR Viewer',          'v0.9',  'yellow','Standby'],
          ].map(([name, ver, dot, status]) => `
            <div class="ls-rp-plugin">
              <div class="ls-rpp-dot ${dot}"></div>
              <div class="ls-rpp-text">
                <div class="ls-rpp-name">${name}</div>
                <div class="ls-rpp-status">${ver} · ${status}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="sidebar-divider"></div>

        <!-- Collaborators -->
        <div class="sidebar-section-label">COLLABORATION SUMMARY</div>
        <div class="ls-rp-collabs">
          <div class="ls-rp-collab">
            <div class="ls-rp-ca" style="background:#1E2A3A;border-color:rgba(107,191,181,0.3);color:var(--accent-b)">JT</div>
            <div class="ls-rp-ci"><div class="ls-rp-cn">Jun Tanaka</div><div class="ls-rp-cr">Media Designer · Observing</div></div>
            <span class="status-dot live" style="width:6px;height:6px"></span>
          </div>
          <div class="ls-rp-collab">
            <div class="ls-rp-ca" style="background:#1C2A20;border-color:rgba(76,175,125,0.3);color:var(--green)">SH</div>
            <div class="ls-rp-ci"><div class="ls-rp-cn">Sadia Hasan</div><div class="ls-rp-cr">Space Designer · Reviewing</div></div>
            <span class="status-dot live" style="width:6px;height:6px"></span>
          </div>
          <div class="ls-rp-collab">
            <div class="ls-rp-ca" style="background:#2A1E1C;border-color:rgba(200,169,126,0.3);color:var(--accent-a)">MO</div>
            <div class="ls-rp-ci"><div class="ls-rp-cn">Mira Osei</div><div class="ls-rp-cr">Branding Designer · Away</div></div>
            <span class="status-dot" style="width:6px;height:6px;background:var(--text-muted)"></span>
          </div>
        </div>

      `,
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
        updatePsbStep(2);
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
        updatePsbStep(3);
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

  // ── GUIDED TRANSITION: Step 3 → Step 4 ─────
  function showVisualWorkspaceOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'visualWorkspaceOverlay';
    overlay.innerHTML = `
      <div class="ao-inner">
        <div class="vwo-grid-wrap">
          <svg class="vwo-svg" id="vwoSvg" width="200" height="120" viewBox="0 0 200 120">
            <!-- Connection lines drawn by JS -->
            <g id="vwoLines"></g>
            <!-- Nodes -->
            <g id="vwoNodes"></g>
          </svg>
        </div>
        <div class="ao-label" id="vwoLabel">Initialising Visual Workspace…</div>
        <div class="ao-progress-wrap">
          <div class="ao-progress-bar"><div class="ao-progress-fill" id="vwoFill"></div></div>
          <span class="ao-pct" id="vwoPct">0%</span>
        </div>
        <div class="ao-steps-list" id="vwoList"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('ao-visible')));

    const fill  = document.getElementById('vwoFill');
    const label = document.getElementById('vwoLabel');
    const pctEl = document.getElementById('vwoPct');
    const list  = document.getElementById('vwoList');

    // Node positions and colours (3 left data blocks → 3 right object targets)
    const nodes = [
      // Source: data blocks (left column)
      { id:'n0', x:28,  y:20,  label:'Tone',      color:'rgba(107,191,181,0.9)', side:'src' },
      { id:'n1', x:28,  y:60,  label:'Colour',    color:'rgba(200,169,126,0.9)', side:'src' },
      { id:'n2', x:28,  y:100, label:'Surface',   color:'rgba(76,175,125,0.8)',  side:'src' },
      // Bridge: translation nodes (centre column)
      { id:'n3', x:100, y:30,  label:'Spatial',   color:'rgba(140,127,168,0.8)', side:'mid' },
      { id:'n4', x:100, y:90,  label:'Material',  color:'rgba(200,169,126,0.7)', side:'mid' },
      // Target: object outputs (right column)
      { id:'n5', x:172, y:20,  label:'Lighting',  color:'rgba(200,169,126,0.9)', side:'dst' },
      { id:'n6', x:172, y:60,  label:'Objects',   color:'rgba(107,191,181,0.8)', side:'dst' },
      { id:'n7', x:172, y:100, label:'Surfaces',  color:'rgba(76,175,125,0.75)', side:'dst' },
    ];
    const edges = [
      ['n0','n3'],['n1','n3'],['n2','n4'],
      ['n3','n5'],['n3','n6'],['n4','n6'],['n4','n7'],
    ];

    const svgNS = 'http://www.w3.org/2000/svg';
    const nodesG = document.getElementById('vwoNodes');
    const linesG = document.getElementById('vwoLines');

    // Draw all nodes hidden initially
    nodes.forEach(n => {
      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('id', n.id);
      g.style.opacity = '0';
      g.style.transition = 'opacity 0.3s ease';

      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', n.x);
      circle.setAttribute('cy', n.y);
      circle.setAttribute('r', '7');
      circle.setAttribute('fill', n.color.replace('0.9','0.18').replace('0.8','0.15').replace('0.7','0.12'));
      circle.setAttribute('stroke', n.color);
      circle.setAttribute('stroke-width', '1.2');

      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', n.x);
      dot.setAttribute('cy', n.y);
      dot.setAttribute('r', '2.5');
      dot.setAttribute('fill', n.color);

      const txt = document.createElementNS(svgNS, 'text');
      txt.setAttribute('x', n.x);
      txt.setAttribute('y', n.y + (n.side === 'dst' ? -12 : 18));
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('font-family', 'DM Mono, monospace');
      txt.setAttribute('font-size', '7');
      txt.setAttribute('fill', 'rgba(255,255,255,0.4)');
      txt.textContent = n.label;

      g.appendChild(circle);
      g.appendChild(dot);
      g.appendChild(txt);
      nodesG.appendChild(g);
    });

    // Draw all edges hidden initially
    edges.forEach(([a, b], i) => {
      const na = nodes.find(n => n.id === a);
      const nb = nodes.find(n => n.id === b);
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', na.x);
      line.setAttribute('y1', na.y);
      line.setAttribute('x2', nb.x);
      line.setAttribute('y2', nb.y);
      line.setAttribute('stroke', 'rgba(255,255,255,0.08)');
      line.setAttribute('stroke-width', '1');
      line.setAttribute('id', 'edge_' + i);
      line.style.opacity = '0';
      line.style.transition = 'opacity 0.35s ease, stroke 0.35s ease';
      linesG.appendChild(line);
    });

    // Sequence
    const sequence = [
      { pct: 14, label: 'Loading 6 data blocks into workspace…',   delay: 0    },
      { pct: 28, label: 'Resolving object library dependencies…',  delay: 500  },
      { pct: 44, label: 'Building spatial node graph…',            delay: 1000 },
      { pct: 62, label: 'Assigning material relationships…',       delay: 1500 },
      { pct: 78, label: 'Generating object mapping schema…',       delay: 2000 },
      { pct: 92, label: 'Preparing visual output canvas…',         delay: 2500 },
      { pct: 100,label: 'Visual Workspace ready',                  delay: 2980 },
    ];

    sequence.forEach((step, i) => {
      setTimeout(() => {
        if (!document.getElementById('visualWorkspaceOverlay')) return;
        if (fill)  fill.style.width  = step.pct + '%';
        if (pctEl) pctEl.textContent = step.pct + '%';
        if (label) {
          label.style.opacity = '0';
          setTimeout(() => {
            if (label) { label.textContent = step.label; label.style.opacity = '1'; }
          }, 100);
        }
        // Reveal nodes + edges progressively
        const nodeRevealOrder = [
          [0],          // step 0: src nodes appear
          [1, 2],       // step 1
          [3],          // step 2: mid nodes
          [4,'e0','e1'],
          [5,'e2','e3'],
          [6, 7,'e4','e5','e6'],
          [],
        ];
        nodeRevealOrder[i].forEach(id => {
          if (typeof id === 'string' && id.startsWith('e')) {
            const el = document.getElementById(id.replace('e','edge_'));
            if (el) { el.style.opacity = '1'; el.setAttribute('stroke', 'rgba(107,191,181,0.3)'); }
          } else {
            const el = document.getElementById('n' + id);
            if (el) el.style.opacity = '1';
          }
        });
        // Log
        if (i > 0 && list) {
          const prev = sequence[i-1];
          const item = document.createElement('div');
          item.className = 'ao-step-item';
          item.innerHTML = `<span class="ao-step-check">✓</span><span>${prev.label}</span>`;
          item.style.cssText = 'opacity:0;transform:translateX(-8px);transition:opacity 0.25s,transform 0.25s';
          list.appendChild(item);
          requestAnimationFrame(() => requestAnimationFrame(() => {
            item.style.opacity = '1'; item.style.transform = 'translateX(0)';
          }));
          const all = list.querySelectorAll('.ao-step-item');
          if (all.length > 3) all[0].remove();
        }
      }, step.delay);
    });

    setTimeout(() => dismissVisualWorkspaceOverlay(overlay), 3700);
  }

  function dismissVisualWorkspaceOverlay(overlay) {
    const checkSVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    // 1. Sidebar: mark 01-03 completed, activate 04
    const allSteps = document.querySelectorAll('.workflow-steps .step');
    allSteps.forEach(s => s.classList.remove('active'));

    ['.step[data-step="01"]', '.step[data-step="02"]', '.step[data-step="03"]'].forEach(sel => {
      const s = document.querySelector(sel);
      if (!s) return;
      s.classList.remove('active', 'pending');
      s.classList.add('completed');
      const icon = s.querySelector('.step-icon');
      if (icon) { icon.innerHTML = checkSVG; icon.classList.remove('pulse'); }
      const bar = s.querySelector('.bar-fill');
      if (bar)  bar.style.width = '100%';
    });

    const s4el = document.querySelector('.step[data-step="04"]');
    if (s4el) {
      s4el.classList.remove('pending');
      s4el.classList.add('active');
    }

    // 2. Fade workspace
    const canvasEl = document.getElementById('step-canvas-content');
    const rightEl  = document.getElementById('right-panel-content');
    if (canvasEl) canvasEl.classList.add('fade-out');
    if (rightEl)  rightEl.classList.add('fade-out');

    // 3. Dismiss + render step 4
    setTimeout(() => {
      if (overlay) overlay.classList.add('ao-exit');
      setTimeout(() => {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);

        currentStep = 4;
        updatePsbStep(4);
        const data = STEPS[4];
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
            postRender(4);
          }));
        }
      }, 480);
    }, 360);
  }

  // ── GUIDED TRANSITION: Step 4 → Step 5 ─────
  function showSimulationOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'simulationOverlay';
    overlay.innerHTML = `
      <div class="ao-inner simo-inner">

        <!-- Wireframe scene canvas -->
        <div class="simo-scene-wrap">
          <canvas id="simoCanvas" class="simo-canvas" width="280" height="140"></canvas>
          <div class="simo-scene-label" id="simoSceneLabel">Compiling geometry…</div>
        </div>

        <div class="ao-label simo-label" id="simoLabel">Sending to render engine…</div>

        <div class="ao-progress-wrap">
          <div class="ao-progress-bar">
            <div class="ao-progress-fill" id="simoFill"></div>
          </div>
          <span class="ao-pct" id="simoPct">0%</span>
        </div>

        <div class="ao-steps-list" id="simoList"></div>

      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('ao-visible')));

    // Start wireframe scene animation
    setTimeout(() => startSimoWireframe(), 200);

    const fill   = document.getElementById('simoFill');
    const label  = document.getElementById('simoLabel');
    const pctEl  = document.getElementById('simoPct');
    const list   = document.getElementById('simoList');

    const sequence = [
      { pct: 10, label: 'Exporting object mapping schema…',     delay: 0    },
      { pct: 22, label: 'Compiling spatial geometry mesh…',     delay: 480  },
      { pct: 38, label: 'Applying material assignments…',       delay: 960  },
      { pct: 54, label: 'Baking lighting parameters…',          delay: 1440 },
      { pct: 68, label: 'Loading DMX control bridge…',          delay: 1900 },
      { pct: 82, label: 'Initialising render engine (UE 5.3)…', delay: 2360 },
      { pct: 94, label: 'Streaming to simulation viewport…',    delay: 2820 },
      { pct: 100,label: 'Live Simulation ready',                delay: 3240 },
    ];

    sequence.forEach((step, i) => {
      setTimeout(() => {
        if (!document.getElementById('simulationOverlay')) return;
        if (fill)  fill.style.width  = step.pct + '%';
        if (pctEl) pctEl.textContent = step.pct + '%';
        if (label) {
          label.style.opacity = '0';
          setTimeout(() => {
            if (label) { label.textContent = step.label; label.style.opacity = '1'; }
          }, 100);
        }
        if (i > 0 && list) {
          const item = document.createElement('div');
          item.className = 'ao-step-item';
          item.innerHTML = `<span class="ao-step-check">✓</span><span>${sequence[i-1].label}</span>`;
          item.style.cssText = 'opacity:0;transform:translateX(-8px);transition:opacity 0.25s,transform 0.25s';
          list.appendChild(item);
          requestAnimationFrame(() => requestAnimationFrame(() => {
            item.style.opacity = '1'; item.style.transform = 'translateX(0)';
          }));
          const all = list.querySelectorAll('.ao-step-item');
          if (all.length > 3) all[0].remove();
        }
      }, step.delay);
    });

    setTimeout(() => dismissSimulationOverlay(overlay), 3900);
  }

  function startSimoWireframe() {
    const canvas = document.getElementById('simoCanvas');
    const sceneLabel = document.getElementById('simoSceneLabel');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Scene geometry: a simplified lobby space with floor, back wall, two columns
    // All points in 3D projected with simple perspective
    const CAM = { z: -320, fov: 200 };
    const project = (x, y, z) => {
      const scale = CAM.fov / (CAM.fov + z - CAM.z);
      return { x: W/2 + x * scale, y: H/2 + y * scale, scale };
    };

    // Room vertices
    const roomW = 120, roomH = 70, roomD = 160;
    const hW = roomW/2;

    const verts = {
      // Floor quad
      fl:  project(-hW, roomH/2,   0),
      fr:  project( hW, roomH/2,   0),
      fbr: project( hW, roomH/2, roomD),
      fbl: project(-hW, roomH/2, roomD),
      // Ceiling
      cl:  project(-hW, -roomH/2,  0),
      cr:  project( hW, -roomH/2,  0),
      cbr: project( hW, -roomH/2, roomD),
      cbl: project(-hW, -roomH/2, roomD),
      // Objects: spotlight at top
      sp1: project(-30, -roomH/2 + 6, roomD * 0.5),
      sp2: project(-30, -roomH/2 + 22, roomD * 0.5 + 10),
      // Mirror panel (right wall)
      m1: project(hW, -10, roomD * 0.4),
      m2: project(hW, 20, roomD * 0.4),
      m3: project(hW, 20, roomD * 0.6),
      m4: project(hW, -10, roomD * 0.6),
      // Projection wall (back)
      pw1: project(-40, -20, roomD),
      pw2: project( 40, -20, roomD),
      pw3: project( 40,  15, roomD),
      pw4: project(-40,  15, roomD),
    };

    const edges = [
      // Floor
      ['fl','fr'],['fr','fbr'],['fbr','fbl'],['fbl','fl'],
      // Ceiling
      ['cl','cr'],['cr','cbr'],['cbr','cbl'],['cbl','cl'],
      // Verticals
      ['fl','cl'],['fr','cr'],['fbr','cbr'],['fbl','cbl'],
      // Spotlight
      ['sp1','sp2'],
      // Mirror panel
      ['m1','m2'],['m2','m3'],['m3','m4'],['m4','m1'],
      // Projection wall
      ['pw1','pw2'],['pw2','pw3'],['pw3','pw4'],['pw4','pw1'],
    ];

    // Colour map for special edges
    const edgeColor = {
      12: 'rgba(200,169,126,0.7)',  // spotlight
      13: 'rgba(107,191,181,0.6)',  // mirror
      14: 'rgba(107,191,181,0.6)',
      15: 'rgba(107,191,181,0.6)',
      16: 'rgba(107,191,181,0.6)',
      17: 'rgba(140,127,168,0.6)',  // projection
      18: 'rgba(140,127,168,0.6)',
      19: 'rgba(140,127,168,0.6)',
      20: 'rgba(140,127,168,0.6)',
    };

    let revealedEdges = 0;
    const sceneLabels = [
      'Compiling geometry…', 'Placing objects…', 'Assigning materials…', 'Scene ready'
    ];

    // Animate edge reveal
    const revealInterval = setInterval(() => {
      if (!document.getElementById('simoCanvas')) { clearInterval(revealInterval); return; }
      revealedEdges = Math.min(revealedEdges + 2, edges.length);
      if (revealedEdges >= edges.length) {
        clearInterval(revealInterval);
        if (sceneLabel) sceneLabel.textContent = sceneLabels[3];
      } else if (revealedEdges < 8  && sceneLabel) sceneLabel.textContent = sceneLabels[0];
      else if (revealedEdges < 14  && sceneLabel) sceneLabel.textContent = sceneLabels[1];
      else if (sceneLabel) sceneLabel.textContent = sceneLabels[2];
      drawScene();
    }, 130);

    // Subtle scan line
    let scanY = 0;
    let rafId;

    function drawScene() {
      ctx.clearRect(0, 0, W, H);

      // Grid floor
      ctx.strokeStyle = 'rgba(107,191,181,0.05)';
      ctx.lineWidth = 0.5;
      for (let gx = -hW; gx <= hW; gx += 30) {
        const a = project(gx, roomH/2, 0);
        const b = project(gx, roomH/2, roomD);
        if (a && b) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      for (let gz = 0; gz <= roomD; gz += 40) {
        const a = project(-hW, roomH/2, gz);
        const b = project( hW, roomH/2, gz);
        if (a && b) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }

      // Edges
      edges.slice(0, revealedEdges).forEach((e, i) => {
        const a = verts[e[0]], b = verts[e[1]];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = edgeColor[i] || 'rgba(200,169,126,0.2)';
        ctx.lineWidth = edgeColor[i] ? 1.2 : 0.7;
        ctx.stroke();
      });

      // Scan beam
      ctx.fillStyle = `rgba(107,191,181,0.04)`;
      ctx.fillRect(0, scanY - 2, W, 4);
      ctx.fillStyle = `rgba(107,191,181,0.15)`;
      ctx.fillRect(0, scanY, W, 1);
      scanY = (scanY + 1.2) % H;
    }

    (function animLoop() {
      if (!document.getElementById('simoCanvas')) return;
      drawScene();
      rafId = requestAnimationFrame(animLoop);
    })();
  }

  function dismissSimulationOverlay(overlay) {
    const checkSVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    // 1. Mark all steps 01–04 completed, activate 05
    const allSteps = document.querySelectorAll('.workflow-steps .step');
    allSteps.forEach(s => s.classList.remove('active'));

    ['.step[data-step="01"]','.step[data-step="02"]','.step[data-step="03"]','.step[data-step="04"]']
      .forEach(sel => {
        const s = document.querySelector(sel);
        if (!s) return;
        s.classList.remove('active','pending');
        s.classList.add('completed');
        const icon = s.querySelector('.step-icon');
        if (icon) { icon.innerHTML = checkSVG; icon.classList.remove('pulse'); }
        const bar = s.querySelector('.bar-fill');
        if (bar) bar.style.width = '100%';
      });

    const s5el = document.querySelector('.step[data-step="05"]');
    if (s5el) { s5el.classList.remove('pending'); s5el.classList.add('active'); }

    // 2. Fade workspace
    const canvasEl = document.getElementById('step-canvas-content');
    const rightEl  = document.getElementById('right-panel-content');
    if (canvasEl) canvasEl.classList.add('fade-out');
    if (rightEl)  rightEl.classList.add('fade-out');

    // 3. Dismiss overlay, render step 5
    setTimeout(() => {
      if (overlay) overlay.classList.add('ao-exit');
      setTimeout(() => {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);

        currentStep = 5;
        updatePsbStep(5);
        const data = STEPS[5];
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
            postRender(5);
          }));
        }
      }, 480);
    }, 360);
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

  // ── STEP 3 — Block reveal + wave canvas + interactions ──
  function runStep3BlockReveal() {
    const blocks = document.querySelectorAll('.dt-block');
    const countEl = document.getElementById('dtBlockCount');

    // Stagger each block in
    blocks.forEach((block, i) => {
      block.style.cssText += ';opacity:0;transform:translateY(14px) scale(0.98)';
      setTimeout(() => {
        block.style.transition = 'opacity 0.38s cubic-bezier(0.22,1,0.36,1), transform 0.38s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, box-shadow 0.2s';
        block.style.opacity   = '1';
        block.style.transform = 'translateY(0) scale(1)';
        // update counter
        if (countEl) countEl.textContent = (i + 1) + ' / ' + blocks.length + ' blocks active';
      }, 120 + i * 110);
    });

    // Animate numeric bar fills after reveal
    setTimeout(() => {
      document.querySelectorAll('.dt-num-fill, .dt-dl-fill').forEach(el => {
        const w = el.style.width;
        el.style.width = '0';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.transition = 'width 0.7s cubic-bezier(0.4,0,0.2,1)';
          el.style.width = w;
        }));
      });
    }, 400);

    // Draw wave canvas for block 03
    setTimeout(() => drawWaveCanvas(), 500);

    // ── Block detail data ──────────────────────
    const blockData = [
      {
        name:    'Tone Intensity',
        source:  'Emotional Tone · AI Analysis (p.4, 7, 22)',
        type:    'Numeric  ·  Range: 0.0 → 1.0  ·  Value: 0.72',
        origin:  'Derived from frequency and weight of calm/deliberate language patterns across 62-page corpus. Weighted above urgency signals per collaborator annotation.',
        visual:  ['Ambient light level (0.72 = dim warmth)', 'Material opacity on surface layers', 'Glow intensity on accent planes', 'Fog/haze density in transition zones'],
        physical:['Ceiling illumination circuit dimming', 'Fritted glass opacity setting', 'LED strip brightness on wayfinding', 'Indirect cove light output level'],
        color:   'var(--accent-b)',
      },
      {
        name:    'Reflective Behaviour',
        source:  'Reflective Surface Potential · AI Analysis (9× frequency)',
        type:    'Spatial  ·  Axes: Absorb / Reflect / Emit',
        origin:  '"Reflective" is the highest-frequency spatial descriptor in the source document (9 occurrences across 9 distinct pages). Indicates a core material language requirement.',
        visual:  ['Surface shader: reflection coefficient', 'Environment map contribution weight', 'Screen-space reflection intensity', 'Mirror / polished material assignment'],
        physical:['Polished stone or terrazzo specification', 'Brushed stainless steel panel', 'Low-iron glass with anti-reflective coating', 'Water feature surface tension design'],
        color:   'var(--accent-a)',
      },
      {
        name:    'Light Rhythm',
        source:  'Spatial Rhythm · AI Analysis',
        type:    'Temporal  ·  Period: 8.4s  ·  Amplitude: 0.28  ·  Curve: Sine',
        origin:  "Translated from the brand's \"slow and elongated cadence\" — generous negative space as a design gesture. Light modulates at human breath-rate, not mechanical pulse.",
        visual:  ['Keyframe timing curve for light animations', 'Fade in / fade out duration on transitions', 'Particle system emission interval', 'Video loop cycle length'],
        physical:['DMX scene transition time (8.4s)', 'HVAC airflow oscillation cycle', 'Water fountain arc timing', 'Kinetic facade panel movement rate'],
        color:   'var(--accent-d)',
      },
      {
        name:    'Colour Temperature',
        source:  'Colour Mood · AI Analysis',
        type:    'Visual  ·  Warm: 2700K–3200K  ·  Cool: 5500K–6000K',
        origin:  'Warm earth tones (68%) converted to incandescent–halogen Kelvin range for primary volumes. Cool accents (22%) mapped to daylight-equivalent temperature for threshold moments.',
        visual:  ['White balance target for 3D render engine', 'Emissive material colour shift', 'Post-process colour grading LUT', 'Sky dome colour temperature'],
        physical:['Warm LED lamp specification (2700K CRI90+)', 'Cool accent lamp (5500K linear)', 'Daylight sensor tuning target', 'Facade cladding reflectance value'],
        color:   '#E8A740',
      },
      {
        name:    'Surface Response',
        source:  'Material Feeling · AI Analysis',
        type:    'Spatial  ·  Tactility: 0.84  ·  Reflectivity: 0.22',
        origin:  'Brand resists gloss and spectacle. High tactility index (0.84) from recurring material references to linen, stone, brushed timber. Low reflectivity preserves weight without heaviness.',
        visual:  ['Roughness value in PBR material graph', 'Normal map intensity setting', 'Micro-surface detail texture blend', 'Anisotropic highlight spread'],
        physical:['Surface finish: fine-honed or brushed', 'Anti-slip texture coefficient spec', 'Tactile paving strip specification', 'Acoustic panel surface texture class'],
        color:   'var(--green)',
      },
      {
        name:    'Spatial Depth Index',
        source:  'Spatial Rhythm · AI Analysis',
        type:    'Numeric  ·  FG: 0.85  ·  MG: 0.55  ·  BG: 0.30',
        origin:  'Three-layer stratification derived from the "considered stillness" brand character. Depth is expressed through graduated recession, not visual complexity. Each layer has distinct material weight.',
        visual:  ['Depth-of-field focus plane weighting', 'Layer parallax factor in motion graphics', 'Z-depth fog density curve', 'Render layer compositing opacity'],
        physical:['Foreground: dense/tactile (reception surfaces)', 'Midground: transitional material (corridors)', 'Background: recessive/quiet (far walls)', 'Layered lighting plan zone budget'],
        color:   'var(--accent-d)',
      },
    ];

    // ── Block click → show detail in right panel ──
    blocks.forEach((block, i) => {
      block.addEventListener('click', (e) => {
        // Don't fire if clicking Edit/Link
        if (e.target.closest('.dt-act-btn')) return;

        const wasSelected = block.classList.contains('dt-b-selected');
        blocks.forEach(b => b.classList.remove('dt-b-selected'));

        const rightEl = document.getElementById('right-panel-content');
        if (!rightEl) return;

        if (wasSelected) {
          // Deselect — restore default right panel
          restoreDefaultRightPanel(rightEl);
        } else {
          block.classList.add('dt-b-selected');
          showBlockDetail(rightEl, blockData[i], i);
        }
      });
    });

    // Edit / Link button micro-interactions
    document.querySelectorAll('.dt-act-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (btn.textContent === 'Edit') {
          btn.textContent = 'Editing…';
          btn.classList.add('dt-act-editing');
          setTimeout(() => { btn.textContent = 'Edit'; btn.classList.remove('dt-act-editing'); }, 1800);
        } else if (btn.textContent === 'Link') {
          btn.textContent = 'Linked ↗';
          btn.classList.add('dt-act-linked');
        }
      });
    });

    // View toggle
    const gridBtn = document.getElementById('dtViewGrid');
    const listBtn = document.getElementById('dtViewList');
    const grid    = document.getElementById('dtBlocksGrid');
    if (gridBtn && listBtn && grid) {
      gridBtn.addEventListener('click', () => {
        grid.classList.remove('dt-list-view');
        gridBtn.classList.add('dt-vt-active');
        listBtn.classList.remove('dt-vt-active');
      });
      listBtn.addEventListener('click', () => {
        grid.classList.add('dt-list-view');
        listBtn.classList.add('dt-vt-active');
        gridBtn.classList.remove('dt-vt-active');
      });
    }

    // Open Visual Workspace button
    const openBtn = document.getElementById('dtOpenBtn');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        openBtn.disabled = true;
        openBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="spin-icon"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4" stroke-dasharray="10 8"/></svg> Launching workspace…`;
        setTimeout(() => showVisualWorkspaceOverlay(), 480);
      });
    }
  }

  function drawWaveCanvas() {
    const canvas = document.getElementById('dtWaveCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let phase = 0;

    function frame() {
      if (!document.getElementById('dtWaveCanvas')) return;
      ctx.clearRect(0, 0, W, H);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= W; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke();

      // Fill below wave
      ctx.beginPath();
      ctx.moveTo(0, H/2);
      for (let x = 0; x <= W; x++) {
        const y = H/2 + Math.sin((x / W) * Math.PI * 2.5 + phase) * (H * 0.35);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(140,127,168,0.25)');
      grad.addColorStop(1, 'rgba(140,127,168,0.03)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Wave line
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const y = H/2 + Math.sin((x / W) * Math.PI * 2.5 + phase) * (H * 0.35);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(140,127,168,0.75)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Moving dot at wave crest
      const dotX = ((phase / (Math.PI * 2)) % 1) * W;
      const dotY = H/2 + Math.sin((dotX / W) * Math.PI * 2.5 + phase) * (H * 0.35);
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,169,126,0.9)';
      ctx.fill();
      // dot glow
      ctx.beginPath();
      ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,169,126,0.12)';
      ctx.fill();

      phase += 0.012;
      requestAnimationFrame(frame);
    }
    frame();
  }

  // ── STEP 3 — Block detail panel ─────────────
  function showBlockDetail(rightEl, data, idx) {
    // Fade out current content
    rightEl.style.transition = 'opacity 0.18s ease';
    rightEl.style.opacity = '0';

    setTimeout(() => {
      rightEl.innerHTML = buildDetailHTML(data, idx);
      rightEl.style.opacity = '1';

      // Wire close button
      const closeBtn = rightEl.querySelector('#dtDetailClose');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          // Deselect all blocks
          document.querySelectorAll('.dt-block').forEach(b => b.classList.remove('dt-b-selected'));
          restoreDefaultRightPanel(rightEl);
        });
      }

      // Wire apply button
      const applyBtn = rightEl.querySelector('#dtDetailApply');
      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          applyBtn.textContent = '✓ Applied to output';
          applyBtn.style.background = 'rgba(76,175,125,0.15)';
          applyBtn.style.borderColor = 'rgba(76,175,125,0.4)';
          applyBtn.style.color = 'var(--green)';
          applyBtn.disabled = true;
        });
      }
    }, 180);
  }

  function restoreDefaultRightPanel(rightEl) {
    rightEl.style.transition = 'opacity 0.18s ease';
    rightEl.style.opacity = '0';
    setTimeout(() => {
      const data = STEPS[3];
      if (data) rightEl.innerHTML = data.rightHTML();
      rightEl.style.opacity = '1';
    }, 180);
  }

  function buildDetailHTML(d, idx) {
    const typeColorMap = {
      'Numeric':  'var(--accent-b)',
      'Spatial':  'var(--accent-a)',
      'Temporal': 'var(--accent-d)',
      'Visual':   '#E8A740',
    };
    const typeKey = d.type.split('  ·')[0].trim();
    const typeColor = typeColorMap[typeKey] || 'var(--text-sec)';

    const visualItems  = d.visual.map(v  => `<div class="dtd-output-item dtd-out-vis"><span class="dtd-out-dot"></span>${v}</div>`).join('');
    const physicalItems= d.physical.map(p => `<div class="dtd-output-item dtd-out-phy"><span class="dtd-out-dot"></span>${p}</div>`).join('');

    return `
      <div class="dtd-panel">

        <!-- Header -->
        <div class="dtd-header">
          <div class="dtd-header-left">
            <div class="dtd-block-num">Block ${String(idx + 1).padStart(2,'0')}</div>
            <div class="dtd-name">${d.name}</div>
          </div>
          <button class="dtd-close" id="dtDetailClose" title="Back to summary">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Type + origin badge row -->
        <div class="dtd-meta-row">
          <span class="dtd-type-pill" style="color:${typeColor};border-color:${typeColor}40;background:${typeColor}12">${typeKey}</span>
          <span class="dtd-type-detail">${d.type.replace(typeKey + '  ·  ','')}</span>
        </div>

        <div class="dtd-divider"></div>

        <!-- Source -->
        <div class="dtd-section">
          <div class="dtd-section-label">SOURCE</div>
          <div class="dtd-source-chip">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="var(--accent-b)" stroke-width="1"/><circle cx="5.5" cy="5.5" r="1.5" fill="var(--accent-b)" opacity="0.5"/></svg>
            ${d.source}
          </div>
        </div>

        <!-- Origin explanation -->
        <div class="dtd-section">
          <div class="dtd-section-label">DERIVATION</div>
          <div class="dtd-origin-text">${d.origin}</div>
        </div>

        <div class="dtd-divider"></div>

        <!-- Visual outputs -->
        <div class="dtd-section">
          <div class="dtd-section-label dtd-label-vis">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><rect x="0.5" y="0.5" width="8" height="8" rx="1" stroke="var(--accent-d)" stroke-width="1"/></svg>
            VISUAL OUTPUTS
          </div>
          <div class="dtd-output-list">
            ${visualItems}
          </div>
        </div>

        <!-- Physical outputs -->
        <div class="dtd-section">
          <div class="dtd-section-label dtd-label-phy">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><circle cx="4.5" cy="4.5" r="4" stroke="var(--accent-a)" stroke-width="1"/></svg>
            PHYSICAL OUTPUTS
          </div>
          <div class="dtd-output-list">
            ${physicalItems}
          </div>
        </div>

        <div class="dtd-divider"></div>

        <!-- Apply action -->
        <button class="dtd-apply-btn" id="dtDetailApply">Apply to Output Mapping</button>

      </div>
    `;
  }

  // ── STEP 4 — Mapping canvas orchestration ───
  function runStep4MappingCanvas() {

    // Stagger node entrance
    const nodes = document.querySelectorAll('.vom-node');
    nodes.forEach((n, i) => {
      n.style.cssText += ';opacity:0;transform:translateY(10px)';
      setTimeout(() => {
        n.style.transition = 'opacity 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, box-shadow 0.2s';
        n.style.opacity   = '1';
        n.style.transform = 'translateY(0)';
      }, 80 + i * 70);
    });

    // Draw SVG connection lines after nodes appear
    setTimeout(() => drawVomConnections(), 800);

    // Animate right-panel progress bars
    setTimeout(() => {
      animVomBar('vomRpFill1', 66);
      animVomBar('vomRpFill2', 100);
      animVomBar('vomRpFill3', 33);
    }, 400);

    // Particle preview canvas (Col B node 2)
    setTimeout(() => drawVomParticles(), 900);

    // Screen rhythm canvas (Col B node 3)
    setTimeout(() => drawVomScreenRhythm(), 900);

    // Node hover: highlight connected lines
    document.querySelectorAll('.vom-node').forEach(node => {
      node.addEventListener('mouseenter', () => {
        if (!document.querySelector('.vom-settings-panel')) {
          highlightNodeConnections(node.dataset.node, true);
        }
      });
      node.addEventListener('mouseleave', () => {
        if (!document.querySelector('.vom-settings-panel')) {
          highlightNodeConnections(node.dataset.node, false);
        }
      });
      node.addEventListener('click', (e) => {
        // Don't fire on port clicks
        if (e.target.closest('.vom-n-port')) return;

        const nodeId  = node.dataset.node;
        const col     = node.dataset.col;
        const isVisual   = node.classList.contains('vom-node-visual');
        const isPhysical = node.classList.contains('vom-node-physical');

        // Only B and C columns get the settings panel
        if (!isVisual && !isPhysical) return;

        const wasActive = node.classList.contains('vom-node-active');
        document.querySelectorAll('.vom-node').forEach(n => n.classList.remove('vom-node-active'));
        closeVomSettings();

        if (!wasActive) {
          node.classList.add('vom-node-active');
          openVomSettings(nodeId, node);
        }
      });
    });

    // Auto-layout btn
    const autoBtn = document.getElementById('vomAutoLayout');
    if (autoBtn) {
      autoBtn.addEventListener('click', () => {
        autoBtn.textContent = '✓ Laid out';
        autoBtn.style.color = 'var(--green)';
        setTimeout(() => { autoBtn.textContent = 'Auto-layout'; autoBtn.style.color = ''; }, 1800);
      });
    }

    // Clear links btn
    const clearBtn = document.getElementById('vomClearLinks');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const svg = document.getElementById('vomSvg');
        if (svg) {
          const paths = svg.querySelectorAll('.vom-conn-line');
          paths.forEach(p => { p.style.opacity = '0'; });
          setTimeout(() => paths.forEach(p => svg.removeChild(p)), 300);
        }
      });
    }

    // Send to Simulation button
    const simBtn = document.getElementById('vomSimBtn');
    if (simBtn) {
      simBtn.addEventListener('click', () => {
        simBtn.disabled = true;
        simBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="spin-icon"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4" stroke-dasharray="10 8"/></svg> Compiling scene…`;
        setTimeout(() => showSimulationOverlay(), 500);
      });
    }
  }

  // Connection data: [fromNode, toNode, label]
  const VOM_CONNECTIONS = [
    ['tone',    'gradient',  'Tone Intensity → Light Gradient'],
    ['rhythm',  'gradient',  'Light Rhythm → Gradient Timing'],
    ['reflect', 'particles', 'Reflective Behaviour → Particles'],
    ['temp',    'particles', 'Colour Temperature → Particle Hue'],
    ['rhythm',  'screen',    'Light Rhythm → Screen Motion'],
    ['gradient','spotlight', 'Light Gradient → Spotlight DMX'],
    ['particles','mirror',   'Particle Field → Mirror Angle'],
    ['screen',  'projection','Screen Rhythm → Projection Wall'],
    ['depth',   'spotlight', 'Spatial Depth → Spotlight Z'],
    ['surface', 'projection','Surface Response → Wall Texture'],
  ];

  function drawVomConnections() {
    const svg     = document.getElementById('vomSvg');
    const canvas  = document.getElementById('vomCanvas');
    if (!svg || !canvas) return;
    const cvRect = canvas.getBoundingClientRect();

    const getPortPos = (nodeId, side) => {
      const port = document.querySelector(`.vom-n-port-${side}[data-${side === 'out' ? 'from' : 'to'}="${nodeId}"]`);
      if (!port) return null;
      const r = port.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - cvRect.left,
        y: r.top  + r.height / 2 - cvRect.top,
      };
    };

    VOM_CONNECTIONS.forEach(([from, to, label], idx) => {
      const p1 = getPortPos(from, 'out');
      const p2 = getPortPos(to,   'in');
      if (!p1 || !p2) return;

      const dx = (p2.x - p1.x) * 0.45;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = `M ${p1.x} ${p1.y} C ${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${p2.x} ${p2.y}`;
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'rgba(107,191,181,0.28)');
      path.setAttribute('stroke-width', '1.2');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('marker-end', 'url(#vom-arrow)');
      path.setAttribute('class', 'vom-conn-line');
      path.setAttribute('data-from', from);
      path.setAttribute('data-to',   to);
      path.style.opacity = '0';
      path.style.transition = 'opacity 0.4s ease, stroke 0.25s ease, stroke-width 0.25s ease';
      svg.appendChild(path);

      // Stagger line appearance
      setTimeout(() => { path.style.opacity = '1'; }, idx * 80);
    });
  }

  function highlightNodeConnections(nodeId, on) {
    document.querySelectorAll('.vom-conn-line').forEach(line => {
      const fromMatch = line.dataset.from === nodeId;
      const toMatch   = line.dataset.to   === nodeId;
      if (fromMatch || toMatch) {
        line.setAttribute('stroke', on ? 'rgba(200,169,126,0.75)' : 'rgba(107,191,181,0.28)');
        line.setAttribute('stroke-width', on ? '2' : '1.2');
      } else {
        line.style.opacity = on ? '0.2' : '1';
      }
    });
  }

  function animVomBar(id, pct) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.width = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = 'width 0.7s cubic-bezier(0.4,0,0.2,1)';
      el.style.width = pct + '%';
    }));
  }

  function drawVomParticles() {
    const wrap = document.getElementById('vomParticlePreview');
    if (!wrap) return;
    const canvas = document.createElement('canvas');
    canvas.width  = wrap.offsetWidth  || 80;
    canvas.height = wrap.offsetHeight || 48;
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    wrap.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const pts = Array.from({length:18}, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
      r: .6 + Math.random() * 1.2,
    }));
    (function tick() {
      if (!canvas.parentNode) return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(200,169,126,0.7)'; ctx.fill();
      });
      requestAnimationFrame(tick);
    })();
  }

  function drawVomScreenRhythm() {
    const wrap = document.getElementById('vomScreenPreview');
    if (!wrap) return;
    const canvas = document.createElement('canvas');
    canvas.width  = wrap.offsetWidth  || 80;
    canvas.height = wrap.offsetHeight || 48;
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    wrap.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let phase = 0;
    (function tick() {
      if (!canvas.parentNode) return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.beginPath();
      for (let x=0; x<=canvas.width; x++) {
        const y = canvas.height/2 + Math.sin((x/canvas.width)*Math.PI*2 + phase) * (canvas.height*.32);
        x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.strokeStyle = 'rgba(140,127,168,0.65)';
      ctx.lineWidth = 1.2; ctx.stroke();
      phase += 0.018;
      requestAnimationFrame(tick);
    })();
  }

  // ── STEP 4 — Module settings panel ─────────

  // Module configuration schemas
  const VOM_MODULE_CONFIG = {
    gradient: {
      label:  'Light Gradient Animation',
      type:   'Visual Output',
      color:  'var(--accent-d)',
      source: 'Tone Intensity + Light Rhythm',
      fields: [
        { id:'grd-intensity', label:'Intensity',       kind:'slider',   value:72, min:0, max:100, unit:'%',   hint:'Overall luminance output' },
        { id:'grd-speed',     label:'Cycle Speed',     kind:'slider',   value:58, min:0, max:100, unit:'%',   hint:'Maps to Light Rhythm 8.4s' },
        { id:'grd-warmcool',  label:'Warm / Cool Mix', kind:'slider',   value:68, min:0, max:100, unit:'%',   hint:'68% warm from Colour Mood' },
        { id:'grd-blend',     label:'Blend Mode',      kind:'dropdown', value:'Additive', options:['Additive','Screen','Overlay','Soft Light'], hint:'Composite blend operation' },
        { id:'grd-response',  label:'Response Mode',   kind:'dropdown', value:'Ambient', options:['Ambient','Reactive','Pulsed','Static'], hint:'How output responds to input' },
        { id:'grd-smooth',    label:'Smoothing',       kind:'toggle',   value:true,  hint:'Anti-flicker smoothing' },
        { id:'grd-loop',      label:'Loop',            kind:'toggle',   value:true,  hint:'Continuous animation loop' },
      ],
    },
    particles: {
      label:  'Reflective Particle Field',
      type:   'Visual Output',
      color:  'var(--accent-a)',
      source: 'Reflective Behaviour + Colour Temperature',
      fields: [
        { id:'prt-density',   label:'Scatter Density',  kind:'slider',   value:85, min:0, max:100, unit:'%',   hint:'Particle count per m²' },
        { id:'prt-drift',     label:'Drift Speed',      kind:'slider',   value:34, min:0, max:100, unit:'%',   hint:'Ambient float velocity' },
        { id:'prt-size',      label:'Particle Size',    kind:'slider',   value:48, min:0, max:100, unit:'%',   hint:'Mean radius' },
        { id:'prt-reflect',   label:'Reflectivity',     kind:'slider',   value:82, min:0, max:100, unit:'%',   hint:'Mirror-like quality 0.82' },
        { id:'prt-response',  label:'Response Mode',    kind:'dropdown', value:'Presence', options:['Presence','Wind','Music','Static'], hint:'What drives particle motion' },
        { id:'prt-hue',       label:'Hue Lock',         kind:'dropdown', value:'Warm Sand', options:['Warm Sand','Cool Teal','Neutral','Multi'], hint:'Colour palette constraint' },
        { id:'prt-fade',      label:'Edge Fade',        kind:'toggle',   value:true,  hint:'Soft boundary falloff' },
        { id:'prt-depth',     label:'Z-Depth',          kind:'toggle',   value:false, hint:'3D particle depth sorting' },
      ],
    },
    screen: {
      label:  'Screen Motion Rhythm',
      type:   'Visual Output',
      color:  'var(--accent-d)',
      source: 'Light Rhythm',
      fields: [
        { id:'scr-intensity', label:'Motion Intensity',  kind:'slider',   value:42, min:0, max:100, unit:'%',   hint:'Amplitude of oscillation' },
        { id:'scr-period',    label:'Period',            kind:'slider',   value:63, min:0, max:100, unit:'%',   hint:'8.4s sine mapped to 63%' },
        { id:'scr-opacity',   label:'Content Opacity',   kind:'slider',   value:55, min:0, max:100, unit:'%',   hint:'UI element transparency' },
        { id:'scr-curve',     label:'Easing Curve',      kind:'dropdown', value:'Sine', options:['Sine','Ease In Out','Linear','Bounce'], hint:'Rhythm interpolation type' },
        { id:'scr-response',  label:'Response Mode',     kind:'dropdown', value:'Continuous', options:['Continuous','Trigger','Idle','Beat'], hint:'Motion playback mode' },
        { id:'scr-pause',     label:'Pause on Presence', kind:'toggle',   value:true,  hint:'Occupancy sensor integration' },
        { id:'scr-invert',    label:'Invert Phase',      kind:'toggle',   value:false, hint:'Mirror rhythm waveform' },
      ],
    },
    spotlight: {
      label:  'Adjustable Spotlight',
      type:   'Physical Object',
      color:  'var(--accent-a)',
      source: 'Light Gradient Animation + Spatial Depth Index',
      fields: [
        { id:'spl-intensity', label:'Intensity',         kind:'slider',   value:72, min:0, max:100, unit:'%',   hint:'DMX channel 1 output' },
        { id:'spl-angle',     label:'Beam Angle',        kind:'slider',   value:38, min:0, max:100, unit:'°',   hint:'Spread: 5°–40° motorised' },
        { id:'spl-tilt',      label:'Tilt',              kind:'slider',   value:60, min:0, max:100, unit:'°',   hint:'Vertical aim 0°–90°' },
        { id:'spl-pan',       label:'Pan',               kind:'slider',   value:50, min:0, max:100, unit:'°',   hint:'Horizontal aim 0°–360°' },
        { id:'spl-kelvin',    label:'Colour Temperature',kind:'dropdown', value:'2900K', options:['2700K','2900K','3200K','4000K','5600K'], hint:'Warm kelvin from Colour Mood' },
        { id:'spl-response',  label:'Response Mode',     kind:'dropdown', value:'Reactive', options:['Static','Reactive','Follow','Ambient'], hint:'Occupancy-linked behaviour' },
        { id:'spl-flicker',   label:'Anti-Flicker',      kind:'toggle',   value:true,  hint:'DALI HF driver mode' },
        { id:'spl-track',     label:'Object Tracking',   kind:'toggle',   value:false, hint:'Vision-AI position tracking' },
      ],
    },
    mirror: {
      label:  'Kinetic Mirror Panel',
      type:   'Physical Object',
      color:  'var(--accent-b)',
      source: 'Reflective Particle Field + Reflective Behaviour',
      fields: [
        { id:'mir-angle',     label:'Panel Angle',       kind:'slider',   value:45, min:0, max:100, unit:'°',   hint:'Current servo position' },
        { id:'mir-speed',     label:'Movement Speed',    kind:'slider',   value:28, min:0, max:100, unit:'%',   hint:'Servo travel rate' },
        { id:'mir-range',     label:'Arc Range',         kind:'slider',   value:72, min:0, max:100, unit:'%',   hint:'Total sweep: 0–180°' },
        { id:'mir-damp',      label:'Damping',           kind:'slider',   value:60, min:0, max:100, unit:'%',   hint:'Inertia simulation' },
        { id:'mir-response',  label:'Response Mode',     kind:'dropdown', value:'Flow', options:['Flow','Presence','Rhythm','Fixed'], hint:'What drives the motion' },
        { id:'mir-coat',      label:'Mirror Coating',    kind:'dropdown', value:'Low-Iron', options:['Standard','Low-Iron','Bronze','Smoked'], hint:'Reflective surface type' },
        { id:'mir-power',     label:'Servo Enable',      kind:'toggle',   value:true,  hint:'Actuator power state' },
        { id:'mir-reset',     label:'Auto-Home',         kind:'toggle',   value:true,  hint:'Return to 0° on idle' },
      ],
    },
    projection: {
      label:  'Projection Wall',
      type:   'Physical Object',
      color:  'var(--accent-d)',
      source: 'Screen Motion Rhythm + Surface Response',
      fields: [
        { id:'prj-brightness',label:'Brightness',        kind:'slider',   value:78, min:0, max:100, unit:'%',   hint:'Projector lumen output' },
        { id:'prj-contrast',  label:'Contrast',          kind:'slider',   value:65, min:0, max:100, unit:'%',   hint:'Dynamic range setting' },
        { id:'prj-tone',      label:'Tone Shift',        kind:'slider',   value:55, min:0, max:100, unit:'%',   hint:'Warm–cool colour shift' },
        { id:'prj-scale',     label:'Content Scale',     kind:'slider',   value:82, min:0, max:100, unit:'%',   hint:'Fill vs. letterbox' },
        { id:'prj-response',  label:'Response Mode',     kind:'dropdown', value:'Tone-Responsive', options:['Tone-Responsive','Static','Ambient','Beat-Sync'], hint:'Content adaptation logic' },
        { id:'prj-surface',   label:'Surface Material',  kind:'dropdown', value:'Matte White', options:['Matte White','Brushed Concrete','Linen','Textured Stone'], hint:'Projection surface treatment' },
        { id:'prj-daylight',  label:'Daylight Adjust',   kind:'toggle',   value:true,  hint:'Auto-compensate ambient light' },
        { id:'prj-blend',     label:'Edge Blend',        kind:'toggle',   value:false, hint:'Multi-projector overlap zone' },
      ],
    },
  };

  let activeVomPanel = null;

  function openVomSettings(nodeId, nodeEl) {
    const cfg = VOM_MODULE_CONFIG[nodeId];
    if (!cfg) return;

    activeVomPanel = nodeId;
    highlightNodeConnections(nodeId, true);

    // Build panel
    const panel = document.createElement('div');
    panel.id        = 'vomSettingsPanel';
    panel.className = 'vom-settings-panel';
    panel.innerHTML = buildSettingsPanelHTML(cfg, nodeId);

    // Insert after vom-canvas
    const canvas = document.getElementById('vomCanvas');
    if (canvas && canvas.parentNode) {
      canvas.parentNode.insertBefore(panel, canvas.nextSibling);
    }

    // Animate in
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('vom-sp-visible')));

    // Wire close button
    panel.querySelector('#vomSpClose').addEventListener('click', () => {
      document.querySelectorAll('.vom-node').forEach(n => n.classList.remove('vom-node-active'));
      closeVomSettings();
      highlightNodeConnections(nodeId, false);
    });

    // Wire all sliders for live feedback
    panel.querySelectorAll('.vom-sp-slider').forEach(slider => {
      const valueEl = panel.querySelector('[data-for="' + slider.id + '"]');
      slider.addEventListener('input', () => {
        if (valueEl) valueEl.textContent = slider.value + slider.dataset.unit;
      });
    });

    // Wire all toggles
    panel.querySelectorAll('.vom-sp-toggle-track').forEach(track => {
      track.addEventListener('click', () => {
        const input = track.previousElementSibling;
        if (input && input.type === 'checkbox') {
          input.checked = !input.checked;
          track.classList.toggle('vom-toggle-on', input.checked);
          track.querySelector('.vom-sp-toggle-thumb').style.transform =
            input.checked ? 'translateX(14px)' : 'translateX(0)';
        }
      });
    });

    // Wire apply
    panel.querySelector('#vomSpApply').addEventListener('click', () => {
      const btn = panel.querySelector('#vomSpApply');
      btn.textContent = '✓ Settings applied';
      btn.style.background = 'rgba(76,175,125,0.15)';
      btn.style.borderColor = 'rgba(76,175,125,0.4)';
      btn.style.color = 'var(--green)';
      btn.disabled = true;
    });

    // Wire reset
    const resetBtn = panel.querySelector('#vomSpReset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        // Re-render panel with original values
        const applyBtn = panel.querySelector('#vomSpApply');
        if (applyBtn) { applyBtn.textContent = 'Apply settings'; applyBtn.style = ''; applyBtn.disabled = false; }
        cfg.fields.forEach(f => {
          if (f.kind === 'slider') {
            const el = panel.querySelector('#' + f.id);
            const valEl = panel.querySelector('[data-for="' + f.id + '"]');
            if (el) el.value = f.value;
            if (valEl) valEl.textContent = f.value + f.unit;
          }
          if (f.kind === 'toggle') {
            const track = panel.querySelector('#' + f.id + ' + .vom-sp-toggle-track') ||
                          panel.querySelector('[id="' + f.id + '"]')?.nextElementSibling;
            if (track) {
              track.classList.toggle('vom-toggle-on', f.value);
              const thumb = track.querySelector('.vom-sp-toggle-thumb');
              if (thumb) thumb.style.transform = f.value ? 'translateX(14px)' : 'translateX(0)';
            }
          }
        });
        resetBtn.textContent = '↺ Reset';
        setTimeout(() => { resetBtn.textContent = 'Reset to defaults'; }, 1200);
      });
    }
  }

  function closeVomSettings() {
    const panel = document.getElementById('vomSettingsPanel');
    if (!panel) return;
    panel.classList.remove('vom-sp-visible');
    panel.classList.add('vom-sp-exit');
    setTimeout(() => { if (panel.parentNode) panel.parentNode.removeChild(panel); }, 280);
    activeVomPanel = null;
  }

  function buildSettingsPanelHTML(cfg, nodeId) {
    const typeColor = cfg.color;

    const fieldsHTML = cfg.fields.map(f => {
      if (f.kind === 'slider') {
        return `
          <div class="vom-sp-field">
            <div class="vom-sp-field-header">
              <label class="vom-sp-label">${f.label}</label>
              <span class="vom-sp-value" data-for="${f.id}">${f.value}${f.unit}</span>
            </div>
            <input
              type="range" id="${f.id}"
              class="vom-sp-slider"
              min="${f.min}" max="${f.max}" value="${f.value}"
              data-unit="${f.unit}"
            />
            <div class="vom-sp-hint">${f.hint}</div>
          </div>`;
      }
      if (f.kind === 'dropdown') {
        const opts = f.options.map(o =>
          `<option value="${o}"${o === f.value ? ' selected' : ''}>${o}</option>`
        ).join('');
        return `
          <div class="vom-sp-field">
            <label class="vom-sp-label">${f.label}</label>
            <select class="vom-sp-select" id="${f.id}">${opts}</select>
            <div class="vom-sp-hint">${f.hint}</div>
          </div>`;
      }
      if (f.kind === 'toggle') {
        return `
          <div class="vom-sp-field vom-sp-field-toggle">
            <div class="vom-sp-toggle-wrap">
              <label class="vom-sp-label">${f.label}</label>
              <div class="vom-sp-hint vom-hint-inline">${f.hint}</div>
            </div>
            <div class="vom-sp-toggle-control">
              <input type="checkbox" id="${f.id}" ${f.value ? 'checked' : ''} style="display:none"/>
              <div class="vom-sp-toggle-track ${f.value ? 'vom-toggle-on' : ''}">
                <div class="vom-sp-toggle-thumb" style="transform:translateX(${f.value ? '14' : '0'}px)"></div>
              </div>
            </div>
          </div>`;
      }
      return '';
    }).join('');

    return `
      <div class="vom-sp-inner">
        <div class="vom-sp-header">
          <div class="vom-sp-header-left">
            <div class="vom-sp-type-pill" style="color:${typeColor};border-color:${typeColor}30;background:${typeColor}12">${cfg.type}</div>
            <div class="vom-sp-title">${cfg.label}</div>
          </div>
          <button class="vom-sp-close" id="vomSpClose" title="Close settings">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="vom-sp-source">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><circle cx="4.5" cy="4.5" r="4" stroke="var(--text-muted)" stroke-width="1"/></svg>
          <span>Linked source: <b>${cfg.source}</b></span>
        </div>
        <div class="vom-sp-fields-grid" id="vomSpFields">
          ${fieldsHTML}
        </div>
        <div class="vom-sp-footer">
          <button class="vom-sp-reset" id="vomSpReset">Reset to defaults</button>
          <button class="vom-sp-apply" id="vomSpApply">Apply settings</button>
        </div>
      </div>
    `;
  }

  // ── STEP 5 — Live Simulation Engine ────────
  let simState = 'stopped'; // stopped | playing | paused
  let simRafId = null;
  let simTimerInterval = null;
  let simElapsed = 0;

  function runStep5Simulation() {
    // FPS counter
    let fps = 60;
    const fpsEl = document.getElementById('lsFpsVal');
    setInterval(() => {
      if (!document.getElementById('lsFpsVal')) return;
      fps = 58 + Math.floor(Math.random() * 4);
      if (fpsEl) fpsEl.textContent = fps;
    }, 1200);

    // Projection wall miniature canvas
    drawLsProjectionMini();

    // Control bar wiring
    const playBtn   = document.getElementById('lsPlayBtn');
    const pauseBtn  = document.getElementById('lsPauseBtn');
    const replayBtn = document.getElementById('lsReplayBtn');
    const gridBtn   = document.getElementById('lsGridBtn');
    const scene     = document.getElementById('lsScene');

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (simState === 'playing') {
          pauseSim();
        } else {
          startSim();
        }
      });
    }
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        if (simState === 'playing') pauseSim();
        else if (simState === 'paused') startSim();
      });
    }
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        stopSim();
        showReplayOverlay();
      });
    }
    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        const floor = document.querySelector('.ls-grid-floor');
        if (floor) floor.classList.toggle('ls-grid-hidden');
        gridBtn.classList.toggle('ls-btn-active');
      });
    }
  }

  function startSim() {
    if (simState === 'playing') return;
    simState = 'playing';

    // Update state panel
    updateSimStatePanel('playing');
    updateCtrlBtns('playing');

    // Spotlight animation
    animateSpotlight();

    // Mirror panel animation
    animateMirror();

    // Projection wall animation
    animateProjection();

    // Timer
    simTimerInterval = setInterval(() => {
      simElapsed++;
      updateTimecode(simElapsed);
    }, 1000);

    // Live readout updates
    startLiveReadouts();
    // Remove paused indicator if resuming
    const scene = document.getElementById('lsScene');
    if (scene) scene.classList.remove('ls-scene-paused');
  }

  function pauseSim() {
    if (simState !== 'playing') return;
    simState = 'paused';
    updateSimStatePanel('paused');
    updateCtrlBtns('paused');
    if (simTimerInterval) clearInterval(simTimerInterval);
    // Visual paused indicator on scene
    const scene = document.getElementById('lsScene');
    if (scene) scene.classList.add('ls-scene-paused');
  }

  function stopSim() {
    simState = 'stopped';
    simElapsed = 0;
    updateTimecode(0);
    updateSimStatePanel('stopped');
    updateCtrlBtns('stopped');
    if (simTimerInterval) clearInterval(simTimerInterval);
    // Reset spotlight
    const head = document.getElementById('lsSpHead');
    if (head) head.style.cssText = '';
  }

  function updateCtrlBtns(state) {
    const playBtn  = document.getElementById('lsPlayBtn');
    const pauseBtn = document.getElementById('lsPauseBtn');
    if (!playBtn) return;

    if (state === 'playing') {
      // Play btn becomes a Pause indicator
      playBtn.classList.remove('ls-btn-play', 'ls-btn-stopped');
      playBtn.classList.add('ls-btn-playing');
      playBtn.innerHTML = `
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <rect x="1.5" y="1" width="3" height="9" rx="1" fill="currentColor"/>
          <rect x="6.5" y="1" width="3" height="9" rx="1" fill="currentColor"/>
        </svg> Pause`;
      if (pauseBtn) {
        pauseBtn.classList.add('ls-btn-pause-active');
        pauseBtn.textContent = '⏸ Pause';
      }
    } else if (state === 'paused') {
      // Play btn resumes
      playBtn.classList.remove('ls-btn-playing', 'ls-btn-stopped');
      playBtn.classList.add('ls-btn-play');
      playBtn.innerHTML = `
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <polygon points="2,1 10,5.5 2,10" fill="currentColor"/>
        </svg> Resume`;
      if (pauseBtn) pauseBtn.classList.remove('ls-btn-pause-active');
    } else {
      // Stopped — restore original Play label
      playBtn.classList.add('ls-btn-play');
      playBtn.classList.remove('ls-btn-playing', 'ls-btn-stopped');
      playBtn.innerHTML = `
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <polygon points="2,1 10,5.5 2,10" fill="currentColor"/>
        </svg> Play Simulation`;
      if (pauseBtn) pauseBtn.classList.remove('ls-btn-pause-active');
    }
  }

  function updateSimStatePanel(state) {
    const label = document.getElementById('lsRpStateLabel');
    const sub   = document.getElementById('lsRpStateSub');
    const dot   = document.getElementById('lsRpStateDot');
    const icon  = document.getElementById('lsRpStateIcon');
    const tc    = document.getElementById('lsRpTc');

    const stateMap = {
      playing: { label:'Live — Running', sub:'Simulation active · all outputs streaming', dotClass:'ls-dot-live' },
      paused:  { label:'Paused',         sub:'Outputs frozen · resume when ready',         dotClass:'ls-dot-pause' },
      stopped: { label:'Standby',        sub:'Press Play to begin',                         dotClass:'' },
    };
    const s = stateMap[state];
    if (label) label.textContent = s.label;
    if (sub)   sub.textContent   = s.sub;
    if (dot) {
      dot.className = 'ls-rp-state-dot';
      if (s.dotClass) dot.classList.add(s.dotClass);
    }
  }

  function updateTimecode(secs) {
    const h = String(Math.floor(secs / 3600)).padStart(2,'0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2,'0');
    const s = String(secs % 60).padStart(2,'0');
    const tc = `${h}:${m}:${s}`;
    const rpTc   = document.getElementById('lsRpTc');
    const badge  = document.getElementById('lsTimeBadge');
    const mStr   = String(Math.floor(secs / 60)).padStart(2,'0');
    const sStr   = String(secs % 60).padStart(2,'0');
    if (rpTc)  rpTc.textContent  = tc;
    if (badge) badge.textContent = mStr + ':' + sStr;
  }

  // ── Spotlight animation ──
  function animateSpotlight() {
    const head  = document.getElementById('lsSpHead');
    const beam  = document.getElementById('lsSpBeam');
    const scene = document.getElementById('lsScene');
    const angleEl = document.getElementById('lsOsSpAngle');
    const intEl   = document.getElementById('lsOsSpInt');
    const rpoEl   = document.getElementById('lsRpoDmxVal');
    if (!head) return;

    let t = 0;
    const period = 8400; // 8.4s in ms

    function tick() {
      if (simState !== 'playing') return;
      if (!document.getElementById('lsSpHead')) return;
      t = (t + 16) % period;
      const phase = t / period; // 0–1
      const angle = Math.sin(phase * Math.PI * 2) * 28; // ±28 deg swing
      const intensity = 0.55 + Math.sin(phase * Math.PI * 2 + 0.5) * 0.22;

      // Pan the head
      head.style.transform = `rotate(${angle}deg)`;
      head.style.transition = 'transform 0.1s linear';

      // Beam opacity
      if (beam) beam.style.opacity = intensity.toFixed(2);

      // Update readouts
      if (angleEl) angleEl.textContent = Math.abs(Math.round(angle)) + '°';
      const intPct = Math.round(intensity * 100);
      if (intEl)  intEl.textContent  = intPct + '%';
      if (rpoEl)  rpoEl.textContent  = intPct + '%';

      // Update tone readout
      const toneEl = document.getElementById('lsRoToneVal');
      if (toneEl) toneEl.textContent = intensity.toFixed(2);

      // Apply warm/cool scene tint via CSS variable
      const warmPct = Math.round(60 + Math.sin(phase * Math.PI * 2) * 20);
      if (scene) scene.style.setProperty('--ls-warm-pct', warmPct + '%');

      simRafId = requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── Mirror animation ──
  function animateMirror() {
    const panel    = document.getElementById('lsMirrorPanel');
    const surface  = document.getElementById('lsMpSurface');
    const reflect  = document.getElementById('lsMpReflection');
    const angleEl  = document.getElementById('lsOsMpAngle');
    const rpoAngle = document.getElementById('lsRpoMirrorAngle');
    if (!panel) return;

    let t2 = 0;
    function tick() {
      if (simState !== 'playing') return;
      if (!document.getElementById('lsMirrorPanel')) return;
      t2 = (t2 + 14) % 8400;
      const phase = t2 / 8400;
      const tilt  = Math.sin(phase * Math.PI * 2 + 1.0) * 18; // ±18 deg

      if (surface) surface.style.transform = `rotateY(${tilt}deg)`;
      // Update reflection brightness based on tilt
      if (reflect) reflect.style.opacity = (0.3 + Math.abs(tilt / 18) * 0.5).toFixed(2);

      const deg = Math.round(45 + tilt);
      if (angleEl)  angleEl.textContent  = deg + '°';
      if (rpoAngle) rpoAngle.textContent = deg + '°';

      const reflectEl = document.getElementById('lsRoReflectVal');
      if (reflectEl) reflectEl.textContent = (0.5 + Math.abs(tilt/18) * 0.45).toFixed(2);

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── Projection animation ──
  function animateProjection() {
    const wall = document.getElementById('lsProjectionWall');
    const content = document.getElementById('lsPwContent');
    if (!content) return;

    let t3 = 0;
    function tick() {
      if (simState !== 'playing') return;
      if (!document.getElementById('lsProjectionWall')) return;
      t3 = (t3 + 18) % 8400;
      const phase = t3 / 8400;
      const warm  = Math.round(68 + Math.sin(phase * Math.PI * 2) * 18);
      const cool  = 100 - warm;

      content.style.background = `linear-gradient(
        ${130 + Math.sin(phase * Math.PI) * 30}deg,
        rgba(200,169,126,${(warm/100 * 0.25).toFixed(2)}) ${warm - 20}%,
        rgba(107,191,181,${(cool/100 * 0.2).toFixed(2)}) ${warm + 20}%
      )`;

      const tempEl = document.getElementById('lsOsPwTemp');
      if (tempEl) tempEl.textContent = (2.7 + (warm/100) * 0.8).toFixed(1) + 'K';

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── Live readout fluctuation ──
  function startLiveReadouts() {
    const rhythmEl = document.getElementById('lsRoRhythmVal');
    let rhythmPhase = 0;
    const rhythmInterval = setInterval(() => {
      if (simState !== 'playing') { clearInterval(rhythmInterval); return; }
      if (!document.getElementById('lsRoRhythmVal')) { clearInterval(rhythmInterval); return; }
      rhythmPhase = (rhythmPhase + 0.05) % (Math.PI * 2);
      const bpm = (8.4 + Math.sin(rhythmPhase) * 0.6).toFixed(1);
      if (rhythmEl) rhythmEl.textContent = bpm + 's';
    }, 200);
  }

  // ── Projection mini canvas ──
  function drawLsProjectionMini() {
    const canvas = document.getElementById('lsOsPwCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let p = 0;
    (function tick() {
      if (!document.getElementById('lsOsPwCanvas')) return;
      ctx.clearRect(0,0,60,40);
      // Animated gradient wash
      const grd = ctx.createLinearGradient(0,0,60,40);
      grd.addColorStop(0, `rgba(200,169,126,${0.15 + Math.sin(p)*0.1})`);
      grd.addColorStop(1, `rgba(107,191,181,${0.1 + Math.cos(p)*0.08})`);
      ctx.fillStyle = grd;
      ctx.fillRect(0,0,60,40);
      // Sine wave
      ctx.beginPath();
      for (let x=0; x<=60; x++) {
        const y = 20 + Math.sin((x/60)*Math.PI*2 + p) * 10;
        x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.strokeStyle = 'rgba(140,127,168,0.55)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      p += 0.022;
      requestAnimationFrame(tick);
    })();
  }

  // ── REPLAY FLOW OVERLAY — Step 5 → Step 1 ──
  function showReplayOverlay() {
    // Dim the entire workspace briefly, then navigate to step 1
    const overlay = document.createElement('div');
    overlay.id = 'replayOverlay';
    overlay.innerHTML = `
      <div class="rpo-inner">
        <div class="rpo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="var(--accent-a)" stroke-width="1.5" opacity="0.4"/>
            <path d="M21 10A9 9 0 1 1 11 25" stroke="var(--accent-a)" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M21 6v5h-5" stroke="var(--accent-a)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="rpo-label">Returning to start</div>
        <div class="rpo-sub">Resetting to Import Branding Guidance</div>
        <div class="rpo-bar"><div class="rpo-bar-fill" id="rpoBarFill"></div></div>
      </div>
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.classList.add('rpo-visible');
      // Animate the bar
      const fill = document.getElementById('rpoBarFill');
      setTimeout(() => { if (fill) fill.style.width = '100%'; }, 60);
    }));

    setTimeout(() => {
      overlay.classList.add('rpo-exit');
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 400);
    }, 1100);

    // Navigate after the bar completes
    setTimeout(() => navigateToStep1(), 900);
  }

  function navigateToStep1() {
    const checkSVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    // Reset all sidebar steps to original visual state
    const allSteps = document.querySelectorAll('.workflow-steps .step');
    allSteps.forEach(s => {
      s.classList.remove('active', 'completed');
      s.classList.add('pending');
      const icon = s.querySelector('.step-icon');
      if (icon) {
        icon.classList.remove('pulse');
        // Restore original icons per step
        const stepNum = s.dataset.step;
        const icons = {
          '01': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v8M3 6l4 4 4-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          '02': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7h4M7 5v4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
          '03': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2"/></svg>`,
          '04': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2"/></svg>`,
          '05': `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="3,2 11,7 3,12" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>`,
        };
        icon.innerHTML = icons[stepNum] || '';
      }
      const bar = s.querySelector('.bar-fill');
      if (bar) bar.style.width = '0%';
    });

    // Activate step 1
    const s1 = document.querySelector('.step[data-step="01"]');
    if (s1) {
      s1.classList.remove('pending', 'completed');
      s1.classList.add('active');
      const bar = s1.querySelector('.bar-fill');
      if (bar) bar.style.width = '0%';
    }

    // Fade panels and render step 1
    const canvasEl = document.getElementById('step-canvas-content');
    const rightEl  = document.getElementById('right-panel-content');
    if (canvasEl) canvasEl.classList.add('fade-out');
    if (rightEl)  rightEl.classList.add('fade-out');

    setTimeout(() => {
      currentStep = 1;
      updatePsbStep(1);
      const data = STEPS[1];
      if (!data) return;

      const badge   = document.querySelector('.workspace-badge');
      const titleEl = document.querySelector('.workspace-title');
      if (canvasEl) canvasEl.innerHTML = data.canvasHTML();
      if (rightEl)  rightEl.innerHTML  = data.rightHTML();
      if (badge)    badge.textContent  = data.badge;
      if (titleEl)  titleEl.textContent = data.title;

      canvasEl.classList.remove('fade-out');
      canvasEl.classList.add('fade-in');
      if (rightEl) rightEl.classList.remove('fade-out');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        canvasEl.classList.remove('fade-in');
        postRender(1);
      }));
    }, 250);
  }

  // ── PSB step indicator sync ──────────────────
  function updatePsbStep(num) {
    const el = document.getElementById('psbStepIndicator');
    if (!el) return;
    el.textContent = String(num).padStart(2,'0') + ' / 05';
    // Accent colour per step
    const colors = { 1:'var(--accent-a)', 2:'var(--accent-b)', 3:'var(--accent-d)', 4:'var(--accent-a)', 5:'var(--green)' };
    el.style.color = colors[num] || 'var(--text-sec)';
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

    // ── Step 5 — Live simulation ─────────────────
    if (num === 5) {
      runStep5Simulation();
    }

    // ── Step 4 — Mapping canvas ──────────────────
    if (num === 4) {
      runStep4MappingCanvas();
    }

    // ── Step 3 — Data blocks reveal ─────────────
    if (num === 3) {
      runStep3BlockReveal();
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

  // ═══════════════════════════════════════════════
  // PLUGIN DRAWER
  // ═══════════════════════════════════════════════

  const PLUGINS = [
    {
      id: 'branding-analysis',
      name: 'Branding Analysis Plugin',
      author: 'Synesthetic Labs',
      version: '1.8.2',
      latestVersion: '1.9.0',
      category: 'Analysis',
      color: 'var(--accent-b)',
      status: 'installed',
      hasUpdate: true,
      desc: 'Deep-parses brand identity documents using NLP to extract tone vectors, keyword clusters, and spatial intent signals. Powers the AI Analysis workflow step.',
      capabilities: ['PDF deep-parse', 'Keyword extraction (NLP)', 'Tone vector mapping', 'Spatial intent scoring'],
      size: '4.2 MB',
      lastUpdated: '3 days ago',
    },
    {
      id: 'visual-mapping',
      name: 'Visual Mapping Pack',
      author: 'Synesthetic Labs',
      version: '2.3.1',
      latestVersion: '2.3.1',
      category: 'Mapping',
      color: 'var(--accent-d)',
      status: 'installed',
      hasUpdate: false,
      desc: 'Provides the visual output module library for the mapping canvas — including light gradient animation, particle field, and screen motion rhythm generators.',
      capabilities: ['Light gradient animation', 'Reflective particle field', 'Screen motion rhythm', 'Visual output preview'],
      size: '8.7 MB',
      lastUpdated: '1 week ago',
    },
    {
      id: 'spatial-output',
      name: 'Spatial Output Pack',
      author: 'Synesthetic Labs',
      version: '1.9.4',
      latestVersion: '1.9.4',
      category: 'Output',
      color: 'var(--accent-a)',
      status: 'installed',
      hasUpdate: false,
      desc: 'Connects physical object modules to real-world control systems: DMX lighting controllers, servo actuators for kinetic surfaces, and projection mapping engines.',
      capabilities: ['DMX controller bridge', 'Servo actuator protocol', 'Projection mapping output', 'Spatial rule export'],
      size: '11.3 MB',
      lastUpdated: '2 weeks ago',
    },
    {
      id: 'ai-insight-branding',
      name: 'AI Insight Pack for Branding',
      author: 'Pattern Intelligence Co.',
      version: '0.7.1',
      latestVersion: '0.7.1',
      category: 'AI',
      color: '#E8A740',
      status: 'available',
      hasUpdate: false,
      desc: 'Extends brand analysis with generative insight — suggests spatial material pairings, colour temperature zones, and experiential narratives based on brand archetype detection.',
      capabilities: ['Brand archetype detection', 'Material suggestion engine', 'Narrative generation', 'Archetype scoring'],
      size: '6.1 MB',
      lastUpdated: null,
    },
    {
      id: 'env-behaviour',
      name: 'Environmental Behaviour Pack',
      author: 'Atelier Spatial',
      version: '1.2.0',
      latestVersion: '1.2.0',
      category: 'Simulation',
      color: 'var(--green)',
      status: 'available',
      hasUpdate: false,
      desc: 'Adds occupancy-responsive behaviour rules to the simulation — visitors influence light levels, mirror angles, and projection content in real-time based on position and dwell time.',
      capabilities: ['Occupancy detection rules', 'Visitor tracking input', 'Dwell time analysis', 'Real-time spatial response'],
      size: '9.4 MB',
      lastUpdated: null,
    },
    {
      id: 'temporal-mapper',
      name: 'Temporal Mapper',
      author: 'Synesthetic Labs',
      version: '1.4.2',
      latestVersion: '1.4.2',
      category: 'Mapping',
      color: 'var(--accent-d)',
      status: 'installed',
      hasUpdate: false,
      desc: 'Handles time-based data block translation — converts brand rhythm parameters into temporal keyframe curves for lighting, projection, and servo control.',
      capabilities: ['Keyframe curve generation', 'Sine/ease rhythm export', 'DMX scene timing', 'Loop control'],
      size: '3.8 MB',
      lastUpdated: '5 days ago',
    },
    {
      id: 'xr-viewer',
      name: 'XR Preview Viewer',
      author: 'Immersive Tools GmbH',
      version: '0.9.3',
      latestVersion: '0.9.3',
      category: 'Preview',
      color: '#D95A3C',
      status: 'available',
      hasUpdate: false,
      desc: 'Stream the live simulation to a headset or spatial display device for in-situ spatial review. Supports Quest 3, Vision Pro, and HoloLens 2.',
      capabilities: ['Headset streaming', 'Spatial anchoring', 'Collaborative viewing', 'Export to XR bundle'],
      size: '22.1 MB',
      lastUpdated: null,
    },
  ];

  let pdActiveTab    = 'browse';
  let pdActiveFilter = 'all';
  let pdSearchQuery  = '';
  let pdInstallingId = null;

  function initPluginDrawer() {
    const openBtn  = document.getElementById('openPluginDrawer');
    const closeBtn = document.getElementById('closePluginDrawer');
    const backdrop = document.getElementById('pluginDrawerBackdrop');

    if (openBtn)  openBtn.addEventListener('click',  openPluginDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closePluginDrawer);
    if (backdrop) backdrop.addEventListener('click', closePluginDrawer);

    // Also wire plugin tags in the summary bar
    document.querySelectorAll('.psb-plugin-tag').forEach(tag => {
      tag.addEventListener('click', openPluginDrawer);
      tag.style.cursor = 'pointer';
    });

    // Tabs
    document.querySelectorAll('.pd-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pd-tab').forEach(t => t.classList.remove('pd-tab-active'));
        tab.classList.add('pd-tab-active');
        pdActiveTab = tab.dataset.tab;
        renderPluginList();
      });
    });

    // Filter pills
    document.querySelectorAll('.pd-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.pd-pill').forEach(p => p.classList.remove('pd-pill-active'));
        pill.classList.add('pd-pill-active');
        pdActiveFilter = pill.dataset.filter;
        renderPluginList();
      });
    });

    // Search
    const searchEl = document.getElementById('pdSearch');
    if (searchEl) {
      searchEl.addEventListener('input', () => {
        pdSearchQuery = searchEl.value.trim().toLowerCase();
        renderPluginList();
      });
    }

    // Update all button
    const updateAllBtn = document.getElementById('pdUpdateAll');
    if (updateAllBtn) {
      updateAllBtn.addEventListener('click', () => {
        updateAllBtn.textContent = '✓ Up to date';
        updateAllBtn.disabled = true;
        const plugin = PLUGINS.find(p => p.hasUpdate);
        if (plugin) {
          plugin.version = plugin.latestVersion;
          plugin.hasUpdate = false;
        }
        setTimeout(renderPluginList, 200);
      });
    }

    renderPluginList();
  }

  function openPluginDrawer() {
    const drawer   = document.getElementById('pluginDrawer');
    const backdrop = document.getElementById('pluginDrawerBackdrop');
    if (drawer)   { drawer.classList.add('pd-open');   drawer.setAttribute('aria-hidden', 'false'); }
    if (backdrop) backdrop.classList.add('pd-open');
    document.body.classList.add('pd-body-open');
  }

  function closePluginDrawer() {
    const drawer   = document.getElementById('pluginDrawer');
    const backdrop = document.getElementById('pluginDrawerBackdrop');
    if (drawer)   { drawer.classList.remove('pd-open'); drawer.setAttribute('aria-hidden', 'true'); }
    if (backdrop) backdrop.classList.remove('pd-open');
    document.body.classList.remove('pd-body-open');
  }

  function renderPluginList() {
    const body = document.getElementById('pdBody');
    if (!body) return;

    let filtered = PLUGINS.filter(p => {
      if (pdActiveTab === 'installed' && p.status !== 'installed') return false;
      if (pdActiveTab === 'updates'   && !p.hasUpdate)             return false;
      if (pdActiveFilter === 'installed' && p.status !== 'installed') return false;
      if (pdActiveFilter === 'available' && p.status !== 'available') return false;
      if (pdSearchQuery && !p.name.toLowerCase().includes(pdSearchQuery) &&
          !p.desc.toLowerCase().includes(pdSearchQuery) &&
          !p.category.toLowerCase().includes(pdSearchQuery)) return false;
      return true;
    });

    if (filtered.length === 0) {
      body.innerHTML = `<div class="pd-empty"><div class="pd-empty-icon">⊘</div><div class="pd-empty-text">No plugins found</div></div>`;
      return;
    }

    // Group by category
    const groups = {};
    filtered.forEach(p => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });

    body.innerHTML = Object.entries(groups).map(([cat, plugins]) => `
      <div class="pd-group">
        <div class="pd-group-label">${cat.toUpperCase()}</div>
        ${plugins.map(p => buildPluginCard(p)).join('')}
      </div>
    `).join('');

    // Wire card buttons
    body.querySelectorAll('.pd-card-action-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id     = btn.dataset.id;
        const action = btn.dataset.action;
        handlePluginAction(id, action);
      });
    });

    // Wire card expand
    body.querySelectorAll('.pd-card').forEach(card => {
      card.addEventListener('click', () => {
        const wasOpen = card.classList.contains('pd-card-open');
        body.querySelectorAll('.pd-card').forEach(c => c.classList.remove('pd-card-open'));
        if (!wasOpen) card.classList.add('pd-card-open');
      });
    });
  }

  function buildPluginCard(p) {
    const statusLabel = p.status === 'installed' ? 'Installed' : 'Available';
    const statusClass = p.status === 'installed' ? 'pd-status-installed' : 'pd-status-available';
    const actionLabel = p.status === 'installed'
      ? (p.hasUpdate ? 'Update' : 'Configure')
      : 'Install';
    const actionClass = p.status === 'installed'
      ? (p.hasUpdate ? 'pd-act-update' : 'pd-act-config')
      : 'pd-act-install';

    const caps = p.capabilities.slice(0,3).map(c =>
      `<span class="pd-cap">${c}</span>`
    ).join('');

    return `
      <div class="pd-card" data-plugin-id="${p.id}">
        <div class="pd-card-main">
          <div class="pd-card-icon" style="border-color:${p.color}30;background:${p.color}12">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="12" height="12" rx="2" stroke="${p.color}" stroke-width="1.2"/>
              <path d="M4 7h6M7 4v6" stroke="${p.color}" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
            </svg>
          </div>
          <div class="pd-card-info">
            <div class="pd-card-name-row">
              <div class="pd-card-name">${p.name}</div>
              ${p.hasUpdate ? `<span class="pd-update-badge">Update</span>` : ''}
              <span class="pd-status-badge ${statusClass}">${statusLabel}</span>
            </div>
            <div class="pd-card-meta">
              <span>${p.author}</span>
              <span class="pd-meta-sep">·</span>
              <span>v${p.version}</span>
              <span class="pd-meta-sep">·</span>
              <span class="pd-cat-tag" style="color:${p.color}">${p.category}</span>
            </div>
            <div class="pd-card-desc">${p.desc}</div>
          </div>
          <button class="pd-card-action-btn ${actionClass}" data-id="${p.id}" data-action="${p.status === 'installed' ? (p.hasUpdate ? 'update' : 'configure') : 'install'}">
            ${actionLabel}
          </button>
        </div>
        <div class="pd-card-expanded">
          <div class="pd-exp-section">
            <div class="pd-exp-label">Capabilities</div>
            <div class="pd-caps-row">${caps}</div>
          </div>
          <div class="pd-exp-section">
            <div class="pd-exp-label">Details</div>
            <div class="pd-exp-details">
              <span>Size: <b>${p.size}</b></span>
              ${p.lastUpdated ? `<span>Updated: <b>${p.lastUpdated}</b></span>` : ''}
              ${p.hasUpdate ? `<span class="pd-exp-new-ver">New version: <b>v${p.latestVersion}</b></span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function handlePluginAction(id, action) {
    const plugin = PLUGINS.find(p => p.id === id);
    if (!plugin) return;

    const btn = document.querySelector(`.pd-card-action-btn[data-id="${id}"]`);
    if (!btn) return;

    if (action === 'install') {
      btn.textContent = 'Installing…';
      btn.disabled = true;
      btn.classList.add('pd-act-busy');
      setTimeout(() => {
        plugin.status = 'installed';
        plugin.lastUpdated = 'just now';
        const countEl = document.getElementById('pdInstalledCount');
        if (countEl) countEl.textContent = PLUGINS.filter(p => p.status === 'installed').length;
        renderPluginList();
        // Flash the footer stat
        const footerStat = document.querySelector('.pd-footer-left');
        if (footerStat) {
          const installed = PLUGINS.filter(p => p.status === 'installed').length;
          const available = PLUGINS.filter(p => p.status === 'available').length;
          footerStat.children[0].textContent = installed + ' installed';
          footerStat.children[2].textContent = available + ' available';
        }
      }, 1800);
    } else if (action === 'update') {
      btn.textContent = 'Updating…';
      btn.disabled = true;
      btn.classList.add('pd-act-busy');
      setTimeout(() => {
        plugin.version = plugin.latestVersion;
        plugin.hasUpdate = false;
        renderPluginList();
      }, 1600);
    } else if (action === 'configure') {
      btn.textContent = '✓ Configured';
      btn.style.color = 'var(--green)';
      setTimeout(() => {
        btn.textContent = 'Configure';
        btn.style.color = '';
      }, 1800);
    }
  }

  // Boot plugin drawer
  initPluginDrawer();


});