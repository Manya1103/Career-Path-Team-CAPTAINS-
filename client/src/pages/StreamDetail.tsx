import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Stream, Roadmap } from '@shared/schema';

const StreamDetail = () => {
  const { slug } = useParams();
  
  // Fetch stream data
  const { data: stream, isLoading: isLoadingStream, error: streamError } = useQuery<Stream>({
    queryKey: ['/api/streams', slug],
  });
  
  // Fetch roadmaps for this stream
  const { data: roadmaps, isLoading: isLoadingRoadmaps, error: roadmapsError } = useQuery<Roadmap[]>({
    queryKey: ['/api/roadmaps/stream', stream?.id],
    enabled: !!stream?.id,
  });
  
  const isLoading = isLoadingStream || isLoadingRoadmaps;
  const error = streamError || roadmapsError;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !stream) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-red-500 mb-4">Stream Not Found</h1>
              <p className="text-slate-600 mb-6">We couldn't find the stream you're looking for.</p>
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
        <section className={`bg-gradient-to-br from-${stream.color}-600 to-${stream.color}-700 py-16 text-white`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <div className="bg-white rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 text-${stream.color}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{stream.name}</h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mb-6">{stream.description}</p>
            <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {stream.careerPaths}+ Career Paths Available
            </div>
          </div>
        </section>
        
        {/* Roadmaps section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-dark mb-8">Career Roadmaps in {stream.name}</h2>
            
            {roadmaps && roadmaps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {roadmaps.map(roadmap => (
                  <Link key={roadmap.id} href={`/roadmap/${roadmap.slug}`}>
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer h-full">
                      <div className={`p-1 bg-gradient-to-r from-${roadmap.color}-500 to-${roadmap.color}-600`}></div>
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-dark">{roadmap.title}</h3>
                          {roadmap.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Popular</span>
                          )}
                        </div>
                        <p className="text-slate-600 mb-6 flex-grow">{roadmap.description}</p>
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
                          <span className={`text-${roadmap.color}-500 group-hover:translate-x-1 transition-transform duration-200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-light rounded-lg">
                <p className="text-slate-600">No roadmaps available for this stream yet.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* About section */}
        <section className="py-12 bg-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-dark mb-6">About {stream.name} Stream</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-dark mb-3">What You'll Learn</h3>
                  <p className="text-slate-600 mb-6">
                    The {stream.name} stream provides a strong foundation in core subjects and opens up a wide range of career opportunities. Students develop critical thinking, problem-solving, and analytical skills that are highly valued across industries.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-dark mb-3">Key Subjects</h3>
                  <ul className="space-y-2 text-slate-600">
                    {getSubjectsForStream(stream.slug).map((subject, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-${stream.color}-500 mr-2 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-dark mb-3">Career Prospects</h3>
                  <p className="text-slate-600 mb-6">
                    A degree in {stream.name} opens the door to diverse career opportunities in various sectors. Graduates can work in research, industry, academia, and more, with options for specialization and advanced studies.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-dark mb-3">Skills Developed</h3>
                  <div className="flex flex-wrap gap-2">
                    {getSkillsForStream(stream.slug).map((skill, index) => (
                      <span key={index} className={`bg-${stream.color}-100 text-${stream.color}-800 text-sm px-3 py-1 rounded-full`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Helper functions to get stream-specific information
const getSubjectsForStream = (streamSlug: string): string[] => {
  switch (streamSlug) {
    case 'science':
      return ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'];
    case 'commerce':
      return ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'Statistics'];
    case 'arts':
      return ['History', 'Geography', 'Political Science', 'Psychology', 'Sociology', 'Languages'];
    case 'specialized':
      return ['Vocational Subjects', 'Technical Skills', 'Industry-specific Knowledge', 'Practical Training'];
    default:
      return ['Core subjects', 'Elective subjects', 'Specialization courses'];
  }
};

const getSkillsForStream = (streamSlug: string): string[] => {
  switch (streamSlug) {
    case 'science':
      return ['Analytical Thinking', 'Problem Solving', 'Research Skills', 'Technical Knowledge', 'Critical Thinking', 'Attention to Detail'];
    case 'commerce':
      return ['Financial Analysis', 'Business Acumen', 'Communication', 'Numerical Skills', 'Decision Making', 'Market Analysis'];
    case 'arts':
      return ['Critical Thinking', 'Communication', 'Research', 'Analysis', 'Writing Skills', 'Cultural Awareness'];
    case 'specialized':
      return ['Technical Skills', 'Practical Application', 'Industry Knowledge', 'Specialized Expertise', 'Adaptability'];
    default:
      return ['Communication', 'Critical Thinking', 'Problem Solving', 'Research', 'Teamwork'];
  }
};

export default StreamDetail;
