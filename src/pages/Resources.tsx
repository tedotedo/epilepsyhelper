import { Link } from 'react-router-dom';
import {
  BookOpen,
  ExternalLink,
  Heart,
  Users,
  Phone,
  Globe,
  GraduationCap,
  MessageCircle,
  FileText,
  Youtube,
  Baby,
  Sparkles,
} from 'lucide-react';

// Resource item type
interface ResourceItem {
  name: string;
  description: string;
  url: string;
  phone?: string;
  highlight?: string;
}

interface ResourceCategory {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: ResourceItem[];
}

// Resource categories with items
const RESOURCES: Record<string, ResourceCategory> = {
  charities: {
    title: 'UK Epilepsy Charities',
    description: 'Support organisations providing information, advice, and community',
    icon: Heart,
    color: 'primary',
    items: [
      {
        name: 'Epilepsy Action',
        description: 'UK\'s largest epilepsy charity with information, support helpline, and local groups',
        url: 'https://www.epilepsy.org.uk',
        phone: '0808 800 5050',
        highlight: 'Free Helpline',
      },
      {
        name: 'Epilepsy Society',
        description: 'Medical research charity providing expert information and support services',
        url: 'https://www.epilepsysociety.org.uk',
        phone: '01494 601 400',
      },
      {
        name: 'Young Epilepsy',
        description: 'Specialist support for children and young people with epilepsy',
        url: 'https://www.youngepilepsy.org.uk',
        highlight: 'For Children & Young People',
      },
      {
        name: 'Epilepsy Research UK',
        description: 'Funding research to improve diagnosis, treatment and quality of life',
        url: 'https://www.epilepsyresearch.org.uk',
      },
      {
        name: 'SUDEP Action',
        description: 'Support for families bereaved by epilepsy and raising awareness of SUDEP',
        url: 'https://www.sudep.org',
      },
    ],
  },
  information: {
    title: 'Medical Information',
    description: 'Reliable, evidence-based information about epilepsy',
    icon: FileText,
    color: 'accent',
    items: [
      {
        name: 'NHS - Epilepsy',
        description: 'Official NHS information on epilepsy causes, symptoms, diagnosis and treatment',
        url: 'https://www.nhs.uk/conditions/epilepsy',
        highlight: 'NHS Trusted',
      },
      {
        name: 'NICE Guidelines',
        description: 'Clinical guidelines for the diagnosis and management of epilepsies',
        url: 'https://www.nice.org.uk/guidance/ng217',
        highlight: 'Clinical Guidelines',
      },
      {
        name: 'Great Ormond Street Hospital',
        description: 'Information about epilepsy in children from GOSH',
        url: 'https://www.gosh.nhs.uk/conditions-and-treatments/conditions-we-treat/epilepsy',
      },
      {
        name: 'SUVIMA - Epilepsy',
        description: 'Age-appropriate educational resources about epilepsy for children and families',
        url: 'https://suvima.org/epilepsy',
        highlight: 'Part of SUVIMA Family',
      },
    ],
  },
  education: {
    title: 'Education & Schools',
    description: 'Resources for schools, teachers, and education settings',
    icon: GraduationCap,
    color: 'purple',
    items: [
      {
        name: 'Epilepsy Action - Schools',
        description: 'Resources for schools including training, policies, and classroom support',
        url: 'https://www.epilepsy.org.uk/info/education',
      },
      {
        name: 'Young Epilepsy - Education',
        description: 'Support for children\'s education and Individual Healthcare Plans',
        url: 'https://www.youngepilepsy.org.uk/what-we-do/education',
      },
      {
        name: 'Epilepsy Society - Schools Pack',
        description: 'Free educational resources for teachers and school staff',
        url: 'https://epilepsysociety.org.uk/about-epilepsy/epilepsy-and-you/epilepsy-and-education',
      },
    ],
  },
  support: {
    title: 'Support & Community',
    description: 'Connect with others and find local support',
    icon: Users,
    color: 'warm',
    items: [
      {
        name: 'Epilepsy Action - Local Groups',
        description: 'Find local support groups in your area',
        url: 'https://www.epilepsy.org.uk/involved/local-groups',
      },
      {
        name: 'Epilepsy Action Forum',
        description: 'Online community to share experiences and get support',
        url: 'https://forum.epilepsy.org.uk',
        highlight: 'Online Community',
      },
      {
        name: 'Contact',
        description: 'Support for families with disabled children including those with epilepsy',
        url: 'https://contact.org.uk',
      },
    ],
  },
  videos: {
    title: 'Video Resources',
    description: 'Educational videos and animations',
    icon: Youtube,
    color: 'emergency',
    items: [
      {
        name: 'Epilepsy Action YouTube',
        description: 'Educational videos about epilepsy, first aid, and living well',
        url: 'https://www.youtube.com/user/epilepsyaction',
      },
      {
        name: 'Epilepsy Society YouTube',
        description: 'Information videos including seizure types and treatments',
        url: 'https://www.youtube.com/user/EpilepsySociety',
      },
    ],
  },
};

// Helpful phone numbers
const HELPLINES = [
  {
    name: 'Epilepsy Action Helpline',
    number: '0808 800 5050',
    hours: 'Mon-Fri 8:30am-5pm',
    description: 'Free, confidential support and information',
  },
  {
    name: 'Epilepsy Society Helpline',
    number: '01494 601 400',
    hours: 'Mon-Fri 9am-4pm',
    description: 'Expert advice and support',
  },
  {
    name: 'NHS 111',
    number: '111',
    hours: '24 hours',
    description: 'Non-emergency medical advice',
  },
];

const Resources = () => {
  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    primary: { bg: 'bg-primary-500', text: 'text-primary-600', border: 'border-primary-200' },
    accent: { bg: 'bg-accent-500', text: 'text-accent-600', border: 'border-accent-200' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' },
    warm: { bg: 'bg-warm-500', text: 'text-warm-600', border: 'border-warm-200' },
    emergency: { bg: 'bg-emergency-500', text: 'text-emergency-600', border: 'border-emergency-200' },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Resources</h1>
            <p className="text-sm text-warm-500">Information, support & helpful organisations</p>
          </div>
        </div>
      </header>

      {/* SUVIMA Feature Card */}
      <div className="card bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg flex-shrink-0">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-warm-900 text-lg mb-1">SUVIMA - Learn About Epilepsy</h2>
            <p className="text-warm-700 mb-4">
              Age-appropriate educational resources designed to help children and families understand epilepsy. Part of the SUVIMA ecosystem of health education tools.
            </p>
            <a
              href="https://suvima.org/epilepsy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Visit SUVIMA
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Helplines Quick Access */}
      <div className="card p-4">
        <h2 className="font-bold text-warm-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary-500" />
          Helplines
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {HELPLINES.map((helpline) => (
            <div key={helpline.number} className="p-3 bg-warm-50 rounded-xl">
              <p className="font-semibold text-warm-900">{helpline.name}</p>
              <a
                href={`tel:${helpline.number.replace(/\s/g, '')}`}
                className="text-lg font-bold text-primary-600 hover:text-primary-700"
              >
                {helpline.number}
              </a>
              <p className="text-xs text-warm-500 mt-1">{helpline.hours}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Categories */}
      {Object.entries(RESOURCES).map(([key, category]) => {
        const Icon = category.icon;
        const colors = colorClasses[category.color] || colorClasses.primary;

        return (
          <section key={key} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-warm-900">{category.title}</h2>
                <p className="text-sm text-warm-500">{category.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover p-4 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-warm-900 group-hover:text-primary-600 transition-colors">
                          {item.name}
                        </h3>
                        {item.highlight && (
                          <span className={`px-2 py-0.5 ${colors.text} bg-opacity-10 text-xs font-medium rounded-full`} style={{ backgroundColor: `${colors.text.replace('text-', 'rgb(var(--')})10` }}>
                            {item.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-warm-600 mt-1">{item.description}</p>
                      {item.phone && (
                        <p className="text-sm text-primary-600 mt-2 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {item.phone}
                        </p>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-warm-400 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })}

      {/* For Children Card */}
      <div className="card bg-accent-50 border-accent-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center flex-shrink-0">
            <Baby className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-warm-900 mb-2">Resources for Children</h3>
            <p className="text-sm text-warm-700 mb-3">
              Young Epilepsy and SUVIMA offer age-appropriate resources designed specifically for children and young people to understand their epilepsy.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.youngepilepsy.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm inline-flex items-center gap-1"
              >
                Young Epilepsy
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://suvima.org/epilepsy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm inline-flex items-center gap-1"
              >
                SUVIMA
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card bg-warm-50 border-warm-200 p-4">
        <div className="flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-warm-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-warm-600">
            <p className="font-medium text-warm-700 mb-1">External Links</p>
            <p>
              These links lead to external websites. EpilepsyHelper is not responsible for the content of external sites. Always consult your healthcare team for medical advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
