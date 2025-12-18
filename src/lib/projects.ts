/** Project metadata */
export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
    github?: string;
    codeberg?: string;
    website?: string;
    featured?: boolean;
}

/** List of projects */
export const projects: Project[] = [
    {
        id: "jneurite",
        title: "jneurite",
        description: "A simple vector database indexer with Ollama written in Java.",
        tags: ["Java", "Ollama", "Vector", "Indexer"],
        github: "https://github.com/haolamnm/jneurite",
        codeberg: "https://codeberg.org/haolamnm/jneurite",
        featured: false,
    },
    {
        id: "veritas",
        title: "veritas",
        description: "A simple tool to check AI-generated text written in Python.",
        tags: ["Python", "CLI", "GPT"],
        github: "https://github.com/haolamnm/veritas",
        codeberg: "https://codeberg.org/haolamnm/veritas",
        featured: true,
    },
    {
        id: "streamsrv",
        title: "streamsrv",
        description: "A simple video streaming server-client written in C.",
        tags: ["C", "UDP", "TCP", "RTSP", "RTP"],
        github: "https://github.com/haolamnm/streamsrv",
        codeberg: "https://codeberg.org/haolamnm/streamsrv",
        featured: false,
    },
    {
        id: "wharf",
        title: "wharf",
        description: "A simple file and directory description tool written in Rust.",
        tags: ["Rust", "CLI", "clap"],
        github: "https://github.com/haolamnm/wharf",
        codeberg: "https://codeberg.org/haolamnm/wharf",
        website: "https://github.com/haolamnm/wharf/releases",
        featured: false,
    },
    {
        id: "ssir-module",
        title: "ssir-module",
        description: "A Python module for simulating the spread of disease in a grid-based population. Built with C++11, pybind11 and CMake.",
        tags: ["C++", "Python", "Math", "pybind11", "CMake"],
        github: "https://github.com/haolamnm/ssir-module",
        featured: false,
    },
    {
        id: "pomodoro-50",
        title: "pomodoro-50",
        description: "A Flask-powered Pomodoro web app with session and database management, AI integration, user authentication and customizable timers, and productivity tracking.",
        tags: ["Python", "Flask", "SQLite", "CS50x"],
        github: "https://github.com/haolamnm/pomodoro-50",
        featured: false,
    },
    {
        id: "poker-game",
        title: "poker-game",
        description: "A classic Poker Game using C++11 and SDL2, support strategy, graphics, and smooth gameplay.",
        tags: ["C++", "SDL2", "GUI", "Game"],
        github: "https://github.com/haolamnm/poker-game",
        featured: false,
    },
    {
        id: "portfolio",
        title: "portfolio",
        description: "A simple portfolio website built with TypeScript, React, Tailwind, Vite.",
        tags: ["TypeScript", "React", "Tailwind", "Vite"],
        github: "https://github.com/haolamnm/haolamnm.github.io",
        codeberg: "https://codeberg.org/haolamnm/haolamnm.github.io",
        website: "https://haolamnm.dev",
        featured: false,
    },
    {
        id: "caffind",
        title: "caffind",
        description: "A vibe-coded web app to find coffee shops around your location written in TypeScript.",
        tags: ["TypeScript", "React", "Vite", "Firebase"],
        github: "https://github.com/haolamnm/caffind",
        codeberg: "https://codeberg.org/haolamnm/caffind",
        website: "https://caffind-dbe1d.web.app",
        featured: false,
    },
    {
        id: "sherlock",
        title: "sherlock",
        description: "A cloned version of sherlock written in Python.",
        tags: ["Python", "CLI", "asyncio", "pydantic", "httpx"],
        github: "https://github.com/haolamnm/sherlock",
        codeberg: "https://codeberg.org/haolamnm/sherlock",
        website: "https://sherlockproject.xyz",
        featured: false,
    },
    {
        id: "pswdgn",
        title: "pswdgn",
        description: "A simple security-hardened password generator written in C.",
        tags: ["C", "CLI", "Security", "Linux"],
        github: "https://github.com/haolamnm/pswdgn",
        codeberg: "https://codeberg.org/haolamnm/pswdgn",
        featured: false,
    },
    {
        id: "dictionary",
        title: "dictionary",
        description: "A simple console-based dictionary app using Trie and BK-Tree for fast lookups written in C++.",
        tags: ["C++", "CLI", "DSA", "Trie", "BK-Tree"],
        github: "https://github.com/haolamnm/dictionary",
        featured: false,
    },
    {
        id: "flashcard-50",
        title: "flashcard-50",
        description: "A simple streamlit app for flashcard learning written in Python.",
        tags: ["Python", "Streamlit", "CS50P"],
        github: "https://github.com/haolamnm/flashcard-50",
        featured: false,
    },
    {
        id: "autodoor",
        title: "autodoor",
        description: "An Arduino script to auto open-close and tint-clear door based on weather written in C++",
        tags: ["C++", "Arduino", "Embedded"],
        github: "https://github.com/haolamnm/autodoor",
        codeberg: "https://codeberg.org/haolamnm/autodoor",
        featured: false,
    }
];

/** Sorts projects: featured first, then alphabetically by title */
const sortProjects = (items: Project[]): Project[] =>
    [...items].sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.title.localeCompare(b.title);
    });

/** Pre-sorted projects for display */
export const sortedProjects = sortProjects(projects);
