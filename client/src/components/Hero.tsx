import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-dark to-dark-light text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl text-black font-bold mb-4">Find Your Perfect <span className="text-primary">Career Path</span></h1>
            <p className="text-lg md:text-xl text-slate-800 mb-8">Interactive roadmaps to guide you through every career option after 12th grade. Explore requirements, exams, colleges, and make informed decisions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="#roadmaps" className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-blue-600 transition shadow-lg shadow-blue-500/20">
                Explore Roadmaps
              </Link>
              <Link href="#streams" className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white hover:text-dark transition">
                Browse by Stream
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
              alt="Students planning their future" 
              className="rounded-lg shadow-2xl max-w-full h-auto" 
              width="600" 
              height="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
