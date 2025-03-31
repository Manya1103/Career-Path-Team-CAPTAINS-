interface College {
  name: string;
  location: string;
}

interface PreparationTip {
  title: string;
  description: string;
}

interface ExamDetail {
  format: string;
  duration: string;
  medium: string;
  sections: string[];
  colleges: College[];
  preparationTips: PreparationTip[];
  website?: string; // Official exam website URL
}

export const EXAM_DETAILS: Record<string, ExamDetail> = {
  'jee': {
    format: 'Computer-based online test with multiple-choice questions and numerical value questions',
    duration: 'JEE Main: 3 hours | JEE Advanced: 6 hours (two papers of 3 hours each)',
    medium: 'English, Hindi, and other regional languages (for JEE Main)',
    website: 'https://jeemain.nta.nic.in/',
    sections: [
      'Physics',
      'Chemistry',
      'Mathematics'
    ],
    colleges: [
      { name: 'Indian Institute of Technology (IIT) Bombay', location: 'Mumbai' },
      { name: 'Indian Institute of Technology (IIT) Delhi', location: 'New Delhi' },
      { name: 'Indian Institute of Technology (IIT) Madras', location: 'Chennai' },
      { name: 'Indian Institute of Technology (IIT) Kanpur', location: 'Kanpur' },
      { name: 'Indian Institute of Technology (IIT) Kharagpur', location: 'Kharagpur' },
      { name: 'National Institute of Technology (NIT) Tiruchirappalli', location: 'Tiruchirappalli' }
    ],
    preparationTips: [
      {
        title: 'Understand the syllabus thoroughly',
        description: 'Begin by thoroughly understanding the JEE syllabus and marking important topics based on their weightage in previous exams.'
      },
      {
        title: 'Create a study plan',
        description: 'Design a well-structured study plan with dedicated time slots for each subject and include regular revision sessions.'
      },
      {
        title: 'Master the fundamentals',
        description: 'Focus on building strong fundamentals before moving to advanced topics. Clear your basics before attempting complex problems.'
      },
      {
        title: 'Practice regularly',
        description: 'Solve a variety of problems daily, including previous years\' question papers and mock tests to improve speed and accuracy.'
      },
      {
        title: 'Review and analyze mistakes',
        description: 'Regularly review your performance in practice tests, identify weak areas, and work specifically on improving them.'
      }
    ]
  },
  'neet': {
    format: 'Pen and paper-based test with multiple-choice questions',
    duration: '3 hours (180 minutes)',
    medium: 'English, Hindi, and other regional languages',
    website: 'https://neet.nta.nic.in/',
    sections: [
      'Physics',
      'Chemistry',
      'Biology (Botany & Zoology)'
    ],
    colleges: [
      { name: 'All India Institute of Medical Sciences (AIIMS)', location: 'New Delhi' },
      { name: 'Armed Forces Medical College (AFMC)', location: 'Pune' },
      { name: 'Christian Medical College (CMC)', location: 'Vellore' },
      { name: 'Jawaharlal Institute of Postgraduate Medical Education & Research (JIPMER)', location: 'Puducherry' },
      { name: 'King George\'s Medical University (KGMU)', location: 'Lucknow' },
      { name: 'Maulana Azad Medical College', location: 'New Delhi' }
    ],
    preparationTips: [
      {
        title: 'Focus on NCERT books',
        description: 'NCERT textbooks are the foundation for NEET preparation. Master every concept and example given in these books.'
      },
      {
        title: 'Understand diagrams and illustrations',
        description: 'Biology requires thorough understanding of diagrams. Practice drawing and labeling important biological structures.'
      },
      {
        title: 'Regular revision is key',
        description: 'Create short notes and regularly revise them. Biology especially requires frequent revision due to its vast syllabus.'
      },
      {
        title: 'Practice MCQs extensively',
        description: 'Solve as many MCQs as possible, including previous years\' papers to understand the question pattern and improve speed.'
      },
      {
        title: 'Take regular mock tests',
        description: 'Simulate the actual exam environment by taking full-length mock tests regularly to build stamina and time management skills.'
      }
    ]
  },
  'clat': {
    format: 'Computer-based online test with multiple-choice questions',
    duration: '2 hours (120 minutes)',
    medium: 'English only',
    website: 'https://consortiumofnlus.ac.in/',
    sections: [
      'English Language',
      'Current Affairs & General Knowledge',
      'Legal Reasoning',
      'Logical Reasoning',
      'Quantitative Techniques'
    ],
    colleges: [
      { name: 'National Law School of India University (NLSIU)', location: 'Bangalore' },
      { name: 'National Law University (NLU)', location: 'Delhi' },
      { name: 'NALSAR University of Law', location: 'Hyderabad' },
      { name: 'West Bengal National University of Juridical Sciences (NUJS)', location: 'Kolkata' },
      { name: 'National Law Institute University (NLIU)', location: 'Bhopal' },
      { name: 'Gujarat National Law University (GNLU)', location: 'Gandhinagar' }
    ],
    preparationTips: [
      {
        title: 'Read extensively',
        description: 'Develop a habit of reading newspapers, magazines, and books to improve comprehension skills and general awareness.'
      },
      {
        title: 'Focus on current affairs',
        description: 'Stay updated with national and international current events, especially those related to law, politics, economy, and society.'
      },
      {
        title: 'Practice legal reasoning',
        description: 'Develop the ability to apply legal principles to factual scenarios by practicing legal reasoning questions regularly.'
      },
      {
        title: 'Enhance logical reasoning skills',
        description: 'Solve a variety of logical reasoning problems including analytical reasoning, syllogisms, and logical deductions.'
      },
      {
        title: 'Improve English proficiency',
        description: 'Work on grammar, vocabulary, and reading comprehension to excel in the English language section of the exam.'
      }
    ]
  },
  'cat': {
    format: 'Computer-based online test with multiple-choice and non-MCQ questions',
    duration: '2 hours (120 minutes) with sectional time limits',
    medium: 'English only',
    website: 'https://iimcat.ac.in/',
    sections: [
      'Verbal Ability & Reading Comprehension (VARC)',
      'Data Interpretation & Logical Reasoning (DILR)',
      'Quantitative Ability (QA)'
    ],
    colleges: [
      { name: 'Indian Institute of Management (IIM)', location: 'Ahmedabad' },
      { name: 'Indian Institute of Management (IIM)', location: 'Bangalore' },
      { name: 'Indian Institute of Management (IIM)', location: 'Calcutta' },
      { name: 'Indian Institute of Management (IIM)', location: 'Lucknow' },
      { name: 'Faculty of Management Studies (FMS)', location: 'Delhi' },
      { name: 'S.P. Jain Institute of Management and Research', location: 'Mumbai' }
    ],
    preparationTips: [
      {
        title: 'Understand the exam pattern',
        description: 'Familiarize yourself with the CAT exam pattern, sectional distribution, and marking scheme to plan your strategy.'
      },
      {
        title: 'Build strong fundamentals',
        description: 'Strengthen your basics in mathematics, English grammar, and logical reasoning before moving to advanced topics.'
      },
      {
        title: 'Improve reading speed',
        description: 'Practice reading comprehension regularly to improve your reading speed and comprehension abilities.'
      },
      {
        title: 'Develop calculation speed',
        description: 'Work on mental math techniques to improve calculation speed for the quantitative ability section.'
      },
      {
        title: 'Take mock tests',
        description: 'Regularly attempt full-length mock tests to assess your preparation level and identify areas that need improvement.'
      }
    ]
  },
  'nift': {
    format: 'Pen and paper-based test with multiple-choice questions and creative ability test',
    duration: 'GAT: 2 hours | CAT: 2 hours',
    medium: 'English only',
    website: 'https://nift.ac.in/admission',
    sections: [
      'General Ability Test (GAT)',
      'Creative Ability Test (CAT)',
      'Situation Test (for B.Des)',
      'Personal Interview (for all courses)'
    ],
    colleges: [
      { name: 'National Institute of Fashion Technology', location: 'New Delhi' },
      { name: 'National Institute of Fashion Technology', location: 'Mumbai' },
      { name: 'National Institute of Fashion Technology', location: 'Kolkata' },
      { name: 'National Institute of Fashion Technology', location: 'Chennai' },
      { name: 'National Institute of Fashion Technology', location: 'Hyderabad' },
      { name: 'National Institute of Fashion Technology', location: 'Bangalore' }
    ],
    preparationTips: [
      {
        title: 'Develop your creativity',
        description: 'Practice various drawing and sketching techniques regularly to enhance your creative abilities.'
      },
      {
        title: 'Improve visualization skills',
        description: 'Work on your ability to visualize 3D objects and translate them onto paper through regular practice.'
      },
      {
        title: 'Stay updated with fashion trends',
        description: 'Keep yourself updated with current fashion trends, designers, and industry knowledge for the general awareness section.'
      },
      {
        title: 'Create a portfolio',
        description: 'Build a strong portfolio of your creative work that showcases your design skills and aesthetic sense.'
      },
      {
        title: 'Practice time management',
        description: 'Practice completing design tasks within time constraints to prepare for the timed creative ability test.'
      }
    ]
  },
  'ca-foundation': {
    format: 'Pen and paper-based test with multiple-choice and descriptive questions',
    duration: '3 hours for each paper (total 4 papers)',
    medium: 'English and Hindi',
    website: 'https://www.icai.org/post/foundation-course',
    sections: [
      'Principles and Practice of Accounting',
      'Business Laws and Business Correspondence and Reporting',
      'Business Mathematics and Logical Reasoning & Statistics',
      'Business Economics and Business and Commercial Knowledge'
    ],
    colleges: [
      { name: 'The Institute of Chartered Accountants of India', location: 'New Delhi' },
      { name: 'ICAI Centre of Excellence', location: 'Hyderabad' },
      { name: 'ICAI Centre of Excellence', location: 'Jaipur' },
      { name: 'Recognized Coaching Institutes across India', location: 'Pan India' }
    ],
    preparationTips: [
      {
        title: 'Master accounting fundamentals',
        description: 'Build a strong foundation in accounting principles, concepts, and practices through regular practice.'
      },
      {
        title: 'Focus on conceptual clarity',
        description: 'Understand the concepts thoroughly rather than rote learning to solve diverse accounting problems.'
      },
      {
        title: 'Regular practice is key',
        description: 'Practice accounting problems and numerical questions daily to improve accuracy and speed.'
      },
      {
        title: 'Stay updated with business laws',
        description: 'Keep yourself updated with current business laws, amendments, and their applications.'
      },
      {
        title: 'Develop mathematical aptitude',
        description: 'Work on strengthening your mathematical skills for business mathematics and statistics section.'
      }
    ]
  }
};
