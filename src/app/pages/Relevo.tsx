import { useEffect, useRef, useState } from 'react';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { useNavigate } from 'react-router';
import heroGif from '../../imports/061-relevo.gif';
import relevo1 from '../../imports/relevo1.png';
import relevo3 from '../../imports/relevo3.jpg';
import relevo4 from '../../imports/relevo4.mp4';
import relevo5 from '../../imports/relevo5.png';
import relevo6 from '../../imports/relevo6.gif';
import relevo7 from '../../imports/relevo7.JPG';
import relevo8 from '../../imports/relevo8.jpg';
import relevo4b from '../../imports/relevo4b.gif';

const sectionsA = [
  { text: 'Patients who undergo knee surgery may spend weeks with limited movement, often spending most of the day resting in bed. This can cause blood clots that may compromise recovery.', media: relevo1, isVideo: false },
  { text: 'Caregivers, nurses, and physiotherapists cannot provide 24/7 support, especially when patients are at home — so patients often rely on CPM machines, which are bulky, expensive and hard to use.', media: relevo3, isVideo: false },
  { text: 'We studied the biomechanics of leg exercises to develop a lighter and easier-to-use machine.', media: relevo4, isVideo: true },
];

const sectionsB = [
  { text: 'The result is a user-friendly and lightweight soft robotic system.', media: relevo4b, isVideo: false },
  { text: 'A triangular cushion performs macromovements to exercise the leg, while a leg brace performs micromovements to help prevent blood clots.', media: relevo6, isVideo: false },
  { text: 'The system fits in a box and can be carried anywhere.', media: relevo7, isVideo: false },
  { text: 'Flex and EMG sensors track progress and enable remote guidance from healthcare professionals.', media: relevo8, isVideo: false },
];

export default function Relevo() {
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
          <img src={heroGif} alt="Relevo" className="absolute inset-0 w-full h-full object-cover opacity-90" />
        </div>
        <div className="w-1/3 h-full flex flex-col justify-center px-16 lg:px-20">
          <p className="text-teal-400 text-sm tracking-widest uppercase mb-6">Soft Robotics · Healthtech</p>
          <h1 className="text-6xl lg:text-8xl text-white mb-6 leading-none">Relevo</h1>
          <p className="text-xl text-gray-400 max-w-sm leading-relaxed">
            A soft robot for tele-physiotherapy.
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
            <div key={i} ref={el => { sectionRefsA.current[i] = el; }} className="min-h-screen flex items-center px-12 lg:px-20 py-24">
              <div className="max-w-sm">
                <span className="block text-xs text-teal-500 tracking-widest uppercase mb-6">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-2xl lg:text-3xl text-gray-900 leading-relaxed">{section.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="w-2/3 sticky top-0 h-screen overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: visibleA ? '#f9fafb' : '#f3f4f6' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-250"
            style={{ opacity: visibleA ? 1 : 0 }}
          >
            {currentA.isVideo ? (
              <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                <video key={`v-${displayIndexA}`} autoPlay loop muted playsInline className="w-full h-full object-contain" src={currentA.media} />
              </div>
            ) : (
              <img key={`i-${displayIndexA}`} src={currentA.media} alt="" className="w-full h-full object-contain p-16" />
            )}
          </div>
        </div>
      </div>

      {/* Parallax break */}
      <div
        className="h-[70vh] w-full"
        style={{
          backgroundImage: `url(${relevo5})`,
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
            <div key={i} ref={el => { sectionRefsB.current[i] = el; }} className="min-h-screen flex items-center px-12 lg:px-20 py-24">
              <div className="max-w-sm">
                <span className="block text-xs text-teal-500 tracking-widest uppercase mb-6">{String(sectionsA.length + i + 1).padStart(2, '0')}</span>
                <p className="text-2xl lg:text-3xl text-gray-900 leading-relaxed">{section.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="w-2/3 sticky top-0 h-screen overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: visibleB ? '#f9fafb' : '#f3f4f6' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-250"
            style={{ opacity: visibleB ? 1 : 0 }}
          >
            {currentB.isVideo ? (
              <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                <video key={`v-${displayIndexB}`} autoPlay loop muted playsInline className="w-full h-full object-contain" src={currentB.media} />
              </div>
            ) : (
              <img key={`i-${displayIndexB}`} src={currentB.media} alt="" className="w-full h-full object-contain p-16" />
            )}
          </div>
        </div>
      </div>

      {/* End cap */}
      <section className="bg-black py-32 px-12 lg:px-20 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-6">Project</p>
        <h2 className="text-5xl lg:text-7xl text-white mb-10">Relevo</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['Digital Fabrication', 'Embedded Systems', 'Healthtech'].map(tag => (
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
