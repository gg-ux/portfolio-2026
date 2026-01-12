import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSubsection,
  ProjectText,
  ProjectList,
  ProjectCallout,
  ProjectImagePlaceholder,
  ProjectImageFullWidth
} from '../../components/project'
import { useTheme } from '../../context/ThemeContext'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'goals', label: 'Goals' },
  { id: 'process', label: 'Process' },
  { id: 'old-flow', label: 'Old Flow' },
  { id: 'new-flow', label: 'New Flow' },
  { id: 'future', label: 'Future' },
]

export default function TeslaChatbot() {
  const { isDark } = useTheme()

  return (
    <ProjectLayout
      sections={sections}
      prevProject={null}
      nextProject={{ title: 'Mega Menu', href: '/project/tesla-mega-menu' }}
    >
      <ProjectHero
        company="Tesla"
        title="AI Chatbot"
        description="In 2023, I led the design of Tesla Assist, an innovative AI chatbot on tesla.com. Collaborating with product and engineering teams, I developed automation flows and tackled complex edge cases, establishing a cohesive design language for Tesla's chat interactions."
        role="Lead UX/UI Designer"
        timeline="2023"
        impact="120% increase in sales lead conversion"
        coverImage="/images/projects/tesla/chatbot/chatbot-card-filled.png"
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Overview">
        <ProjectText>
          The demo below shows the Chatbot making suggestions upon initiation, providing education on a suggested topic, and answering a free-form non-sales question. Only when purchase intent is indicated does the user get prompted to fill out a short contact form, which then redirects them to an advisor.
        </ProjectText>
        <ProjectCallout>
          <ProjectText className="mb-0">
            Shortly after launch, Tesla Assist achieved a significant <strong className={isDark ? 'text-white' : 'text-gray-900'}>120% increase in sales lead conversion rates</strong>, underscoring its immediate impact and substantial potential as the chatbot evolves.
          </ProjectText>
        </ProjectCallout>
      </ProjectSection>

      {/* Goals */}
      <ProjectSection id="goals" title="Goals">
        <ProjectList
          items={[
            'Boost sales conversions by leveraging the chatbot for non-sales inquiries, allowing advisors to focus on proportionately more sales customers',
            'Advance business objectives and enhance customer education through suggested topics upon chat initiation',
            'Ensure 24/7 chatbot for continuous customer support and sales lead capturing',
          ]}
        />
      </ProjectSection>

      {/* Process */}
      <ProjectSection id="process" title="Process">
        <ProjectSubsection title="Research & Planning">
          <ProjectList
            ordered
            items={[
              'Research Key Topics: Work with product, analytics, and content teams to break down the most popular support topics',
              'Create Automation Flows: Work with product and legal teams to ensure business and legal requirements are met',
              'Propose IA: Present flows to design manager to get approval to continue to next stage',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Design & Development">
          <ProjectList
            ordered
            items={[
              'Audit Competitor Designs: Research chat experiences of other companies for guidelines on best practices and inspiration',
              'Consolidate Chat UI: Work with app design team to consolidate chat design language across web and app for consistency',
              'Create Chat Components: Create Figma UI Kit for all chat components',
              'Mock Up Key Flows: Define key flows with product manager, showcasing examples of scenarios that will require different UI elements',
              'Align on Copy: Work with copy team on chatbot messages and all other text within the experience',
              'Iterate on Designs: Refine designs iteratively based on feedback from leadership, peers, and user testing',
              'Define MVP: Work with the product manager to define MVP requirements and break the project into 2 phases',
              'Get Approvals: Present a final deck to leadership, outlining business benefits, development phases, and timeline',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Implementation & Launch">
          <ProjectList
            ordered
            items={[
              'Support Engineering: Support the engineering team with assets and resources for implementation once designs are approved',
              'Conduct Design QA: Conduct design QA during staging, creating and supplementing Jira tickets',
              'Launch It!',
            ]}
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Old Flow */}
      <ProjectSection id="old-flow" title="Old Chat Flow">
        <ProjectText>
          The previous chat flow captured only four user intents:
        </ProjectText>
        <ProjectList
          items={[
            'Assistance with Previous Purchases',
            'Purchasing Tesla Products',
            'Delivery Inquiries',
            'Scheduling Demo Drives',
          ]}
        />
        <ProjectText>
          This limited model lacks breadth in topics and directs non-sales customers to live advisors. With just one sales-focused intent and two non-sales intents, the system overwhelmed advisors with non-sales inquiries, reducing the proportion of sales leads successfully moving through the funnel.
        </ProjectText>
        <ProjectImagePlaceholder label="Old Chat Flow Diagram" />

        <ProjectSubsection title="Old Chat: Demo">
          <ProjectText>
            In this demo, I am given a very limited number of support topics. It does not take long before I am redirected to an advisor or a callback form. The lack of more resources makes it so more users will likely try to speak to an advisor for help, reducing the proportion of sales leads who get through to advisors.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>

      {/* New Flow */}
      <ProjectSection id="new-flow" title="New Chatbot Automation Flow">
        <ProjectText>
          By leveraging AI, we expanded the chatbot's scope to handle more intents, structured under 8 main categories for the MVP:
        </ProjectText>
        <ProjectList
          items={[
            'Order Education',
            'Vehicle Appointments',
            'Vehicle Education',
            'Energy Appointments',
            'Energy Education',
            'General Purchase',
            'Undetermined',
          ]}
        />
        <ProjectText>
          Suggested topics appear when the chat starts, aligning with business goals while proactively providing customers with insights on commonly sought support topics.
        </ProjectText>
        <ProjectImagePlaceholder label="New Automation Flow Diagram" />

        <ProjectSubsection title="Advisor Redirect">
          <ProjectText>
            When users express intent to purchase, they're redirected to a live advisor. Because filling out a form introduces friction, I wanted to ensure it would be as streamlined as possible. Working with product and legal teams, I was able to condense the number of required fields from 6 to 3.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>

      {/* Future */}
      <ProjectSection id="future" title="Future Enhancements">
        <ProjectText>
          For the next phase, our proposed enhancements aimed to:
        </ProjectText>
        <ProjectList
          items={[
            'Expand the AI\'s knowledge base by incorporating information from support pages',
            'Drive customer engagement by embedding images and videos in chatbot responses',
            'Streamline demo drive scheduling through direct chat integration',
            'Enhance customer satisfaction by integrating with the order management system',
            'Improve response accuracy using advanced natural language processing',
            'Boost conversions with personalized recommendations based on customer history',
          ]}
        />
      </ProjectSection>
    </ProjectLayout>
  )
}
