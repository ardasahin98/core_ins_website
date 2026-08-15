/* ============================================================
   Placeholder content.

   This is what the site shows until Firebase is connected. Once you fill in
   assets/firebase-config.js, the same collections are read from Firestore
   instead and this file becomes the fallback for when Firestore is
   unreachable. Field names match firebase/schema.md exactly.
   ============================================================ */

window.CORE_DATA = {
  "sectors": [
    {
      "slug": "dams",
      "name": "Dams & Reservoirs",
      "summary": "Pore pressure, seepage, deformation and uplift on embankment and concrete dams.",
      "intro": "Dam safety programmes need a record that is continuous, defensible and understood by the regulator as well as the engineer.",
      "measures": [
        "Pore water pressure",
        "Seepage and drain flow",
        "Crest and slope deformation",
        "Joint and uplift movement",
        "Reservoir and tailwater level"
      ],
      "instrumentSlugs": [
        "vw-piezometer",
        "inclinometer-system",
        "automated-total-station",
        "vw-datalogger"
      ],
      "order": 1,
      "published": true
    },
    {
      "slug": "tailings",
      "name": "Mining & Tailings",
      "summary": "Dam raises, pit slopes and tailings storage facilities under active operation.",
      "intro": "Tailings facilities change while you are measuring them. The instrumentation has to survive the raise and keep reporting through it.",
      "measures": [
        "Phreatic surface",
        "Beach and slope movement",
        "Settlement under raises",
        "Pit slope displacement"
      ],
      "instrumentSlugs": [
        "vw-piezometer",
        "in-place-inclinometer",
        "automated-total-station",
        "gnss-monitoring"
      ],
      "order": 2,
      "published": true
    },
    {
      "slug": "tunnels",
      "name": "Tunnels & Underground",
      "summary": "Convergence, ground movement and building response during tunnelling.",
      "intro": "Underground works are judged by what happens at the surface. Third-party assets need a defensible record from before the first cut.",
      "measures": [
        "Tunnel convergence",
        "Surface settlement",
        "Building tilt and crack movement",
        "Groundwater drawdown"
      ],
      "instrumentSlugs": [
        "automated-total-station",
        "tiltmeter",
        "extensometer",
        "vw-piezometer"
      ],
      "order": 3,
      "published": true
    },
    {
      "slug": "excavations",
      "name": "Deep Excavations",
      "summary": "Wall deflection, prop load and adjacent structure movement in urban sites.",
      "intro": "In a city the excavation is rarely the risk. The neighbours are.",
      "measures": [
        "Wall deflection",
        "Strut and anchor load",
        "Ground settlement",
        "Adjacent structure movement"
      ],
      "instrumentSlugs": [
        "in-place-inclinometer",
        "load-cell",
        "tiltmeter",
        "vw-datalogger"
      ],
      "order": 4,
      "published": true
    },
    {
      "slug": "bridges",
      "name": "Bridges & Structures",
      "summary": "Structural health monitoring on bridges, viaducts and heritage structures.",
      "intro": "Structures are instrumented to extend their life, to prove a rating, or to watch a known defect. Each needs a different scheme.",
      "measures": [
        "Strain and stress",
        "Deflection and rotation",
        "Bearing and joint movement",
        "Vibration response"
      ],
      "instrumentSlugs": [
        "strain-gauge",
        "tiltmeter",
        "accelerometer",
        "vw-datalogger"
      ],
      "order": 5,
      "published": true
    },
    {
      "slug": "slopes",
      "name": "Slopes & Landslides",
      "summary": "Early warning on natural slopes, cuttings and rock faces.",
      "intro": "Slope monitoring is an early-warning problem: the value is in the alarm reaching a person in time.",
      "measures": [
        "Subsurface displacement",
        "Surface movement",
        "Pore pressure response to rainfall",
        "Rockfall and vibration"
      ],
      "instrumentSlugs": [
        "in-place-inclinometer",
        "gnss-monitoring",
        "vw-piezometer",
        "accelerometer"
      ],
      "order": 6,
      "published": true
    }
  ],
  "projects": [
    {
      "slug": "andean-tailings-raise",
      "title": "Tailings Storage Facility — Stage 4 Raise",
      "client": "PLACEHOLDER — client name",
      "location": "PLACEHOLDER — region",
      "country": "Chile",
      "year": 2025,
      "sectorSlugs": [
        "tailings",
        "dams"
      ],
      "summary": "PLACEHOLDER PROJECT. Automated pore pressure and displacement monitoring maintained through an active dam raise, with alarms routed to the operations centre.",
      "challenge": "PLACEHOLDER — describe the problem the client had, in their words where possible.",
      "solution": "PLACEHOLDER — what was installed, how many, and why that scheme.",
      "outcome": "PLACEHOLDER — what the client got: the decision it supported, the downtime avoided, the regulator satisfied.",
      "stats": [
        {
          "label": "Sensors installed",
          "value": "480"
        },
        {
          "label": "Reading interval",
          "value": "15 min"
        },
        {
          "label": "Uptime",
          "value": "99.6%"
        }
      ],
      "instrumentSlugs": [
        "vw-piezometer",
        "in-place-inclinometer",
        "gnss-monitoring",
        "vw-datalogger"
      ],
      "featured": true,
      "published": true
    },
    {
      "slug": "metro-line-settlement",
      "title": "Metro Line Extension — Third-Party Protection",
      "client": "PLACEHOLDER — client name",
      "location": "PLACEHOLDER — city",
      "country": "United States",
      "year": 2025,
      "sectorSlugs": [
        "tunnels",
        "excavations"
      ],
      "summary": "PLACEHOLDER PROJECT. Automated total stations and tiltmeters protecting 60 buildings along a TBM drive, with pre-construction baselines and daily reporting.",
      "challenge": "PLACEHOLDER.",
      "solution": "PLACEHOLDER.",
      "outcome": "PLACEHOLDER.",
      "stats": [
        {
          "label": "Buildings monitored",
          "value": "60"
        },
        {
          "label": "Prisms",
          "value": "1 240"
        },
        {
          "label": "Reports issued",
          "value": "Daily"
        }
      ],
      "instrumentSlugs": [
        "automated-total-station",
        "tiltmeter",
        "extensometer"
      ],
      "featured": true,
      "published": true
    },
    {
      "slug": "embankment-dam-safety",
      "title": "Embankment Dam — Safety Instrumentation Upgrade",
      "client": "PLACEHOLDER — client name",
      "location": "PLACEHOLDER — region",
      "country": "Canada",
      "year": 2024,
      "sectorSlugs": [
        "dams"
      ],
      "summary": "PLACEHOLDER PROJECT. Replacement of a manual reading programme with an automated array feeding the dam safety review.",
      "challenge": "PLACEHOLDER.",
      "solution": "PLACEHOLDER.",
      "outcome": "PLACEHOLDER.",
      "stats": [
        {
          "label": "Piezometers",
          "value": "96"
        },
        {
          "label": "Manual visits saved",
          "value": "104 / yr"
        },
        {
          "label": "Record continuity",
          "value": "100%"
        }
      ],
      "instrumentSlugs": [
        "vw-piezometer",
        "vw-datalogger",
        "automated-total-station"
      ],
      "featured": true,
      "published": true
    },
    {
      "slug": "deep-basement-excavation",
      "title": "Deep Basement — Wall Deflection & Prop Load",
      "client": "PLACEHOLDER — client name",
      "location": "PLACEHOLDER — city",
      "country": "Brazil",
      "year": 2024,
      "sectorSlugs": [
        "excavations"
      ],
      "summary": "PLACEHOLDER PROJECT. In-place inclinometers and load cells on a 24 m excavation beside an operating hospital.",
      "challenge": "PLACEHOLDER.",
      "solution": "PLACEHOLDER.",
      "outcome": "PLACEHOLDER.",
      "stats": [
        {
          "label": "Excavation depth",
          "value": "24 m"
        },
        {
          "label": "IPI strings",
          "value": "18"
        },
        {
          "label": "Alarm response",
          "value": "< 5 min"
        }
      ],
      "instrumentSlugs": [
        "in-place-inclinometer",
        "load-cell",
        "tiltmeter"
      ],
      "published": true
    },
    {
      "slug": "highway-slope-warning",
      "title": "Highway Cutting — Landslide Early Warning",
      "client": "PLACEHOLDER — client name",
      "location": "PLACEHOLDER — region",
      "country": "Peru",
      "year": 2023,
      "sectorSlugs": [
        "slopes"
      ],
      "summary": "PLACEHOLDER PROJECT. Rainfall-triggered pore pressure and displacement monitoring with automated road-closure alerts.",
      "challenge": "PLACEHOLDER.",
      "solution": "PLACEHOLDER.",
      "outcome": "PLACEHOLDER.",
      "stats": [
        {
          "label": "Slope length",
          "value": "1.8 km"
        },
        {
          "label": "Alert levels",
          "value": "3"
        },
        {
          "label": "Power",
          "value": "Solar"
        }
      ],
      "instrumentSlugs": [
        "in-place-inclinometer",
        "vw-piezometer",
        "gnss-monitoring"
      ],
      "published": true
    },
    {
      "slug": "rail-viaduct-shm",
      "title": "Rail Viaduct — Structural Health Monitoring",
      "client": "PLACEHOLDER — client name",
      "location": "PLACEHOLDER — region",
      "country": "Mexico",
      "year": 2023,
      "sectorSlugs": [
        "bridges"
      ],
      "summary": "PLACEHOLDER PROJECT. Strain, tilt and vibration monitoring used to support a load rating on an ageing viaduct.",
      "challenge": "PLACEHOLDER.",
      "solution": "PLACEHOLDER.",
      "outcome": "PLACEHOLDER.",
      "stats": [
        {
          "label": "Spans instrumented",
          "value": "14"
        },
        {
          "label": "Strain gauges",
          "value": "112"
        },
        {
          "label": "Sample rate",
          "value": "100 Hz"
        }
      ],
      "instrumentSlugs": [
        "strain-gauge",
        "tiltmeter",
        "accelerometer"
      ],
      "published": true
    }
  ],
  "instruments": [
    {
      "slug": "vw-piezometer",
      "name": "Vibrating Wire Piezometer",
      "categorySlug": "pore-pressure",
      "summary": "Measures pore water pressure in boreholes, fills and embankments with long-term stability.",
      "measures": "Pore water pressure and, by inference, groundwater level.",
      "description": "PLACEHOLDER TEXT — replace with the parent company's product description. A vibrating wire piezometer measures the resonant frequency of a tensioned wire behind a diaphragm; because the reading is a frequency rather than a voltage, it is immune to cable length and resistance changes, which is what makes it usable on long-life dam and tailings installations.",
      "applications": [
        "Embankment and concrete dams",
        "Tailings storage facilities",
        "Deep excavations",
        "Landfill and containment"
      ],
      "specs": [
        {
          "label": "Standard ranges",
          "value": "0–350 kPa to 0–5 MPa",
          "imperial": "0–50 psi to 0–725 psi"
        },
        {
          "label": "Accuracy",
          "value": "±0.1% FS"
        },
        {
          "label": "Resolution",
          "value": "0.025% FS"
        },
        {
          "label": "Operating temperature",
          "value": "−20 °C to +80 °C",
          "imperial": "−4 °F to +176 °F"
        },
        {
          "label": "Cable",
          "value": "4-core shielded, direct burial"
        }
      ],
      "features": [
        "Frequency output — unaffected by cable length",
        "Integral thermistor for temperature correction",
        "Stainless steel body with replaceable filter"
      ],
      "rentable": false,
      "order": 1,
      "published": true
    },
    {
      "slug": "in-place-inclinometer",
      "name": "In-Place Inclinometer",
      "categorySlug": "deformation",
      "summary": "A permanent string of sensors in an inclinometer casing, giving a continuous displacement profile.",
      "measures": "Subsurface horizontal displacement with depth.",
      "description": "PLACEHOLDER TEXT — replace. A string of biaxial tilt sensors on a fixed gauge length, left permanently in the casing so the profile updates automatically instead of waiting for a probe survey.",
      "applications": [
        "Slope early warning",
        "Diaphragm and secant walls",
        "Tailings dam raises",
        "Landslide monitoring"
      ],
      "specs": [
        {
          "label": "Gauge lengths",
          "value": "0.5 m, 1 m, 2 m, 3 m",
          "imperial": "1.6 ft, 3.3 ft, 6.6 ft, 9.8 ft"
        },
        {
          "label": "Range",
          "value": "±10°"
        },
        {
          "label": "System accuracy",
          "value": "±2 mm per 25 m",
          "imperial": "±0.08 in per 82 ft"
        },
        {
          "label": "Output",
          "value": "Vibrating wire or MEMS digital"
        }
      ],
      "features": [
        "Continuous automated profile",
        "Sections replaceable without pulling the string",
        "Compatible with standard 70 mm casing"
      ],
      "rentable": true,
      "order": 2,
      "published": true
    },
    {
      "slug": "inclinometer-system",
      "name": "Probe Inclinometer System",
      "categorySlug": "deformation",
      "summary": "Manual survey system for periodic displacement profiles — probe, cable reel and readout.",
      "measures": "Subsurface horizontal displacement, surveyed on a schedule.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Baseline and periodic surveys",
        "Verification of automated systems",
        "Investigation and short campaigns"
      ],
      "specs": [
        {
          "label": "Probe range",
          "value": "±30°"
        },
        {
          "label": "Repeatability",
          "value": "±6 mm per 30 m",
          "imperial": "±0.24 in per 98 ft"
        },
        {
          "label": "Cable lengths",
          "value": "up to 200 m",
          "imperial": "up to 656 ft"
        }
      ],
      "features": [
        "Bluetooth readout",
        "Field data checks before leaving site",
        "Rental fleet available"
      ],
      "rentable": true,
      "order": 3,
      "published": true
    },
    {
      "slug": "extensometer",
      "name": "Borehole Extensometer",
      "categorySlug": "deformation",
      "summary": "Multi-point rod or magnet extensometer for settlement and heave along a borehole.",
      "measures": "Axial displacement between anchor points.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Tunnel crown settlement",
        "Foundation heave",
        "Fill settlement",
        "Rock mass deformation"
      ],
      "specs": [
        {
          "label": "Anchors per hole",
          "value": "1 to 6"
        },
        {
          "label": "Range",
          "value": "50 mm to 150 mm",
          "imperial": "2 in to 6 in"
        },
        {
          "label": "Accuracy",
          "value": "±0.1% FS"
        }
      ],
      "features": [
        "Manual or vibrating wire readout",
        "Groutable and mechanical anchors",
        "Surface plate or downhole head"
      ],
      "rentable": false,
      "order": 4,
      "published": true
    },
    {
      "slug": "tiltmeter",
      "name": "Tiltmeter / Beam Sensor",
      "categorySlug": "deformation",
      "summary": "Surface-mounted sensors for rotation of structures, walls and buildings.",
      "measures": "Rotation and differential settlement.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Third-party building protection",
        "Retaining wall rotation",
        "Bridge pier and abutment movement",
        "Heritage structures"
      ],
      "specs": [
        {
          "label": "Range",
          "value": "±3° standard"
        },
        {
          "label": "Resolution",
          "value": "1 arc second"
        },
        {
          "label": "Mounting",
          "value": "Wall plate or beam, 1 m to 3 m",
          "imperial": "3.3 ft to 9.8 ft"
        }
      ],
      "features": [
        "Uniaxial and biaxial",
        "Chainable on one cable run",
        "Low-profile tamper-resistant housing"
      ],
      "rentable": true,
      "order": 5,
      "published": true
    },
    {
      "slug": "load-cell",
      "name": "Vibrating Wire Load Cell",
      "categorySlug": "load-strain",
      "summary": "Annular load cells for anchors, struts, rock bolts and tie-backs.",
      "measures": "Axial load and its change over time.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Ground anchor proof and lock-off",
        "Strut and prop load",
        "Rock bolt monitoring",
        "Pile testing"
      ],
      "specs": [
        {
          "label": "Capacities",
          "value": "200 kN to 5000 kN",
          "imperial": "45 kip to 1124 kip"
        },
        {
          "label": "Accuracy",
          "value": "±0.5% FS"
        },
        {
          "label": "Gauges",
          "value": "3, 4 or 6 vibrating wire elements"
        }
      ],
      "features": [
        "Averaging across gauges cancels eccentric loading",
        "Stainless steel construction",
        "Supplied with bearing plates"
      ],
      "rentable": true,
      "order": 6,
      "published": true
    },
    {
      "slug": "strain-gauge",
      "name": "Vibrating Wire Strain Gauge",
      "categorySlug": "load-strain",
      "summary": "Embedment and surface-mount gauges for concrete and steel.",
      "measures": "Strain, and with it stress and load transfer.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Instrumented piles",
        "Bridge girders and decks",
        "Diaphragm wall panels",
        "Tunnel linings"
      ],
      "specs": [
        {
          "label": "Range",
          "value": "3000 µε"
        },
        {
          "label": "Resolution",
          "value": "1 µε"
        },
        {
          "label": "Gauge lengths",
          "value": "50 mm to 250 mm",
          "imperial": "2 in to 10 in"
        }
      ],
      "features": [
        "Embedment, spot-weldable and arc-weldable types",
        "Integral thermistor",
        "Survives concrete pour"
      ],
      "rentable": false,
      "order": 7,
      "published": true
    },
    {
      "slug": "automated-total-station",
      "name": "Automated Total Station (ATS)",
      "categorySlug": "geodetic",
      "summary": "Robotic total station with prism networks for automated 3D movement monitoring.",
      "measures": "Three-dimensional position of prism targets.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Tunnelling above ground settlement",
        "Dam crest and face movement",
        "Building and façade monitoring",
        "Slope surface displacement"
      ],
      "specs": [
        {
          "label": "Angular accuracy",
          "value": "0.5\" to 1\""
        },
        {
          "label": "Distance accuracy",
          "value": "1 mm + 1.5 ppm",
          "imperial": "0.04 in + 1.5 ppm"
        },
        {
          "label": "Range to prism",
          "value": "up to 3500 m",
          "imperial": "up to 11 483 ft"
        },
        {
          "label": "Cycle",
          "value": "Programmable, typically hourly"
        }
      ],
      "features": [
        "Reference-prism atmospheric correction",
        "Weatherproof housing and UPS",
        "Feeds directly into the monitoring platform"
      ],
      "rentable": true,
      "order": 8,
      "published": true
    },
    {
      "slug": "gnss-monitoring",
      "name": "GNSS Monitoring Station",
      "categorySlug": "geodetic",
      "summary": "Permanent GNSS receivers for continuous millimetre-level displacement.",
      "measures": "Absolute 3D position, continuously.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Open pit slopes",
        "Tailings dam crests",
        "Landslide early warning",
        "Remote sites without line of sight"
      ],
      "specs": [
        {
          "label": "Horizontal precision",
          "value": "3 mm + 0.5 ppm",
          "imperial": "0.12 in + 0.5 ppm"
        },
        {
          "label": "Vertical precision",
          "value": "6 mm + 0.5 ppm",
          "imperial": "0.24 in + 0.5 ppm"
        },
        {
          "label": "Power",
          "value": "Solar with battery autonomy"
        }
      ],
      "features": [
        "No line of sight required",
        "Works through poor visibility and dust",
        "Cellular or satellite backhaul"
      ],
      "rentable": true,
      "order": 9,
      "published": true
    },
    {
      "slug": "accelerometer",
      "name": "Vibration & Blast Monitor",
      "categorySlug": "vibration",
      "summary": "Triaxial geophone and accelerometer units for blast and construction vibration.",
      "measures": "Peak particle velocity, frequency and air overpressure.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Blast compliance monitoring",
        "Piling and demolition",
        "Rail and traffic vibration",
        "Structural response"
      ],
      "specs": [
        {
          "label": "Velocity range",
          "value": "0.1 mm/s to 250 mm/s",
          "imperial": "0.004 in/s to 9.8 in/s"
        },
        {
          "label": "Sample rate",
          "value": "1024 to 8192 samples/s"
        },
        {
          "label": "Standards",
          "value": "Compliant recording to common blasting standards"
        }
      ],
      "features": [
        "Automatic event capture and notification",
        "On-board waveform storage",
        "Cellular reporting"
      ],
      "rentable": true,
      "order": 10,
      "published": true
    },
    {
      "slug": "vw-datalogger",
      "name": "Field Datalogger & Gateway",
      "categorySlug": "dataloggers",
      "summary": "Multi-channel logger with multiplexers, cellular telemetry and solar power.",
      "measures": "Everything else — it is the collection point for the array.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Automated arrays of any size",
        "Remote sites on solar",
        "Alarm-driven monitoring"
      ],
      "specs": [
        {
          "label": "Channels",
          "value": "8 native, expandable to 256 via multiplexers"
        },
        {
          "label": "Sensor types",
          "value": "Vibrating wire, 4–20 mA, digital, thermistor"
        },
        {
          "label": "Telemetry",
          "value": "4G LTE, Wi-Fi, satellite optional"
        },
        {
          "label": "Power",
          "value": "12 V solar with battery autonomy"
        }
      ],
      "features": [
        "Scheduled and alarm-triggered readings",
        "Local storage through comms outages",
        "Pushes straight to the monitoring platform"
      ],
      "rentable": true,
      "order": 11,
      "published": true
    },
    {
      "slug": "settlement-system",
      "name": "Hydrostatic Settlement System",
      "categorySlug": "deformation",
      "summary": "Liquid-level cells for settlement profiles under embankments and structures.",
      "measures": "Vertical settlement relative to a stable datum.",
      "description": "PLACEHOLDER TEXT — replace.",
      "applications": [
        "Embankment settlement",
        "Tank and silo foundations",
        "Building underpinning",
        "Rail formation"
      ],
      "specs": [
        {
          "label": "Range",
          "value": "±250 mm to ±1000 mm",
          "imperial": "±10 in to ±39 in"
        },
        {
          "label": "Accuracy",
          "value": "±0.1% FS"
        },
        {
          "label": "Cells per line",
          "value": "up to 20"
        }
      ],
      "features": [
        "Single reference reservoir",
        "Vibrating wire or digital output",
        "Installs in confined spaces"
      ],
      "rentable": false,
      "order": 12,
      "published": true
    }
  ],
  "categories": [
    {
      "slug": "pore-pressure",
      "name": "Pore Pressure & Groundwater",
      "summary": "Piezometers, water level meters and pressure transducers.",
      "order": 1
    },
    {
      "slug": "deformation",
      "name": "Deformation & Movement",
      "summary": "Inclinometers, extensometers, tiltmeters and settlement systems.",
      "order": 2
    },
    {
      "slug": "load-strain",
      "name": "Load, Strain & Stress",
      "summary": "Load cells, strain gauges, pressure cells and anchor monitoring.",
      "order": 3
    },
    {
      "slug": "geodetic",
      "name": "Geodetic & Optical",
      "summary": "Automated total stations, prisms and GNSS monitoring.",
      "order": 4
    },
    {
      "slug": "vibration",
      "name": "Vibration & Seismic",
      "summary": "Blast monitors, accelerometers and seismographs.",
      "order": 5
    },
    {
      "slug": "dataloggers",
      "name": "Dataloggers & Telemetry",
      "summary": "Field loggers, multiplexers, gateways and power systems.",
      "order": 6
    }
  ],
  "services": [
    {
      "slug": "design",
      "name": "Monitoring design",
      "summary": "We turn a design intent or a permit condition into an instrumentation plan: what to measure, where, at what frequency, and what the trigger levels should be.",
      "bullets": [
        "Instrumentation and monitoring plans",
        "Trigger, alert and action level definition",
        "Review of existing schemes"
      ],
      "order": 1
    },
    {
      "slug": "supply",
      "name": "Supply & rental",
      "summary": "Instruments, dataloggers, cable and enclosures from stock, with calibration certificates. Short-term rental for construction-phase monitoring.",
      "bullets": [
        "Calibrated instruments with certificates",
        "Rental fleet for construction phases",
        "Spares and consumables"
      ],
      "order": 2
    },
    {
      "slug": "installation",
      "name": "Installation & commissioning",
      "summary": "Field crews install, splice, commission and prove the system, then hand over baseline readings you can defend.",
      "bullets": [
        "Borehole and structural installation",
        "Cable routing and enclosure fit-out",
        "Commissioning and baseline records"
      ],
      "order": 3
    },
    {
      "slug": "monitoring",
      "name": "Managed monitoring",
      "summary": "We run the system for the life of the project: automated collection, validation, alarms and reporting, with someone on the end of the phone at 3am.",
      "bullets": [
        "Automated data collection and validation",
        "Threshold alarms by SMS and email",
        "Scheduled reporting to your format"
      ],
      "order": 4
    },
    {
      "slug": "maintenance",
      "name": "Maintenance & calibration",
      "summary": "Planned service visits, recalibration and fault response, so the record stays continuous.",
      "bullets": [
        "Preventive maintenance schedules",
        "Recalibration and certification",
        "Fault response and replacement"
      ],
      "order": 5
    }
  ],
  "team": [
    {
      "slug": "placeholder-1",
      "name": "PLACEHOLDER NAME",
      "role": "Regional Director",
      "bio": "Replace with a short bio — background, years in instrumentation, the projects they are known for.",
      "location": "Americas",
      "order": 1,
      "published": true
    },
    {
      "slug": "placeholder-2",
      "name": "PLACEHOLDER NAME",
      "role": "Technical Manager",
      "bio": "Replace with a short bio.",
      "location": "Americas",
      "order": 2,
      "published": true
    },
    {
      "slug": "placeholder-3",
      "name": "PLACEHOLDER NAME",
      "role": "Field Operations Lead",
      "bio": "Replace with a short bio.",
      "location": "Americas",
      "order": 3,
      "published": true
    },
    {
      "slug": "placeholder-4",
      "name": "PLACEHOLDER NAME",
      "role": "Data & Platform Lead",
      "bio": "Replace with a short bio.",
      "location": "Americas",
      "order": 4,
      "published": true
    }
  ]
};
