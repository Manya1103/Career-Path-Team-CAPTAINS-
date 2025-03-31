import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoadmapFlow from '@/components/RoadmapFlow';
import RoadmapNodeModal from '@/components/RoadmapNodeModal';
import { RoadmapNode, Roadmap, RoadmapEdge, Stream } from '@shared/schema';

interface RoadmapFlowData {
  roadmap: Roadmap;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

const RoadmapDetail = () => {
  const { slug } = useParams();
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  
  // Direct query instead of using the hook
  const { 
    data: roadmapData,
    isLoading: roadmapLoading, 
    error: roadmapError 
  } = useQuery<RoadmapFlowData>({
    queryKey: ['roadmap', slug, 'flow'],
    queryFn: async () => {
      const response = await fetch(`/api/roadmaps/${slug}/flow`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!slug
  });

  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node);
  };
  
  const handleCloseModal = () => {
    setSelectedNode(null);
  };

  
  
  // Fetch stream data for breadcrumb only if we have a roadmap with streamId
const { data: streamData } = useQuery<Stream>({
  queryKey: ['stream', roadmapData?.roadmap?.streamId],
  queryFn: async () => {
    const response = await fetch(`/api/streams/${roadmapData?.roadmap?.streamId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
  enabled: !!roadmapData?.roadmap?.streamId,
});
  
  if (roadmapLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
              <div className="h-[600px] bg-gray-100 rounded-xl mb-8"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-40 bg-gray-100 rounded"></div>
                <div className="h-40 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (roadmapError || !roadmapData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Roadmap</h1>
              <p className="text-slate-600 mb-6">We couldn't find the roadmap you're looking for or an error occurred while loading the data.</p>
              <Link href="/" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-blue-600 transition">
                Return to Home
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Now we definitely have the data
  const { roadmap, nodes, edges } = roadmapData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-slate-500 hover:text-primary">Home</Link>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href="/#roadmaps" className="text-slate-500 hover:text-primary">Roadmaps</Link>
              </li>
              {streamData && typeof streamData === 'object' && streamData !== null && 'slug' in streamData && 'name' in streamData && (
                <>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                  <li>
                    <Link href={`/stream/${String(streamData.slug)}`} className="text-slate-500 hover:text-primary">{String(streamData.name)}</Link>
                  </li>
                </>
              )}
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-primary font-medium">{roadmap.title}</li>
            </ol>
          </nav>
          
          <h1 className="text-3xl font-bold text-dark mb-4">{roadmap.title} Roadmap</h1>
          <p className="text-slate-600 mb-8">{roadmap.description}</p>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-slate-700">{roadmap.duration || 'Varies'}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="font-medium text-slate-700">{roadmap.degree || 'Various Degrees'}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-medium text-slate-700">{roadmap.exams?.join(', ') || 'No exams specified'}</span>
              </div>
            </div>
            
            <div className="h-[600px] rounded-lg border border-gray-200 mb-4">
              <RoadmapFlow 
                nodes={nodes} 
                edges={edges} 
                onNodeClick={handleNodeClick} 
                color={roadmap.color}
              />
            </div>
            
            <div className="bg-gray-light rounded-lg p-4 mt-4">
              <p className="text-slate-700 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Click on any node in the roadmap to view detailed information.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Key Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-dark mb-3">Required Exams</h3>
                <ul className="space-y-3">
                  {roadmap.exams && roadmap.exams.length > 0 ? (
                    roadmap.exams.map((exam: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className={`bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded h-5 mt-0.5 mr-2`}>{exam}</span>
                        <div>
                          <p className="text-slate-700">Entrance examination for {roadmap.title} programs.</p>
                          <Link href={`/exam/${exam.toLowerCase()}`} className="text-sm text-primary hover:underline">View exam details</Link>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-700">No specific exams required for this path.</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-dark mb-3">Career Opportunities</h3>
                <ul className="space-y-2">
                  {nodes && nodes.length > 0 ? (
                    nodes
                      .filter((node: RoadmapNode) => 
                        node.type === 'step' && 
                        (node.title?.includes('Industry') || node.title?.includes('Career'))
                      )
                      .map((node: RoadmapNode, index: number) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-700">{node.title || 'Career Option'}: {node.description || 'Details not available'}</span>
                        </li>
                      ))
                  ) : (
                    <li className="text-slate-700">Career information will be updated soon.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {selectedNode && (
        <RoadmapNodeModal node={selectedNode} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default RoadmapDetail;
