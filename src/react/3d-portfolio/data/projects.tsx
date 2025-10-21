import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { DiJava, DiRust } from 'react-icons/di'
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from 'react-icons/ri'
import {
  SiApachekafka,
  SiCanvas,
  SiChakraui,
  SiClickhouse,
  SiDocker,
  SiElasticsearch,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiJquery,
  SiMongodb,
  SiOracle,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiRedis,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiSvg,
  SiSwift,
  SiTailwindcss,
  SiTauri,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si'
import { TbBrandFramerMotion } from 'react-icons/tb'
import AceTernityLogo from '../components/logos/aceternity'
import SlideShow from '../components/slide-show'
import { Button } from '../components/ui/button'
import { TypographyH3, TypographyP } from '../components/ui/typography'

const BASE_PATH = '/assets/projects-screenshots'

function ProjectsLinks({ live, repo }: { live: string, repo?: string }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant="default" size="sm">
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant="default" size="sm">
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  )
}

export interface Skill {
  title: string
  bg: string
  fg: string
  icon: ReactNode
}
const PROJECT_SKILLS = {
  next: {
    title: 'Next.js',
    bg: 'black',
    fg: 'white',
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: 'Chakra UI',
    bg: 'black',
    fg: 'white',
    icon: <SiChakraui />,
  },
  node: {
    title: 'Node.js',
    bg: 'black',
    fg: 'white',
    icon: <RiNodejsFill />,
  },
  python: {
    title: 'Python',
    bg: 'black',
    fg: 'white',
    icon: <SiPython />,
  },
  prisma: {
    title: 'prisma',
    bg: 'black',
    fg: 'white',
    icon: <SiPrisma />,
  },
  postgres: {
    title: 'PostgreSQL',
    bg: 'black',
    fg: 'white',
    icon: <SiPostgresql />,
  },
  mongo: {
    title: 'MongoDB',
    bg: 'black',
    fg: 'white',
    icon: <SiMongodb />,
  },
  express: {
    title: 'Express',
    bg: 'black',
    fg: 'white',
    icon: <SiExpress />,
  },
  reactQuery: {
    title: 'React Query',
    bg: 'black',
    fg: 'white',
    icon: <SiReactquery />,
  },
  shadcn: {
    title: 'ShanCN UI',
    bg: 'black',
    fg: 'white',
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: 'Aceternity',
    bg: 'black',
    fg: 'white',
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: 'Tailwind',
    bg: 'black',
    fg: 'white',
    icon: <SiTailwindcss />,
  },
  docker: {
    title: 'Docker',
    bg: 'black',
    fg: 'white',
    icon: <SiDocker />,
  },
  yjs: {
    title: 'Y.js',
    bg: 'black',
    fg: 'white',
    icon: (
      <span>
        <strong>Y</strong>
        js
      </span>
    ),
  },
  firebase: {
    title: 'Firebase',
    bg: 'black',
    fg: 'white',
    icon: <SiFirebase />,
  },
  sockerio: {
    title: 'Socket.io',
    bg: 'black',
    fg: 'white',
    icon: <SiSocketdotio />,
  },
  js: {
    title: 'JavaScript',
    bg: 'black',
    fg: 'white',
    icon: <SiJavascript />,
  },
  canvas: {
    title: 'Canvas',
    bg: 'black',
    fg: 'white',
    icon: <SiCanvas />,
  },
  svg: {
    title: 'Svg',
    bg: 'black',
    fg: 'white',
    icon: <SiSvg />,
  },
  jquery: {
    title: 'jQuery',
    bg: 'black',
    fg: 'white',
    icon: <SiJquery />,
  },
  ts: {
    title: 'TypeScript',
    bg: 'black',
    fg: 'white',
    icon: <SiTypescript />,
  },
  vue: {
    title: 'Vue.js',
    bg: 'black',
    fg: 'white',
    icon: <SiVuedotjs />,
  },
  react: {
    title: 'React.js',
    bg: 'black',
    fg: 'white',
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: 'Sanity',
    bg: 'black',
    fg: 'white',
    icon: <SiSanity />,
  },
  spline: {
    title: 'Spline',
    bg: 'black',
    fg: 'white',
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: 'GSAP',
    bg: 'black',
    fg: 'white',
    icon: '',
  },
  framerMotion: {
    title: 'Framer Motion',
    bg: 'black',
    fg: 'white',
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: 'Supabase',
    bg: 'black',
    fg: 'white',
    icon: <SiSupabase />,
  },
  rust: {
    title: 'Rust',
    bg: 'black',
    fg: 'white',
    icon: <DiRust />,
  },
  java: {
    title: 'Java',
    bg: 'black',
    fg: 'white',
    icon: <DiJava />,
  },
  kafka: {
    title: 'Kafka',
    bg: 'black',
    fg: 'white',
    icon: <SiApachekafka />,
  },
  redis: {
    title: 'Redis',
    bg: 'black',
    fg: 'white',
    icon: <SiRedis />,
  },
  elasticsearch: {
    title: 'Elasticsearch',
    bg: 'black',
    fg: 'white',
    icon: <SiElasticsearch />,
  },
  swift: {
    title: 'Swift',
    bg: 'black',
    fg: 'white',
    icon: <SiSwift />,
  },
  oracle: {
    title: 'Oracle',
    bg: 'black',
    fg: 'white',
    icon: <SiOracle />,
  },
  clickhouse: {
    title: 'Clickhouse',
    bg: 'black',
    fg: 'white',
    icon: <SiClickhouse />,
  },
  tauri: {
    title: 'Tauri',
    bg: 'black',
    fg: 'white',
    icon: <SiTauri />,
  },
}
export interface Project {
  id: string
  category: string
  title: string
  src: string
  screenshots: string[]
  skills: { frontend: Skill[], backend: Skill[] }
  content: React.ReactNode | any
  github?: string
  live: string
}
const projects: Project[] = [
  {
    id: 'pmone-db',
    category: 'PMone platform',
    title: 'Low-Code Large Screen Editor',
    src: '/assets/projects-screenshots/pmone-db/landing.png',
    screenshots: ['landing.png'],
    skills: {
      frontend: [
        PROJECT_SKILLS.vue,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.postgres,
      ],
    },
    live: 'https://demo.dclingcloud.com:10443',
    github: '',
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            A low-code platform for building interactive data dashboards.
            Design, configure, and deploy enterprise-grade visualizations — all in your browser,
            without writing complex code.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">🎨 Dataview Editor</TypographyH3>
          <p className="font-mono mb-2">
            The visual editing workspace where you design and configure dataviews
            with drag-and-drop components, real-time preview, and data binding.
            Empower developers and analysts to build rich interfaces efficiently.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone-db/landing.png`,
              `${BASE_PATH}/pmone-db/db-editor.jpg`,
              `${BASE_PATH}/pmone-db/db-editor-2.jpg`,
              `${BASE_PATH}/pmone-db/db-editor-3.jpg`,
              `${BASE_PATH}/pmone-db/db-editor-4.jpg`,
              `${BASE_PATH}/pmone-db/db-editor-5.jpg`,
              `${BASE_PATH}/pmone-db/db-editor-6.jpg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Dataview Showcase</TypographyH3>
          <p className="font-mono mb-2">
            Real-world data dataviews created with the editor — from enterprise
            monitoring centers to smart city visualizations.
            Each screen demonstrates the platform’s flexibility, scalability,
            and high-performance rendering.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone-db/db-screen.png`,
              `${BASE_PATH}/pmone-db/db-screen-2.png`,
              `${BASE_PATH}/pmone-db/db-screen-3.png`,
              `${BASE_PATH}/pmone-db/db-screen-4.png`,
              `${BASE_PATH}/pmone-db/db-screen-5.png`,
              `${BASE_PATH}/pmone-db/db-screen-6.png`,
              `${BASE_PATH}/pmone-db/db-screen-7.png`,
              `${BASE_PATH}/pmone-db/db-screen-8.png`,
              `${BASE_PATH}/pmone-db/db-screen-9.png`,
              `${BASE_PATH}/pmone-db/db-screen-10.png`,
              `${BASE_PATH}/pmone-db/db-screen-11.png`,
              `${BASE_PATH}/pmone-db/db-screen-12.png`,
              `${BASE_PATH}/pmone-db/db-screen-13.png`,
              `${BASE_PATH}/pmone-db/db-screen-14.png`,
              `${BASE_PATH}/pmone-db/db-screen-15.png`,
              `${BASE_PATH}/pmone-db/db-screen-16.png`,
              `${BASE_PATH}/pmone-db/db-screen-17.png`,
              `${BASE_PATH}/pmone-db/db-screen-18.png`,
              `${BASE_PATH}/pmone-db/db-screen-19.png`,
              `${BASE_PATH}/pmone-db/db-screen-20.png`,
              `${BASE_PATH}/pmone-db/db-screen.jpg`,
              `${BASE_PATH}/pmone-db/db-screen-2.jpg`,
              `${BASE_PATH}/pmone-db/db-screen-3.jpg`,
              `${BASE_PATH}/pmone-db/db-screen-4.jpg`,
              `${BASE_PATH}/pmone-db/db-screen-5.jpg`,
              `${BASE_PATH}/pmone-db/db-screen-6.jpg`,
            ]}
          />
        </div>
      )
    },
  },
  {
    id: 'pmone-report',
    category: 'PMone platform',
    title: 'Low-Code Report Editor',
    src: '/assets/projects-screenshots/pmone-report/landing.png',
    screenshots: ['landing.png'],
    skills: {
      frontend: [
        PROJECT_SKILLS.vue,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.elasticsearch,
        PROJECT_SKILLS.postgres,
      ],
    },
    live: 'https://demo.dclingcloud.com:10443',
    github: '',
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            A low-code report editor that lets users quickly create and customize reports through an intuitive visual interface. The backend automatically generates reports and sends them via email on a schedule, enabling automated data distribution.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">🎨 Report Editor</TypographyH3>
          <p className="font-mono mb-2">
            Users can design reports visually, configure automated email delivery, and ensure timely access to important data. This improves workflow efficiency and reduces manual effort.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone-report/landing.png`,
              `${BASE_PATH}/pmone-report/report-editor.jpg`,
            ]}
          />
        </div>
      )
    },
  },
  {
    id: 'pmone',
    category: 'PMone platform',
    title: 'PMone',
    src: '/assets/projects-screenshots/pmone/landing.png',
    screenshots: ['landing.png'],
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.jquery,
        PROJECT_SKILLS.vue,
        PROJECT_SKILLS.canvas,
        PROJECT_SKILLS.svg,
        PROJECT_SKILLS.swift,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.rust,
        PROJECT_SKILLS.java,
        PROJECT_SKILLS.oracle,
        PROJECT_SKILLS.clickhouse,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.elasticsearch,
        PROJECT_SKILLS.kafka,
        PROJECT_SKILLS.docker,
      ],
    },
    live: 'https://demo.dclingcloud.com:10443',
    github: '',
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            The PMone Monitoring Platform is a comprehensive, full-stack monitoring solution designed to provide enterprises with real-time insights into their systems, applications, and business processes. It enables operations, development, and business teams to proactively detect performance bottlenecks, understand user behavior, and ensure the stability and reliability of critical services.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">🎨 Server Monitoring</TypographyH3>
          <p className="font-mono mb-2">
            The Server Monitoring module gives operations teams a complete view of server health, including CPU, memory, disk, and network usage. It tracks service calls and interface performance to identify latency or errors, analyzes SQL queries for database optimization, monitors individual application instances, and captures program exceptions. By including external service monitoring, teams can also ensure that third-party dependencies do not disrupt business continuity, allowing issues to be resolved before they impact users.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-server.jpg`,
              `${BASE_PATH}/pmone/pm-server-2.jpg`,
              `${BASE_PATH}/pmone/pm-server-3.jpg`,
              `${BASE_PATH}/pmone/pm-server-4.jpg`,
              `${BASE_PATH}/pmone/pm-server-5.jpg`,
              `${BASE_PATH}/pmone/pm-server-6.jpg`,
              `${BASE_PATH}/pmone/pm-server-7.jpg`,
              `${BASE_PATH}/pmone/pm-server-8.jpg`,
              `${BASE_PATH}/pmone/pm-server-9.png`,
              `${BASE_PATH}/pmone/pm-server-10.png`,
              `${BASE_PATH}/pmone/pm-server-12.png`,
              `${BASE_PATH}/pmone/pm-server-13.jpg`,
              `${BASE_PATH}/pmone/pm-server-14.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">🎨 Web Monitoring</TypographyH3>
          <p className="font-mono mb-2">
            The Web Monitoring module helps front-end and operations teams understand website performance and user behavior in detail. It provides an overall performance overview, page load and rendering analysis, and tracks interface requests and errors. Detailed logs allow teams to pinpoint problems, while JavaScript error monitoring ensures smoother user experiences. Additional features like regional and browser analytics, user tracking, and operation analysis help optimize user flows, improve conversion rates, and make informed design improvements.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-web.jpg`,
              `${BASE_PATH}/pmone/pm-web-2.jpg`,
              `${BASE_PATH}/pmone/pm-web-3.jpg`,
              `${BASE_PATH}/pmone/pm-web-4.jpg`,
              `${BASE_PATH}/pmone/pm-web-5.jpg`,
              `${BASE_PATH}/pmone/pm-web-6.jpg`,
              `${BASE_PATH}/pmone/pm-web-7.jpg`,
              `${BASE_PATH}/pmone/pm-web-8.jpg`,
              `${BASE_PATH}/pmone/pm-web-9.jpg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">🎨 APP Monitoring</TypographyH3>
          <p className="font-mono mb-2">
            For mobile applications, the APP Monitoring module provides visibility into both Android and iOS apps, enabling teams to track performance and user activity in real-world conditions. It monitors interface calls, network performance, crashes, lag, and startup speed, ensuring that applications remain responsive and stable. Page analytics, user tracking, regional analysis, and version comparisons support precise optimization, while crash and lag detection allow developers to quickly identify and fix issues that might affect the user experience.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-app.jpg`,
              `${BASE_PATH}/pmone/pm-app-2.jpg`,
              `${BASE_PATH}/pmone/pm-app-3.jpg`,
              `${BASE_PATH}/pmone/pm-app-4.jpg`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🎨 Business Analysis</TypographyH3>
          <p className="font-mono mb-2">
            The Business Analysis module enables companies to monitor key business metrics and processes in real time, supporting management and operations teams in making data-driven decisions. By tracking critical business indicators, quickly retrieving business logs, and focusing on core business groups, the platform helps detect anomalies, optimize processes, and uncover opportunities for growth.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-business.jpg`,
              `${BASE_PATH}/pmone/pm-business-2.jpg`,
              `${BASE_PATH}/pmone/pm-business-3.jpg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">🎨 User Profiling Analysis</TypographyH3>
          <p className="font-mono mb-2">
            The User Profiling Analysis module provides valuable insights into user behavior, helping product, marketing, and operations teams make informed decisions. It analyzes overall user activity, tracks geographic distribution via IP statistics, and highlights high-value VIP users, providing actionable insights for retention strategies, targeted campaigns, and user experience optimization.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-user.jpg`,
              `${BASE_PATH}/pmone/pm-user-2.jpg`,
              `${BASE_PATH}/pmone/pm-user-3.jpg`,
              `${BASE_PATH}/pmone/pm-user-4.jpg`,
              `${BASE_PATH}/pmone/pm-user-5.png`,
              `${BASE_PATH}/pmone/pm-user-6.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">🎨  Service Topology</TypographyH3>
          <p className="font-mono mb-2">
            The Service Topology module visually maps the relationships and dependencies between services, enabling rapid diagnosis of system bottlenecks and potential failure points. By analyzing service calls and request chains, operations and development teams can quickly locate problematic nodes and improve system architecture reliability.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-topo-v2.png`,
              `${BASE_PATH}/pmone/pm-topo-v2-2.png`,
              `${BASE_PATH}/pmone/pm-topo-v2-3.png`,
              `${BASE_PATH}/pmone/pm-topo-v2-4.png`,
              `${BASE_PATH}/pmone/pm-topo-v2-5.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">🎨 Middleware Monitoring</TypographyH3>
          <p className="font-mono mb-2">
            The Middleware Monitoring module ensures databases and message queues remain reliable and performant. It monitors relational and NoSQL databases, as well as messaging systems like Kafka, RabbitMQ, ActiveMQ, and MSMQ, helping teams detect bottlenecks, prevent data loss, and maintain smooth business operations.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-mid.jpg`,
              `${BASE_PATH}/pmone/pm-mid-2.jpg`,
              `${BASE_PATH}/pmone/pm-mid-3.jpg`,
              `${BASE_PATH}/pmone/pm-mid-4.jpg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">🎨 Kubernetes Monitoring,</TypographyH3>
          <p className="font-mono mb-2">
            With Kubernetes Monitoring, teams gain full visibility into clusters and containerized applications. The module tracks cluster health, namespace resource allocation, node and container load, and individual pod performance, allowing teams to detect anomalies quickly and optimize resource scheduling for cloud-native environments.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-k8s.jpg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">🎨  Host Monitoring</TypographyH3>
          <p className="font-mono mb-2">
            The Host Monitoring module keeps track of physical and virtual machines, monitoring critical metrics such as CPU, memory, disk, and network usage. This ensures infrastructure stability and enables proactive resource scaling to avoid performance degradation.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-host.mg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">🎨 Alarm Monitoring</TypographyH3>
          <p className="font-mono mb-2">
            The Alarm Monitoring module automatically triggers alerts based on predefined thresholds and notifies responsible personnel immediately. By managing alert strategies, tracking exceptions, and analyzing historical alarm data, teams can reduce response times and ensure continuous business operations.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-alarm.jpg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">🎨 Config Center</TypographyH3>
          <p className="font-mono mb-2">
            Finally, the Config Center serves as a unified hub for managing system parameters, business models, permissions, and alert strategies. It supports multi-tenant management, cross-system configurations, data push and email notifications, page permissions, SQL monitoring rules, and AI-driven workflows. This centralized management allows businesses to quickly adapt to changing requirements, streamline operations, and improve system reliability across servers, web, and mobile platforms.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/pmone/pm-config.jpg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">&</TypographyH3>
          <p className="font-mono mb-2">
            Overall, PMone offers a holistic approach to monitoring, enabling organizations to maintain performance, improve user experience, and make intelligent, data-driven decisions across
          </p>
        </div>
      )
    },
  },
  {
    id: 'ngnpm',
    category: 'Network Performance Monitoring',
    title: 'NGNPM — Intelligent Network Performance Platform',
    src: '/assets/projects-screenshots/ngnpm/landing.jpg',
    screenshots: ['landing.jpg'],
    live: '',
    skills: {
      frontend: [
        PROJECT_SKILLS.vue,
        PROJECT_SKILLS.canvas,
        PROJECT_SKILLS.svg,
      ],
      backend: [
        PROJECT_SKILLS.java,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.clickhouse,
        PROJECT_SKILLS.kafka,
        PROJECT_SKILLS.docker,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Traffic Analytics
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <p className="font-mono mb-2 mt-8">
            NGNPM (Next-Generation Network Performance Monitor) is a full-featured network performance management platform.
            It provides real-time traffic visualization, topology editing, and intelligent probe configuration to help engineers analyze, diagnose, and optimize complex network environments efficiently.
          </p>
          <SlideShow images={[
            `${BASE_PATH}/ngnpm/landing.jpg`,
            `${BASE_PATH}/ngnpm/ngpm.jpg`,
            `${BASE_PATH}/ngnpm/ngpm-2.jpg`,
          ]}
          />
          <TypographyH3 className="my-4 mt-8">Custom Workbench</TypographyH3>
          <p className="font-mono mb-2">
            The customizable workbench allows users to configure and save personalized dashboards.
            Each panel can display metrics, charts, or logs — enabling real-time monitoring and rapid access to key network insights.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/ngnpm/ngpm-work.jpg`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Network Topology Editor</TypographyH3>

          <p className="font-mono mb-2">
            An interactive topology editor built with Canvas and SVG, allowing users to visualize, design, and modify network structures intuitively.
            It supports drag-and-drop nodes, live data overlays, and automatic layout algorithms.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/ngnpm/ngpm-topo-editor.jpg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Probe Configuration</TypographyH3>

          <p className="font-mono mb-2">
            Integrated probe management enables users to deploy, configure, and monitor network probes.
            The system automatically collects and aggregates metrics to measure latency, packet loss, and throughput across network nodes.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/ngnpm/ngpm-probe.jpg`,
            ]}
          />
          <p className="font-mono mb-2 my-8">
            NGNPM combines high-performance backend services (Java, Kafka, ClickHouse, PostgreSQL) with a modern Vue-based frontend to deliver a responsive, scalable, and data-driven monitoring experience for enterprise networks.
          </p>
        </div>
      )
    },
  },
  {
    id: 'portfolio',
    category: 'Portfolio',
    title: 'My Portfolio',
    src: '/assets/projects-screenshots/portfolio/landing.jpg',
    screenshots: ['1.png'],
    live: '/3d-portfolio',
    github: 'https://github.com/joel-xiao/joel.xiao',
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.shadcn,
        PROJECT_SKILLS.aceternity,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.spline,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Welcome to my digital playground, where creativity meets code in the
            dopest way possible.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">
            Beautiful 3D Objects
            {' '}
          </TypographyH3>
          <p className="font-mono mb-2">
            Did you see that 3D keyboard modal? Yeah! I made that. That
            interactive keyboard is being rendered in 3D on a webpage 🤯, and
            pressing each keycap reveals a skill in a goofy way. It&apos;s like
            typing, but make it art.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/landing.jpg`,
              `${BASE_PATH}/portfolio/skills.jpg`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Projects</TypographyH3>

          <p className="font-mono mb-2">
            My top personal and freelance projects — no filler, all killer.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/projects.jpg`,
              `${BASE_PATH}/portfolio/project.jpg`,
            ]}
          />
          <p className="font-mono mb-2 mt-8 text-center">
            This site&apos;s not just a portfolio — it&apos;s a whole vibe.
          </p>
        </div>
      )
    },
  },
  {
    id: 'my-db',
    category: 'Visualization Editor',
    title: 'Visualization Editor',
    src: '/assets/projects-screenshots/my-db/landing.jpg',
    screenshots: ['landing.jpg'],
    live: 'https://visual-studio-one.vercel.app',
    github: 'https://github.com/joel-xiao/visual-studio',
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.vue,
        PROJECT_SKILLS.tauri,
        PROJECT_SKILLS.rust,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            The Visualization Editor is an open-source desktop application built with Vue, TypeScript, and Tauri (powered by Rust).
            It provides an elegant and efficient environment for building data-driven dashboards and interactive visualizations without
            requiring deep programming experience.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={
              [`${BASE_PATH}/my-db/landing.jpg`,
              ]
            }
          />

          <TypographyH3 className="my-4 mt-8">
            Visualization Editor
          </TypographyH3>
          <p className="font-mono mb-2 mt-8 text-center">
            The core of the project is the visual editing workspace — a drag-and-drop interface that lets users design layouts,
            adjust component styles, and preview changes in real time. It combines flexibility and structure, giving developers
            and designers an intuitive way to build visual dashboards and customize them freely without coding.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/my-db/my-db-editor.jpg`,
              `${BASE_PATH}/my-db/my-db-editor-2.jpg`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">
            Data Source Configuration & API Requests
          </TypographyH3>
          <p className="font-mono mb-2 mt-8 text-center">
            Beyond visualization, the application includes a built-in data management layer that allows users to connect APIs or
            databases, define data models, and instantly view live responses. This visual data binding workflow transforms complex
            API interactions into simple configuration steps, enabling seamless integration between your data and visuals.
          </p>
          <SlideShow
            images={
              [`${BASE_PATH}/my-db/my-db-data.jpg`,
              ]
            }
          />
        </div>
      )
    },
  },
]
export default projects
