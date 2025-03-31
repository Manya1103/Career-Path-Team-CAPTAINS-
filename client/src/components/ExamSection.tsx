import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Exam } from "@shared/schema";

const ExamCard = ({ exam }: { exam: Exam }) => {
  // Generate color classes based on the exam's color
  const borderColorClass = `border-t-${exam.color}-500`;
  const textColorClass = `text-${exam.color}-500`;
  const hoverTextColorClass = `hover:text-${exam.color}-700`;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
      <div className={`h-2 bg-${exam.color}-500`}></div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-dark">{exam.name}</h3>
          <span className={`bg-${exam.color}-100 text-${exam.color}-800 text-xs font-medium px-2.5 py-0.5 rounded`}>{exam.category}</span>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Eligibility</h4>
            <p className="text-sm text-slate-600">{exam.eligibility}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Frequency</h4>
            <p className="text-sm text-slate-600">{exam.frequency}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Important Dates</h4>
            <p className="text-sm text-slate-600">{exam.importantDates}</p>
          </div>
        </div>
        
        <Link href={`/exam/${exam.slug}`} className={`inline-flex items-center ${textColorClass} ${hoverTextColorClass} font-medium`}>
          View Exam Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const ExamSection = () => {
  const { data: exams, isLoading, error } = useQuery<Exam[]>({
    queryKey: ['/api/exams'],
  });

  if (isLoading) {
    return (
      <section id="exams" className="py-16 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-4">Important Entrance Exams</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">Prepare for the most critical entrance examinations across different streams.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !exams) {
    return (
      <section id="exams" className="py-16 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-4">Important Entrance Exams</h2>
          <div className="text-center text-red-500">
            <p>Failed to load exams data. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="exams" className="py-16 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-dark text-center mb-4">Important Entrance Exams</h2>
        <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">Prepare for the most critical entrance examinations across different streams.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map(exam => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/exams" className="inline-flex items-center px-6 py-3 border border-primary text-primary bg-white hover:bg-primary hover:text-white transition-colors rounded-md font-medium">
            View All Entrance Exams
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExamSection;
