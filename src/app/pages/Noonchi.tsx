import { useEffect, useRef, useState } from 'react';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { useNavigate } from 'react-router';
import { projectTags, heroTags } from '../projectTags';
import noonchi0 from '../../imports/noonchi0.png';
import noonchi3 from '../../imports/noonchi3.mp4';
import noonchi4 from '../../imports/noonchi4.png';
import noonchi5 from '../../imports/noonchi5.png';
import noonchi6 from '../../imports/noonchi6.mp4';
import noonchi7 from '../../imports/noonchi7.mp4';
import noonchi8 from '../../imports/noonchi8.png';

type Section =
  | { text: string; kind: 'quote'; quote: string; author: string }
  | { text: string; kind: 'stat'; stat: string }
  | { text: string; kind: 'image'; media: string }
  | { text: string; kind: 'video'; media: string };

const sections: Section[] = [
  {
    text: 'Even though autistic adults are highly capable, they may struggle to understand and express indirect cues, such as voice tone.',
    kind: 'quote',
    quote: '"I have my manager with me whenever I go to a meeting. He helps me regulate my voice tone."',
    author: '— Autistic Employee',
  },
  {
    text: 'In the workplace, these misunderstandings can cost them their jobs.',
    kind: 'stat',
    stat: '39% of high-functioning autistic adults in America are unemployed, compared to 5% in the general population.',
  },
  {
    text: 'However, many autism technologies focus on children or higher-support needs, creating tools that adults cannot use professionally — such as goggles or toys.',
    kind: 'video',
    media: noonchi3,
  },
  {
    text: 'We ran Value Sensitive Design sessions to discuss what technologies would be acceptable and useful for autistic individuals and the stakeholders around them.',
    kind: 'image',
    media: noonchi4,
  },
  {
    text: "These stakeholders had conflicting values, so our role was to mediate a design that respected everyone's needs.",
    kind: 'image',
    media: noonchi5,
  },
  {
    text: 'The result is a smartwatch that records meetings and lets users pre-program nudges for different situations, such as elevated voice or tone-context mismatch. Users can also review post-meeting reports and practice their tone later.',
    kind: 'video',
    media: noonchi6,
  },
  {
    text: 'The biggest insight was that communication is a two-way street. The burden should not be placed only on autistic individuals, so Noonchi also provides tips to help guide neurotypical peers toward clearer communication.',
    kind: 'video',
    media: noonchi7,
  },
  {
    text: "Noonchi's data can be shared with speech therapists and job coaches for tailored guidance. General, non-personal insights can also be shared with HR to support more inclusive policies and trainings.",
    kind: 'image',
    media: noonchi8,
  },
];

function RightPanel({ section }: { section: Section }) {
  if (section.kind === 'quote') {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-950 px-16">
        <div>
          <p className="text-2xl lg:text-3xl text-white leading-relaxed mb-6 font-light italic">
            {section.quote}
          </p>
          <p className="text-teal-400 text-sm tracking-widest">{section.author}</p>
        </div>
      </div>
    );
  }

  if (section.kind === 'stat') {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-950 px-16">
        <div>
          <p className="text-7xl lg:text-8xl text-teal-400 font-light mb-6">39%</p>
          <p className="text-xl text-gray-300 leading-relaxed max-w-xs">{section.stat}</p>
        </div>
      </div>
    );
  }

  if (section.kind === 'video') {
    return (
      <div className="absolute inset-0 bg-white flex items-center justify-center">
        <video
          key={section.media}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
          src={section.media}
        />
      </div>
    );
  }

  return (
    <img
      key={section.media}
      src={section.media}
      alt=""
      className="w-full h-full object-contain p-16"
    />
  );
}

export default function Noonchi() {
  const navigate = useNavigate();
  const [displayIndex, setDisplayIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && i !== activeIndexRef.current) {
          activeIndexRef.current = i;
          setVisible(false);
          setTimeout(() => { setDisplayIndex(i); setVisible(true); }, 250);
        }
      }, { threshold: 0.3 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative w-full h-screen bg-black flex overflow-hidden">
        {/* Image left */}
        <div className="w-2/3 h-full relative overflow-hidden">
          <img
            src={noonchi0}
            alt="Noonchi"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Title right */}
        <div className="w-1/3 h-full flex flex-col justify-center px-16 lg:px-20">
          <p className="text-teal-400 text-sm tracking-widest uppercase mb-6">
            {heroTags('noonchi')}
          </p>
          <h1 className="text-6xl lg:text-8xl text-white mb-6 leading-none">
            Noonchi
          </h1>
          <p className="text-xl text-gray-400 max-w-sm leading-relaxed">
            A wearable remote speech-therapy support system that helps autistic professionals reflect on tone and communication during workplace meetings.
          </p>

          <button
            onClick={() => navigate('/')}
            className="mt-12 text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2 w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to work
          </button>
        </div>

        {/* Scroll arrow */}
        <ScrollIndicator />
      </section>

      {/* ── Scrollytelling ── */}
      <div className="flex relative">
        {/* Left: scrolling text */}
        <div className="w-1/3">
          {sections.map((section, i) => (
            <div
              key={i}
              ref={el => { sectionRefs.current[i] = el; }}
              className="min-h-screen flex items-center px-12 lg:px-20 py-24"
            >
              <div className="max-w-sm">
                <span className="block text-xs text-teal-500 tracking-widest uppercase mb-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-2xl lg:text-3xl text-gray-900 leading-relaxed">
                  {section.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: sticky panel */}
        <div
          className="w-2/3 sticky top-0 h-screen overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: visible ? '#f9fafb' : '#f3f4f6' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-250"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <RightPanel section={sections[displayIndex]} />
          </div>
        </div>
      </div>

      {/* ── End cap ── */}
      <section className="bg-black py-32 px-12 lg:px-20 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-6">Project</p>
        <h2 className="text-5xl lg:text-7xl text-white mb-10">Noonchi</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {projectTags.noonchi.map(tag => (
            <button key={tag} onClick={() => { sessionStorage.setItem('lastTag', tag); navigate(`/?tag=${encodeURIComponent(tag)}`); }} className="px-5 py-2 text-sm text-gray-400 border border-gray-700 rounded-full hover:border-teal-500 hover:text-teal-400 transition-colors">
              {tag}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 rounded-full hover:border-teal-500 hover:text-teal-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all work
        </button>
      </section>
    </div>
  );
}
