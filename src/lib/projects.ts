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
        title: "J-Neurite",
        description:
            "A simple vector database indexer with Ollama written in Java.",
        tags: ["Java", "Ollama", "Vector", "Indexer"],
        github: "https://github.com/haolamnm/jneurite",
        codeberg: "https://codeberg.org/haolamnm/jneurite",
        featured: true,
    },
];
