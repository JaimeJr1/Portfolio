export const resume = {
  education: [
    {
      school: 'Georgia Institute of Technology',
      degree: 'B.S. Computer Science — Systems Architecture & Info Internetworks',
      date: 'Expected May 2028',
      gpa: '4.0/4.0',
      highlights: [
        'Faculty Honors',
        'Coursework: Data Structures & Algorithms, Systems & Networks, Computer Organization, Linear Algebra',
        'Upcoming: Design of Operating Systems, Computer Networking',
      ],
    },
  ],
  experience: [
    {
      title: 'Systems & Infrastructure Engineering Intern',
      company: 'Plix AI (San Mateo, CA)',
      date: 'May 2026 - Aug 2026',
      bullets: [
        'AI body cameras for frontline security and field-operations teams — backed by **Sequoia Capital and a16z**',
        'Cut projected infrastructure costs **~$500K/yr** by accelerating on-device speech recognition inference **~10x** (10–37s → 2.5s per window) with an ARM-optimized quantized model, eliminating per-camera cloud transcription',
        'Shipped real-time incident detection to production embedded firmware on **2,500+ deployed devices**, cutting worst-case detection latency **70s → 13s** via sliding-window inference scheduling',
        'Reduced indoor location drift **81%** with GNSS/INS sensor fusion (Kalman filter, chi-squared outlier gating, pedestrian dead reckoning), tagging measured vs. inferred positions for provenance in evidentiary records',
        'Cut audio/video sync drift **37.5s → 0.05s** with 0.001% frame loss by re-engineering camera exposure control, validated with automated telemetry-replay tests and multi-hour night field trials',
      ],
    },
    {
      title: 'Undergraduate Researcher — LLAMAS Lab',
      company: 'Georgia Institute of Technology',
      date: 'Jan 2026 - Present',
      bullets: [
        'Reduced Whisper inference latency **88% across wearable targets** by tuning CPU core affinities, thread counts, and context window sizes through a C++/Kotlin harness using **raw Linux syscalls** (sched_setaffinity) to bypass Android NDK limits',
        'Engineered a concurrent Android H.265 video + audio transcription pipeline (Camera2/MediaCodec/MediaMuxer) with thread affinity pinned per workload and CountDownLatch synchronization',
        'Benchmarked Whisper latency, battery drain, and transcription accuracy across pipeline configurations on ARM big.LITTLE',
      ],
    },
    {
      title: 'VIP Research Assistant — Thad Starner\'s Lab',
      company: 'Georgia Tech VIP Program',
      date: 'Aug 2025 - Jan 2026',
      bullets: [
        'Identified behavioral risk patterns in construction-safety simulation data (NumPy, Pandas, SciPy) to guide new workers on avoiding and responding to hazards, contributing to a **32% decrease in projected safety incidents**',
      ],
    },
    {
      title: 'Undergraduate Research Assistant — Gleason Lab',
      company: 'Georgia Tech Research Institute',
      date: 'Jan 2025 - Sep 2025',
      bullets: [
        'Built a classification pipeline (XGBoost, Random Forest, Logistic Regression) with feature engineering and k-fold cross-validation, predicting cephalopelvic disproportion at **97.25% precision on 6,000+ patients** to give clinicians early warning before labor',
      ],
    },
  ],
  highlights: [
    'Nova 111 Spain 2026 — Ranked **Top 10 nationally in Computer Science** (111 selected nationwide)',
    'Ramblin\' Rocket Club — Deputy Lead, Software & Simulations',
    'Elected CS Representative — GT Student Government (2025)',
    'Rocket League — Grand Champion, **top 0.1% globally**',
  ],
  skills: {
    languages: ['C++', 'C', 'Python', 'Kotlin', 'Java', 'JavaScript', 'HTML/CSS'],
    systems: ['ARM big.LITTLE', 'Embedded firmware', 'Linux (syscalls, scheduling, thread affinity)', 'POSIX threads', 'Concurrency', 'On-device inference (GGML)', 'Docker', 'gRPC'],
    'ml/data': ['PyTorch', 'scikit-learn', 'XGBoost', 'JAX', 'Pandas', 'NumPy', 'SciPy', 'Hugging Face', 'Streamlit'],
    tools: ['Git', 'GitHub Actions (CI/CD)', 'Automated testing', 'CircuitSim', 'MySQL', 'Django', 'Google Cloud'],
  },
}
