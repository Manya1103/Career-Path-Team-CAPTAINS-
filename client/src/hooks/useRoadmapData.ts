import { useQuery } from '@tanstack/react-query';
import { Roadmap, RoadmapNode, RoadmapEdge } from '@shared/schema';

interface RoadmapFlowData {
  roadmap: Roadmap;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

export const useRoadmapData = (slug: string) => {
  const { data, isLoading, error } = useQuery<RoadmapFlowData>({
    queryKey: ['/api/roadmaps', slug, 'flow'],
    // Only enable the query if we have a valid slug
    enabled: !!slug
  });
  
  // Create a default value for when data is undefined
  const defaultData: RoadmapFlowData = { 
    roadmap: { 
      id: 0, 
      title: 'Loading...', 
      description: 'Please wait while we load the roadmap data...',
      slug: '',
      streamId: 0,
      color: 'primary',
      exams: [],
      duration: '',
      degree: '',
      featured: false
    },
    nodes: [],
    edges: []
  };
  
  return {
    roadmapData: data || defaultData,
    isLoading,
    error
  };
};
