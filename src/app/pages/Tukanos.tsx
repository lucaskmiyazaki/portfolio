import { useEffect, useRef, useState } from 'react';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { useNavigate } from 'react-router';
import tukanos0 from '../../imports/tukanos_hero.png';
import tukanos1 from '../../imports/tukanos1.mp4';
import tukanos2 from '../../imports/tukanos2.gif';
import tukanos3 from '../../imports/tukanos3.gif';
import tukanos4_1 from '../../imports/tukanos4-1.gif';
import tukanos4_2 from '../../imports/tukanos4-2.gif';

type Section =
  | { text: string; kind: 'image'; media: string }
  | { text: string; kind: 'video'; media: string }
  | { text: string; kind: 'two-images'; media: [string, string] };

const sections: Section[] = [
  {
    text: 'The Tukano people in Brazil do not see health as an individual issue, but as a collective and ecological relationship. For them, humans, spirits, and nature are all connected.',
    kind: 'video',
    media: tukanos1,
  },
  {
    text: 'They have a strong connection to water. When rivers dry because of climate change, their culture, stories, and traditions are also threatened. Their suicide rate is almost three times higher than the general population in Brazil.',
    kind: 'image',
    media: tukanos2,
  },
  {
    text: 'We collected hundreds of stories from local people to create a virtual museum that helps preserve their culture and raise awareness about the impact of climate change.',
    kind: 'image',
    media: tukanos3,
  },
  {
    text: 'We developed an app where tourists can interact with Tukano legends and see how climate change affects these stories.',
    kind: 'two-images',
    media: [tukanos4_1, tukanos4_2],
  },
];

export default function Tukanos() {
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
          <img src={tukanos0} alt="Tukanos AR Museum" className="absolute inset-0 w-full h-full object-cover opacity-95" />
        </div>
        <div className="w-1/3 h-full flex flex-col justify-center px-10 lg:px-14">
          <p className="text-teal-400 text-sm tracking-widest uppercase mb-6">XR · UI/UX · User Research</p>
          <h1 className="text-6xl lg:text-7xl text-white mb-6 leading-none">Tukanos</h1>
          <p className="text-lg text-gray-400 max-w-xs leading-relaxed">
            An AR museum that preserves Indigenous memories of water while exploring the connection between ecological, cultural, and spiritual health.
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
          style={{ backgroundColor: visible ? '#f9fafb' : '#f3f4f6' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-[250ms]"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {current.kind === 'video' ? (
              <video
                key={current.media}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
                src={current.media}
              />
            ) : current.kind === 'two-images' ? (
              <div className="flex w-full h-full gap-4 p-12">
                {current.media.map((src, i) => (
                  <img key={i} src={src} alt="" className="flex-1 h-full object-contain" />
                ))}
              </div>
            ) : (
              <img
                key={current.media}
                src={current.media}
                alt=""
                className="w-full h-full object-contain p-16"
              />
            )}
          </div>
        </div>
      </div>

      {/* End cap */}
      <section className="bg-black py-32 px-12 lg:px-20 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-6">Project</p>
        <h2 className="text-5xl lg:text-7xl text-white mb-10">Tukanos</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['XR', 'UI/UX', 'User Research'].map(tag => (
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
