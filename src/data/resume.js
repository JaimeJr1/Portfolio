export const resume = {
  education: [
    {
      school: 'Georgia Institute of Technology',
      degree: 'B.S. Computer Science — Intelligence & Info Internetworks',
      date: 'Expected May 2028',
      gpa: '4.0',
      highlights: [
        'Global Leadership LLC, Faculty Honors',
        'Certification: SEPE - Industrial Applications of ML and AI at Ironhack',
      ],
    },
  ],
  experience: [
    {
      title: 'Systems & Infrastructure Engineering Intern',
      company: 'Plix',
      date: 'Apr 2026 - Present',
      bullets: [
        'Reduced battery drain from ~20%/hr to ~11%/hr by investigating CPU threading strategies for concurrent on-device Whisper inference and video recording on Android (MediaTek Dimensity 720)',
        'Bypassed Android\'s EAS scheduler via JNI sched_setaffinity to pin threads to efficiency cores, eliminating cross-core thrashing between Whisper and MediaCodec pipelines',
        'Designed controlled battery and latency experiments across 5+ threading configs with statistical analysis, identifying 6-little-core setup as optimal — ~530 ms median latency at ~5.7% drain per 30 min',
        'Profiled CPU scheduling and thermal behavior using Perfetto traces, characterizing thermal envelope from 37°C idle to 63°C sustained workload',
      ],
    },
    {
      title: 'Research Assistant — LLAMAS Lab',
      company: 'Georgia Tech Research',
      date: 'Jan 2026 - Present',
      bullets: [
        'Research at the intersection of AI for Systems, Systems for AI, and Data Systems',
        'Working on Latency-critical Analytics and Multimodal AI Systems',
        'Spanning Edge/Wearables and Cloud computing',
      ],
    },
    {
      title: 'VIP Research Assistant — Thad Starner\'s Lab',
      company: 'Georgia Tech VIP Program',
      date: 'Aug 2025 - Present',
      bullets: [
        'Enabled ML-informed safety training by analyzing HCI data from VR simulations',
        'Implemented VR simulation pipelines in Unity with event-driven logging for 5+ scenarios',
        'Processed simulation data using Python (NumPy, Pandas, SciPy) to decrease safety risk by 32%',
        'Managed Git-based collaborative workflows for 10+ researchers',
      ],
    },
    {
      title: 'Undergraduate Research Assistant — Gleason Lab',
      company: 'Georgia Tech Research Institute',
      date: 'Jan 2025 - Sep 2025',
      bullets: [
        'Applied ML models to analyze dataset of 6,000+ patients to identify CPD risk factors affecting 65% of Ethiopian women',
        'Built binary classification models (Logistic Regression, Random Forest, XGBoost) with 97.25% precision',
        'Processed and validated 400+ data entries in Kobo Toolbox, reducing data collection errors',
        'Performed double data entry on 50+ records weekly, maintaining 99%+ accuracy',
      ],
    },
    {
      title: 'IT and Machine Learning Intern',
      company: 'MIT Energy Initiative',
      date: 'Jul 2023 - Aug 2023',
      bullets: [
        'Accelerated renewable energy integration through analysis of 2+ years of ERCOT grid data',
        'Enabled strategic development of AI-driven grid optimization tool GenX for a 6-person team of MBA and PhD researchers',
        'Enhanced research team productivity by delivering daily presentations to senior researchers',
      ],
    },
  ],
  highlights: [
    'Nova 111 Student List — Top 10 Computer Science in Spain (2026)',
    'Elected CS Representative — GT Student Government (2025)',
  ],
  skills: {
    languages: ['Python', 'Java', 'C++', 'C#', 'C', 'JavaScript', 'HTML/CSS'],
    'ml/data': ['Scikit-learn', 'PyTorch', 'Pandas', 'NumPy', 'Streamlit', 'XGBoost', 'HuggingFace'],
    tools: ['Git', 'GitHub Actions', 'VS Code', 'Django', 'Kobo Toolbox', 'Jupyter'],
    'cloud & ai': ['Google Cloud', 'Gemini AI', 'PythonAnywhere', 'MySQL', 'Groq'],
  },
}
