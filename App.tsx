
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { LikeButton } from './components/LikeButton';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { FileText, Briefcase, Code, Award, Star, Settings, CheckCircle, BrainCircuit } from 'lucide-react';
import { summarizeWithAI } from './services/geminiService';

const resumeData = {
  name: 'HARSH DHAWLE',
  contact: {
    email: 'dhawle.harsh15@gmail.com',
    phone: '+91 8107033476',
    links: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/harsh-dhawle/' },
      { name: 'GitHub', url: 'https://github.com/harshdhawle' },
      { name: 'LeetCode', url: 'https://leetcode.com/u/harsh_dhawle/' },
      { name: 'Instagram', url: 'https://www.instagram.com/funn__factoryy/' }
    ]
  },
  summary: 'Skilled and innovative SDET with hands-on experience in automating 1250+ UI and API test cases across Agile product lifecycles. Proficient in creating robust test automation frameworks, integrating CI/CD pipelines, developing stubs, deploying API, and conducting mobile QA with a specialization in banking and financial applications. Demonstrates strong ability in defect prevention, regression test planning, and quality assurance metrics tracking with development skills to solve problems independently. Holds a Bachelor of Technology in Information Technology from Government Engineering College, Jabalpur (2019-2023).',
  skills: {
    'Languages': 'Java, SQL, Python, JavaScript, OpenAI API, Agent SDK',
    'Frameworks': 'Selenium, TestNG, WebDriverIO, Playwright, Appium',
    'Testing': 'REST API Testing, BDD, TDD, Regression Testing, Test Strategy, Defect Tracking',
    'Tools': 'JIRA, Postman, JMeter, Docker, Kubernetes, Zephyr, Android Studio, MS Excel',
    'Platforms': 'AWS, Linux, Android (AVD), Spring Boot',
    'Soft Skills': 'Strong communication, Team collaboration, Problem-solving, Agile & Scrum experience'
  },
  experience: [
    {
      company: 'Persistent Systems Ltd, Pune',
      period: 'Sep 2023 - Sep 2025',
      details: [
        'Automated over 1053 test cases in UI and 223 test cases for API by developing frameworks and integrating the automation pipeline with DEV pipeline through GOCD, worked on mobile automation and dealt with flakiness problems through top quality coding and using frameworks for specific react native apps.',
        'Performed QA and QC in agile environments and maintaining proper evidences and testcase management of over 2000 testcaes on jira while ensuring more than 50 percent automation coverage for UI test-cases.',
        'Created CI/CD pipelines using GoPipelines, Created and modified stub controller for spring boot project, Ensured execution of automation test-suite for regression testing ensuring less than 5 percent defect leakage.',
        'Worked on Dockerized test executions, Kubernetes deployments, and BrowserStack integrations for NRI Savings and Regional Savings account holders, ensuring video review of over 52 flows in corporate salary and 33 flows in Savings account.'
      ]
    }
  ],
  project: {
    title: 'Customer Acquisition App QA',
    company: 'Persistent Systems',
    details: [
      'Developed mobile testing flows, including biometric authentication, and automated major banking domain flows covering critical business cases, while detecting and replicating a complex production issue impacting 7000+ users each day.'
    ]
  },
  certificates: [
    'Persistent Digital Engineering Junior SDET Certification',
    'Persistent Digital Engineering SDET Certification',
    'Machine Learning Specialization — Coursera (Andrew Ng, 2023).'
  ],
  achievements: [
    'Winner of Individual Bravo Award in Persistent Systems for Automation Framework Development.',
    'Deployed RAG based Chat Agent to personal instagram account with over 56K followers funn factoryy for customer handling and business operations with OPEN AI API and Agent sdk.'
  ],
  additionalSkills: [
    'Agentic AI, LangGraph, LangFlow, Wrangler Agents, Automation',
    'Linux shell scripting, Express',
    'AWS, Spring Boot, Hibernate, SQL, Bash',
    'MS Excel, Data Analytics'
  ]
};


const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aiSummary, setAiSummary] = useState<string | null>(null);
    const [isSummarizing, setIsSummarizing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 15000); // Open modal after 15 seconds
        return () => clearTimeout(timer);
    }, []);

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setAiSummary(null);
        const textToSummarize = resumeData.experience.map(exp => exp.details.join(' ')).join('\n');
        try {
            const summary = await summarizeWithAI(textToSummarize);
            setAiSummary(summary);
        } catch (error) {
            console.error('AI summarization failed:', error);
            setAiSummary('Could not generate AI summary. Please try again later.');
        } finally {
            setIsSummarizing(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-900 font-sans relative pb-24">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
            <main className="relative max-w-4xl mx-auto p-4 sm:p-8 md:p-12 bg-gray-900/80 backdrop-blur-sm rounded-xl my-10 shadow-2xl shadow-blue-500/10 border border-gray-700/50">
                <Header name={resumeData.name} contact={resumeData.contact} />

                <Section title="Professional Summary" icon={<FileText className="w-5 h-5" />}>
                    <p className="text-gray-300 leading-relaxed">{resumeData.summary}</p>
                </Section>
                
                <Section title="Skills Summary" icon={<Code className="w-5 h-5" />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {Object.entries(resumeData.skills).map(([category, skills]) => (
                            <div key={category}>
                                <h3 className="font-semibold text-blue-400 mb-1">{category}</h3>
                                <p className="text-gray-300 text-sm">{skills}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Work Experience" icon={<Briefcase className="w-5 h-5" />}>
                     <button
                        onClick={handleSummarize}
                        disabled={isSummarizing}
                        className="absolute top-3 right-4 flex items-center gap-2 text-xs bg-blue-600/50 hover:bg-blue-600/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-1 px-3 rounded-full transition-all duration-300"
                    >
                        <BrainCircuit className={`w-4 h-4 ${isSummarizing ? 'animate-spin' : ''}`} />
                        {isSummarizing ? 'Analyzing...' : 'Summarize with AI'}
                    </button>
                    {aiSummary && (
                        <div className="mb-4 p-4 bg-gray-800 border border-blue-500/30 rounded-lg text-sm text-gray-200">
                           <p className="font-bold text-blue-400 mb-2">AI Summary:</p>
                           {aiSummary}
                        </div>
                    )}
                    {resumeData.experience.map((exp, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-lg text-gray-100">{exp.company}</h3>
                                <p className="text-sm text-gray-400">{exp.period}</p>
                            </div>
                            <ul className="mt-2 list-disc list-inside space-y-2 text-gray-300">
                                {exp.details.map((detail, i) => <li key={i}>{detail}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>

                <Section title="Key Project" icon={<Settings className="w-5 h-5" />}>
                    <div>
                        <h3 className="font-bold text-lg text-gray-100">{resumeData.project.title} <span className="text-gray-400 font-normal text-base">- {resumeData.project.company}</span></h3>
                        <ul className="mt-2 list-disc list-inside space-y-2 text-gray-300">
                            {resumeData.project.details.map((detail, i) => <li key={i}>{detail}</li>)}
                        </ul>
                    </div>
                </Section>

                <Section title="Certificates" icon={<Award className="w-5 h-5" />}>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {resumeData.certificates.map((cert, i) => <li key={i}>{cert}</li>)}
                    </ul>
                </Section>

                <Section title="Achievements" icon={<Star className="w-5 h-5" />}>
                     <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {resumeData.achievements.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </Section>
                
                <Section title="Additional Skills" icon={<CheckCircle className="w-5 h-5" />}>
                     <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {resumeData.additionalSkills.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </Section>
            </main>
            
            <footer className="fixed bottom-0 left-0 w-full flex justify-center p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
                <LikeButton />
            </footer>
            
            <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default App;
