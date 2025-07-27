
import type { LinkItem } from './types';

export const initialCategories: string[] = ["Work", "Personal", "Inspiration", "Tech"];

export const initialLinks: LinkItem[] = [
  {
    id: '1',
    title: "Vercel",
    url: "https://vercel.com",
    description: "The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
    category: "Tech",
    createdAt: Date.now() - 1000 * 60 * 60 * 2
  },
  {
    id: '2',
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    category: "Tech",
    createdAt: Date.now() - 1000 * 60 * 60 * 24
  },
  {
    id: '3',
    title: "ArtStation - Cyberpunk",
    url: "https://www.artstation.com/search?q=cyberpunk",
    description: "Explore a vast collection of cyberpunk-themed art for inspiration.",
    category: "Inspiration",
    createdAt: Date.now() - 1000 * 60 * 30
  },
    {
    id: '4',
    title: "GitHub",
    url: "https://github.com",
    description: "Where the world builds software. Millions of developers and companies build, ship, and maintain their software on GitHub.",
    category: "Work",
    createdAt: Date.now() - 1000 * 60 * 60 * 5
  }
];
