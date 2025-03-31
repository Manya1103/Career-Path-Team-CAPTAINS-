import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Roadmap, RoadmapNode, RoadmapEdge } from '@shared/schema';
import RoadmapFlow from './RoadmapFlow';
import RoadmapNodeModal from './RoadmapNodeModal';

const FeaturedRoadmap = () => {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  
  const { data: flowData, isLoading, error } = useQuery<{
    roadmap: Roadmap;
    nodes: RoadmapNode[];
    edges: RoadmapEdge[];
  }>({
    queryKey: ['/api/roadmaps/engineering/flow'],
    queryFn: async () => {
      const response = await fetch('/api/roadmaps/engineering/flow');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });
  
  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node);
  };
  
  const handleCloseModal = () => {
    setSelectedNode(null);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-full max-w-3xl bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          <div className="h-[600px] bg-gray-100 rounded-xl shadow-lg animate-pulse"></div>
        </div>
      </section>
    );
  }
  
  if (error || !flowData) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">
            <p>Failed to load roadmap data. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }
  
  const { roadmap, nodes, edges } = flowData;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-dark text-center mb-4">{roadmap.title} Roadmap</h2>
        <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
          Explore the most sought-after career path with detailed steps, exams, colleges, and specializations.
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-10 mb-8">
          <div className="roadmap-container overflow-x-auto pb-6 h-[600px]">
            <RoadmapFlow 
              nodes={nodes} 
              edges={edges} 
              onNodeClick={handleNodeClick} 
              color={roadmap.color}
            />
          </div>
          
          <div className="bg-gray-light rounded-lg p-4 mt-4">
            <p className="text-slate-700 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Click on any node in the roadmap to view detailed information.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
          <h3 className="text-2xl font-bold text-dark mb-6">Key Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-dark mb-3">Important Exams</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded h-5 mt-0.5 mr-2">JEE Main</span>
                  <div>
                    <p className="text-slate-700">National level entrance exam for admission to NITs, IIITs, and other CFTIs.</p>
                    <p className="text-sm text-slate-500">Conducted twice a year by NTA</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded h-5 mt-0.5 mr-2">JEE Advanced</span>
                  <div>
                    <p className="text-slate-700">Entrance exam for admission to the prestigious IITs.</p>
                    <p className="text-sm text-slate-500">Only top 2.5 lakh JEE Main qualifiers eligible</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded h-5 mt-0.5 mr-2">BITSAT</span>
                  <div>
                    <p className="text-slate-700">Online test for admission to BITS Pilani, Goa and Hyderabad.</p>
                    <p className="text-sm text-slate-500">Computer-based online test</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-dark mb-3">Top Colleges</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded h-5 mt-0.5 mr-2">IITs</span>
                  <div>
                    <p className="text-slate-700">Indian Institutes of Technology - 23 institutes across India.</p>
                    <p className="text-sm text-slate-500">Admission through JEE Advanced</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded h-5 mt-0.5 mr-2">NITs</span>
                  <div>
                    <p className="text-slate-700">National Institutes of Technology - 31 institutes across India.</p>
                    <p className="text-sm text-slate-500">Admission through JEE Main</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded h-5 mt-0.5 mr-2">BITS</span>
                  <div>
                    <p className="text-slate-700">Birla Institute of Technology and Science - Pilani, Goa, Hyderabad.</p>
                    <p className="text-sm text-slate-500">Admission through BITSAT</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <hr className="my-6 border-gray-200" />
          
          <div>
            <h4 className="text-lg font-semibold text-dark mb-3">Popular Engineering Branches</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-light rounded-lg p-4">
                <p className="font-medium text-dark">Computer Science</p>
                <p className="text-sm text-slate-600">Software, AI, ML, Data Science</p>
              </div>
              <div className="bg-gray-light rounded-lg p-4">
                <p className="font-medium text-dark">Mechanical</p>
                <p className="text-sm text-slate-600">Design, Manufacturing, Automotive</p>
              </div>
              <div className="bg-gray-light rounded-lg p-4">
                <p className="font-medium text-dark">Electrical</p>
                <p className="text-sm text-slate-600">Power Systems, Electronics, Control</p>
              </div>
              <div className="bg-gray-light rounded-lg p-4">
                <p className="font-medium text-dark">Civil</p>
                <p className="text-sm text-slate-600">Structural, Transportation, Environmental</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href={`/roadmap/${roadmap.slug}`} className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-blue-600 transition">
              View Full Engineering Roadmap
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        {selectedNode && (
          <RoadmapNodeModal node={selectedNode} onClose={handleCloseModal} />
        )}
      </div>
    </section>
  );
};

export default FeaturedRoadmap;
