import { Link } from "react-router-dom";

export default function HomePage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 from-30% via-white to-purple-50 py-12">
        <h1 className="text-5xl md:text-6xl font-black custom-h1 mb-14 tracking-tight drop-shadow leading-tight text-center">
          Book Library
        </h1>
        <div className="flex gap-10">
          <Link
            to="/books"
            className="w-40 h-40 bg-blue-600/90 hover:bg-blue-700 transition rounded-2xl shadow-lg flex flex-col items-center justify-center group"
            aria-label="Books"
          >
            <span className="text-white text-3xl font-semibold mb-2 transition group-hover:scale-110">Books</span>
            <svg className="w-12 h-12 text-white/80 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2.3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20m-16 0V6.5A2.5 2.5 0 016.5 4H20v13M4 17v2.5A2.5 2.5 0 006.5 22H20"></path>
            </svg>
          </Link>
          <a
            href="/authors"
            className="w-40 h-40 bg-purple-500/90 hover:bg-purple-600 transition rounded-2xl shadow-lg flex flex-col items-center justify-center group"
            aria-label="Authors"
          >
            <span className="text-white text-3xl font-semibold mb-2 transition group-hover:scale-110">Authors</span>
            <svg className="w-12 h-12 text-white/80 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2.3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75m8 11.12V19a4 4 0 00-8 0v.25"></path>
            </svg>
          </a>
        </div>
      </div>
    )
  }
  