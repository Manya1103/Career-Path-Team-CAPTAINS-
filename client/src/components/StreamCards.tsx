import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Stream } from "@shared/schema";

const StreamCard = ({ stream }: { stream: Stream }) => {
  const bgGradientClass = `bg-gradient-to-br from-${stream.color}-500 to-${stream.color}-600`;
  
  return (
    <Link href={`/stream/${stream.slug}`}>
      <div className={`${bgGradientClass} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden cursor-pointer`}>
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>
        <div className="px-6 py-8 text-black relative z-10">
          <div className="flex items-center mb-4">
            <div className={`bg-white text-${stream.color}-500 p-3 rounded-full`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath(stream.icon)} />
              </svg>
            </div>
            <h3 className="text-xl font-bold ml-3">{stream.name}</h3>
          </div>
          <p className="mb-4">{stream.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">{stream.careerPaths}+ Career Paths</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

const getIconPath = (icon: string): string => {
  switch (icon) {
    case 'flask':
      return "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z";
    case 'chart-line':
      return "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16a1 1 0 001 1h14a1 1 0 001-1V4";
    case 'palette':
      return "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z";
    case 'lightbulb':
      return "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z";
    default:
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
  }
};

const StreamCards = () => {
  const { data: streams, isLoading, error } = useQuery<Stream[]>({
    queryKey: ['/api/streams'],
  });

  if (isLoading) {
    return (
      <section id="streams" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Stream</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-60 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !streams) {
    return (
      <section id="streams" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Stream</h2>
          <div className="text-center text-red-500">
            <p>Failed to load streams. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="streams" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Stream</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {streams.map(stream => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StreamCards;
