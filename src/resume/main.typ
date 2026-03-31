// Author: Lam Chi Hao

// === PAGE ===
#set page(
  paper: "a4",
  margin: (top: 0.5in, bottom: 0.5in, left: 0.5in, right: 0.5in),
)

// === FONT ===
#set text(
  font: "New Computer Modern",
  size: 10.5pt,
  lang: "en",
)

#set par(justify: true, leading: 0.65em)

// === UTILS ===

#let section(title) = {
  v(0.5em)
  text(weight: "bold", size: 11pt, upper(title))
  line(length: 100%, stroke: 0.5pt)
  v(0.1em)
}

#let entry-header(title, org, date) = {
  grid(
    columns: (1fr, auto),
    [*#title* | #org],
    align(right)[#date],
  )
}

#let bullets(..items) = {
  for item in items.pos() {
    [- #item \ ]
  }
}

// === HEADER ===
#align(center)[
  #text(size: 22pt, weight: "bold")[Lam Chi Hao]
  #v(0.15em)
  #text(size: 10pt)[
    #link("mailto:haolamnm@gmail.com")[haolamnm\@gmail.com] ·
    #link("https://haolamnm.dev")[haolamnm.dev] ·
    #link("https://linkedin.com/in/haolamnm")[linkedin.com/in/haolamnm] ·
    #link("https://github.com/haolamnm")[github.com/haolamnm] ·
    Vietnam
  ]
]

#v(0.3em)

// === OVERVIEW ===
#section("Overview")

Second-year Computer Science undergraduate at VNU-HCMUS with a strong interest in Large Language Models and Computer Vision. I enjoy building practical AI tools and systems — then refining them for speed and correctness. I learn new languages and frameworks fast, and I keep that edge sharp by shipping pet projects across different parts of the stack.

#v(0.4em)

// === EDUCATION ===
#section("Education")

#entry-header(
  [#link("https://www.fit.hcmus.edu.vn/")[Computer Science]],
  [#link("https://hcmus.edu.vn/")[University of Science, Vietnam National University]],
  "Aug 2024 – Sep 2028",
)
- GPA: 3.7/4.0 · 9.13/10.0 · Excellence Grade
- Relevant coursework: Data Structures & Algorithms, Computational Thinking, Mathematics for AI
- Computer Science Major Dean's List 2024–2025 — ranked in top 5% of cohort

#v(0.4em)

// === RESEARCH ===
#section("Research")

#entry-header(
  "LLM Research Intern",
  [Supervisor: #link("https://lthoang.com/bio")[Le Trung Hoang] · VNU-HCMUS Lab],
  "Feb 2026 – Present",
)
#bullets(
  "Reproducing prior work on AI-generated text detection with a focus on domain generalization; extending experiments to Vietnamese text corpora using SOTA methods.",
  "Exploring Reverse Prompt Engineering: recovering original prompts from model outputs, and extending the scope to reversing system prompts of deployed LLM pipelines.",
  "Studying diffusion-based language models and their implications for text generation and detection.",
)

#v(0.4em)

// === EXPERIENCE ===
#section("Experience")

#entry-header(
  "Associate Engineer",
  [#link("https://viethope.org")[VietHope Inc.] · Remote],
  "Aug 2025 – Present",
)
#bullets(
  "One of 11 selected for the VietHope Fellowship Program 2026; contributed across web infrastructure, platform development, and cloud engineering.",
  [Maintained and administered #link("https://viethope.org")[VietHope WordPress] serving ~2,000+ monthly visitors.],
  [Maintained the #link("https://viethope-vsdp.org")[VSDP application site], processing ~600+ student applications in its first cycle.],
  [Developed a vector-embedded mentor–mentee matching platform (pending board review). #link("https://youtu.be/3lyxb2gcwG0")[YouTube] · #link("https://docs.google.com/document/d/1rBKyy0onaUXkXgpa_ZPguDgvDa-wnpKMA5MY5hHegLQ/edit?tab=t.0#heading=h.8lhc4wvxk34r")[Document].],
)

#v(0.4em)

// === PROJECTS ===
#section("Projects")

#entry-header(
  "Video Frame Retrieval System",
  [Team Lead · 2-member · #link("https://aichallenge.hochiminhcity.gov.vn/")[HCMC AI Challenge] · #link("https://github.com/haolamnm/fps")[GitHub]],
  "2025",
)
#bullets(
  [Architecture inspired by Visione (#link("https://github.com/aimh-lab/visione")[aimh-lab/visione]).],
  "Built a multi-modal retrieval backend: FFmpeg for segmentation; CLIP, DINOv2, YOLOv10, MMDetection for feature extraction.",
  "Indexed embeddings with FAISS (vector) and Apache Lucene (keyword) for fast retrieval over large frame corpora. Stack: Python, Java.",
)

#v(0.3em)

#entry-header(
  "Travel Recommendation System",
  [Team Lead · 5-member · Computational Thinking · #link("https://github.com/letra-org/recommend-sys")[GitHub]],
  "2025",
)
#bullets(
  "Core recommendation engine built on a LangGraph multi-agent framework: four specialized agents operate sequentially to guardrail, gather travel preferences, shortlist destinations, and generate final recommendations.",
  "Vision pipeline generates captions from uploaded travel photos; extracts image context and metadata to produce a personalized travel timeline summary.",
)

#v(0.3em)

#entry-header(
  "JNeurite",
  [Solo · #link("https://github.com/haolamnm/jneurite")[GitHub]],
  "2025",
)
#bullets(
  "Lightweight Java vector indexer backed by Ollama text embeddings.",
  "Implements a RAG pipeline for Q&A over local document collections.",
)

#v(0.3em)

#entry-header(
  "Pomodoro 50",
  [Solo · CS50x Harvard University · #link("https://github.com/haolamnm/pomodoro-50")[GitHub] · #link("https://youtu.be/HSemsQzqEoQ")[YouTube]],
  "2024",
)
#bullets(
  "Full-stack Pomodoro web app with user authentication, session management, customisable timers, and productivity tracking.",
  "Integrated an LLM classifier to validate timer-stop reasons in real time — only legitimate reasons allow the timer to stop.",
  "Stack: Flask, PostgreSQL (Supabase), Redis, Bootstrap, Vercel.",
)

#v(0.3em)

#entry-header(
  "Dictionary",
  [Solo · #link("https://github.com/haolamnm/dictionary")[GitHub]],
  "2025",
)
#bullets(
  "CLI dictionary backed by Trie and BK-Tree for sub-millisecond exact and fuzzy word lookups.",
  "Scraped, cleaned, and normalized dictionary data from websites, open repositories, and public APIs.",
)

#v(0.4em)

// === SKILLS ===
#section("Skills")

#grid(
  columns: (auto, 1fr),
  gutter: (0.6em, 0.8em),
  [*Languages:*],      [Python (3 yrs), C/C++ (3 yrs), Java, Go · Linux (1 yr)],
  [*Frameworks:*],     [PyTorch, TensorFlow, NumPy, scikit-learn, OpenCV, HuggingFace, LangGraph],
  [*Infrastructure:*], [FAISS, Apache Lucene, FFmpeg, PostgreSQL, Redis, Docker, Git, Vercel, Supabase],
  [*Web:*],            [Flask, React, TypeScript, TailwindCSS, WordPress],
  [*English:*],        [B2–C1 Level],
)

#v(0.4em)

// === AWARDS & ACHIEVEMENTS ===
#section("Awards & Achievements")
#grid(
  columns: (auto, 1fr),
  gutter: (0.6em, 0.8em),
  [2026], [*Rank \#8 at #link("https://www.tensortonic.com/")[TensorTonic platform]* — Upload daily progress on LinkedIn.],
  [2026], [*Rank \#30 at #link("https://www.withwoz.com/buildfast")[Woz BuildFast Hackathon]* — Built Todone, an AI-powered task management app.],
  [2025], [*Faculty of Information Technology Dean's List* — Top 5% of cohort, FIT-HCMUS.],
  [2025], [*Attendee — HCMC AI Challenge*, Video Frame Retrieval.],
  [2024], [*3rd Place, Ho Chi Minh City Physics Olympiad* — City-level academic competition.],
  [2023], [*Bronze Medal, April 30th Traditional Physics Olympic* — City-level, Ho Chi Minh City.],
  [2022], [*Highest GPA, Physics Specialized Class* — Top academic standing in cohort.],
)

#v(0.4em)

// === CERTIFICATIONS ===
#section("Certifications")

#grid(
  columns: (auto, 1fr),
  gutter: (0.6em, 0.8em),
  [Mar 2026], [*The AI Engineer Path* — Scrimba],
  [Dec 2025], [*Pythonic Programming Tips* — Educative],
  [Nov 2025], [*Full Speed Python* — Educative],
  [Apr 2025], [*Machine Learning with Python* — freeCodeCamp],
  [Feb 2025], [*JavaScript Algorithms & Data Structures* — freeCodeCamp],
  [Feb 2025], [*LLM Agents MOOC Fall 2024* — UC Berkeley RDI],
  [Jan 2025], [*Complete Guide to Mastering Python* — Udemy],
  [Jan 2025], [*CS50x Introduction to Computer Science* — Harvard University],
  [Oct 2024], [*CS50P Introduction to Programming with Python* — Harvard University],
  [], [More at #link("https://linkedin.com/in/haolamnm")[linkedin.com/in/haolamnm]],
)
