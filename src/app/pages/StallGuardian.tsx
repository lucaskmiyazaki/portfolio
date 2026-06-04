import { useEffect, useRef, useState } from 'react';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { useNavigate } from 'react-router';
import horse0 from '../../imports/horse0.png';
import horse1 from '../../imports/horse1.JPG';
import horse2 from '../../imports/horse2.mp4';
import horse3 from '../../imports/horse3.mp4';
import horse4 from '../../imports/horse4.png';
import horse5 from '../../imports/horse5.mp4';

type Section =
  | { text: string; kind: 'image'; media: string; small?: boolean; whiteBg?: boolean }
  | { text: string; kind: 'video'; media: string; small?: boolean; whiteBg?: boolean };

const sections: Section[] = [
  {
    text: 'Horse colic is a digestive emergency that can begin with subtle discomfort, progress to pain behaviors such as pawing or rolling, and become life-threatening if not treated immediately.',
    kind: 'image',
    media: horse1,
  },
  {
    text: 'At night, when horses are unassisted, early signs of colic can go unnoticed for hours.',
    kind: 'video',
    media: horse2,
  },
  {
    text: 'I used computer vision to collect behavioral data, including eating, drinking, sleeping, manure, pawing, and rolling.',
    kind: 'video',
    media: horse3,
    small: true,
  },
  {
    text: 'Through interviews, I found that barn staff often rely on intuition rather than quantitative data. They described identifying colic as "hard to describe, but you can feel when the horse is sick."',
    kind: 'image',
    media: horse4,
    whiteBg: true,
  },
  {
    text: 'Rather than overwhelming users with technical graphs, I emphasized clear alerts and video clips of abnormal behavior, allowing quick recognition of potential problems. The app also generates technical reports that can be easily shared with veterinarians.',
    kind: 'video',
    media: horse5,
    whiteBg: true,
  },
];

function RightPanel({ section, visible }: { section: Section; visible: boolean }) {
  const padding = section.small ? 'p-32' : 'p-0';
  if (section.kind === 'video') {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[250ms] ${padding}`}
        style={{ opacity: visible ? 1 : 0 }}
      >
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
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[250ms] ${section.small ? '' : ''}`}
      style={{ opacity: visible ? 1 : 0 }}
    >
      <img
        key={section.media}
        src={section.media}
        alt=""
        className="w-full h-full object-contain p-16"
      />
    </div>
  );
}

export default function StallGuardian() {
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

  const current = sections[displayIndex];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative w-full h-screen bg-black flex overflow-hidden">
        <div className="w-2/3 h-full relative">
          <img src={horse0} alt="StallGuardian" className="absolute inset-0 w-full h-full object-cover opacity-95" />
        </div>
        <div className="w-1/3 h-full flex flex-col justify-center px-10 lg:px-14">
          <p className="text-teal-400 text-sm tracking-widest uppercase mb-6">Embedded Systems · AI / Computer Vision</p>
          <h1 className="text-6xl lg:text-7xl text-white mb-6 leading-none">Stall&shy;Guardian</h1>
          <p className="text-lg text-gray-400 max-w-xs leading-relaxed">
            An embedded IoT system for real-time livestock health monitoring.
          </p>
          <button onClick={() => navigate('/')} className="mt-12 text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2 w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to work
          </button>
        </div>
        <ScrollIndicator />
      </section>

      {/* Scrollytelling */}
      <div className="flex relative">
        {/* Left: scrolling text */}
        <div className="w-1/3">
          {sections.map((section, i) => (
            <div
              key={i}
              ref={el => { sectionRefs.current[i] = el; }}
              className="min-h-screen flex items-center px-10 lg:px-14 py-24"
            >
              <div className="max-w-xs">
                <span className="block text-xs text-teal-500 tracking-widest uppercase mb-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-2xl lg:text-3xl text-gray-900 leading-relaxed">{section.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: sticky panel */}
        <div
          className="w-2/3 sticky top-0 h-screen overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: current.whiteBg ? '#ffffff' : (visible ? '#f9fafb' : '#f3f4f6') }}
        >
          <RightPanel section={current} visible={visible} />
        </div>
      </div>

      {/* End cap */}
      <section className="bg-black py-32 px-12 lg:px-20 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-6">Project</p>
        <h2 className="text-5xl lg:text-7xl text-white mb-10">StallGuardian</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['Embedded Systems', 'AI / Computer Vision'].map(tag => (
            <span key={tag} className="px-5 py-2 text-sm text-gray-400 border border-gray-700 rounded-full">{tag}</span>
          ))}
        </div>
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 rounded-full hover:border-teal-500 hover:text-teal-400 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all work
        </button>
      </section>
    </div>
  );
}
