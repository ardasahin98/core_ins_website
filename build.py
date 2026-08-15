"""Generates the static HTML pages.

You do NOT need this to run the site — the .html files it produces are the
site. It exists so the shared header, footer and <head> stay identical across
every page. Run `python3 build.py` after editing the templates below.
"""
import os

OUT = os.path.dirname(os.path.abspath(__file__))

NAV = [("/sectors", "Sectors"), ("/instruments", "Instruments"),
       ("/services", "Services"), ("/platform", "Platform"), ("/about", "Company")]

LOGO_DEFS = """<defs>
      <linearGradient id="gS" x1="0.15" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="#6B8695"/><stop offset="1" stop-color="#22333C"/></linearGradient>
      <linearGradient id="gM" x1="0.15" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="#C4762A"/><stop offset="1" stop-color="#8A4412"/></linearGradient>
      <linearGradient id="gE" x1="0.15" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="#F79A38"/><stop offset="1" stop-color="#D25A10"/></linearGradient>
      <radialGradient id="gC" cx="38%" cy="32%" r="76%"><stop offset="0" stop-color="#FFF3C4"/><stop offset="0.5" stop-color="#FFDD80"/><stop offset="1" stop-color="#F5A21E"/></radialGradient>
    </defs>"""

def logo(size=38, defs=True, animate=False):
    cls = ' class="draw-arc"' if animate else ''
    st = (' style="--len:440"', ' style="--len:283"', ' style="--len:152"') if animate else ('', '', '')
    return f"""<svg viewBox="0 0 200 200" width="{size}" height="{size}" role="img" aria-label="CORE">
    {LOGO_DEFS if defs else ''}
    <path d="M 172.74 58.00 A 84 84 0 1 0 172.74 142.00" fill="none" stroke="url(#gS)" stroke-width="22"{cls}{st[0]}/>
    <path d="M 145.60 69.24 A 55 55 0 1 0 145.60 130.76" fill="none" stroke="url(#gM)" stroke-width="20"{cls}{st[1]}/>
    <path d="M 123.64 81.53 A 30 30 0 1 0 123.64 118.47" fill="none" stroke="url(#gE)" stroke-width="16"{cls}{st[2]}/>
    <circle cx="100" cy="100" r="11" fill="url(#gC)"/>
  </svg>"""

def head(title, desc, page):
    full = title if title == "CORE Instrumentation &amp; Monitoring" else f"{title} &middot; CORE Instrumentation &amp; Monitoring"
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{full}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{full}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<link rel="icon" href="/brand/core-favicon.svg" type="image/svg+xml">
<link rel="icon" href="/brand/core-favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/brand/core-apple-touch-180.png">
<meta name="theme-color" content="#16242C">
<link rel="stylesheet" href="/assets/core.css">
<script src="/assets/firebase-config.js"></script>
<script src="/assets/data.js"></script>
<script src="/assets/firestore.js"></script>
<script src="/assets/core.js" defer></script>
</head>
<body data-page="{page}">
<a class="skip" href="#main">Skip to content</a>
<div class="notice" id="placeholder-notice" hidden>
  Showing placeholder content &mdash; Firebase is not connected yet. Fill in
  <code>assets/firebase-config.js</code>.
</div>"""

def header(active=""):
    def one(href, label):
        cur = ' aria-current="page"' if href == active else ''
        return '<a href="%s"%s>%s</a>' % (href, cur, label)
    links = "".join(one(h, l) for h, l in NAV)
    mlinks = "".join(f'<a href="{href}">{label}</a>' for href, label in NAV)
    return f"""
<header class="site">
  <div class="hdr">
    <a class="brand" href="/">{logo(38)}
      <span class="txt"><b>CORE</b><small>Instrumentation &amp; Monitoring</small></span>
    </a>
    <nav class="main">{links}</nav>
    <div class="btns">
      <a class="btn btn-ghost" data-platform target="_blank" rel="noopener">Platform login</a>
      <a class="btn btn-ember" href="/contact">Request a quote</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-label="Menu">
        <span></span><span></span><span></span></button>
    </div>
  </div>
  <nav class="mobile">{mlinks}<a data-platform target="_blank" rel="noopener"
    style="color:var(--ember-text);font-weight:500">Platform login &rarr;</a></nav>
</header>
<main id="main">"""

FOOTER = """</main>
<footer class="site">
  <div class="fgrid">
    <div>
      <div class="brand" style="color:#fff">""" + logo(40, defs=False) + """
        <span class="txt"><b>CORE</b><small style="color:#8FA3AD">Instrumentation &amp; Monitoring</small></span>
      </div>
      <p class="about">Geotechnical and structural instrumentation across North and South
        America. Part of <span style="color:#C3D0D7">[PARENT COMPANY NAME]</span>, Ankara.</p>
      <a class="btn btn-outline-dark" data-platform target="_blank" rel="noopener"
        style="margin-top:24px">Platform login &rarr;</a>
    </div>
    <div><h4>Sectors</h4><ul>
      <li><a href="/sector?s=dams">Dams &amp; Reservoirs</a></li>
      <li><a href="/sector?s=tailings">Mining &amp; Tailings</a></li>
      <li><a href="/sector?s=tunnels">Tunnels &amp; Underground</a></li>
      <li><a href="/sector?s=excavations">Deep Excavations</a></li>
      <li><a href="/sector?s=bridges">Bridges &amp; Structures</a></li>
      <li><a href="/sector?s=slopes">Slopes &amp; Landslides</a></li></ul></div>
    <div><h4>What we do</h4><ul>
      <li><a href="/instruments">Instruments</a></li>
      <li><a href="/services">Services</a></li>
      <li><a href="/platform">Monitoring platform</a></li>
      <li><a href="/projects">Projects</a></li></ul></div>
    <div><h4>Company</h4><ul>
      <li><a href="/about">About CORE</a></li>
      <li><a href="/about#team">Team</a></li>
      <li><a href="/about#values">Core values</a></li>
      <li><a href="/contact">Contact</a></li></ul></div>
  </div>
  <div class="fbottom">
    <span>&copy; 2026 CORE Instrumentation &amp; Monitoring. All rights reserved.</span>
    <span class="links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a>
      <a href="/accessibility">Accessibility</a></span>
  </div>
</footer>
</body>
</html>
"""

def page(filename, title, desc, page_id, body, active=""):
    html = head(title, desc, page_id) + header(active) + body + FOOTER
    with open(os.path.join(OUT, filename), "w") as f:
        f.write(html)

def banner(crumbs, eyebrow, h1, lead, extra=""):
    return f"""
<section class="banner">
  <div class="wrap">
    <p class="crumbs">{crumbs}</p>
    <p class="eb">{eyebrow}</p>
    <h1>{h1}</h1>
    <p class="lead">{lead}</p>
    {extra}
  </div>
</section>"""

CTA = """
<section class="pad">
  <div class="wrap">
    <div class="cta reveal">
      <p class="eb">Start here</p>
      <h2>Send us the spec and we will tell you what it needs</h2>
      <p>A drawing, a bill of quantities, or two lines about the problem &mdash; whichever you
        have. We will come back with a scheme and a price.</p>
      <a class="btn btn-ember btn-lg" href="/contact" style="margin-top:36px">Request a quote</a>
    </div>
  </div>
</section>"""

# ---------------------------------------------------------------- home
HERO_SVG = """
<svg viewBox="0 0 520 460" id="xsec" aria-label="Instrumented ground cross-section">
  <defs>
    <linearGradient id="hc" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#44606E"/><stop offset="1" stop-color="#2A414C"/></linearGradient>
    <linearGradient id="hm" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#8A5A28"/><stop offset="1" stop-color="#6B3F14"/></linearGradient>
    <linearGradient id="hd" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#B85E17"/><stop offset="1" stop-color="#8A4412"/></linearGradient>
    <radialGradient id="hk" cx="40%" cy="34%" r="70%"><stop offset="0" stop-color="#FFE9AE"/><stop offset="1" stop-color="#E07A16"/></radialGradient>
  </defs>
  <g class="L1"><path d="M20 120 Q 150 96 268 116 T 500 108 L500 176 L20 186 Z" fill="url(#hc)"/></g>
  <g class="L2"><path d="M20 186 L500 176 L500 268 Q 300 292 20 272 Z" fill="url(#hm)"/></g>
  <g class="L3"><path d="M20 272 Q 300 292 500 268 L500 380 Q 260 410 20 372 Z" fill="url(#hd)"/></g>
  <g class="L4">
    <line x1="186" y1="96" x2="186" y2="366" stroke="#0E1A20" stroke-width="9" stroke-linecap="round" opacity=".55"/>
    <line x1="186" y1="96" x2="186" y2="366" stroke="#FFDD80" stroke-width="1.6" opacity=".75"/>
    NODES
  </g>
  <g class="L1">
    <rect x="150" y="66" width="72" height="34" rx="6" fill="#1B2C35" stroke="#3E5661" stroke-width="1.5"/>
    <circle cx="163" cy="83" r="3" fill="#35A66E"/>
    <text x="174" y="87" fill="#8FA3AD" font-size="10">LOGGER</text>
    <line x1="222" y1="83" x2="300" y2="83" stroke="#3E5661" stroke-width="1.5" stroke-dasharray="4 5"/>
    <text x="308" y="87" fill="#7C919B" font-size="10">4G &rarr; platform</text>
  </g>
</svg>"""
NODES = "".join(f"""
    <g><circle cx="186" cy="{y}" r="9" fill="url(#hk)" opacity=".22"/>
    <circle cx="186" cy="{y}" r="4.6" fill="#FFDD80" stroke="#B85E17" stroke-width="1.4"/>
    <line x1="196" y1="{y}" x2="238" y2="{y}" stroke="#FFDD80" stroke-width="1" opacity=".45" stroke-dasharray="3 4"/>
    <text x="246" y="{y + 4}" fill="#C3D0D7" font-size="11">{d}</text></g>"""
    for y, d in ((150, "&minus;4.0 m"), (214, "&minus;12.5 m"), (278, "&minus;21.0 m"), (342, "&minus;29.5 m")))
HERO_SVG = HERO_SVG.replace("NODES", NODES)

TREND_SVG = """
<svg viewBox="0 0 440 190" style="width:100%;margin-top:20px" aria-label="Pore pressure trend against trigger levels">
  <line x1="0" y1="46" x2="440" y2="46" stroke="#E05A57" stroke-width="1" stroke-dasharray="5 5" opacity=".75"/>
  <text x="4" y="40" fill="#E05A57" font-size="10">Action 320 kPa</text>
  <line x1="0" y1="86" x2="440" y2="86" stroke="#D9A017" stroke-width="1" stroke-dasharray="5 5" opacity=".75"/>
  <text x="4" y="80" fill="#D9A017" font-size="10">Alert 280 kPa</text>
  <polyline points="0,168 44,162 88,158 132,150 176,146 220,138 264,142 308,130 352,126 396,120 440,116"
    fill="none" stroke="#4A9BD1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="440" cy="116" r="4" fill="#4A9BD1"/>
</svg>"""

home_body = f"""
<section class="hero">
  <div class="hero-grid">
    <div>
      <p class="eyebrow"><i></i>North &amp; South America</p>
      <h1>We measure what the<br>ground is doing<span style="color:var(--ember-light)">.</span></h1>
      <p class="lead">Geotechnical and structural instrumentation for dams, tailings facilities,
        tunnels and deep excavations &mdash; designed, installed and monitored by one team,
        with the data on your screen instead of in a filing cabinet.</p>
      <div class="btns">
        <a class="btn btn-ember btn-lg" href="/contact">Request a quote</a>
        <a class="btn btn-outline-dark btn-lg" href="/sectors">See our sectors</a>
      </div>
      <p class="parent">Part of <b>[PARENT COMPANY NAME]</b>, Ankara &mdash;
        [XX] years and [XXX] projects behind us.</p>
    </div>
    <div style="position:relative">{HERO_SVG}</div>
  </div>
</section>

<section class="pad">
  <div class="wrap">
    <div class="head reveal">
      <div><p class="eb">Where we work</p>
        <h2>Six sectors, one discipline</h2>
        <p>Every one of these is the same problem in a different shape: know what is moving,
          know how fast, and know before it matters. Open a sector to see the projects behind it.</p>
      </div>
      <a class="tlink" href="/sectors">All sectors &rarr;</a>
    </div>
    <div class="grid3" id="home-sectors"></div>
  </div>
</section>

<section class="pad white">
  <div class="wrap split">
    <div class="reveal">
      <p class="eb">End to end</p>
      <h2>One team from the plan to the 3am alarm</h2>
      <p style="margin-top:20px;font-size:16.5px;line-height:1.65;color:var(--ink-2)">
        Most instrumentation problems happen at the handover between suppliers &mdash; the sensor
        is fine, the installation is fine, and nobody owns the number. We do all of it, so there
        is one phone call when something moves.</p>
      <div class="btns" style="margin-top:32px">
        <a class="btn btn-dark btn-lg" href="/services">Our services</a>
        <a class="btn btn-outline-light btn-lg" href="/instruments">Browse instruments</a>
      </div>
    </div>
    <div class="rows" id="home-services"></div>
  </div>
</section>

<section class="pad dark">
  <div class="wrap split" style="align-items:center">
    <div class="reveal">
      <p class="eb">The platform</p>
      <h2 style="color:#fff">Your readings, live, with the thresholds already drawn</h2>
      <p class="lead" style="margin-top:20px;font-size:16.5px;line-height:1.65">
        Every instrument we install reports into one place. Trigger, alert and action levels are
        set with you at the start, so the chart tells you what to do rather than leaving you to
        work it out at midnight.</p>
      <div class="btns" style="margin-top:32px">
        <a class="btn btn-ember btn-lg" data-platform target="_blank" rel="noopener">Platform login</a>
        <a class="btn btn-outline-dark btn-lg" href="/platform">What it does</a>
      </div>
    </div>
    <div class="panel reveal">
      <div class="top"><span class="lbl">PZ-04 &middot; pore pressure</span>
        <span class="pill"><i></i>Normal</span></div>
      {TREND_SVG}
      <div class="foot"><span>Last 90 days</span>
        <span class="tnum">Latest 214 kPa &middot; 15 min interval</span></div>
    </div>
  </div>
</section>

<section class="pad">
  <div class="wrap">
    <div class="head reveal">
      <div><p class="eb">Completed projects</p>
        <h2>The record speaks first</h2>
        <p>We are new in the Americas and old at this. These are the projects behind the promise.</p>
      </div>
      <a class="tlink" href="/projects">All projects &rarr;</a>
    </div>
    <div class="grid3" id="home-projects"></div>
  </div>
</section>

<section style="padding-bottom:16px">
  <div class="wrap">
    <dl class="stats reveal">
      <div><dd class="tnum">[XX]</dd><dt>Years of instrumentation</dt></div>
      <div><dd class="tnum">[XXX]</dd><dt>Projects delivered</dt></div>
      <div><dd class="tnum">[XX,XXX]</dd><dt>Sensors installed</dt></div>
      <div><dd class="tnum">24/7</dd><dt>Alarm response</dt></div>
    </dl>
  </div>
</section>
{CTA}"""

page("index.html", "CORE Instrumentation &amp; Monitoring",
     "Geotechnical and structural instrumentation and monitoring for dams, tailings facilities, tunnels, deep excavations and structures across North and South America.",
     "home", home_body)

# ------------------------------------------------------------- sectors
page("sectors.html", "Sectors",
     "Instrumentation and monitoring for dams, tailings facilities, tunnels, deep excavations, bridges and slopes.",
     "sectors",
     banner('<a href="/">Home</a><span>/</span>Sectors', "Sectors",
            "Where our instruments end up",
            "Each sector page sets out what typically gets measured, the instruments we reach for, and the projects we have completed there.")
     + '<section class="pad"><div class="wrap"><div class="grid3" id="sector-grid"></div></div></section>'
     + CTA, active="/sectors")

page("sector.html", "Sector", "Instrumentation and monitoring by sector.", "sector",
     banner('<a href="/">Home</a><span>/</span><a href="/sectors">Sectors</a><span>/</span><span id="s-crumb"></span>',
            "Sector", '<span id="s-name"></span>', '<span id="s-lead"></span>')
     + """
<section class="pad white" id="s-measures-wrap">
  <div class="wrap">
    <div class="head reveal"><div><p class="eb">What we measure</p>
      <h2>The quantities that matter here</h2></div></div>
    <div class="tiles" id="s-measures"></div>
  </div>
</section>

<section class="pad">
  <div class="wrap">
    <div class="head reveal"><div><p class="eb">Completed projects</p>
      <h2>What we have done here</h2>
      <p>Open a project for the scheme, the instruments and the outcome.</p></div></div>
    <div class="grid3" id="s-projects"></div>
  </div>
</section>

<section class="pad white" id="s-instruments-wrap">
  <div class="wrap">
    <div class="head reveal"><div><p class="eb">Typical instruments</p>
      <h2>What we usually install here</h2>
      <p>A starting point, not a shopping list &mdash; the scheme depends on the ground and the risk.</p></div></div>
    <div class="grid4" id="s-instruments"></div>
  </div>
</section>

<section class="pad">
  <div class="wrap"><div class="cta reveal">
    <h2 style="margin-top:0">Working on a <span id="s-cta-name"></span> project?</h2>
    <p>Send us the drawings or the permit conditions and we will propose a scheme.</p>
    <a class="btn btn-ember btn-lg" href="/contact" style="margin-top:28px">Request a quote</a>
  </div></div>
</section>""", active="/sectors")

# ------------------------------------------------------------ projects
page("projects.html", "Projects",
     "Completed instrumentation and monitoring projects across dams, tailings, tunnels, excavations, bridges and slopes.",
     "projects",
     banner('<a href="/">Home</a><span>/</span>Projects', "Completed projects",
            "What we have built and watched",
            "Each project sets out the problem, the scheme we installed, and what the client got out of it.")
     + '<section class="pad"><div class="wrap"><div class="grid3" id="project-grid"></div></div></section>'
     + CTA)

page("project.html", "Project", "A completed instrumentation and monitoring project.", "project",
     banner('<a href="/">Home</a><span>/</span><a href="/projects">Projects</a><span>/</span><span id="p-crumb"></span>',
            '<span id="p-meta"></span>', '<span id="p-title"></span>', '<span id="p-summary"></span>',
            '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:28px" id="p-sectors"></div>'
            '<dl class="hero-stats" id="p-stats"></dl>')
     + """
<section class="pad white">
  <div class="wrap grid3">
    <div class="reveal"><p class="eb">The challenge</p>
      <p style="margin-top:16px;font-size:16px;line-height:1.7;color:var(--ink-2)" id="p-challenge"></p></div>
    <div class="reveal"><p class="eb">What we installed</p>
      <p style="margin-top:16px;font-size:16px;line-height:1.7;color:var(--ink-2)" id="p-solution"></p></div>
    <div class="reveal"><p class="eb">The outcome</p>
      <p style="margin-top:16px;font-size:16px;line-height:1.7;color:var(--ink-2)" id="p-outcome"></p></div>
  </div>
</section>

<section class="pad" id="p-instruments-wrap">
  <div class="wrap">
    <div class="head reveal"><div><p class="eb">On this project</p><h2>Instruments used</h2></div></div>
    <div class="grid4" id="p-instruments"></div>
  </div>
</section>""" + CTA)

# --------------------------------------------------------- instruments
page("instruments.html", "Instruments",
     "Piezometers, inclinometers, extensometers, load cells, strain gauges, total stations, GNSS, vibration monitors and dataloggers.",
     "instruments",
     banner('<a href="/">Home</a><span>/</span>Instruments', "Instruments", "The catalogue",
            "Everything here is supplied calibrated, with certificates, and most of it is available for rental on construction-phase work. Specifications can be read in metric or imperial.")
     + """
<section class="pad">
  <div class="wrap">
    <nav aria-label="Categories" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:56px" id="cat-nav"></nav>
    <div id="cat-list"></div>
  </div>
</section>""" + CTA, active="/instruments")

page("instrument.html", "Instrument", "Instrument specifications and applications.", "instrument",
     banner('<a href="/">Home</a><span>/</span><a href="/instruments">Instruments</a><span>/</span><a id="i-catcrumb" href="/instruments"></a><span>/</span><span id="i-crumb"></span>',
            '<span id="i-cat"></span>', '<span id="i-name"></span>', '<span id="i-summary"></span>',
            """<div class="btns" style="margin-top:32px">
        <a class="btn btn-ember" id="i-quote" href="/contact">Request a quote</a>
        <a class="btn btn-outline-dark" id="i-datasheet" hidden target="_blank" rel="noopener">Datasheet (PDF)</a>
        <a class="btn btn-outline-dark" id="i-manual" hidden target="_blank" rel="noopener">Installation manual</a>
      </div>""")
     + """
<section class="pad">
  <div class="wrap split wide">
    <div class="reveal">
      <div id="i-measures-wrap" style="margin-bottom:40px">
        <p class="eb">What it measures</p>
        <p style="margin-top:12px;font-size:16.5px;line-height:1.7" id="i-measures"></p></div>
      <div id="i-desc-wrap" style="margin-bottom:40px">
        <p class="eb">How it works</p>
        <p style="margin-top:12px;font-size:16px;line-height:1.7;color:var(--ink-2)" id="i-desc"></p></div>
      <div id="i-features-wrap" style="margin-bottom:40px">
        <p class="eb">Features</p><ul class="bullets" id="i-features"></ul></div>
      <div id="i-apps-wrap">
        <p class="eb">Typical applications</p>
        <div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:8px" id="i-apps"></div></div>
    </div>
    <div class="reveal">
      <div id="i-specs-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <p class="eb">Specifications</p>
          <div class="unit-toggle" id="i-units" role="group" aria-label="Units">
            <button type="button" data-unit="metric" aria-pressed="true">Metric</button>
            <button type="button" data-unit="imperial" aria-pressed="false">Imperial</button>
          </div>
        </div>
        <dl class="specs" id="i-specs"></dl>
      </div>
      <div class="aside" style="margin-top:28px">
        <p style="font-size:14.5px;line-height:1.6;color:var(--ink-2)">Need this calibrated to a
          specific range, or on rental for a construction phase? Tell us the application and we
          will specify it properly.</p>
        <a class="tlink" id="i-quote2" href="/contact" style="display:inline-block;margin-top:16px"></a>
      </div>
    </div>
  </div>
</section>

<section class="pad white" id="i-related-wrap">
  <div class="wrap">
    <div class="head reveal"><div><p class="eb">Same category</p>
      <h2 id="i-related-title"></h2></div></div>
    <div class="grid4" id="i-related"></div>
  </div>
</section>""", active="/instruments")

# ------------------------------------------------------------ services
page("services.html", "Services",
     "Monitoring design, instrument supply and rental, installation and commissioning, managed monitoring, maintenance and calibration.",
     "services",
     banner('<a href="/">Home</a><span>/</span>Services', "Services",
            "From the monitoring plan to the last reading",
            "You can buy any part of this on its own. Most clients take the whole chain, because that is where the accountability stops moving between companies.")
     + '<section class="pad"><div class="wrap"><div class="rows" id="service-list"></div></div></section>'
     + """
<section class="pad white">
  <div class="wrap">
    <div class="head reveal"><div><p class="eb">How an engagement usually runs</p>
      <h2>Four steps, and you own the data at every one</h2></div></div>
    <div class="grid4">
      <div class="card reveal"><div><span class="n" style="font:12px var(--mono);color:var(--ember-text)">01</span>
        <h3 style="margin-top:12px;font-size:18px">Scope</h3>
        <p>We read the drawings, the ground investigation and the permit conditions, and propose
          what to measure and why.</p></div></div>
      <div class="card reveal"><div><span class="n" style="font:12px var(--mono);color:var(--ember-text)">02</span>
        <h3 style="margin-top:12px;font-size:18px">Install</h3>
        <p>Our crews install and commission, and hand over baseline readings with the certificates
          behind them.</p></div></div>
      <div class="card reveal"><div><span class="n" style="font:12px var(--mono);color:var(--ember-text)">03</span>
        <h3 style="margin-top:12px;font-size:18px">Monitor</h3>
        <p>Data collects automatically into the platform. Thresholds are already set, so alarms
          mean something.</p></div></div>
      <div class="card reveal"><div><span class="n" style="font:12px var(--mono);color:var(--ember-text)">04</span>
        <h3 style="margin-top:12px;font-size:18px">Report</h3>
        <p>Scheduled reporting in your format, plus a person who answers the phone when a level
          is crossed.</p></div></div>
    </div>
  </div>
</section>""" + CTA, active="/services")

# ------------------------------------------------------------ platform
STATUS = [("Normal", "Within threshold", "#1F7A4D"),
          ("Notice", "Approaching a trigger level", "#B87400"),
          ("Alert", "Trigger level exceeded", "#C2410C"),
          ("Alarm", "Action level exceeded or instrument fault", "#9B1C1C")]
FEATURES = [
    ("Live readings", "Every sensor, current value and trend, on one screen &mdash; including the instruments that were installed years ago."),
    ("Trigger levels", "Alert and action levels drawn on the chart, agreed with you at the start, so a reading is interpreted the moment it arrives."),
    ("Automatic alarms", "SMS and email to the people on the distribution list, with escalation if nobody acknowledges."),
    ("Validated data", "Readings are checked against range, rate of change and sensor health before they become a number you act on."),
    ("Reports", "Scheduled reports in your format &mdash; including the ones the regulator wants, not just the ones we find easy."),
    ("Export &amp; API", "Your data leaves in CSV or through an API whenever you want it. It is your record, not ours."),
]
page("platform.html", "Monitoring platform",
     "Every instrument reports into one place: live readings, trigger levels, automatic alarms and scheduled reports.",
     "platform",
     banner('<a href="/">Home</a><span>/</span>Platform', "The platform",
            "The instruments are only half of it",
            "A sensor that reports into a spreadsheet nobody opens is not monitoring. Everything we install feeds one platform, where the thresholds are already drawn and the alarm reaches a person.",
            """<div class="btns" style="margin-top:36px">
        <a class="btn btn-ember btn-lg" data-platform target="_blank" rel="noopener">Platform login</a>
        <a class="btn btn-outline-dark btn-lg" href="/contact">Request a demo</a></div>
      <p style="margin-top:24px;font-size:13px;color:#7C919B">Existing client? Your login is the
        same one your project team issued.</p>""")
     + f"""
<section class="pad">
  <div class="wrap">
    <div class="head reveal"><div><p class="eb">What it does</p>
      <h2>Built around the moment a level is crossed</h2>
      <p>Everything else on a monitoring screen is context for that one event.</p></div></div>
    <div class="tiles">
      {''.join(f'<div class="reveal"><h3>{t}</h3><p>{b}</p></div>' for t, b in FEATURES)}
    </div>
  </div>
</section>

<section class="pad white">
  <div class="wrap">
    <div class="head reveal"><div><p class="eb">Status levels</p>
      <h2>Four states, and they always mean the same thing</h2>
      <p>These colours are reserved across everything we produce &mdash; the platform, the reports
        and this website &mdash; so an operator never has to re-learn them.</p></div></div>
    <div class="grid4">
      {''.join(f'''<div class="card sm reveal"><div><div class="status-row">
        <span class="status-dot" style="background:{c}"></span><h3>{n}</h3></div>
        <p>{m}</p></div></div>''' for n, m, c in STATUS)}
    </div>
  </div>
</section>""" + CTA, active="/platform")

# --------------------------------------------------------------- about
CREDS = [("Quality management", "ISO 9001 &mdash; [certificate number]"),
         ("Insurance", "General liability and professional indemnity &mdash; [limits]"),
         ("US federal registration", "SAM.gov UEI &mdash; [number], W-9 on request"),
         ("Safety record", "EMR [value], [safety programme]"),
         ("Bonding", "[Bonding capacity, if applicable]"),
         ("Memberships", "[Industry bodies and associations]")]
page("about.html", "Company",
     "CORE Instrumentation &amp; Monitoring — the Americas branch of an established Ankara instrumentation company.",
     "about",
     banner('<a href="/">Home</a><span>/</span>Company', "Company", "New here. Not new at this.",
            "CORE Instrumentation &amp; Monitoring is the North and South America arm of [PARENT COMPANY NAME], founded in Ankara in [YEAR]. The instruments, the methods and the engineers behind them have [XX] years of dams, tunnels and tailings behind them &mdash; what is new is the address.")
     + f"""
<section class="pad">
  <div class="wrap split">
    <div class="reveal"><h2 style="margin-top:0">Why we opened in the Americas</h2></div>
    <div class="prose reveal">
      <p>PLACEHOLDER &mdash; two or three paragraphs on why the branch exists. What the parent
        company saw in the region, what clients here were missing, and what you intend to do
        differently. Write it in first person; it reads as more honest than corporate third
        person, and buyers in this industry can tell.</p>
      <p>PLACEHOLDER &mdash; mention the practical things a client cares about: where your stock
        and crews are based, response times, which countries you are set up to invoice and work in.</p>
    </div>
  </div>
</section>

<section style="padding-bottom:32px">
  <div class="wrap"><dl class="stats reveal">
    <div><dd class="tnum">[YEAR]</dd><dt>Parent company founded</dt></div>
    <div><dd class="tnum">[XX]</dd><dt>Years in instrumentation</dt></div>
    <div><dd class="tnum">[XXX]</dd><dt>Projects delivered</dt></div>
    <div><dd class="tnum">[XX]</dd><dt>Countries worked in</dt></div>
  </dl></div>
</section>

<section class="pad white">
  <div class="wrap" id="values" style="scroll-margin-top:110px">
    <div class="head reveal"><div><p class="eb">Core values</p>
      <h2>What we will not trade away</h2>
      <p>This section is deliberately empty. Values written to fill a page are worthless; these
        will be written properly, and each one will be specific enough that you could catch us
        breaking it.</p></div></div>
    <div class="grid3">
      {''.join(f'''<div class="value-card reveal"><span class="n">0{n}</span>
        <h3>Value {n}</h3><p>To be written &mdash; one sentence stating the value, one stating
        the behaviour it demands when it is inconvenient.</p></div>''' for n in range(1, 6))}
    </div>
  </div>
</section>

<section class="pad">
  <div class="wrap" id="team" style="scroll-margin-top:110px">
    <div class="head reveal"><div><p class="eb">Team</p>
      <h2>The people you will actually deal with</h2>
      <p>Instrumentation is bought from people. Names, faces and direct experience matter more
        here than a company boilerplate.</p></div></div>
    <div class="grid4" id="team-grid"></div>
  </div>
</section>

<section class="pad white">
  <div class="wrap">
    <div class="head reveal"><div><p class="eb">Credentials</p>
      <h2>The paperwork clients ask for before the first meeting</h2>
      <p>Fill these in as they are issued &mdash; public agencies and tier-one contractors check
        them early, and an empty answer costs you the bid.</p></div></div>
    <div class="tiles">
      {''.join(f'''<div class="reveal"><h3 style="font-size:12px;letter-spacing:.12em;
        text-transform:uppercase;color:var(--ink-3)">{t}</h3>
        <p style="margin-top:10px;font-size:15px">{b}</p></div>''' for t, b in CREDS)}
    </div>
  </div>
</section>""" + CTA, active="/about")

# ------------------------------------------------------------- contact
PROJECT_TYPES = ["Dam or reservoir", "Mining or tailings", "Tunnel or underground",
                 "Deep excavation", "Bridge or structure", "Slope or landslide", "Other"]
page("contact.html", "Request a quote",
     "Send us the spec, the drawings or two lines about the problem, and we will come back with a scheme and a price.",
     "contact",
     banner('<a href="/">Home</a><span>/</span>Contact', "Contact",
            "Tell us what you need to measure",
            "A drawing, a bill of quantities, a permit condition, or two lines about what is worrying you. Whichever you have is enough to start.")
     + f"""
<section class="pad">
  <div class="wrap split wide">
    <div>
      <p class="form-msg" id="q-instrument" hidden
         style="background:#fff;border:1px solid var(--line);margin-bottom:20px"></p>
      <form class="quote" id="quote-form" novalidate>
        <div class="f2">
          <div><label for="name">Name *</label><input id="name" name="name" required autocomplete="name"></div>
          <div><label for="email">Email *</label><input id="email" name="email" type="email" required autocomplete="email"></div>
          <div><label for="company">Company</label><input id="company" name="company" autocomplete="organization"></div>
          <div><label for="phone">Phone</label><input id="phone" name="phone" autocomplete="tel"></div>
          <div><label for="country">Country</label><input id="country" name="country" autocomplete="country-name"></div>
          <div><label for="projectType">Project type</label>
            <select id="projectType" name="projectType">
              <option value="">Select&hellip;</option>
              {''.join(f'<option>{t}</option>' for t in PROJECT_TYPES)}
            </select></div>
        </div>
        <div><label for="message">What do you need? *</label>
          <textarea id="message" name="message" rows="6" required
            placeholder="The site, the ground conditions, what you need to measure, and the programme — or just paste the spec."></textarea></div>
        <div class="hp" aria-hidden="true">
          <label for="company_website">Leave this field empty</label>
          <input id="company_website" name="company_website" tabindex="-1" autocomplete="off"></div>
        <p class="form-note">Have a drawing or a bill of quantities? Send it to the email address
          on this page and quote your company name.</p>
        <p class="form-msg err" id="q-msg" hidden></p>
        <div><button class="btn btn-ember btn-lg" type="submit" id="q-submit">Send request</button></div>
      </form>
    </div>
    <aside style="display:grid;gap:20px;align-content:start">
      <div class="aside"><h2>Americas</h2>
        <address>[STREET ADDRESS]<br>[CITY, STATE / PROVINCE]<br>[COUNTRY]</address>
        <dl><div><dt>Phone</dt><dd class="tnum">[+1 XXX XXX XXXX]</dd></div>
          <div><dt>Email</dt><dd style="color:var(--ember-text)">[americas@core-im.com]</dd></div></dl></div>
      <div class="aside"><h2>Head office &mdash; Ankara</h2>
        <address>[PARENT COMPANY NAME]<br>[STREET ADDRESS]<br>Ankara, T&uuml;rkiye</address>
        <dl><div><dt>Phone</dt><dd class="tnum">[+90 XXX XXX XX XX]</dd></div>
          <div><dt>Email</dt><dd style="color:var(--ember-text)">[info@parent-company.com]</dd></div></dl></div>
      <div class="aside"><h2>Existing project with an alarm?</h2>
        <p style="margin-top:12px;font-size:15px;line-height:1.6;color:var(--ink-2)">Do not use this
          form. Call the 24-hour number issued with your monitoring plan, or log in to the platform
          and acknowledge the alarm there.</p></div>
    </aside>
  </div>
</section>""")

# --------------------------------------------------------------- legal
for slug, title in (("privacy", "Privacy"), ("terms", "Terms"), ("accessibility", "Accessibility")):
    page(f"{slug}.html", title, f"{title} information for CORE Instrumentation & Monitoring.", slug,
         f"""<section class="pad"><div class="wrap">
  <p class="eb">Legal</p><h2 style="margin-top:12px">{title}</h2>
  <p style="margin-top:20px;max-width:62ch;font-size:16.5px;line-height:1.7;color:var(--ink-2)">
    PLACEHOLDER &mdash; this page needs real content before launch. Have it reviewed by counsel in
    each country you operate in; the requirements differ across the US, Canada, Brazil (LGPD) and
    the EU-facing parts of the parent company&rsquo;s business.</p>
</div></section>""")

page("404.html", "Not found", "Page not found.", "404",
     """<section class="pad"><div class="wrap" style="text-align:center;padding:64px 0">
  <p class="eb">404</p><h2 style="margin:12px auto 0">Nothing here</h2>
  <p style="margin:16px auto 0;max-width:40ch;font-size:16px;line-height:1.6;color:var(--ink-2)">
    The page you were looking for has moved or never existed.</p>
  <a class="btn btn-ember btn-lg" href="/" style="margin-top:32px">Back to the homepage</a>
</div></section>""")

print("built", len([f for f in os.listdir(OUT) if f.endswith('.html')]), "pages")
