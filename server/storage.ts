import { 
  Stream, InsertStream, 
  Roadmap, InsertRoadmap, 
  RoadmapNode, InsertRoadmapNode, 
  RoadmapEdge, InsertRoadmapEdge,
  Exam, InsertExam,
  College, InsertCollege
} from "@shared/schema";

export interface IStorage {
  // Stream operations
  getStreams(): Promise<Stream[]>;
  getStreamBySlug(slug: string): Promise<Stream | undefined>;
  createStream(stream: InsertStream): Promise<Stream>;

  // Roadmap operations
  getRoadmaps(): Promise<Roadmap[]>;
  getRoadmapsByStreamId(streamId: number): Promise<Roadmap[]>;
  getRoadmapBySlug(slug: string): Promise<Roadmap | undefined>;
  getFeaturedRoadmaps(limit?: number): Promise<Roadmap[]>;
  createRoadmap(roadmap: InsertRoadmap): Promise<Roadmap>;

  // Roadmap Nodes operations
  getRoadmapNodes(roadmapId: number): Promise<RoadmapNode[]>;
  createRoadmapNode(node: InsertRoadmapNode): Promise<RoadmapNode>;

  // Roadmap Edges operations
  getRoadmapEdges(roadmapId: number): Promise<RoadmapEdge[]>;
  createRoadmapEdge(edge: InsertRoadmapEdge): Promise<RoadmapEdge>;

  // Exam operations
  getExams(): Promise<Exam[]>;
  getExamBySlug(slug: string): Promise<Exam | undefined>;
  createExam(exam: InsertExam): Promise<Exam>;

  // College operations
  getColleges(): Promise<College[]>;
  getCollegeBySlug(slug: string): Promise<College | undefined>;
  createCollege(college: InsertCollege): Promise<College>;
}

export class MemStorage implements IStorage {
  private streams: Map<number, Stream>;
  private roadmaps: Map<number, Roadmap>;
  private roadmapNodes: Map<number, RoadmapNode>;
  private roadmapEdges: Map<number, RoadmapEdge>;
  private exams: Map<number, Exam>;
  private colleges: Map<number, College>;
  
  private streamCurrentId: number;
  private roadmapCurrentId: number;
  private nodeCurrentId: number;
  private edgeCurrentId: number;
  private examCurrentId: number;
  private collegeCurrentId: number;

  constructor() {
    this.streams = new Map();
    this.roadmaps = new Map();
    this.roadmapNodes = new Map();
    this.roadmapEdges = new Map();
    this.exams = new Map();
    this.colleges = new Map();

    this.streamCurrentId = 1;
    this.roadmapCurrentId = 1;
    this.nodeCurrentId = 1;
    this.edgeCurrentId = 1;
    this.examCurrentId = 1;
    this.collegeCurrentId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  // Stream operations
  async getStreams(): Promise<Stream[]> {
    return Array.from(this.streams.values());
  }

  async getStreamBySlug(slug: string): Promise<Stream | undefined> {
    return Array.from(this.streams.values()).find(
      (stream) => stream.slug === slug,
    );
  }

  async createStream(stream: InsertStream): Promise<Stream> {
    const id = this.streamCurrentId++;
    const newStream: Stream = { ...stream, id };
    this.streams.set(id, newStream);
    return newStream;
  }

  // Roadmap operations
  async getRoadmaps(): Promise<Roadmap[]> {
    return Array.from(this.roadmaps.values());
  }

  async getRoadmapsByStreamId(streamId: number): Promise<Roadmap[]> {
    return Array.from(this.roadmaps.values()).filter(
      (roadmap) => roadmap.streamId === streamId,
    );
  }

  async getRoadmapBySlug(slug: string): Promise<Roadmap | undefined> {
    return Array.from(this.roadmaps.values()).find(
      (roadmap) => roadmap.slug === slug,
    );
  }

  async getFeaturedRoadmaps(limit?: number): Promise<Roadmap[]> {
    const featured = Array.from(this.roadmaps.values()).filter(
      (roadmap) => roadmap.featured
    );
    return limit ? featured.slice(0, limit) : featured;
  }

  async createRoadmap(roadmap: InsertRoadmap): Promise<Roadmap> {
    const id = this.roadmapCurrentId++;
    // Ensure featured is null when undefined
    const newRoadmap: Roadmap = { 
      ...roadmap, 
      id,
      featured: roadmap.featured ?? null
    };
    this.roadmaps.set(id, newRoadmap);
    return newRoadmap;
  }

  // Roadmap Nodes operations
  async getRoadmapNodes(roadmapId: number): Promise<RoadmapNode[]> {
    return Array.from(this.roadmapNodes.values()).filter(
      (node) => node.roadmapId === roadmapId,
    );
  }

  async createRoadmapNode(node: InsertRoadmapNode): Promise<RoadmapNode> {
    const id = this.nodeCurrentId++;
    const newNode: RoadmapNode = { ...node, id };
    this.roadmapNodes.set(id, newNode);
    return newNode;
  }

  // Roadmap Edges operations
  async getRoadmapEdges(roadmapId: number): Promise<RoadmapEdge[]> {
    return Array.from(this.roadmapEdges.values()).filter(
      (edge) => edge.roadmapId === roadmapId,
    );
  }

  async createRoadmapEdge(edge: InsertRoadmapEdge): Promise<RoadmapEdge> {
    const id = this.edgeCurrentId++;
    // Ensure label is null when undefined
    const newEdge: RoadmapEdge = { 
      ...edge, 
      id,
      label: edge.label || null 
    };
    this.roadmapEdges.set(id, newEdge);
    return newEdge;
  }

  // Exam operations
  async getExams(): Promise<Exam[]> {
    return Array.from(this.exams.values());
  }

  async getExamBySlug(slug: string): Promise<Exam | undefined> {
    return Array.from(this.exams.values()).find(
      (exam) => exam.slug === slug,
    );
  }

  async createExam(exam: InsertExam): Promise<Exam> {
    const id = this.examCurrentId++;
    const newExam: Exam = { ...exam, id };
    this.exams.set(id, newExam);
    return newExam;
  }

  // College operations
  async getColleges(): Promise<College[]> {
    return Array.from(this.colleges.values());
  }

  async getCollegeBySlug(slug: string): Promise<College | undefined> {
    return Array.from(this.colleges.values()).find(
      (college) => college.slug === slug,
    );
  }

  // Add to storage.ts
async getStreamById(id: number): Promise<Stream | null> {
  const streams = await this.getStreams();
  return streams.find(stream => stream.id === id) || null;
}

  async createCollege(college: InsertCollege): Promise<College> {
    const id = this.collegeCurrentId++;
    const newCollege: College = { ...college, id };
    this.colleges.set(id, newCollege);
    return newCollege;
  }

  // Initialize data
  private async initializeData() {
    // Add Streams
    const scienceStream = await this.createStream({
      name: "Science",
      slug: "science",
      description: "Explore careers in Engineering, Medicine, Research, and more.",
      icon: "flask",
      color: "blue",
      careerPaths: 50,
    });

    const commerceStream = await this.createStream({
      name: "Commerce",
      slug: "commerce",
      description: "Discover paths in Business, Finance, Accounting, Management.",
      icon: "chart-line",
      color: "emerald",
      careerPaths: 40,
    });

    const artsStream = await this.createStream({
      name: "Arts & Humanities",
      slug: "arts",
      description: "Pursue careers in Design, Law, Media, Literature, and more.",
      icon: "palette",
      color: "violet",
      careerPaths: 45,
    });

    const computerStream = await this.createStream({
      name: "Computer Science & IT",
      slug: "computer-science",
      description: "Explore technology-focused careers in Software, Data Science, AI/ML, and more.",
      icon: "laptop-code",
      color: "sky",
      careerPaths: 35,
    });

    const otherStream = await this.createStream({
      name: "Specialized Paths",
      slug: "specialized",
      description: "Explore Vocational, Diploma, and alternative careers.",
      icon: "lightbulb",
      color: "amber",
      careerPaths: 30,
    });

    // Add Roadmaps
    const engineeringRoadmap = await this.createRoadmap({
      title: "Engineering",
      slug: "engineering",
      description: "Comprehensive path to becoming an engineer - from JEE preparation to specialized branches.",
      streamId: scienceStream.id,
      duration: "4-5 years",
      degree: "B.Tech/B.E.",
      exams: ["JEE", "BITSAT", "VITEEE"],
      color: "blue",
      featured: true,
    });

    const medical = await this.createRoadmap({
      title: "Medical",
      slug: "medical",
      description: "Complete roadmap to becoming a doctor - from NEET preparation to specializations.",
      streamId: scienceStream.id,
      duration: "5.5+ years",
      degree: "MBBS/MD",
      exams: ["NEET", "AIIMS", "JIPMER"],
      color: "red",
      featured: true,
    });

    await this.createRoadmap({
      title: "Chartered Accountancy",
      slug: "chartered-accountancy",
      description: "Step-by-step guide to becoming a CA - from foundation to final examination.",
      streamId: commerceStream.id,
      duration: "4-5 years",
      degree: "CA",
      exams: ["CPT", "IPCC", "Finals"],
      color: "emerald",
      featured: true,
    });

    await this.createRoadmap({
      title: "Law",
      slug: "law",
      description: "Complete guide to becoming a lawyer - from entrance exams to specializations.",
      streamId: artsStream.id,
      duration: "3-5 years",
      degree: "LLB/BA LLB",
      exams: ["CLAT", "AILET", "LSAT"],
      color: "violet",
      featured: true,
    });

    await this.createRoadmap({
      title: "Design",
      slug: "design",
      description: "Guide to becoming a professional designer - from basics to specializations.",
      streamId: artsStream.id,
      duration: "3-4 years",
      degree: "BDes/MDes",
      exams: ["UCEED", "NID", "CEED"],
      color: "pink",
      featured: true,
    });

    await this.createRoadmap({
      title: "Management",
      slug: "management",
      description: "Roadmap to business management careers - from graduation to MBA and beyond.",
      streamId: otherStream.id,
      duration: "2-3 years",
      degree: "MBA/PGDM",
      exams: ["CAT", "XAT", "GMAT"],
      color: "amber",
      featured: true,
    });
    
    // Add new career path roadmaps
    const dataScience = await this.createRoadmap({
      title: "Data Science",
      slug: "data-science",
      description: "Complete roadmap to becoming a Data Scientist - from basics to advanced analytics.",
      streamId: computerStream.id,
      duration: "3-4 years",
      degree: "B.Tech/BSc/MSc/PhD",
      exams: ["GATE", "GRE", "University Entrance"],
      color: "cyan",
      featured: true,
    });
    
    const civilServices = await this.createRoadmap({
      title: "Civil Services",
      slug: "civil-services",
      description: "Comprehensive path to becoming an IAS, IPS, or other civil service officer.",
      streamId: otherStream.id,
      duration: "1-3 years of preparation",
      degree: "Any Bachelor's degree",
      exams: ["UPSC CSE", "State PSC"],
      color: "indigo",
      featured: true,
    });
    
    const research = await this.createRoadmap({
      title: "Research & Academia",
      slug: "research-academia",
      description: "Pathway to becoming a researcher, scientist or professor in your field of interest.",
      streamId: scienceStream.id,
      duration: "5-7 years",
      degree: "MSc/MTech/PhD",
      exams: ["GATE", "NET/JRF", "JEST"],
      color: "purple",
      featured: true,
    });
    
    const journalism = await this.createRoadmap({
      title: "Journalism & Mass Communication",
      slug: "journalism",
      description: "Guide to careers in media, journalism, content creation and communication.",
      streamId: artsStream.id,
      duration: "3-4 years",
      degree: "BA/MA/BJMC",
      exams: ["IIMC", "XIC", "University Entrance"],
      color: "rose",
      featured: true,
    });
    
    const culinary = await this.createRoadmap({
      title: "Culinary Arts",
      slug: "culinary-arts",
      description: "Path to becoming a professional chef, food critic, or culinary entrepreneur.",
      streamId: otherStream.id,
      duration: "1-4 years",
      degree: "Diploma/Bachelor's in Culinary Arts",
      exams: ["IHM JEE", "NCHMCT JEE"],
      color: "orange",
      featured: true,
    });

    // Add Engineering Roadmap Nodes
    await this.createRoadmapNode({
      roadmapId: engineeringRoadmap.id,
      title: "Class 12 Science",
      type: "step",
      description: "PCM/PCB",
      details: {
        content: `
          <div class="space-y-4">
            <p>The foundation for engineering and medical careers starts with Class 12 Science stream.</p>
            
            <div>
              <h4 class="font-medium mb-2">Key Subjects</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Physics</li>
                <li>Chemistry</li>
                <li>Mathematics (for Engineering)</li>
                <li>Biology (for Medical)</li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Preparation Strategy</h4>
              <p>Focus on building strong fundamentals while preparing for entrance exams simultaneously. Balancing board exams and entrance preparation is crucial.</p>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-medium text-blue-800 mb-2">Recommended Action</h4>
              <p class="text-blue-700">Start preparation for entrance exams at least 1-2 years before the actual exam. Consider coaching if needed.</p>
            </div>
          </div>
        `
      },
      position: { x: 450, y: 20 }
    });

    await this.createRoadmapNode({
      roadmapId: engineeringRoadmap.id,
      title: "Entrance Exams",
      type: "exam",
      description: "JEE Main/Advanced, BITSAT, etc.",
      details: {
        content: `
          <div class="space-y-4">
            <p>These competitive exams are the gateway to top engineering colleges in India.</p>
            
            <div>
              <h4 class="font-medium mb-2">Major Engineering Entrance Exams</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">JEE Main</p>
                  <p class="text-sm">For NITs, IIITs, and other CFTIs</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">JEE Advanced</p>
                  <p class="text-sm">For IITs (top 2.5 lakh JEE Main qualifiers)</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">BITSAT</p>
                  <p class="text-sm">For BITS Pilani, Goa, Hyderabad</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">State CETs</p>
                  <p class="text-sm">For state colleges (MHT-CET, WBJEE, etc.)</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Preparation Timeline</h4>
              <div class="relative pl-8 pb-4 pt-2">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-blue-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p class="font-medium">Class 11 (Year 1)</p>
                  <p class="text-sm">Master fundamentals, start with basic problems</p>
                </div>
              </div>
              <div class="relative pl-8 pb-4">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-blue-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p class="font-medium">Class 12 (Year 2)</p>
                  <p class="text-sm">Complete syllabus, practice mock tests</p>
                </div>
              </div>
              <div class="relative pl-8">
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p class="font-medium">Post Class 12</p>
                  <p class="text-sm">Final revision, exam strategies</p>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-medium text-blue-800 mb-2">Pro Tip</h4>
              <p class="text-blue-700">Take mock tests regularly to improve time management and identify weak areas that need more focus.</p>
            </div>
          </div>
        `
      },
      position: { x: 400, y: 120 }
    });

    await this.createRoadmapNode({
      roadmapId: engineeringRoadmap.id,
      title: "B.Tech/B.E. Degree",
      type: "step",
      description: "4 Years",
      details: {
        content: `
          <div class="space-y-4">
            <p>The 4-year undergraduate engineering program that builds your foundation for a technical career.</p>
            
            <div>
              <h4 class="font-medium mb-2">Popular Engineering Branches</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Computer Science Engineering</p>
                  <p class="text-sm">Software development, AI, Data Science</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Mechanical Engineering</p>
                  <p class="text-sm">Design, manufacturing, automotive</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Electrical Engineering</p>
                  <p class="text-sm">Power systems, electronics, controls</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Civil Engineering</p>
                  <p class="text-sm">Structures, transportation, environmental</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Year-wise Overview</h4>
              <div class="space-y-2">
                <div class="flex">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[70px] text-center">Year 1</span>
                  <p class="text-sm">Basic sciences, engineering fundamentals, communication skills</p>
                </div>
                <div class="flex">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[70px] text-center">Year 2</span>
                  <p class="text-sm">Core subjects specific to chosen branch</p>
                </div>
                <div class="flex">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[70px] text-center">Year 3</span>
                  <p class="text-sm">Advanced specialization, technical electives, internships</p>
                </div>
                <div class="flex">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[70px] text-center">Year 4</span>
                  <p class="text-sm">Specialized electives, final year project, placement preparation</p>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-medium text-blue-800 mb-2">Career Enhancement Tips</h4>
              <ul class="list-disc list-inside text-blue-700 space-y-1">
                <li>Participate in technical clubs and competitions</li>
                <li>Work on personal projects to build portfolio</li>
                <li>Complete internships in relevant industries</li>
                <li>Develop soft skills alongside technical skills</li>
              </ul>
            </div>
          </div>
        `
      },
      position: { x: 400, y: 220 }
    });

    await this.createRoadmapNode({
      roadmapId: engineeringRoadmap.id,
      title: "Industry Job",
      type: "step",
      description: "Software, Core, Non-Core",
      details: {
        content: `
          <div class="space-y-4">
            <p>Most engineering graduates begin their career in industry roles across various sectors.</p>
            
            <div>
              <h4 class="font-medium mb-2">Industry Sectors</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">IT & Software</p>
                  <p class="text-sm">Software development, testing, DevOps, data analysis</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Core Engineering</p>
                  <p class="text-sm">Design, manufacturing, production, maintenance</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">BFSI</p>
                  <p class="text-sm">Financial modeling, risk analysis, fintech</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Consulting</p>
                  <p class="text-sm">Technical consulting, management consulting</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Career Progression</h4>
              <div class="relative pl-8 pb-4 pt-2">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-blue-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p class="font-medium">Entry Level (0-2 years)</p>
                  <p class="text-sm">Junior Engineer, Associate, Trainee</p>
                </div>
              </div>
              <div class="relative pl-8 pb-4">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-blue-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p class="font-medium">Mid Level (3-5 years)</p>
                  <p class="text-sm">Senior Engineer, Team Lead</p>
                </div>
              </div>
              <div class="relative pl-8">
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p class="font-medium">Senior Level (6+ years)</p>
                  <p class="text-sm">Manager, Architect, Subject Matter Expert</p>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-medium text-blue-800 mb-2">Industry Trends</h4>
              <ul class="list-disc list-inside text-blue-700 space-y-1">
                <li>AI and Machine Learning integration across industries</li>
                <li>Focus on sustainable and green engineering</li>
                <li>Remote work opportunities increasing</li>
                <li>Interdisciplinary roles requiring broad skill sets</li>
              </ul>
            </div>
          </div>
        `
      },
      position: { x: 200, y: 360 }
    });

    await this.createRoadmapNode({
      roadmapId: engineeringRoadmap.id,
      title: "Higher Studies",
      type: "step",
      description: "M.Tech, MS, MBA",
      details: {
        content: `
          <div class="space-y-4">
            <p>Pursuing higher education can open up advanced career opportunities and specializations.</p>
            
            <div>
              <h4 class="font-medium mb-2">Popular Higher Education Paths</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">M.Tech/ME</p>
                  <p class="text-sm">Advanced technical specialization (2 years)</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">MS (International)</p>
                  <p class="text-sm">Research-focused specialization (1.5-2 years)</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">MBA</p>
                  <p class="text-sm">Business and management skills (2 years)</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">PhD</p>
                  <p class="text-sm">In-depth research (3-5 years)</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Key Entrance Exams</h4>
              <div class="space-y-2">
                <div class="flex">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[70px] text-center">GATE</span>
                  <p class="text-sm">For M.Tech admissions in India</p>
                </div>
                <div class="flex">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[70px] text-center">GRE</span>
                  <p class="text-sm">For MS programs abroad</p>
                </div>
                <div class="flex">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[70px] text-center">CAT/GMAT</span>
                  <p class="text-sm">For MBA programs</p>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-medium text-blue-800 mb-2">Benefits of Higher Studies</h4>
              <ul class="list-disc list-inside text-blue-700 space-y-1">
                <li>Higher salary potential and faster career growth</li>
                <li>Specialized knowledge and expertise</li>
                <li>Research and academic opportunities</li>
                <li>Global career prospects</li>
              </ul>
            </div>
          </div>
        `
      },
      position: { x: 400, y: 360 }
    });

    await this.createRoadmapNode({
      roadmapId: engineeringRoadmap.id,
      title: "Entrepreneurship",
      type: "step",
      description: "Startups, Innovation",
      details: {
        content: `
          <div class="space-y-4">
            <p>Engineering graduates are well-positioned to launch innovative startups leveraging their technical skills.</p>
            
            <div>
              <h4 class="font-medium mb-2">Startup Ecosystems</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Tech Startups</p>
                  <p class="text-sm">Software, apps, platforms, SaaS</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Hardware Innovations</p>
                  <p class="text-sm">IoT, robotics, consumer electronics</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Deep Tech</p>
                  <p class="text-sm">AI/ML, blockchain, biotech</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Service-based</p>
                  <p class="text-sm">Engineering consulting, specialized services</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Startup Journey</h4>
              <div class="relative pl-8 pb-4 pt-2">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-blue-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p class="font-medium">Ideation & Validation</p>
                  <p class="text-sm">Problem identification, market research, MVP</p>
                </div>
              </div>
              <div class="relative pl-8 pb-4">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-blue-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p class="font-medium">Early Stage</p>
                  <p class="text-sm">Seed funding, team building, product dev</p>
                </div>
              </div>
              <div class="relative pl-8">
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p class="font-medium">Growth & Scale</p>
                  <p class="text-sm">Series funding, market expansion, scaling ops</p>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-medium text-blue-800 mb-2">Support Systems</h4>
              <ul class="list-disc list-inside text-blue-700 space-y-1">
                <li>Incubators & accelerators (T-Hub, NSRCEL, etc.)</li>
                <li>Government schemes (Startup India, BIRAC)</li>
                <li>Angel investors and venture capital firms</li>
                <li>College entrepreneurship cells and networks</li>
              </ul>
            </div>
          </div>
        `
      },
      position: { x: 600, y: 360 }
    });

    // Add Data Science Roadmap Nodes
    await this.createRoadmapNode({
      roadmapId: dataScience.id,
      title: "Foundation",
      type: "step",
      description: "Mathematics & Programming Basics",
      details: {
        content: `
          <div class="space-y-4">
            <p>A strong foundation in mathematics and programming is essential for a career in data science.</p>
            
            <div>
              <h4 class="font-medium mb-2">Key Foundation Skills</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Mathematics: Statistics, Probability, Linear Algebra, Calculus</li>
                <li>Programming: Python, R</li>
                <li>Basic SQL and database concepts</li>
                <li>Data structures and algorithms</li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Learning Resources</h4>
              <p>Start with online courses, textbooks, and coding practice platforms to build your foundation.</p>
            </div>
            
            <div class="bg-cyan-50 p-4 rounded-lg">
              <h4 class="font-medium text-cyan-800 mb-2">Recommended Action</h4>
              <p class="text-cyan-700">Start with a structured mathematics course alongside learning Python, as these are the building blocks of data science.</p>
            </div>
          </div>
        `
      },
      position: { x: 450, y: 20 }
    });

    await this.createRoadmapNode({
      roadmapId: dataScience.id,
      title: "Data Analysis",
      type: "step",
      description: "Tools & Techniques",
      details: {
        content: `
          <div class="space-y-4">
            <p>Learn to analyze, clean, and visualize data using industry-standard tools and libraries.</p>
            
            <div>
              <h4 class="font-medium mb-2">Key Data Analysis Skills</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Data Manipulation</p>
                  <p class="text-sm">Pandas, NumPy, dplyr</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Data Visualization</p>
                  <p class="text-sm">Matplotlib, Seaborn, ggplot, Tableau</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">SQL & Databases</p>
                  <p class="text-sm">Advanced queries, database design</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Statistical Analysis</p>
                  <p class="text-sm">Hypothesis testing, regression, ANOVA</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Data Analysis Process</h4>
              <div class="relative pl-8 pb-4 pt-2">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-cyan-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Data Collection</p>
                  <p class="text-sm">Gathering data from various sources</p>
                </div>
              </div>
              <div class="relative pl-8 pb-4">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-cyan-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Data Cleaning</p>
                  <p class="text-sm">Handling missing values, outliers, formatting</p>
                </div>
              </div>
              <div class="relative pl-8 pb-4">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-cyan-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Exploratory Analysis</p>
                  <p class="text-sm">Finding patterns, correlations, insights</p>
                </div>
              </div>
              <div class="relative pl-8">
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Results Communication</p>
                  <p class="text-sm">Visualizations, dashboards, reports</p>
                </div>
              </div>
            </div>
            
            <div class="bg-cyan-50 p-4 rounded-lg">
              <h4 class="font-medium text-cyan-800 mb-2">Pro Tip</h4>
              <p class="text-cyan-700">Build a portfolio of data analysis projects using real-world datasets to demonstrate your skills to potential employers.</p>
            </div>
          </div>
        `
      },
      position: { x: 400, y: 120 }
    });

    await this.createRoadmapNode({
      roadmapId: dataScience.id,
      title: "Machine Learning",
      type: "step",
      description: "Algorithms & Applications",
      details: {
        content: `
          <div class="space-y-4">
            <p>Machine learning forms the core of modern data science, enabling computers to learn from data and make predictions.</p>
            
            <div>
              <h4 class="font-medium mb-2">Machine Learning Categories</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Supervised Learning</p>
                  <p class="text-sm">Regression, Classification, Ensemble methods</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Unsupervised Learning</p>
                  <p class="text-sm">Clustering, Dimensionality reduction, Association</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Reinforcement Learning</p>
                  <p class="text-sm">Q-learning, Policy Gradient methods</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Deep Learning</p>
                  <p class="text-sm">Neural networks, CNNs, RNNs, Transformers</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Key ML Libraries & Frameworks</h4>
              <div class="space-y-2">
                <div class="flex">
                  <span class="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[80px] text-center">Scikit-learn</span>
                  <p class="text-sm">General purpose ML library with classical algorithms</p>
                </div>
                <div class="flex">
                  <span class="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[80px] text-center">TensorFlow</span>
                  <p class="text-sm">End-to-end ML platform with focus on deep learning</p>
                </div>
                <div class="flex">
                  <span class="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded mr-2 min-w-[80px] text-center">PyTorch</span>
                  <p class="text-sm">Deep learning framework with dynamic computation graph</p>
                </div>
              </div>
            </div>
            
            <div class="bg-cyan-50 p-4 rounded-lg">
              <h4 class="font-medium text-cyan-800 mb-2">Career Enhancement Tips</h4>
              <ul class="list-disc list-inside text-cyan-700 space-y-1">
                <li>Participate in ML competitions (Kaggle, AI Crowd)</li>
                <li>Implement papers from conferences like NeurIPS, ICML</li>
                <li>Contribute to open-source ML projects</li>
                <li>Join ML communities and attend meetups</li>
              </ul>
            </div>
          </div>
        `
      },
      position: { x: 400, y: 220 }
    });

    await this.createRoadmapNode({
      roadmapId: dataScience.id,
      title: "Specializations",
      type: "step",
      description: "Advanced Areas",
      details: {
        content: `
          <div class="space-y-4">
            <p>As you progress in your data science career, you may choose to specialize in one or more advanced areas.</p>
            
            <div>
              <h4 class="font-medium mb-2">Popular Data Science Specializations</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Natural Language Processing</p>
                  <p class="text-sm">Text analysis, language generation, sentiment analysis</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Computer Vision</p>
                  <p class="text-sm">Image recognition, object detection, video analysis</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Time Series Analysis</p>
                  <p class="text-sm">Forecasting, anomaly detection, sequential patterns</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Big Data Analytics</p>
                  <p class="text-sm">Distributed computing, Hadoop, Spark</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Industry Applications</h4>
              <div class="relative pl-8 pb-4 pt-2">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-cyan-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Healthcare</p>
                  <p class="text-sm">Disease prediction, medical imaging, drug discovery</p>
                </div>
              </div>
              <div class="relative pl-8 pb-4">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-cyan-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Finance</p>
                  <p class="text-sm">Risk assessment, fraud detection, algorithmic trading</p>
                </div>
              </div>
              <div class="relative pl-8 pb-4">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-cyan-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Retail</p>
                  <p class="text-sm">Recommendation systems, customer segmentation</p>
                </div>
              </div>
              <div class="relative pl-8">
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Manufacturing</p>
                  <p class="text-sm">Predictive maintenance, quality control, optimization</p>
                </div>
              </div>
            </div>
            
            <div class="bg-cyan-50 p-4 rounded-lg">
              <h4 class="font-medium text-cyan-800 mb-2">Expert Advice</h4>
              <p class="text-cyan-700">Choose specializations based on your interests and market demand. Becoming an expert in a specific niche can significantly enhance your career prospects.</p>
            </div>
          </div>
        `
      },
      position: { x: 400, y: 320 }
    });

    await this.createRoadmapNode({
      roadmapId: dataScience.id,
      title: "Career Paths",
      type: "step",
      description: "Industry Roles",
      details: {
        content: `
          <div class="space-y-4">
            <p>Data science offers diverse career opportunities across various industries and roles.</p>
            
            <div>
              <h4 class="font-medium mb-2">Common Data Science Roles</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Data Analyst</p>
                  <p class="text-sm">Analyze data to provide insights and support decision-making</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Data Scientist</p>
                  <p class="text-sm">Build predictive models and advanced analytics solutions</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">Machine Learning Engineer</p>
                  <p class="text-sm">Deploy and scale ML models into production systems</p>
                </div>
                <div class="bg-gray-light p-3 rounded">
                  <p class="font-medium">AI Research Scientist</p>
                  <p class="text-sm">Develop new algorithms and advance the field</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Career Progression</h4>
              <div class="relative pl-8 pb-4 pt-2">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-cyan-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Entry Level (0-2 years)</p>
                  <p class="text-sm">Junior Data Analyst, Data Scientist</p>
                </div>
              </div>
              <div class="relative pl-8 pb-4">
                <div class="absolute top-0 left-3 h-full w-0.5 bg-cyan-200"></div>
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Mid Level (3-5 years)</p>
                  <p class="text-sm">Senior Data Scientist, ML Engineer</p>
                </div>
              </div>
              <div class="relative pl-8">
                <div class="absolute top-0 left-2 h-4 w-4 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-medium">Senior Level (6+ years)</p>
                  <p class="text-sm">Lead Data Scientist, Principal AI Engineer, Chief Data Officer</p>
                </div>
              </div>
            </div>
            
            <div class="bg-cyan-50 p-4 rounded-lg">
              <h4 class="font-medium text-cyan-800 mb-2">Industry Trends</h4>
              <ul class="list-disc list-inside text-cyan-700 space-y-1">
                <li>Growing demand for MLOps and end-to-end ML pipeline skills</li>
                <li>Increasing focus on ethical AI and responsible data science</li>
                <li>Rise of automated machine learning (AutoML) tools</li>
                <li>Integration of domain expertise with data science skills</li>
              </ul>
            </div>
          </div>
        `
      },
      position: { x: 250, y: 360 }
    });

    // Add Data Science Roadmap Edges
    await this.createRoadmapEdge({
      roadmapId: dataScience.id,
      source: "7",
      target: "8",
      label: "",
    });

    await this.createRoadmapEdge({
      roadmapId: dataScience.id,
      source: "8",
      target: "9",
      label: "",
    });

    await this.createRoadmapEdge({
      roadmapId: dataScience.id,
      source: "9",
      target: "10",
      label: "",
    });

    await this.createRoadmapEdge({
      roadmapId: dataScience.id,
      source: "10",
      target: "11",
      label: "",
    });

    // Add Roadmap Edges for Engineering
    await this.createRoadmapEdge({
      roadmapId: engineeringRoadmap.id,
      source: "1",
      target: "2",
      label: "",
    });

    await this.createRoadmapEdge({
      roadmapId: engineeringRoadmap.id,
      source: "2",
      target: "3",
      label: "",
    });

    await this.createRoadmapEdge({
      roadmapId: engineeringRoadmap.id,
      source: "3",
      target: "4",
      label: "",
    });

    await this.createRoadmapEdge({
      roadmapId: engineeringRoadmap.id,
      source: "3",
      target: "5",
      label: "",
    });

    await this.createRoadmapEdge({
      roadmapId: engineeringRoadmap.id,
      source: "3",
      target: "6",
      label: "",
    });

    // Add Exams
    await this.createExam({
      name: "JEE (Main & Advanced)",
      slug: "jee",
      description: "Joint Entrance Examination for admission to engineering colleges in India.",
      category: "Engineering",
      eligibility: "Class 12 with PCM, Age limit applies",
      frequency: "JEE Main: Twice a year | JEE Advanced: Once a year",
      importantDates: "January & April sessions for Main, June for Advanced",
      color: "blue",
    });

    await this.createExam({
      name: "NEET-UG",
      slug: "neet",
      description: "National Eligibility cum Entrance Test for admission to medical courses in India.",
      category: "Medical",
      eligibility: "Class 12 with PCB, Minimum 50% marks",
      frequency: "Once a year (May-June)",
      importantDates: "Applications: February-March, Exam: May",
      color: "red",
    });

    await this.createExam({
      name: "CLAT",
      slug: "clat",
      description: "Common Law Admission Test for admission to National Law Universities in India.",
      category: "Law",
      eligibility: "Class 12 from any stream, Min. 45-50% marks",
      frequency: "Once a year (December)",
      importantDates: "Applications: August-October, Exam: December",
      color: "violet",
    });

    await this.createExam({
      name: "CAT",
      slug: "cat",
      description: "Common Admission Test for admission to MBA programs in IIMs and other management institutes.",
      category: "Management",
      eligibility: "Bachelor's degree with min. 50% marks (45% for reserved)",
      frequency: "Once a year (November-December)",
      importantDates: "Applications: August-September, Exam: November",
      color: "emerald",
    });

    await this.createExam({
      name: "NIFT Entrance",
      slug: "nift",
      description: "National Institute of Fashion Technology entrance exam for design courses.",
      category: "Design",
      eligibility: "Class 12 from any stream, No minimum % required",
      frequency: "Once a year (January-February)",
      importantDates: "Applications: November-December, Exam: January",
      color: "pink",
    });

    await this.createExam({
      name: "CA Foundation",
      slug: "ca-foundation",
      description: "Entry-level exam for the Chartered Accountancy course in India.",
      category: "Accountancy",
      eligibility: "Class 12 from any stream, Min. 55% marks",
      frequency: "Twice a year (May and November)",
      importantDates: "Applications: Mar-Apr (May exam), Sep-Oct (Nov exam)",
      color: "amber",
    });

    // Add Colleges
    await this.createCollege({
      name: "Indian Institutes of Technology (IITs)",
      slug: "iit",
      description: "Premier engineering institutes of India with 23 campuses across the country.",
      category: "Engineering",
      entrance: ["JEE Advanced"],
      location: "Pan India",
      rating: 5,
    });

    await this.createCollege({
      name: "National Institutes of Technology (NITs)",
      slug: "nit",
      description: "Technical institutes of national importance with 31 campuses across India.",
      category: "Engineering",
      entrance: ["JEE Main"],
      location: "Pan India",
      rating: 4,
    });

    await this.createCollege({
      name: "All India Institute of Medical Sciences (AIIMS)",
      slug: "aiims",
      description: "Premier medical institutions with multiple campuses across India.",
      category: "Medical",
      entrance: ["NEET"],
      location: "Pan India",
      rating: 5,
    });
  }
}

export const storage = new MemStorage();
