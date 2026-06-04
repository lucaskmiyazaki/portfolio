import { useEffect, useRef, useState } from 'react';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { useNavigate } from 'react-router';
import ally0 from '../../imports/ally0.jpg';
import ally1 from '../../imports/ally1.gif';
import ally2 from '../../imports/ally2.gif';
import ally3 from '../../imports/ally3.png';
import ally4 from '../../imports/ally4.jpg';
import ally5 from '../../imports/ally5.gif';
import ally6 from '../../imports/ally6.gif';
import ally7 from '../../imports/ally7.gif';
import ally8 from '../../imports/ally8.png';
import ally9 from '../../imports/ally9.mp4';
import ally10 from '../../imports/ally10.jpg';
import ally11 from '../../imports/ally11.gif';

type MediaItem = { kind: 'image'; src: string; clipPath?: string } | { kind: 'video'; src: string };
interface Section { text: string; media: MediaItem[] }

const sectionsA: Section[] = [
  { text: 'Kids with severe allergies suffer so much that they are often willing to visit the doctor twice a week to receive allergy shots. Parents have to leave work early and reorganize their schedules.', media: [{ kind: 'image', src: ally1 }] },
  { text: 'We wanted to create a wearable device that could deliver allergens at home, in a safe and controlled feedback loop.', media: [{ kind: 'image', src: ally2 }] },
];

const sectionsB: Section[] = [
  { text: 'For this to work, the patch had to be small like a drop, soft to the touch, and safe within sight.', media: [{ kind: 'image', src: ally4 }] },
  { text: 'Small like a drop: we developed a patented miniaturized mechanism that integrates a microfluidic circuit with interstitial fluid access, allowing the device to inject allergens and capture fluids through electronic control.', media: [{ kind: 'image', src: ally5 }] },
  { text: 'Soft to the touch: the system uses a hollow microneedle that is small enough to be nearly painless, while still effectively delivering allergens in an electronically controlled way.', media: [{ kind: 'image', src: ally6, clipPath: 'inset(160px 30px 50px 30px)' }] },
  { text: "Safe within sight: the system monitors IgE and inflammation. Since every body responds differently to treatment, AllyCloud challenges rigid protocols by potentially tailoring allergen delivery based on each patient's previous response.", media: [{ kind: 'image', src: ally7 }] },
  { text: 'An app allows patients, parents, and doctors to monitor treatment progress based on how the child\'s body is responding.', media: [{ kind: 'image', src: ally8 }] },
  { text: 'The refillable patch was fabricated using PDMS and polyimide.', media: [{ kind: 'video', src: ally9 }] },
  { text: 'The outer casing was 3D printed.', media: [{ kind: 'image', src: ally10 }] },
  { text: 'Different form factors were tested, with the goal of shifting the experience from a medical treatment into a device that makes kids feel like they have a superpower.', media: [{ kind: 'image', src: ally11 }] },
];

function RightPanel({ section, visible }: { section: Section; visible: boolean }) {
  const item = section.media[0];
  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-opacity duration-[250ms] p-12"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {item.kind === 'video' ? (
        <video key={item.src} autoPlay loop muted playsInline className="w-full h-full object-contain" src={item.src} />
      ) : (
        <img key={item.src} src={item.src} alt="" className="w-full h-full object-contain" style={item.clipPath ? { clipPath: item.clipPath } : undefined} />
      )}
    </div>
  );
}

export default function AllyCloud() {
  const navigate = useNavigate();
  const [displayIndexA, setDisplayIndexA] = useState(0);
  const [visibleA, setVisibleA] = useState(true);
  const [displayIndexB, setDisplayIndexB] = useState(0);
  const [visibleB, setVisibleB] = useState(true);
  const sectionRefsA = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRefA = useRef(0);
  const sectionRefsB = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRefB = useRef(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefsA.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && i !== activeIndexRefA.current) {
          activeIndexRefA.current = i;
          setVisibleA(false);
          setTimeout(() => { setDisplayIndexA(i); setVisibleA(true); }, 250);
        }
      }, { threshold: 0.3 });
      obs.observe(el);
      observers.push(obs);
    });
    sectionRefsB.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && i !== activeIndexRefB.current) {
          activeIndexRefB.current = i;
          setVisibleB(false);
          setTimeout(() => { setDisplayIndexB(i); setVisibleB(true); }, 250);
        }
      }, { threshold: 0.3 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const currentA = sectionsA[displayIndexA];
  const currentB = sectionsB[displayIndexB];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative w-full h-screen bg-black flex overflow-hidden">
        <div className="w-2/3 h-full relative">
          <img src={ally0} alt="AllyCloud" className="absolute inset-0 w-full h-full object-cover opacity-95" />
        </div>
        <div className="w-1/3 h-full flex flex-col justify-center px-10 lg:px-14">
          <p className="text-teal-400 text-sm tracking-widest uppercase mb-6">Healthtech · Embedded Systems</p>
          <h1 className="text-6xl lg:text-7xl text-white mb-6 leading-none">AllyCloud</h1>
          <p className="text-lg text-gray-400 max-w-xs leading-relaxed">
            A pediatric smart wearable for allergy immunotherapy at home.
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

      {/* Scrollytelling A */}
      <div className="flex relative">
        <div className="w-1/3">
          {sectionsA.map((section, i) => (
            <div
              key={i}
              ref={el => { sectionRefsA.current[i] = el; }}
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
        <div
          className="w-2/3 sticky top-0 h-screen overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: visibleA ? '#f9fafb' : '#f3f4f6' }}
        >
          <RightPanel section={currentA} visible={visibleA} />
        </div>
      </div>

      {/* Parallax break */}
      <div
        className="h-[70vh] w-full"
        style={{
          backgroundImage: `url(${ally3})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />

      {/* Scrollytelling B */}
      <div className="flex relative">
        <div className="w-1/3">
          {sectionsB.map((section, i) => (
            <div
              key={i}
              ref={el => { sectionRefsB.current[i] = el; }}
              className="min-h-screen flex items-center px-10 lg:px-14 py-24"
            >
              <div className="max-w-xs">
                <span className="block text-xs text-teal-500 tracking-widest uppercase mb-6">
                  {String(sectionsA.length + i + 1).padStart(2, '0')}
                </span>
                <p className="text-2xl lg:text-3xl text-gray-900 leading-relaxed">{section.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="w-2/3 sticky top-0 h-screen overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: visibleB ? '#f9fafb' : '#f3f4f6' }}
        >
          <RightPanel section={currentB} visible={visibleB} />
        </div>
      </div>

      {/* End cap */}
      <section className="bg-black py-32 px-12 lg:px-20 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-6">Project</p>
        <h2 className="text-5xl lg:text-7xl text-white mb-10">AllyCloud</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['Healthtech', 'Embedded Systems', 'Digital Fabrication', 'User Research'].map(tag => (
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
