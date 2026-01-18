import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSubsection,
  ProjectText,
  ProjectList,
  ProjectCallout,
  ProjectImageFullWidth,
  ProjectYouTube,
  ProcessKanban,
  ExpandableChart,
  OldFlowChart,
  OldFlowChartLegend,
  NewFlowChart,
  NewFlowChartLegend,
} from '../../components/project'
import { TrendUp, Target, ChatCircle, LinkSimple } from '@phosphor-icons/react'
import { Body, Caption } from '../../components/Typography'
import { Tag } from '../../components/ui'
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
    <ProjectLayout sections={sections}>
      <ProjectHero
        company="Tesla"
        title="AI Chatbot"
        description="In 2023, I led the design of Tesla Assist, an innovative AI chatbot on tesla.com. Collaborating with product and engineering teams, I developed automation flows and tackled complex edge cases, establishing a cohesive design language for Tesla's chat interactions."
        role="Lead UX/UI Designer"
        timeline="Q3 2023"
        impact="120% increase in sales lead conversion"
        coverImage="/assets/projects/tesla/chatbot/content/banner.webp"
        coverPosition="center 20%"
        lightBanner
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Overview">
        <ProjectText>
          The demo below shows the Chatbot making suggestions upon initiation, providing education on a suggested topic, and answering a free-form non-sales question. Only when purchase intent is indicated does the user get prompted to fill out a short contact form, which then redirects them to an advisor.
        </ProjectText>
        <ProjectYouTube
          url="https://youtu.be/4iX2oKrVoV4"
          caption="Tesla Assist AI Chatbot Demo"
        />
        <ProjectCallout>
          Shortly after launch, Tesla Assist achieved a significant 120% increase in sales lead conversion rates, underscoring its immediate impact and substantial potential as the chatbot evolves.
        </ProjectCallout>
      </ProjectSection>

      {/* Goals */}
      <ProjectSection id="goals" title="Goals">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: '+ Conversions', description: 'Leverage the chatbot for non-sales inquiries, allowing advisors to focus on more sales customers', icon: TrendUp },
            { title: '+ Engagement', description: 'Advance business objectives through suggested topics upon chat initiation', icon: Target },
            { title: '24/7 Support', description: 'Provide continuous customer support and sales lead capturing around the clock', icon: ChatCircle },
          ].map((goal, index) => {
            const Icon = goal.icon
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-6 ${
                  isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
                }`}
              >
                <div className={`absolute top-6 right-6 ${isDark ? 'text-white/20' : 'text-black/25'}`}>
                  <Icon size={24} weight="light" />
                </div>
                <h4 className={`text-xl mb-3 theme-heading`} style={{ fontWeight: 600 }}>
                  {goal.title}
                </h4>
                <Body size="sm" className={`mb-0 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  {goal.description}
                </Body>
              </div>
            )
          })}
        </div>
      </ProjectSection>

      {/* Process */}
      <ProjectSection id="process" title="Process">
          <ProcessKanban
            columns={[
              {
                title: 'Research & Strategy',
                items: [
                  { title: 'Research Key Topics', description: 'Work with product, analytics, and content teams to break down the most popular support topics' },
                  { title: 'Create Automations', description: 'Work with product and legal teams to ensure business and legal requirements are met' },
                  { title: 'Propose IA', description: 'Present flows to design manager to get approval to continue to next stage' },
                  { title: 'Audit Competitors', description: 'Research chat experiences of other companies for guidelines on best practices and inspiration' },
                ],
              },
              {
                title: 'Design & Iteration',
                items: [
                  { title: 'Consolidate Chat UI', description: 'Work with app design team to consolidate chat design language across web and app for consistency' },
                  { title: 'Create Chat Components', description: 'Create Figma UI Kit for all chat components' },
                  { title: 'Mock Up Key Flows', description: 'Define key flows with product manager, showcasing examples of scenarios that will require different UI elements' },
                  { title: 'Align on Copy', description: 'Work with copy team on chatbot messages and all other text within the experience' },
                  { title: 'Iterate on Designs', description: 'Refine designs iteratively based on feedback from leadership, peers, and user testing' },
                ],
              },
              {
                title: 'Scoping & Approval',
                items: [
                  { title: 'Define MVP', description: 'Work with the product manager to define MVP requirements and break the project into 2 phases' },
                  { title: 'Get Approvals', description: 'Present a final deck to leadership, outlining business benefits, development phases, and timeline' },
                ],
              },
              {
                title: 'Implementation',
                items: [
                  { title: 'Support Engineering', description: 'Support the engineering team with assets and resources for implementation once designs are approved' },
                  { title: 'Conduct Design QA', description: 'Conduct design QA during staging, creating and supplementing Jira tickets' },
                  { title: 'Launch It! 🚀', description: 'Ship the chatbot to production and celebrate!' },
                ],
              },
            ]}
          />
      </ProjectSection>

      {/* Old Flow */}
      <ProjectSection id="old-flow" title="Old Chat Flow">
        <div className="flex flex-wrap gap-2 mb-6">
          {['Previous Purchases', 'Product Purchasing', 'Delivery Inquiries', 'Demo Drives'].map((intent) => (
            <Tag key={intent}>{intent}</Tag>
          ))}
        </div>
        <ProjectText>
          The previous chat flow captured only four user intents. This limited model lacks breadth in topics and directs non-sales customers to live advisors. With just one sales-focused intent and two non-sales intents, the system overwhelmed advisors with non-sales inquiries, reducing the proportion of sales leads successfully moving through the funnel.
        </ProjectText>

        <ExpandableChart
          title="Old Chat Flow"
          width={780}
          height={520}
          initialY={-120}
          legend={<OldFlowChartLegend />}
          headerPaddingTop={20}
          headerPaddingBottom={12}
          legendPaddingTop={12}
          legendPaddingBottom={16}
          legendOffset={4}
        >
          {({ width, height }) => <OldFlowChart width={width} height={height} />}
        </ExpandableChart>

        <ProjectSubsection title="Old Chat: Demo">
          <ProjectText>
            In this demo, I am given a very limited number of support topics. It does not take long before I am redirected to an advisor or a callback form. The lack of more resources makes it so more users will likely try to speak to an advisor for help, reducing the proportion of sales leads who get through to advisors.
          </ProjectText>
          <ProjectYouTube
            url="https://youtu.be/eXQJDCdpSRE"
            caption="Old Chat Experience Demo"
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* New Flow */}
      <ProjectSection id="new-flow" title="New Chatbot Automation Flow">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { label: 'Order Education', color: '#5835B0' },      // Amethyst
            { label: 'Vehicle Appointments', color: '#DBA166' }, // Gold
            { label: 'Vehicle Education', color: '#36CBC6' },    // Turquoise
            { label: 'Energy Appointments', color: '#D78F8D' },  // Rose
            { label: 'Energy Education', color: '#0B96A3' },     // Lagoon
            { label: 'General Purchase', color: '#BF92F0' },     // Lilac
            { label: 'Undetermined', color: '#6B7280' },         // Neutral
          ].map((category) => (
            <Tag key={category.label} color={category.color}>{category.label}</Tag>
          ))}
        </div>
        <ProjectText>
          By leveraging AI, we expanded the chatbot's scope to handle more intents, structured under 8 main categories for the MVP. Suggested topics appear when the chat starts, aligning with business goals while proactively providing customers with insights on commonly sought support topics.
        </ProjectText>

        <ExpandableChart
          title="New Chatbot Automation Flow"
          width={800}
          height={710}
          legend={<NewFlowChartLegend />}
          headerPaddingTop={20}
          headerPaddingBottom={12}
          legendPaddingTop={12}
          legendPaddingBottom={12}
        >
          {({ width, height }) => <NewFlowChart width={width} height={height} />}
        </ExpandableChart>

        <ProjectSubsection title="New Chat: Demo">
          <ProjectText>
            The new chatbot provides more comprehensive support, handling a wider range of topics before redirecting to an advisor. This allows users to get answers faster while freeing advisors to focus on sales-related inquiries.
          </ProjectText>
          <ProjectYouTube
            url="https://youtu.be/eN_wgNI72IE"
            caption="New AI Chatbot Experience Demo"
          />
        </ProjectSubsection>

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
        <div className="relative mt-8">
          {/* Vertical line */}
          <div className={`absolute left-3 top-3 bottom-3 w-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

          <div className="space-y-6">
            {[
              { title: 'Expand Knowledge Base', description: 'Incorporate information from support pages into AI responses' },
              { title: 'Rich Media Responses', description: 'Embed images and videos in chatbot responses to drive engagement' },
              { title: 'Demo Drive Integration', description: 'Streamline demo drive scheduling through direct chat integration' },
              { title: 'Order Management', description: 'Integrate with order management system to enhance customer satisfaction' },
              { title: 'Advanced NLP', description: 'Improve response accuracy using advanced natural language processing' },
              { title: 'Personalized Recommendations', description: 'Boost conversions with recommendations based on customer history' },
            ].map((item, index) => (
              <div key={index} className="relative flex gap-4 pl-1">
                {/* Timeline dot */}
                <div className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isDark ? 'bg-white/[0.08]' : 'bg-black/[0.06]'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isDark ? 'bg-white/40' : 'bg-black/30'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <h4 className={`font-satoshi text-base font-medium mb-1 ${
                    isDark ? 'text-white/90' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h4>
                  <Body size="sm" className={`mb-0 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    {item.description}
                  </Body>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ProjectSection>

    </ProjectLayout>
  )
}
