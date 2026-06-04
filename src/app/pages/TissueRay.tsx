import { useEffect, useRef, useState } from 'react';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { useNavigate } from 'react-router';
import tissue0 from '../../imports/tissue0.png';
import tissue2_1 from '../../imports/tissue2-1.gif';
import tissue2_2 from '../../imports/tissue2-2.gif';
import tissue2_3 from '../../imports/tissue2-3.jpeg';
import tissue3_1 from '../../imports/tissue3-1.gif';
import tissue3_2 from '../../imports/tissue3-2.gif';
import tissue4_1 from '../../imports/tissue4-1.mp4';
import tissue4_2 from '../../imports/tissue4-2.mp4';
import tissue5_1 from '../../imports/tissue5-1.MOV';
import tissue5_2 from '../../imports/tissue5-2.JPG';
import tissue5_3 from '../../imports/tissue5-3.gif';
import tissue6_1 from '../../imports/tissue6-1.png';
import tissue6_2 from '../../imports/tissue6-2.gif';

type MediaItem =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string };

interface Section {
  text: string;
  media: MediaItem[];
}

const sectionsA: Section[] = [
  {
    text: 'People can wait years for an organ transplant. I designed a 3D printer to fabricate artificial organs.',
    media: [{ kind: 'image', src: tissue0 }],
  },
  {
    text: 'I iterated on different biofabrication strategies and focused on two promising methods: stereolithography and coagulation bath printing.',
    media: [
      { kind: 'image', src: tissue3_1 },
      { kind: 'image', src: tissue3_2 },
    ],
  },
  {
    text: 'I designed an SLA bioprinter using acrylic and 3D printed parts, while also supporting the electronic hardware development. The light source had to cure the resin without killing the cells.',
    media: [
      { kind: 'video', src: tissue4_1 },
      { kind: 'video', src: tissue4_2 },
    ],
  },
  {
    text: 'The biomaterial combined PEGDA, ECM, and stem cells. I also developed most of the bioreactors used during the production process.',
    media: [
      { kind: 'video', src: tissue5_1 },
      { kind: 'image', src: tissue5_2 },
      { kind: 'image', src: tissue5_3 },
    ],
  },
  {
    text: 'On the software side, I developed a CAD/CAM system with an easy-to-use organ-on-a-chip web modeling tool and a web UI that integrated with all printers from the company.',
    media: [
      { kind: 'image', src: tissue6_1 },
      { kind: 'image', src: tissue6_2 },
    ],
  },
];

const sectionsB: Section[] = [
  {
    text: 'TissueRay was the first SLA bioprinter in the market, enabling fast-prototypying of organ-on-a-chip (microfluidic channels that simulate human physiology).',
    media: [
      { kind: 'image', src: tissue2_1 },
      { kind: 'image', src: tissue2_2 },
      { kind: 'image', src: tissue2_3 },
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

export default function TissueRay() {
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
          <img src={tissue0} alt="TissueRay" className="absolute inset-0 w-full h-full object-cover opacity-95" />
        </div>
        <div className="w-1/3 h-full flex flex-col justify-center px-10 lg:px-14">
          <p className="text-teal-400 text-sm tracking-widest uppercase mb-6">AI / Computer Vision · Healthtech</p>
          <h1 className="text-6xl lg:text-7xl text-white mb-6 leading-none">TissueRay</h1>
          <p className="text-lg text-gray-400 max-w-xs leading-relaxed">
            A low-cost bioprinter for fabricating organ-on-a-chip.
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
        {/* Left: scrolling text */}
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

        {/* Right: sticky panel */}
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
          backgroundImage: `url(${tissue3_2})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />

      {/* Scrollytelling B */}
      <div className="flex relative">
        {/* Left: scrolling text */}
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

        {/* Right: sticky panel */}
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
        <h2 className="text-5xl lg:text-7xl text-white mb-10">TissueRay</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['AI / Computer Vision', 'Healthtech', 'Digital Fabrication'].map(tag => (
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
