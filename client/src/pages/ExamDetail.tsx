import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Exam } from '@shared/schema';
import { EXAM_DETAILS } from '@/lib/constants';

const ExamDetail = () => {
  const { slug } = useParams();
  
  // Fetch exam data
  const { data: exam, isLoading, error } = useQuery<Exam>({
    queryKey: ['/api/exams', slug],
  });
  
  // Get additional details from constants
  const examDetails = slug ? EXAM_DETAILS[slug.toLowerCase()] || null : null;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
              <div className="h-40 bg-gray-100 rounded-xl mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-40 bg-gray-100 rounded"></div>
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
  
  if (error || !exam) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-red-500 mb-4">Exam Not Found</h1>
              <p className="text-slate-600 mb-6">We couldn't find the exam you're looking for.</p>
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <section className={`bg-gradient-to-br from-${exam.color}-600 to-${exam.color}-700 py-12 text-white`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">{exam.name}</h1>
                  <p className="text-white/90 max-w-2xl">{exam.description}</p>
                  
                  {examDetails?.website && (
                    <a 
                      href={examDetails.website}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 bg-white/20 hover:bg-white/30 text-white rounded-md px-4 py-2 transition"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                      Visit Official Website
                    </a>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-lg min-w-[150px]">
                  <span className="text-sm font-medium mb-1">Category</span>
                  <span className="text-lg font-bold">{exam.category}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Information */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-dark mb-8">Key Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className={`bg-${exam.color}-50 rounded-xl p-6 border border-${exam.color}-100`}>
                <h3 className={`text-lg font-semibold text-${exam.color}-700 mb-4 flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Eligibility
                </h3>
                <p className="text-slate-700">{exam.eligibility}</p>
              </div>
              
              <div className={`bg-${exam.color}-50 rounded-xl p-6 border border-${exam.color}-100`}>
                <h3 className={`text-lg font-semibold text-${exam.color}-700 mb-4 flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Frequency
                </h3>
                <p className="text-slate-700">{exam.frequency}</p>
              </div>
              
              <div className={`bg-${exam.color}-50 rounded-xl p-6 border border-${exam.color}-100`}>
                <h3 className={`text-lg font-semibold text-${exam.color}-700 mb-4 flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Important Dates
                </h3>
                <p className="text-slate-700">{exam.importantDates}</p>
              </div>
            </div>
            
            {examDetails && (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                  <h3 className="text-xl font-bold text-dark mb-6">Exam Pattern</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-dark mb-2">Format</h4>
                      <p className="text-slate-600 mb-4">{examDetails.format}</p>
                      
                      <h4 className="font-medium text-dark mb-2">Duration</h4>
                      <p className="text-slate-600 mb-4">{examDetails.duration}</p>
                      
                      <h4 className="font-medium text-dark mb-2">Medium</h4>
                      <p className="text-slate-600">{examDetails.medium}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-dark mb-2">Sections</h4>
                      <ul className="space-y-2 text-slate-600">
                        {examDetails.sections.map((section, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-${exam.color}-500 mr-2 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {section}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                  <h3 className="text-xl font-bold text-dark mb-6">Colleges & Universities</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {examDetails.colleges.map((college, index) => (
                      <div key={index} className="bg-gray-light rounded-lg p-4">
                        <p className="font-medium text-dark">{college.name}</p>
                        <p className="text-sm text-slate-600">{college.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h3 className="text-xl font-bold text-dark mb-6">Preparation Tips</h3>
                  
                  <ul className="space-y-4">
                    {examDetails.preparationTips.map((tip, index) => (
                      <li key={index} className="flex">
                        <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full bg-${exam.color}-100 text-${exam.color}-800 font-medium text-sm mr-3 mt-0.5`}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-slate-800 mb-1">{tip.title}</p>
                          <p className="text-slate-600">{tip.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExamDetail;
