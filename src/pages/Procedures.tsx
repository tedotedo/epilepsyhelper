import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Heart,
  Sparkles,
  Moon,
  Coffee,
  Shirt,
  Car,
  Building,
  Smile,
  Star,
} from 'lucide-react';

// Procedure guides
const PROCEDURES = {
  eeg: {
    title: 'EEG (Electroencephalogram)',
    subtitle: 'Brain wave test',
    icon: '🧠',
    color: 'primary',
    duration: '30-60 minutes',
    overview: 'An EEG records the electrical activity in your brain using small sensors placed on your scalp. It doesn\'t hurt at all!',
    whatToExpect: [
      {
        title: 'Before the Test',
        items: [
          'Wash your hair the night before (no conditioner, gel, or hairspray)',
          'Get a normal night\'s sleep unless told otherwise',
          'Eat a normal meal - don\'t skip breakfast',
          'Take your regular medications unless told not to',
          'Bring a favourite toy, book, or tablet for waiting',
        ],
      },
      {
        title: 'During the Test',
        items: [
          'You\'ll sit or lie down in a comfortable chair or bed',
          'A technician will measure your head and mark spots with a special pencil',
          'Small metal discs (electrodes) will be stuck on with a special paste - it\'s a bit cold and sticky!',
          'You\'ll be asked to relax, open and close your eyes, and maybe look at flashing lights',
          'You can bring headphones and music if it helps you relax',
          'Parents can usually stay with you',
        ],
      },
      {
        title: 'After the Test',
        items: [
          'The electrodes come off easily',
          'Your hair will be a bit sticky - you can wash it when you get home',
          'You can go back to school or normal activities straight away',
          'Results usually take a few weeks to come back from your doctor',
        ],
      },
    ],
    tips: [
      'Bring something to do while waiting',
      'Wearing a button-up top makes it easier',
      'The paste washes out easily with warm water and shampoo',
      'It\'s okay to ask questions or take breaks',
    ],
    forKids: {
      title: 'Hey! Here\'s what happens...',
      points: [
        'It\'s like putting stickers on your head - they don\'t hurt!',
        'You get to lie down and relax',
        'Sometimes they show you flashy lights (like a disco!)',
        'You can bring your favourite toy or tablet',
        'Mum or Dad can stay with you the whole time',
        'Your hair might look funny after, but it washes out!',
      ],
    },
  },
  sleepEeg: {
    title: 'Sleep-Deprived EEG',
    subtitle: 'EEG after staying up late',
    icon: '😴',
    color: 'accent',
    duration: '60-90 minutes',
    overview: 'Sometimes doctors need to see your brain activity when you\'re sleepy. You\'ll need to stay up late or wake up early before this test.',
    whatToExpect: [
      {
        title: 'Before the Test',
        items: [
          'Your doctor will tell you how late to stay up or how early to wake',
          'Usually children stay up 2-4 hours past bedtime OR wake up 2-4 hours early',
          'Avoid caffeine (chocolate, cola, energy drinks)',
          'Wash hair the night before (no products)',
          'Bring cosy blanket and pillow if you want',
        ],
      },
      {
        title: 'During the Test',
        items: [
          'Same as a regular EEG with electrodes on your head',
          'You\'ll be encouraged to fall asleep during the test',
          'The room will be quiet and dim to help you sleep',
          'A parent can usually stay and help you feel comfortable',
          'If you can\'t sleep, that\'s okay - the test still works',
        ],
      },
      {
        title: 'After the Test',
        items: [
          'You might feel very tired - plan a quiet day',
          'It\'s best if someone else drives you home',
          'A nap afterwards is a good idea',
          'Don\'t plan any important activities for that day',
        ],
      },
    ],
    tips: [
      'Plan fun quiet activities for the late night (movies, games)',
      'Avoid screens with bright lights close to the test time',
      'Bring a pillow and blanket from home',
      'Have someone else drive you to and from the appointment',
    ],
    forKids: {
      title: 'Why do I have to stay up late?',
      points: [
        'Doctors want to see your sleepy brain waves',
        'You get to have a special late night or early morning',
        'You can watch movies or play games while staying awake',
        'Then you get to have a nap at the hospital!',
        'Bring your favourite blanket to feel cosy',
        'It\'s okay if you can\'t fall asleep - just resting is good too',
      ],
    },
  },
  mri: {
    title: 'MRI Scan',
    subtitle: 'Brain pictures with magnets',
    icon: '🏥',
    color: 'purple',
    duration: '30-60 minutes',
    overview: 'An MRI takes detailed pictures of your brain using powerful magnets. It doesn\'t hurt, but the machine can be noisy and you need to stay very still.',
    whatToExpect: [
      {
        title: 'Before the Scan',
        items: [
          'You\'ll fill out a safety form about any metal in your body',
          'Remove all metal items (jewellery, hair clips, watches)',
          'You might change into a hospital gown',
          'You may be offered headphones or earplugs for the noise',
          'Some children need medicine to help them stay still or sleep',
        ],
      },
      {
        title: 'During the Scan',
        items: [
          'You\'ll lie on a bed that slides into a large tunnel (scanner)',
          'The scanner makes loud knocking and buzzing sounds - this is normal!',
          'You must stay very still - even small movements blur the pictures',
          'You can usually listen to music through headphones',
          'A technician can see and hear you at all times',
          'There\'s a button you can press if you need to stop',
        ],
      },
      {
        title: 'After the Scan',
        items: [
          'You can get up and go straight away',
          'If you had sedation, you\'ll need to rest until it wears off',
          'There are no side effects from the scan itself',
          'Results usually take a few weeks',
        ],
      },
    ],
    tips: [
      'Practice lying very still before the appointment',
      'Ask if you can visit beforehand to see the scanner',
      'Bring your favourite music to listen to',
      'Some hospitals have child-friendly scanners with decorations',
    ],
    forKids: {
      title: 'The MRI Machine - It\'s like a spaceship!',
      points: [
        'The machine looks like a big donut or tunnel',
        'You lie on a special bed that slides inside',
        'It makes loud noises like a robot or video game!',
        'You wear special headphones and can listen to music',
        'The most important job is to be a statue and stay really still',
        'There\'s a button you can press if you need help',
        'It takes pictures of your amazing brain!',
      ],
    },
  },
  bloodTests: {
    title: 'Blood Tests',
    subtitle: 'Checking medication levels',
    icon: '💉',
    color: 'emergency',
    duration: '5-10 minutes',
    overview: 'Blood tests help doctors check that your epilepsy medication is at the right level in your body. It\'s quick but might pinch for a moment.',
    whatToExpect: [
      {
        title: 'Before the Test',
        items: [
          'Your doctor will tell you if you need to fast (not eat)',
          'Usually you take your medication as normal',
          'Some blood tests need to be done at a specific time',
          'Drink plenty of water - it makes it easier to find your veins',
          'Wear a short-sleeved top or one with loose sleeves',
        ],
      },
      {
        title: 'During the Test',
        items: [
          'A small band (tourniquet) goes around your upper arm',
          'The area is cleaned with a wipe',
          'A small needle goes into a vein - this is the pinchy bit',
          'Blood is collected in small tubes',
          'The needle comes out and a plaster goes on',
          'The whole thing takes just a few minutes',
        ],
      },
      {
        title: 'After the Test',
        items: [
          'Keep the plaster on for a few hours',
          'It\'s normal to have a small bruise',
          'You can eat and drink normally straight away',
          'Results usually come within a few days to a week',
        ],
      },
    ],
    tips: [
      'Ask for numbing cream (EMLA) if you\'re worried about the needle',
      'Look away or at something else during the needle part',
      'Deep breaths help you relax',
      'Squeeze a stress ball or hold someone\'s hand',
      'Ask for a sticker or reward afterwards!',
    ],
    forKids: {
      title: 'Getting blood taken - you\'ve got this!',
      points: [
        'It\'s like a tiny pinch that\'s over really fast',
        'You can ask for magic cream that makes it not hurt as much',
        'Looking away or watching something on a phone helps',
        'Take big deep breaths like you\'re blowing up a balloon',
        'Squeezing someone\'s hand really tight is allowed!',
        'You\'re really brave, and it helps the doctors help you',
        'Ask for a sticker - you deserve it!',
      ],
    },
  },
};

type ProcedureKey = keyof typeof PROCEDURES;

const Procedures = () => {
  const [expandedProcedure, setExpandedProcedure] = useState<ProcedureKey | null>('eeg');
  const [showKidsMode, setShowKidsMode] = useState<Record<string, boolean>>({});

  const toggleKidsMode = (key: string) => {
    setShowKidsMode((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const colorClasses: Record<string, { bg: string; light: string; border: string; text: string }> = {
    primary: {
      bg: 'bg-primary-500',
      light: 'bg-primary-50',
      border: 'border-primary-200',
      text: 'text-primary-600',
    },
    accent: {
      bg: 'bg-accent-500',
      light: 'bg-accent-50',
      border: 'border-accent-200',
      text: 'text-accent-600',
    },
    purple: {
      bg: 'bg-purple-500',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
    },
    emergency: {
      bg: 'bg-emergency-500',
      light: 'bg-emergency-50',
      border: 'border-emergency-200',
      text: 'text-emergency-600',
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Procedure Prep</h1>
            <p className="text-sm text-warm-500">What to expect at hospital appointments</p>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <div className="card bg-accent-50 border-accent-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-warm-900 mb-2">Preparing for Hospital Tests</h2>
            <p className="text-warm-700">
              Hospital tests can feel scary, but knowing what to expect helps a lot! These guides explain common epilepsy tests in a friendly way. There's even a special section written just for children.
            </p>
          </div>
        </div>
      </div>

      {/* Procedure Accordions */}
      <div className="space-y-4">
        {Object.entries(PROCEDURES).map(([key, procedure]) => {
          const isExpanded = expandedProcedure === key;
          const colors = colorClasses[procedure.color];
          const isKidsMode = showKidsMode[key];

          return (
            <div key={key} className={`card overflow-hidden ${isExpanded ? colors.border : ''}`}>
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedProcedure(isExpanded ? null : (key as ProcedureKey))}
                className="w-full p-4 flex items-center justify-between hover:bg-warm-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{procedure.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-warm-900">{procedure.title}</h3>
                    <p className="text-sm text-warm-500">{procedure.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:flex items-center gap-1 text-sm text-warm-500">
                    <Clock className="w-4 h-4" />
                    {procedure.duration}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-warm-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-warm-400" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-warm-100 animate-fade-in">
                  {/* Toggle Kids Mode */}
                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => toggleKidsMode(key)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                        isKidsMode
                          ? `${colors.bg} text-white`
                          : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      {isKidsMode ? 'Kids Mode ON' : 'Show Kids Version'}
                    </button>
                  </div>

                  {isKidsMode ? (
                    /* Kids Mode Content */
                    <div className={`mt-4 p-6 ${colors.light} rounded-xl`}>
                      <h4 className="text-xl font-bold text-warm-900 mb-4 flex items-center gap-2">
                        <Star className="w-6 h-6 text-amber-500" />
                        {procedure.forKids.title}
                      </h4>
                      <div className="space-y-3">
                        {procedure.forKids.points.map((point, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className="text-2xl">{['⭐', '✨', '🌟', '💫', '🎉', '🎈', '🌈'][index % 7]}</span>
                            <p className="text-warm-800 text-lg">{point}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-white rounded-lg">
                        <p className="text-warm-700 flex items-center gap-2">
                          <Smile className="w-5 h-5 text-accent-500" />
                          <span className="font-medium">You're going to do great!</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Adult/Parent Content */
                    <div className="mt-4 space-y-6">
                      {/* Overview */}
                      <div>
                        <p className="text-warm-700">{procedure.overview}</p>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className={`w-4 h-4 ${colors.text}`} />
                        <span className="text-warm-600">
                          Duration: <strong>{procedure.duration}</strong>
                        </span>
                      </div>

                      {/* What to Expect Sections */}
                      {procedure.whatToExpect.map((section, sIndex) => (
                        <div key={sIndex}>
                          <h4 className="font-semibold text-warm-900 mb-3 flex items-center gap-2">
                            {sIndex === 0 && <Coffee className={`w-4 h-4 ${colors.text}`} />}
                            {sIndex === 1 && <Building className={`w-4 h-4 ${colors.text}`} />}
                            {sIndex === 2 && <Car className={`w-4 h-4 ${colors.text}`} />}
                            {section.title}
                          </h4>
                          <ul className="space-y-2">
                            {section.items.map((item, iIndex) => (
                              <li key={iIndex} className="flex items-start gap-2 text-warm-700">
                                <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0 mt-1" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Tips */}
                      <div className={`p-4 ${colors.light} rounded-xl`}>
                        <h4 className="font-semibold text-warm-900 mb-3 flex items-center gap-2">
                          <AlertCircle className={`w-4 h-4 ${colors.text}`} />
                          Helpful Tips
                        </h4>
                        <ul className="space-y-2">
                          {procedure.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-warm-700">
                              <span className={colors.text}>•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* General Tips Card */}
      <div className="card bg-primary-50 border-primary-200 p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-warm-900 mb-2">General Preparation Tips</h3>
            <ul className="text-sm text-warm-700 space-y-2">
              <li className="flex items-start gap-2">
                <Shirt className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                Wear comfortable, loose clothing
              </li>
              <li className="flex items-start gap-2">
                <Moon className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                Get a good night's sleep before most appointments
              </li>
              <li className="flex items-start gap-2">
                <Coffee className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                Eat a normal breakfast unless told to fast
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                Bring a favourite toy, book, or comfort item
              </li>
              <li className="flex items-start gap-2">
                <Car className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                Allow extra time for parking and finding the department
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Questions Card */}
      <div className="card p-4">
        <p className="text-sm text-warm-600 text-center">
          Every hospital is slightly different. If you have questions about your specific appointment, contact your hospital's epilepsy team or the department directly.
        </p>
      </div>
    </div>
  );
};

export default Procedures;
