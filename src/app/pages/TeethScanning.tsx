import { useEffect, useRef, useState } from 'react';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { useNavigate } from 'react-router';
import { projectTags, heroTags } from '../projectTags';
import teeth0 from '../../imports/teeth0.mp4';
import teeth1 from '../../imports/teeth1.png';
import teeth2 from '../../imports/teeth2.png';
import teeth3 from '../../imports/teeth3.png';
import teeth4 from '../../imports/teeth4.png';

type Section =
  | { text: string; kind: 'image'; media: string }
  | { text: string; kind: 'video'; media: string }
  | { text: string; kind: 'two-images'; media: [string, string] };

const sections: Section[] = [
  {
    text: 'FAPESP granted me a scholarship to conduct research in computer vision. I developed a teeth scanning solution that was presented at SIICUSP, and later I was invited to continue the research at The University of Tokyo. The work was presented at ICGG and published as a paper.',
    kind: 'image',
    media: teeth1,
  },
  {
    text: 'First, I scanned a negative mold of the teeth using three different methods: photogrammetry with the Horus System, a depth camera using Xbox Kinect, and an interferometry scanner. Through this process, I studied camera calibration, point cloud processing, and different 3D scanning methods.',
    kind: 'two-images',
    media: [teeth2, teeth3],
  },
  {
    text: 'Next, I developed an algorithm to filter and concatenate the point clouds. I captured scans from different angles to avoid missing details, then used ICP to stitch overlapping features from each scan into a single model.',
    kind: 'image',
    media: teeth3,
  },
  {
    text: 'Finally, I reconstructed the surface using marching cubes and Poisson mesh reconstruction. I smoothed the mesh using normal vectors at each vertex and applied a curvature-based region growing algorithm to segment the teeth.',
    kind: 'image',
    media: teeth4,
  },
];

export default function TeethScanning() {
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
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-95"
            src={teeth0}
          />
        </div>
        <div className="w-1/3 h-full flex flex-col justify-center px-10 lg:px-14">
          <p className="text-teal-400 text-sm tracking-widest uppercase mb-6">{heroTags('teeth-scanning')}</p>
          <h1 className="text-5xl lg:text-6xl text-white mb-6 leading-none">Teeth Scanning</h1>
          <p className="text-lg text-gray-400 max-w-xs leading-relaxed">
            3D scanning and computational modeling of dental structures.
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
        <h2 className="text-5xl lg:text-7xl text-white mb-10">Teeth Scanning</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {projectTags['teeth-scanning'].map(tag => (
            <button key={tag} onClick={() => { sessionStorage.setItem('lastTag', tag); navigate(`/?tag=${encodeURIComponent(tag)}`); }} className="px-5 py-2 text-sm text-gray-400 border border-gray-700 rounded-full hover:border-teal-500 hover:text-teal-400 transition-colors">{tag}</button>
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
