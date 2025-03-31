import { useState, useEffect } from 'react';
import { RoadmapNode } from '@shared/schema';

interface RoadmapNodeModalProps {
  node: RoadmapNode;
  onClose: () => void;
}

const RoadmapNodeModal = ({ node, onClose }: RoadmapNodeModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setIsOpen(true);
    
    // Add event listener to close modal on ESC key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const handleClose = () => {
    setIsOpen(false);
    
    // Add a small delay before calling onClose to allow the animation to complete
    setTimeout(() => {
      onClose();
    }, 200);
  };
  
  // Helper function to safely render HTML content
  const createMarkup = (content: string) => {
    return { __html: content };
  };
  
  if (!node) return null;
  
  // Get content from node details if available
  let content = 'No detailed information available.';
  if (node.details && typeof node.details === 'object' && 'content' in node.details) {
    content = node.details.content as string || content;
  }
  
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => {
        // Close modal when clicking the backdrop
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div 
        className={`bg-white rounded-lg shadow-2xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto transition-transform duration-200 ${isOpen ? 'translate-y-0' : 'translate-y-8'}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-dark">{node.title}</h3>
            <button 
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div 
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={
              createMarkup(content)
            }
          />
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleClose}
              className="px-4 py-2 bg-gray-light text-slate-700 rounded-md hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapNodeModal;
