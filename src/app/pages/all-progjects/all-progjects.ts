import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Notification } from '../../services/notification';

interface Project {
  title: string;
  shortDescription: string;
  longDescription: string[];

  teamSize: string;
  roles: string;
  responsibilities: string;
  impact: string;
  status: string;

  projectType: 'backend' | 'frontend' | 'fullstack' | 'cloud' | 'ai-ml' | 'exploratory' | 'system-design';

  // optional, display-only secondary tag
  secondaryType?: string;

  live?: string;
  github?: string;
  tags?: { name: string; icon: string }[];
}

interface CompanyProjects {
  name: string;
  projects: Project[];
}

interface PersonalSection {
  section: string;
  projects: Project[];
}

@Component({
  selector: 'app-all-progjects',
  imports: [CommonModule, FormsModule],
  templateUrl: './all-progjects.html',
  styleUrls: ['./all-progjects.css']
})
export class AllProgjects implements AfterViewInit, OnInit, OnDestroy {

  isMobile = false;
  expandedProject: Project | null = null;
  private lastScrollY: number | null = null;

  // =================== FILTER STATE ===================
  filterCategory: 'all' | 'professional' | 'personal' = 'all'; filterTypes: string[] = [];
  filterTech: string[] = [];
  filterLiveOnly: boolean = false;
  availableTech: { name: string; icon: string; count?: number }[] = [];

  showFilters: boolean = false; // NEW — filter panel visibility toggle

  // UI selections buffer (temp until Apply)
  pendingCategory: 'all' | 'professional' | 'personal' = 'all';
  pendingTypes: string[] = [];
  pendingTech: string[] = [];
  pendingLive = false;


  toggleFilters() {
    this.showFilters = !this.showFilters;

    // when opening: load actual values into pending
    if (this.showFilters) {
      this.pendingCategory = this.filterCategory;
      this.pendingTypes = [...this.filterTypes];
      this.pendingTech = [...this.filterTech];
      this.pendingLive = this.filterLiveOnly;
    }
  }

  applyFilters() {
    // Build a prospective view WITHOUT committing the filter state yet
    const prospectiveCategory = this.pendingCategory;
    const prospectiveTypes = [...this.pendingTypes];
    const prospectiveTech = [...this.pendingTech];
    const prospectiveLive = this.pendingLive;

    // Check if prospective filter set yields NO RESULTS
    const prospectiveResults = [
      ...this.professionalProjects.map(company =>
        company.projects.filter(p =>
          (prospectiveCategory === 'all' || (prospectiveCategory === 'professional' && this.inProfessional(p)) || (prospectiveCategory === 'personal' && this.inPersonal(p)))
          && (!prospectiveTypes.length || prospectiveTypes.includes(p.projectType))
          && (!prospectiveTech.length || prospectiveTech.every(t => p.tags?.some(pt => pt.name === t)))
          && (!prospectiveLive || p.live)
        )
      ).flat(),
      ...this.personalProjects.map(section =>
        section.projects.filter(p =>
          (prospectiveCategory === 'all' || (prospectiveCategory === 'professional' && this.inProfessional(p)) || (prospectiveCategory === 'personal' && this.inPersonal(p)))
          && (!prospectiveTypes.length || prospectiveTypes.includes(p.projectType))
          && (!prospectiveTech.length || prospectiveTech.every(t => p.tags?.some(pt => pt.name === t)))
          && (!prospectiveLive || p.live)
        )
      ).flat()
    ];

    if (prospectiveResults.length === 0) {
      // Notify and DO NOT apply filter change
      this.notification.error(
        "These filter selections return no results; your previous filters have been retained.", 8000
      );
      this.showFilters = false;
      return;
    }

    // APPLY (only if prospective results exist)
    this.filterCategory = prospectiveCategory;
    this.filterTypes = prospectiveTypes;
    this.filterTech = prospectiveTech;
    this.filterLiveOnly = prospectiveLive;
    this.showFilters = false;
  }



  // RESET button
  resetFilters() {
    this.filterCategory = 'all';
    this.filterTypes = [];
    this.filterTech = [];
    this.filterLiveOnly = false;

    this.pendingCategory = 'all';
    this.pendingTypes = [];
    this.pendingTech = [];
    this.pendingLive = false;
  }
  constructor(
    private el: ElementRef,
    private notification: Notification // ADD THIS
  ) { }


  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
    this.collectTechnologies();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });

    // Listen globally for outside clicks
    document.addEventListener('click', this.onWindowClick);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onWindowClick);
  }


  // =================== DATA ===================

  professionalProjects: CompanyProjects[] = [
      {
      name: 'Persistent Systems',
      projects: [
        {
          title: 'Employee Management System',
          shortDescription: 'FastAPI-based employee management solution for HR automation.',
          longDescription: [
            'REST APIs in FastAPI + MySQL',
            'Linux deployment, modular design',
            'Query optimisation & validations'
          ],
          teamSize: '3',
          roles: 'Backend Developer (Intern)',
          responsibilities: 'FastAPI + MySQL backend ownership',
          impact: 'Improved workflow efficiency + reduced response times',
          status: 'Delivered',
          projectType: 'fullstack',
          tags: [
            { name: "FastAPI", icon: "devicon-fastapi-plain" },
            { name: "MySQL", icon: "devicon-mysql-plain" },
            { name: "Linux", icon: "devicon-linux-plain" }
          ]
        }
      ]
    },
    {
      name: 'Xoriant Technologies',
      projects: [
        {
          title: 'Session-Based Multi-Currency Validation & Settlement Routing',
          shortDescription: 'Session-based multi-currency validation and auditing flows in an existing C++ settlement component, including cross-layer routing logic and compliance-driven behavior changes.',
          longDescription: [
            'Collaborated with Business Analysts to finalize requirements and translate functional specifications into implementation-ready designs for multi-currency settlement sessions.',
            'Redesigned portions of the existing architecture to incorporate currency validation into multiple settlement sessions without regression or breaking downstream workflows.',
            'Designed and implemented new RDM APIs (request–response flows, query structure, DB interaction patterns) required to support the new validation architecture, including separate UT coverage for API components.',
            'Analyzed existing codebase for impact areas and integrated changes across core layers: Data layer parsing, business rules & validation layer, cache layer synchronization, and DB persistence.',
            'Introduced a currency allow-list architecture to handle dynamic and static validation rules, designed for extensibility and reduced repetitive validation logic across sessions.',
            'Developed multi-session routing logic to enforce distinct behaviors for session types (ex: morning vs. end-of-day settlement behavior) and ensure isolated failure domains.',
            'Implemented Perl-based scripting functions and rule files for execution of settlement validation logic, ensuring compatibility with existing test harnesses and auto-execution setups.',
            'Collaborated with onshore and offshore technical leads to optimize performance, reduce redundant validations, and maintain coding standards across multiple components.',
            'Wrote extensive UTs (DB mocks + functional isolation), CTs for inter-component validation, and contributed to broader integration tests to ensure correctness post-deployment.',
            'Supported build and release readiness: issue identification, regression fixes, behavior verification across integration environments, and documentation for handover.'
          ],
          teamSize: '8',
          roles: 'Junior Backend Developer',
          responsibilities: 'Design collaboration, code implementation, API development, unit/component testing, integration support, and release readiness.',
          impact: 'Enabled compliant multi-currency settlements with reduced rejection rates across routing flows; improved standards alignment and ensured stability of session-based settlement behavior.',
          status: 'Production',
          projectType: 'backend',
          tags: [
            { name: "C++", icon: "devicon-cplusplus-plain" },
            { name: "IBM DB2", icon: "fas fa-database" },
            { name: "IBM MQ", icon: "fas fa-network-wired" },
            { name: "Perl", icon: "devicon-perl-plain" },
            { name: "Messaging Systems", icon: "fas fa-exchange-alt" }
          ]
        },
        {
          title: 'Standards 2025 — FXTR.08 SWIFT Trade Message Compliance',
          shortDescription: 'Implemented SWIFT FXTR.08 standards across trade lifecycle and settlement components.',
          longDescription: [
            'Owned end-to-end upgrade of FXTR.08 messaging flow for 2025 SWIFT standards compliance',
            'Performed code analysis and refactoring across C++ and Java components handling trade lifecycle events',
            'Integrated field/tag changes, validation rules, and updated audit behaviors impacting downstream systems',
            'Implemented IBM MQ updates for new message schema routing and acknowledgement behaviors',
            'Enhanced auditing logic and data visibility through IBM DB schema adjustments',
            'Co-ordinated with product/architecture team for design alignment and compliance traceability',
            'Executed integration and UAT validation across internal rails and SWIFT test environment'
          ],
          teamSize: '8',
          roles: 'Junior Backend Developer',
          responsibilities: 'Standards upgrade ownership, design collaboration, code changes, validation & testing',
          impact: 'Delivered 2025 SWIFT standards compliance; ensured production-ready FX trade flows and audit readiness',
          status: 'Production',
          projectType: 'backend',
          tags: [
            { name: "C++", icon: "devicon-cplusplus-plain" },
            { name: "Java", icon: "devicon-java-plain" },
            { name: "IBM MQ", icon: "fas fa-network-wired" },
            { name: "IBM DB", icon: "fas fa-database" },
            { name: "SWIFT Network", icon: "fas fa-exchange-alt" },
            { name: "Compliance", icon: "fas fa-shield-alt" }
          ]
        },
        {
          title: 'Build & Analysis Monitoring Dashboard',
          shortDescription: 'Internal CI observability dashboard for build health, UTC metrics, component insights, and quality trend analysis.',
          longDescription: [
            'Developed Spring Boot APIs for CI data aggregation, build/UTC metrics ingestion, and component report access',
            'Built Angular dashboard with drill-down analytics, failure categorization, and interactive component-level summaries',
            'Integrated realtime update channel (WebSockets) for live build status refresh — leveraging Java backend and/or Angular client event stream (based on environment)',
            'Implemented pre-build validators: Jira ticket checks, configuration validation, and environment gating to reduce CI failures',
            'Added UTC summaries, build duration trends, failure rate breakdown, and automated validation report generation',
            'Automated environment setup and scheduled report pipelines using Python + Ansible'
          ],
          teamSize: '3',
          roles: 'Full Stack Developer',
          responsibilities: 'API design + Angular UI + automation scripts + validation flows + realtime status integration',
          impact: 'Improved CI visibility, reduced build cycle friction, accelerated investigation times for regressions and validation failures',
          status: 'POC / Internal Pilot',
          projectType: 'fullstack',
          tags: [
            { name: "Angular", icon: "devicon-angular-plain" },
            { name: "Spring Boot", icon: "devicon-spring-plain" },
            { name: "WebSockets", icon: "fas fa-bolt" },
            { name: "Python", icon: "devicon-python-plain" },
            { name: "Ansible", icon: "devicon-ansible-plain" }
          ]
        },
      ]
    }

  ];

  personalProjects: PersonalSection[] = [
    {
      section: 'Personal Projects',
      projects: [
        {
          title: 'Go Rate-Limited Event Ingestor',
          shortDescription: 'Go + Redis event ingestor with token bucket rate limiting, JWT auth, real-time dashboard, and concurrent batch processing.',
          longDescription: [
            'Built using Go (Gin) to ingest event payloads over HTTP; token bucket rate limiting handled through Redis to maintain shared state and prevent request spikes.',
            'Implemented JWT authentication middleware so only authorized clients can submit events; unauthorized traffic is rejected before hitting ingestion logic.',
            'Used Redis both for limiter state and lightweight request bookkeeping so the service can run in more than one instance without losing rate context.',
            'Event handling is decoupled from storage using goroutine worker pools and channel queues; this keeps ingestion responsive even if DB writes slow down.',
            'Worker batches are flushed to a SQL database; retries use a `select {}`-based mechanism to handle backpressure and timeouts without blocking the main pipeline.',
            'On flush failures (DB unreachable, timeout, etc.), events are held in memory/Redis and re-attempted with a controlled retry interval instead of infinite looping.',
            'WebSockets layer streams real-time updates (new events, limiter status, queue length, and batch writes) to subscribers for visibility into ingest behavior.',
            'Small dashboard built with HTML/CSS/JS + Go to visualize throughput, queue size, limiter tokens, and refill timings; intended for debugging and local observability.',
            'Shell scripts simulate traffic in multiple modes (steady, burst, wave) so limiter behavior and buffering strategies can be validated and graphed.',
            'Deployment is a local binary but architecture supports containerizing later; primarily built for local/edge ingestion and experimentation.'
          ],
          teamSize: '1',
          roles: 'Backend Developer',
          responsibilities: 'Service architecture, Redis integration, JWT auth, retry/flush design, dashboard, scripts, documentation.',
          impact: 'Useful as a prototype for traffic shaping and controlled ingestion before scaling to message queues or larger pipelines.',
          status: 'Active',
          projectType: 'backend',
          secondaryType: 'system-design',
          github: 'https://github.com/Prateesh-Sulikeri/Go-event-ingestor',
          tags: [
            { name: "Go", icon: "devicon-go-plain-wordmark" },
            { name: "Gin", icon: "devicon-go-plain" },
            { name: "Redis", icon: "devicon-redis-plain" },
            { name: "SQL", icon: "fas fa-database" },
            { name: "JWT", icon: "fas fa-key" },
            { name: "WebSockets", icon: "fas fa-signal" },
            { name: "Concurrency", icon: "fas fa-stream" }
          ]
        },
        {
          title: 'Redditorials API — Reddit + YouTube Story Automation',
          shortDescription: 'FastAPI backend that aggregates Reddit posts, processes them, and serves structured content for downstream automation.',
          longDescription: [
            'Built a FastAPI service to fetch Reddit submissions and comments using the official Reddit API with OAuth-based authentication.',
            'Created modular API endpoints that allow clients to request content by subreddit, topic, or filters such as minimum upvotes/time range.',
            'Implemented response caching using in-memory and time-based expiration logic to reduce redundant calls to Reddit and improve responsiveness.',
            'Parsed Reddit payloads into a normalized, structured JSON format suitable for automation or consumption by other services.',
            'Included filtering layers to remove spam or low-quality content (based on upvote threshold, comment depth, blacklists, etc.) before returning results.',
            'Handled rate-limit errors from Reddit gracefully with backoff and retry policies to remain within API usage boundaries.',
            'Documented API routes using autogenerated OpenAPI docs and included example curl/python calls in the README for quick developer onboarding.',
            'Wrote unit tests for API handlers, caching logic, and filter pipelines to ensure correctness and guard against regressions.'
          ],
          teamSize: '1',
          roles: 'Backend Developer',
          responsibilities: 'API design, Reddit integration, caching, error handling, documentation.',
          impact: 'Made it easy to fetch, filter, and reuse Reddit content programmatically for content workflows or automation scripts.',
          status: 'Delivered',
          projectType: 'backend',
          github: 'https://github.com/Prateesh-Sulikeri/redditorials',
          tags: [
            { name: "Python", icon: "devicon-python-plain" },
            { name: "FastAPI", icon: "devicon-fastapi-plain" },
            { name: "Reddit API", icon: "fa-brands fa-reddit-alien" },
            { name: "Caching", icon: "fas fa-memory" },
            { name: "REST API", icon: "fas fa-plug" }
          ]
        },
        {
          title: 'JinBo — AI Portfolio Assistant',
          shortDescription: 'Express.js backend that serves a stateless conversational assistant powered by HuggingFace inference and a small local knowledge base file.',
          longDescription: [
            'Built an Express.js backend that exposes REST API endpoints for chat requests; responses are generated using HuggingFace hosted models (Inference API).',
            'Implements a lightweight RAG-like flow by matching user queries against a KB.json file; the most relevant context is appended to the prompt before inference.',
            'KB.json acts as a mini knowledge base with portfolio-related facts and predefined context chunks; retrieval is currently string/semantic matching on request.',
            'The assistant is stateless at the moment — each request is treated independently and no conversation history is stored.',
            'Added basic request validation and authentication (API key check / token) to prevent unrestricted usage of the inference endpoint.',
            'Includes a minimal client: a public/index.html page with vanilla JS that sends chat requests to the backend and displays responses.',
            'Deployment is hosted on Render (free tier) for public access; setup instructions included in the repo for local testing via npm + environment variables.',
            'Project is structured so it can be extended later with vector embeddings, conversation memory, or Redis-based session state if needed.'
          ],
          teamSize: '1',
          roles: 'Backend Developer',
          responsibilities: 'API design, HuggingFace integration, KB retrieval logic, minimal frontend, deployment.',
          impact: 'Used on my portfolio to let visitors ask questions and get contextual responses instead of static content browsing.',
          status: 'Active',
          projectType: 'backend',
          secondaryType: 'ai-ml',
          live: 'https://jinbo.onrender.com/',
          github: 'https://github.com/Prateesh-Sulikeri/JinBo',
          tags: [
            { name: "Node.js", icon: "devicon-nodejs-plain" },
            { name: "Express.js", icon: "devicon-express-original" },
            { name: "HuggingFace", icon: "fa-regular fa-face-smile-beam" },
            { name: "RAG-Lite", icon: "fas fa-brain" },
            { name: "JavaScript", icon: "devicon-javascript-plain" }
          ]
        },
        {
          title: 'CloneCatch — Image Duplicate & Face-Based Sorter',
          shortDescription: 'Python-based tool for identifying duplicate images and tagging/moving images by face matches using VGG16 encodings and traditional image hashing.',
          longDescription: [
            'Built a utility in Python that scans a local folder of images, normalizes them (e.g., converting HEIC/other formats to JPEG), and identifies duplicates and near-duplicates based on perceptual hashing and feature extraction.',
            'Used VGG16 via Keras to compute deep feature vectors for images and match them based on cosine similarity; this enabled fuzzy duplicate detection beyond simple hash matches.',
            'Integrated face-encoding extraction using `face_recognition` and OpenCV so images containing a given person could be grouped into a separate folder named after that person.',
            'Structured the workflow as multiple scripts (convert, detect duplicates, move matching images) so users can run only the steps they need for their dataset.',
            'Handled image I/O, format conversion, and consistency checks with `Pillow` and `pillow-heif` to support modern camera formats common on phones.',
            'Organized output folders for “best” and “duplicate” images to make downstream review simple and avoid manual sorting.',
            'Documentation and usage instructions included sample command flows to process thousands of images with minimal manual intervention.',
            'Developed this as a standalone tool useful for personal photo library cleanup or preprocessing before building larger ML/vision workflows.'
          ],
          teamSize: '1',
          roles: 'Tool Architect & Developer',
          responsibilities: 'Feature design, algorithm selection (perceptual hashing + deep features), scripting, test runs, documentation.',
          impact: 'Reduced manual effort for photo organization and duplicate filtering; a practical utility for photographers and hobbyists with large local libraries.',
          status: 'Delivered',
          projectType: 'exploratory',
          secondaryType: 'ai-ml',

          github: 'https://github.com/Prateesh-Sulikeri/CloneCatch',
          tags: [
            { name: "Python", icon: "devicon-python-plain" },
            { name: "Keras", icon: "devicon-keras-plain" },
            { name: "OpenCV", icon: "devicon-opencv-plain" },
            { name: "Image Processing", icon: "fas fa-image" },
            { name: "Face Recognition", icon: "fas fa-user-circle" }
          ]
        },
        {
          title: 'Go Webscraper — Configurable Scraping Utility',
          shortDescription: 'Go tool that scrapes multiple URLs concurrently using CSS selectors and outputs JSON.',
          longDescription: [
            'Command-line tool built in Go that accepts a list of URLs and a set of CSS selectors, scrapes them, and returns structured data.',
            'Uses goroutines and channels to scrape multiple URLs concurrently; concurrency limit is configurable via a CLI flag to prevent overload.',
            'HTML parsing handled using the `goquery` library; selectors resolve to text or attribute values and are stored in structured fields.',
            'Exports results as JSON (one object per URL) to support downstream data processing or ingestion into other services.',
            'Includes CLI flags for input URLs, selector lists, output file path, and concurrency level; can scrape a single URL or batch from a list.',
            'Basic retry and timeout handling using the standard library http.Client; planned for future improvements like rate limiting and sleep intervals.',
            'Error handling avoids full job failure — failed fetches log errors and continue with the remaining URLs.',
            'Designed to be extended into a larger data ingestion pipeline or integrated with headless scraping for JS-heavy sites.'
          ],
          teamSize: '1',
          roles: 'Backend Developer',
          responsibilities: 'HTML parsing, concurrency design, CLI interface, JSON structuring, documentation.',
          impact: 'Served as a reusable utility for collecting structured data when APIs are unavailable or limited.',
          status: 'Delivered',
          projectType: 'exploratory',
          secondaryType: 'backend',

          github: 'https://github.com/Prateesh-Sulikeri/Go-Webscrapper',
          tags: [
            { name: "Go", icon: "devicon-go-plain" },
            { name: "Web Scraping", icon: "fas fa-spider" },
            { name: "Concurrency", icon: "fas fa-stream" },
            { name: "goquery", icon: "fas fa-search" },
            { name: "CLI", icon: "fas fa-terminal" },
            { name: "JSON", icon: "fas fa-code" }
          ]
        }
      ]
    }
  ];

  // =================== HELPERS ===================
  private readonly TECH_PRIORITY: Record<string, number> = {
    go: 100,
    'c++': 90,
    redis: 80,
    postgres: 70,
    postgresql: 70, // handle naming variants
    angular: 60,
    python: 50
  };


  collectTechnologies() {
    const techCount = new Map<string, { count: number; icon: string }>();

    const addTags = (projects: any[]) => {
      projects.forEach(p =>
        p.tags?.forEach((t: any) => {
          if (!techCount.has(t.name)) {
            techCount.set(t.name, { count: 1, icon: t.icon });
          } else {
            techCount.get(t.name)!.count++;
          }
        })
      );
    };


    this.professionalProjects.forEach(c => addTags(c.projects));
    this.personalProjects.forEach(s => addTags(s.projects));

    this.availableTech = Array.from(techCount.entries())
      .map(([name, data]) => ({
        name,
        icon: data.icon,
        count: data.count
      }))
      .sort((a, b) => {
        const pa = this.TECH_PRIORITY[a.name.toLowerCase()] ?? 0;
        const pb = this.TECH_PRIORITY[b.name.toLowerCase()] ?? 0;

        // 1️⃣ priority first
        if (pa !== pb) return pb - pa;

        // 2️⃣ then frequency
        if (a.count !== b.count) return b.count - a.count;

        // 3️⃣ finally alphabetical (stable & predictable)
        return a.name.localeCompare(b.name);
      });

  }

  showAllTech = false;
  MAX_VISIBLE_TECH = 8;

  get visibleTech() {
    return this.showAllTech
      ? this.availableTech
      : this.availableTech.slice(0, this.MAX_VISIBLE_TECH);
  }


  // look up icon based on name (fallback)
  findIcon(name: string) {
    const match = [...this.professionalProjects, ...this.personalProjects]
      .flatMap(g => g.projects)
      .flatMap(p => p.tags || [])
      .find(t => t.name === name);

    return match?.icon || "fas fa-code"; // fallback
  }

  togglePendingType(t: string) {
    if (this.pendingTypes.includes(t)) {
      this.pendingTypes = this.pendingTypes.filter(x => x !== t);
    } else {
      this.pendingTypes.push(t);
    }
  }


  togglePendingTech(name: string) {
    if (this.pendingTech.includes(name)) {
      this.pendingTech = this.pendingTech.filter(x => x !== name);
    } else {
      this.pendingTech.push(name);
    }
  }


  // =================== FILTERS ===================

  get filteredProfessional() {
    return this.professionalProjects.map(company => ({
      ...company,
      projects: company.projects.filter(p => this.passesFilters(p))
    })).filter(x => x.projects.length);
  }

  get filteredPersonal() {
    return this.personalProjects.map(section => ({
      ...section,
      projects: section.projects.filter(p => this.passesFilters(p))
    })).filter(x => x.projects.length);
  }

  // New getter: personal projects but exclude exploratory (these will be shown in exploratory section)
  get filteredBackendAndSystemDesign() {
    return this.personalProjects.map(section => ({
      ...section,
      projects: section.projects.filter(p =>
        this.passesFilters(p) &&
        ['backend', 'cloud', 'system-design'].includes(p.projectType)
      )
    })).filter(x => x.projects.length);
  }


  // New getter: exploratory projects collected across both personal & professional (single combined section)
  get filteredExploratory() {
    return this.personalProjects.map(section => ({
      ...section,
      projects: section.projects.filter(p =>
        this.passesFilters(p) &&
        !['backend', 'cloud', 'system-design'].includes(p.projectType)
      )
    })).filter(x => x.projects.length);
  }


  passesFilters(p: Project): boolean {
    if (this.filterCategory === 'professional' && !this.inProfessional(p)) return false;
    if (this.filterCategory === 'personal' && !this.inPersonal(p)) return false;
    if (this.filterTypes.length && !this.filterTypes.includes(p.projectType)) return false;
    if (this.filterTech.length && !this.filterTech.every(t => p.tags?.some(pt => pt.name === t))) return false;
    if (this.filterLiveOnly && !p.live) return false;
    return true;
  }

  inProfessional(p: Project) { return this.professionalProjects.some(c => c.projects.includes(p)); }
  inPersonal(p: Project) { return this.personalProjects.some(s => s.projects.includes(p)); }

  // =================== UI ===================
  toggleExpand(project: Project, event?: Event) {
    if (event) event.stopPropagation();

    // If this project is already expanded → collapse on Hide Details click
    if (this.expandedProject === project) {
      this.expandedProject = null;
      return;
    }

    // Otherwise expand
    this.expandedProject = project;

    // Scroll to top of the expanded card
    setTimeout(() => {
      const el = document.querySelector('.expanded-card') as HTMLElement;
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 250);
  }


  closeExpanded(event?: Event) {
    if (event) event.stopPropagation();
    this.expandedProject = null;
  }

  onWindowClick = (event: MouseEvent) => {
    const card = (event.target as HTMLElement).closest('.expanded-card');
    if (!card) this.expandedProject = null;
  };


  statusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'active';
      case 'production':
        return 'production';
      case 'delivered':
        return 'delivered';
      case 'poc / internal pilot':
      case 'poc':
        return 'poc';
      default:
        return '';
    }
  }
  hoveredStatus: Project | null = null;

  toggleStatus(project: Project, event: Event) {
    event.stopPropagation();
    this.hoveredStatus = this.hoveredStatus === project ? null : project;
  }

  statusDescription(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Actively maintained and under ongoing development.';
      case 'production':
        return 'Running in a live production environment.';
      case 'delivered':
        return 'Development completed and formally delivered.';
      case 'poc / internal pilot':
      case 'poc':
        return 'Experimental proof of concept or internal pilot.';
      default:
        return '';
    }
  }

  onCardClick(event: any, project: Project) {
    if (!this.isMobile) this.toggleExpand(project);
  }
  /**
 * Human-friendly label for projectType
 */
  projectTypeLabel(pt: string): string {
    if (!pt) return '';
    const key = pt.toLowerCase();
    const map: Record<string, string> = {
      'ai-ml': 'AI/ML',
      'ai_ml': 'AI/ML',
      'fullstack': 'Full Stack',
      'backend': 'Backend',
      'frontend': 'Frontend',
      'cloud': 'Cloud',
      'exploratory': 'Exploratory'
    };
    return map[key] ?? pt.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  /**
   * CSS-friendly class name for the pill (optional; no CSS required to exist)
   * Example returns: "type-backend", "type-ai-ml"
   */
  projectTypeClass(pt: string): string {
    if (!pt) return '';
    return 'type-' + pt.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  /**
   * Secondary display helpers (display-only; do not affect filters)
   */
  projectSecondaryLabel(st: string): string {
    if (!st) return '';
    const key = st.toLowerCase();
    const map: Record<string, string> = {
      'ai-ml': 'AI/ML',
      'system-design': 'System Design',
      'data': 'Data',
      'ml': 'ML',
      'research': 'Research'
    };
    return map[key] ?? st.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  projectSecondaryClass(st: string): string {
    if (!st) return '';
    return 'type-secondary-' + st.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

}
