import { useEffect, useRef, useState } from 'react';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { useNavigate } from 'react-router';
import { projectTags, heroTags } from '../projectTags';
import dino0 from '../../imports/dino0.png';
import dino1 from '../../imports/dino1.png';
import dino2_1 from '../../imports/dino2-1.gif';
import dino2_2 from '../../imports/dino2-2.gif';
import dino3_1 from '../../imports/dino3-1.JPG';
import dino3_2 from '../../imports/dino3-2.gif';
import dino4_1 from '../../imports/dino4-1.png';
import dino4_2 from '../../imports/dino4-2.gif';

type MediaItem =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string };

interface Section {
  text: string;
  media: MediaItem[];
}

const sections: Section[] = [
  {
    text: 'This project explores the glowing properties of dinoflagellates to create a living digital display.',
    media: [{ kind: 'image', src: dino1 }],
  },
  {
    text: 'Each pixel contains dinoflagellates that emit light through a biochemical reaction: luciferin, luciferase, and oxygen produce oxyluciferin and release light.',
    media: [
      { kind: 'image', src: dino2_1 },
      { kind: 'image', src: dino2_2 },
    ],
  },
  {
    text: 'Pressurized air and solenoid valves activate each pixel by gently agitating the dinoflagellates, turning biological movement into programmable light.',
    media: [
      { kind: 'image', src: dino3_1 },
      { kind: 'image', src: dino3_2 },
    ],
  },
  {
    text: 'DINO asks whether human creations and nature can live in harmony, transforming a display from an electronic object into a living ecosystem.',
    media: [
      { kind: 'image', src: dino4_1 },
      { kind: 'image', src: dino4_2 },
    ],
  },
];

function MediaTile({ item }: { item: MediaItem }) {
  if (item.kind === 'video') {
    return (
      <video
        key={item.src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover rounded-xl"
        src={item.src}
      />
    );
  }
  return (
    <img
      key={item.src}
      src={item.src}
      alt=""
      className="w-full h-full object-cover rounded-xl"
    />
  );
}

function RightPanel({ section, visible }: { section: Section; visible: boolean }) {
  const count = section.media.length;

  if (count === 1) {
    const item = section.media[0];
    return (
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-[250ms] p-12"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {item.kind === 'video' ? (
          <video
            key={item.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
            src={item.src}
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt=""
            className="w-full h-full object-contain"
          />
        )}
      </div>
    );
  }

  if (count === 2) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-[250ms] p-10 gap-4"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {section.media.map((item, i) => (
          <div key={i} className="flex-1 h-4/5 overflow-hidden">
            <MediaTile item={item} />
          </div>
        ))}
      </div>
    );
  }

  // 3 items: one large top, two small below
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-[250ms] p-10 gap-4"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="w-full flex-1 overflow-hidden">
        <MediaTile item={section.media[0]} />
      </div>
      <div className="w-full flex gap-4" style={{ height: '40%' }}>
        {section.media.slice(1).map((item, i) => (
          <div key={i} className="flex-1 overflow-hidden">
            <MediaTile item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dino() {
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
          <img src={dino0} alt="DINO" className="absolute inset-0 w-full h-full object-cover opacity-95" />
        </div>
        <div className="w-1/3 h-full flex flex-col justify-center px-10 lg:px-14">
          <p className="text-cyan-400 text-sm tracking-widest uppercase mb-6">{heroTags('dino')}</p>
          <h1 className="text-6xl lg:text-7xl text-white mb-6 leading-none">DINO</h1>
          <p className="text-lg text-gray-400 max-w-xs leading-relaxed">
            A living digital display powered by bioluminescent dinoflagellates.
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
                <span className="block text-xs text-cyan-500 tracking-widest uppercase mb-6">
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
          style={{ backgroundColor: visible ? '#f9fafb' : '#f3f4f6' }}
        >
          <RightPanel section={current} visible={visible} />
        </div>
      </div>

      {/* End cap */}
      <section className="bg-black py-32 px-12 lg:px-20 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-6">Project</p>
        <h2 className="text-5xl lg:text-7xl text-white mb-10">DINO</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {projectTags.dino.map(tag => (
            <button key={tag} onClick={() => { sessionStorage.setItem('lastTag', tag); navigate(`/?tag=${encodeURIComponent(tag)}`); }} className="px-5 py-2 text-sm text-gray-400 border border-gray-700 rounded-full hover:border-cyan-500 hover:text-cyan-400 transition-colors">{tag}</button>
          ))}
        </div>
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 rounded-full hover:border-cyan-500 hover:text-cyan-400 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all work
        </button>
      </section>
    </div>
  );
}
