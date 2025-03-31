import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Roadmap, Stream, Exam } from "@shared/schema";

interface SearchResult {
  id: number;
  title: string;
  type: "roadmap" | "stream" | "exam";
  slug: string;
  category?: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [popularSearches] = useState([
    "Engineering", "MBBS", "IIT JEE", "NEET", "CA", "Law"
  ]);

  const { data: roadmaps } = useQuery<Roadmap[]>({
    queryKey: ['/api/roadmaps'],
    enabled: isOpen,
  });
  
  const { data: streams } = useQuery<Stream[]>({
    queryKey: ['/api/streams'],
    enabled: isOpen,
  });
  
  const { data: exams } = useQuery<Exam[]>({
    queryKey: ['/api/exams'],
    enabled: isOpen,
  });

  useEffect(() => {
    // When overlay opens, focus the input
    if (isOpen) {
      const inputEl = document.getElementById("search-input");
      if (inputEl) inputEl.focus();
      
      // Add event listener to close overlay on ESC key
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      
      window.addEventListener("keydown", handleEsc);
      
      // Prevent scrolling on body when overlay is open
      document.body.style.overflow = "hidden";
      
      return () => {
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    
    const results: SearchResult[] = [];
    
    if (roadmaps) {
      roadmaps.forEach(roadmap => {
        if (
          roadmap.title.toLowerCase().includes(query) ||
          roadmap.description.toLowerCase().includes(query)
        ) {
          results.push({
            id: roadmap.id,
            title: roadmap.title,
            type: "roadmap",
            slug: roadmap.slug,
            category: "Career Path"
          });
        }
      });
    }
    
    if (streams) {
      streams.forEach(stream => {
        if (
          stream.name.toLowerCase().includes(query) ||
          stream.description.toLowerCase().includes(query)
        ) {
          results.push({
            id: stream.id,
            title: stream.name,
            type: "stream",
            slug: stream.slug,
            category: "Stream"
          });
        }
      });
    }
    
    if (exams) {
      exams.forEach(exam => {
        if (
          exam.name.toLowerCase().includes(query) ||
          exam.description.toLowerCase().includes(query)
        ) {
          results.push({
            id: exam.id,
            title: exam.name,
            type: "exam",
            slug: exam.slug,
            category: exam.category
          });
        }
      });
    }
    
    setSearchResults(results);
  }, [searchQuery, roadmaps, streams, exams]);

  if (!isOpen) return null;

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleResultClick = () => {
    onClose();
    setSearchQuery("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="flex items-center justify-center h-full px-4 w-full">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4">
          <div className="flex items-center border-b border-gray-200 pb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              id="search-input"
              type="text" 
              placeholder="Search for career paths, exams, colleges..." 
              className="w-full focus:outline-none text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={onClose} 
              className="ml-2 text-slate-400 hover:text-slate-600"
              aria-label="Close search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="py-4 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-slate-500 mb-2">Search results:</p>
              <ul className="space-y-2">
                {searchResults.map(result => (
                  <li key={`${result.type}-${result.id}`} className="hover:bg-gray-50 rounded-md transition">
                    <Link href={`/${result.type}/${result.slug}`} onClick={handleResultClick}>
                      <a className="block p-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{result.title}</span>
                          <span className="text-xs bg-gray-100 text-slate-600 px-2 py-1 rounded">{result.category}</span>
                        </div>
                        <p className="text-sm text-slate-500">{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</p>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : searchQuery ? (
            <div className="py-4">
              <p className="text-slate-500 text-center">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="pt-4 pb-2">
              <p className="text-sm text-slate-500 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-light rounded-full text-sm text-slate-700 hover:bg-primary hover:text-white cursor-pointer transition"
                    onClick={() => handlePopularSearch(term)}
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
