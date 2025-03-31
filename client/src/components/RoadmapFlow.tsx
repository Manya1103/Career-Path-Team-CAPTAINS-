import { useCallback, useRef, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  Panel,
  SmoothStepEdge,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { RoadmapNode, RoadmapEdge } from '@shared/schema';

type RoadmapNodeData = {
  title: string;
  description: string;
  type: string;
  details: any;
  color: string;
  originalNode: RoadmapNode;
};

interface RoadmapFlowProps {
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  onNodeClick: (node: RoadmapNode) => void;
  color: string;
}

// Custom Node Component
const CustomNode = ({ data, id }: { data: RoadmapNodeData; id: string }) => {
  // Safely access color property and use a default value if it doesn't exist
  const colorClass = `bg-${data?.color || 'primary'}`;
  
  return (
    <div className="relative">
      {/* ReactFlow handles for edge connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: '#555', width: '8px', height: '8px' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: '#555', width: '8px', height: '8px' }}
      />
           
      <div 
        className={`px-4 py-2 rounded-lg shadow-md ${colorClass} text-black cursor-pointer hover:shadow-lg transition-all duration-300 min-w-[150px] text-center transform hover:scale-105 hover:z-10 active:scale-95`}
        data-id={id}
        role="button"
        aria-label={`View details for ${data?.title || 'Node'}`}
      >
        <div className="font-medium">{data?.title || 'Node'}</div>
        <div className="text-xs opacity-90">{data?.description || ''}</div>
      </div>
    </div>
  );
};

// Memoize node and edge types outside the component to avoid re-creating these objects on each render
const nodeTypes = { custom: CustomNode };
const edgeTypes = { smoothstep: SmoothStepEdge };

const RoadmapFlow = ({ nodes, edges, onNodeClick, color }: RoadmapFlowProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  // Transform backend nodes to ReactFlow format
  const initialNodes: Node[] = nodes.map((node) => ({
    id: node.id.toString(),
    position: node.position as { x: number; y: number },
    data: {
      title: node.title,
      description: node.description,
      type: node.type,
      details: node.details,
      color: color || 'primary',
      originalNode: node,
    },
    type: 'custom',
  }));
  
  // Transform backend edges to ReactFlow format
  const initialEdges: Edge[] = edges.map((edge) => ({
    id: edge.id.toString(),
    // Convert to string to ensure compatibility with ReactFlow
    source: edge.source.toString(),
    target: edge.target.toString(),
    // Specify exact handle IDs that match those in the CustomNode component
    sourceHandle: 'right', // Source nodes connect from their right side
    targetHandle: 'left',  // Target nodes connect to their left side
    label: edge.label || '',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#64748b', strokeWidth: 2 },
  }));
  
  const [flowNodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
    
    // Center the view
    setTimeout(() => {
      instance.fitView({ padding: 0.2 });
    }, 200);
  }, []);
  
  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Get the original node data and pass it to the parent component
    const originalNode = node.data.originalNode;
    if (originalNode) {
      onNodeClick(originalNode);
    }
  }, [onNodeClick]);
  
  return (
    <div ref={reactFlowWrapper} className="h-full w-full" style={{ minHeight: '500px' }}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={handleNodeClick}
        fitView
        attributionPosition="bottom-right"
        defaultEdgeOptions={{ type: 'smoothstep' }}
      >
        <Controls />
        <Background color="#red" gap={15} />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          nodeColor={(node) => {
            return node.data?.color ? `var(--${node.data.color})` : '#0ea5e9';
          }}
        />
        <Panel position="top-right">
          <div className="bg-white p-2 rounded shadow text-xs">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span>Drag to pan, scroll to zoom</span>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default RoadmapFlow;
