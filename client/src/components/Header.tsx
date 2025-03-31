import { useState } from "react";
import { Link } from "wouter";
import SearchOverlay from "./SearchOverlay";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                <path d="M12 14l-9-5 2-1 7 3 7-3 2 1-9 5z"/>
              </svg>
              <span className="ml-2 text-xl font-bold text-dark">CareerPath<span className="text-primary">.edu</span></span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/#roadmaps" className="text-slate-700 hover:text-primary font-medium">Roadmaps</Link>
            <Link href="/#streams" className="text-slate-700 hover:text-primary font-medium">Streams</Link>
            <Link href="/#exams" className="text-slate-700 hover:text-primary font-medium">Exams</Link>
            <Link href="/#colleges" className="text-slate-700 hover:text-primary font-medium">Colleges</Link>
            <Link href="/#about" className="text-slate-700 hover:text-primary font-medium">About</Link>
          </nav>
          <div className="flex items-center">
            <button 
              onClick={() => setSearchOpen(true)} 
              className="p-2 rounded-md text-slate-700 hover:text-primary"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 rounded-md text-slate-700 hover:text-primary"
              aria-label="Toggle mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className="pt-2 pb-3 space-y-1 px-4">
          <Link href="/#roadmaps" className="block py-2 px-3 rounded-md text-base font-medium text-slate-700 hover:bg-gray-light hover:text-primary">Roadmaps</Link>
          <Link href="/#streams" className="block py-2 px-3 rounded-md text-base font-medium text-slate-700 hover:bg-gray-light hover:text-primary">Streams</Link>
          <Link href="/#exams" className="block py-2 px-3 rounded-md text-base font-medium text-slate-700 hover:bg-gray-light hover:text-primary">Exams</Link>
          <Link href="/#colleges" className="block py-2 px-3 rounded-md text-base font-medium text-slate-700 hover:bg-gray-light hover:text-primary">Colleges</Link>
          <Link href="/#about" className="block py-2 px-3 rounded-md text-base font-medium text-slate-700 hover:bg-gray-light hover:text-primary">About</Link>
        </div>
      </div>
      
      {/* Search overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
