import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, this would send a request to the server
    // For now, just simulate a delay and show a success message
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've successfully subscribed to our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-xl shadow-lg p-8 md:p-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" d="M37.9,-60.3C50.5,-53.9,63,-44.8,70.4,-32.2C77.9,-19.6,80.3,-3.5,77.1,11.1C73.9,25.7,65.1,38.8,53.3,49C41.5,59.3,26.7,66.7,10.2,70.8C-6.2,74.9,-24.4,75.7,-38.4,68.3C-52.4,60.8,-62.3,45.1,-67.7,28.9C-73.2,12.7,-74.3,-4,-70.2,-19.7C-66,-35.4,-56.6,-50.1,-43.8,-56.5C-31,-62.9,-15.5,-60.9,-0.6,-60C14.4,-59.1,28.8,-59.2,37.9,-60.3Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="relative z-10 md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with Career Opportunities</h2>
            <p className="text-blue-100 mb-6">Get the latest information about exams, colleges, and career paths delivered straight to your inbox.</p>
            
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-blue-50 transition disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            <p className="text-xs text-blue-100 mt-3">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
