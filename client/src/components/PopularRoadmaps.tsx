import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Roadmap, Stream } from "@shared/schema";

type RoadmapWithStream = Roadmap & { streamName: string };

const PopularRoadmaps = () => {
  const [filter, setFilter] = useState<string>("All");
  
  const { data: roadmaps, isLoading: isLoadingRoadmaps } = useQuery<Roadmap[]>({
    queryKey: ['/api/roadmaps/featured'],
  });
  
  const { data: streams, isLoading: isLoadingStreams } = useQuery<Stream[]>({
    queryKey: ['/api/streams'],
  });
  
  const isLoading = isLoadingRoadmaps || isLoadingStreams;

  const getRoadmapsWithStream = (): RoadmapWithStream[] => {
    if (!roadmaps || !streams) return [];
    
    return roadmaps.map(roadmap => {
      const stream = streams.find(s => s.id === roadmap.streamId);
      return {
        ...roadmap,
        streamName: stream?.name || 'Unknown Stream'
      };
    });
  };

  const filteredRoadmaps = () => {
    const roadmapsWithStream = getRoadmapsWithStream();
    if (filter === "All") return roadmapsWithStream;
    return roadmapsWithStream.filter(r => r.streamName === filter);
  };

  const uniqueStreamNames = streams ? [...new Set(streams.map(s => s.name))] : [];

  return (
    <section id="roadmaps" className="py-16 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-dark">Popular Career Roadmaps</h2>
            <p className="text-slate-600 mt-2">Interactive guides to help you navigate your career journey</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'All' ? 'bg-primary text-white' : 'bg-white text-slate-700 hover:bg-gray-200'} font-medium transition`}
                onClick={() => setFilter('All')}
              >
                All
              </button>
              {uniqueStreamNames.map(name => (
                <button 
                  key={name}
                  className={`px-4 py-2 rounded-md ${filter === name ? 'bg-primary text-white' : 'bg-white text-slate-700 hover:bg-gray-200'} font-medium transition`}
                  onClick={() => setFilter(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoadmaps().map(roadmap => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/roadmaps" className="inline-flex items-center px-6 py-3 border border-primary text-primary bg-white hover:bg-primary hover:text-white transition-colors rounded-md font-medium">
            View All Roadmaps
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

const RoadmapCard = ({ roadmap }: { roadmap: RoadmapWithStream }) => {
  // Convert color name to CSS class
  const getBgGradient = (color: string) => {
    return `bg-gradient-to-r from-${color}-500 to-${color}-600`;
  };
  
  const getBgClass = (color: string) => {
    return `bg-${color}-100 text-${color}-800`;
  };
  
  const getTextColorClass = (color: string) => {
    return `text-${color}-500`;
  };

  return (
    <Link href={`/roadmap/${roadmap.slug}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer">
        <div className={`p-1 ${getBgGradient(roadmap.color)}`}></div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-dark">{roadmap.title}</h3>
            <span className={`${getBgClass(roadmap.color)} text-xs font-medium px-2.5 py-0.5 rounded`}>{roadmap.streamName}</span>
          </div>
          <p className="text-slate-600 mb-6">{roadmap.description}</p>
          <div className="flex items-center text-sm text-slate-500 mb-6">
            <div className="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{roadmap.duration}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span>{roadmap.degree}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {roadmap.exams.slice(0, 3).map((exam, index) => (
                <span key={index} className="text-xs bg-gray-light px-2 py-1 rounded">{exam}</span>
              ))}
            </div>
            <span className={`${getTextColorClass(roadmap.color)} group-hover:translate-x-1 transition-transform duration-200`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PopularRoadmaps;
