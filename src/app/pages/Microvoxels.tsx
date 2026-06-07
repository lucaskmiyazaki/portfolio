import { useEffect, useRef, useState } from 'react';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { useNavigate } from 'react-router';
import { projectTags, heroTags } from '../projectTags';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import micro0 from '../../imports/micro0.gif';
import micro1 from '../../imports/micro1.JPG';
import micro2 from '../../imports/micro2.gif';
import micro3 from '../../imports/micro3.png';
import micro4 from '../../imports/micro4.gif';
import micro5_1 from '../../imports/micro5-1.png';
import micro5_2 from '../../imports/micro5-2.png';
import micro6 from '../../imports/micro6.png';

function Eq({ tex, display = false }: { tex: string; display?: boolean }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, { throwOnError: false, displayMode: display }),
      }}
    />
  );
}

const adhesionEquations: { label: string; tex: string }[] = [
  {
    label: 'Electrostatic Force',
    tex: 'F_{\\text{electrostatic}} = \\dfrac{Q^2}{2\\varepsilon A} = \\dfrac{\\varepsilon A V^2}{2d^2}',
  },
  {
    label: 'Gravitational Force',
    tex: 'F_{\\text{gravity}} = mg = \\rho L^3 g',
  },
  {
    label: 'Friction Condition',
    tex: 'F_{\\text{friction}} = \\mu F_{\\text{electrostatic}} > F_{\\text{gravity}}',
  },
  {
    label: 'Critical Length',
    tex: 'L < \\dfrac{\\mu \\varepsilon V^2}{2d^2 \\rho g} = 50.6 \\text{ mm}',
  },
];

const walkingEquations: { label: string; tex: string }[] = [
  {
    label: 'Gravitational Torque',
    tex: '\\tau_{\\text{gravity}} = \\dfrac{\\rho g L^4}{2}',
  },
  {
    label: 'Electrostatic Torque',
    tex: '\\tau_{\\text{electrostatic}} = \\dfrac{L}{4} \\int_0^L \\varepsilon E_x^2 \\, dy',
  },
  {
    label: 'Electric Field',
    tex: 'E = -\\nabla\\phi',
  },
  {
    label: 'Potential from a Differential Charge',
    tex: 'd\\phi(x,y) = \\dfrac{1}{4\\pi\\varepsilon} \\cdot \\dfrac{dq}{r}',
  },
  {
    label: 'Distance Between Points',
    tex: 'r = \\sqrt{(x - x\')^2 + (y - y\')^2}',
  },
  {
    label: 'Differential Charge Element',
    tex: 'dq = \\lambda \\, dy\'',
  },
  {
    label: 'Electric Potential (symmetric line charge)',
    tex: 'V = \\dfrac{\\lambda}{4\\pi\\varepsilon} \\int_0^L \\left[\\dfrac{1}{L/2 - y\'} - \\dfrac{1}{L/2 + y\'}\\right] dy\'',
  },
  {
    label: 'Electric Field Component',
    tex: 'E_x(x,y) = \\dfrac{\\lambda}{4\\pi\\varepsilon} \\int_0^L \\left[\\dfrac{x}{x^2 + (y-y\')^2} - \\dfrac{x}{x^2 + (y+y\')^2}\\right] dy\'',
  },
];

const testRows = [
  { cube: '0.2 cm Paper Cube',      v1000: true,  v3000: true,  v5000: true  },
  { cube: '0.4 cm Styrofoam Cube',  v1000: true,  v3000: true,  v5000: true  },
  { cube: '0.7 cm Styrofoam Cube',  v1000: false, v3000: true,  v5000: true  },
  { cube: '1.2 cm Paper Cube',      v1000: false, v3000: false, v5000: true  },
  { cube: '1 cm 3D Printed Cube',   v1000: false, v3000: false, v5000: false },
];

const scrollSections = [
  { text: 'Can we digitally control particles? Microvoxels explores whether small physical cubes can be digitally controlled using electrostatic forces. Each cube is designed to perform two basic actions: adhere to a surface and walk across it.', src: micro1 },
  { text: 'The first action is adhesion. A microvoxel must generate enough electrostatic force to hold itself against gravity. If the electrostatic attraction is stronger than the cube\'s weight, the cube can stick to a surface.', src: micro2 },
];

export default function Microvoxels() {
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
      {/* Hero */}
      <section className="relative w-full h-screen bg-black flex overflow-hidden">
        <div className="w-2/3 h-full relative">
          <img src={micro0} alt="Microvoxels" className="absolute inset-0 w-full h-full object-cover opacity-95" />
        </div>
        <div className="w-1/3 h-full flex flex-col justify-center px-10 lg:px-14">
          <p className="text-violet-400 text-sm tracking-widest uppercase mb-6">{heroTags('microvoxels')}</p>
          <h1 className="text-6xl lg:text-7xl text-white mb-6 leading-none">Microvoxels</h1>
          <p className="text-lg text-gray-400 max-w-xs leading-relaxed">
            A self-assembling micro-robot built from electrostatically controlled voxel cubes.
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

      {/* Scrollytelling: sections 1 & 2 */}
      <div className="flex relative">
        <div className="w-1/3">
          {scrollSections.map((section, i) => (
            <div
              key={i}
              ref={el => { sectionRefs.current[i] = el; }}
              className="min-h-screen flex items-center px-10 lg:px-14 py-24"
            >
              <div className="max-w-xs">
                <span className="block text-xs text-violet-500 tracking-widest uppercase mb-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-2xl lg:text-3xl text-gray-900 leading-relaxed">{section.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="w-2/3 sticky top-0 h-screen overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: visible ? '#f9fafb' : '#f3f4f6' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-[250ms] p-12"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <img src={scrollSections[displayIndex].src} alt="" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Adhesion Equations */}
      <section className="bg-gray-50 py-24 px-10 lg:px-0">
        <div className="flex gap-0">
          <div className="w-1/2 px-10 lg:px-16 flex flex-col justify-center">
            <span className="block text-xs text-violet-500 tracking-widest uppercase mb-6">03</span>
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4 leading-snug">Adhesion</h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              A microvoxel must generate enough electrostatic force to hold itself against gravity.
            </p>
            <div className="space-y-7">
              {adhesionEquations.map(({ label, tex }) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">{label}</p>
                  <div className="text-gray-900 text-lg overflow-x-auto">
                    <Eq tex={tex} display />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center p-10 lg:p-16">
            <img src={micro3} alt="" className="w-full h-full max-h-[80vh] object-contain rounded-xl" />
          </div>
        </div>
      </section>

      {/* Walking section — static layout */}
      <div className="flex">
        <div className="w-1/3 min-h-screen flex items-center px-10 lg:px-14 py-24">
          <div className="max-w-xs">
            <span className="block text-xs text-violet-500 tracking-widest uppercase mb-6">04</span>
            <p className="text-2xl lg:text-3xl text-gray-900 leading-relaxed">
              The second action is walking. By controlling electrostatic attraction on different sides of the cube, the system can create torque. If the electrostatic torque is greater than the gravitational torque, the cube can rotate or step forward.
            </p>
          </div>
        </div>
        <div className="w-2/3 h-screen sticky top-0 overflow-hidden bg-gray-50 flex items-center justify-center p-12">
          <img src={micro4} alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Walking Equations */}
      <section className="bg-gray-50 py-24">
        <div className="flex gap-0">
          <div className="w-1/2 px-10 lg:px-16 flex flex-col justify-center">
            <span className="block text-xs text-violet-500 tracking-widest uppercase mb-6">05</span>
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4 leading-snug">Walking</h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              Torque analysis for the electrostatic walking mechanism.
            </p>
            <div className="space-y-7">
              {walkingEquations.map(({ label, tex }) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">{label}</p>
                  <div className="text-gray-900 text-base overflow-x-auto">
                    <Eq tex={tex} display />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-6 items-center justify-center p-10 lg:p-16">
            <img src={micro5_1} alt="" className="w-full object-contain rounded-xl max-h-[38vh]" />
            <img src={micro5_2} alt="" className="w-full object-contain rounded-xl max-h-[38vh]" />
          </div>
        </div>
      </section>

      {/* Tests */}
      <section className="bg-white py-24 px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <span className="block text-xs text-violet-500 tracking-widest uppercase mb-6">06</span>
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Tests</h2>
          <p className="text-lg text-gray-500 mb-14 max-w-2xl leading-relaxed">
            We tested different cube sizes and materials under different voltages to understand which cubes could adhere successfully.
          </p>
          <div className="flex gap-12 items-start">
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 pr-8 text-gray-400 font-normal tracking-widest uppercase text-xs">Cube</th>
                    <th className="text-center py-4 px-6 text-gray-400 font-normal tracking-widest uppercase text-xs">1000 V</th>
                    <th className="text-center py-4 px-6 text-gray-400 font-normal tracking-widest uppercase text-xs">3000 V</th>
                    <th className="text-center py-4 px-6 text-gray-400 font-normal tracking-widest uppercase text-xs">5000 V</th>
                  </tr>
                </thead>
                <tbody>
                  {testRows.map(({ cube, v1000, v3000, v5000 }) => (
                    <tr key={cube} className="border-b border-gray-100">
                      <td className="py-4 pr-8 text-gray-700 font-medium">{cube}</td>
                      {[v1000, v3000, v5000].map((pass, i) => (
                        <td key={i} className="py-4 px-6 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              pass
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-red-50 text-red-600 border border-red-200'
                            }`}
                          >
                            {pass ? 'Yes' : 'No'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-80 shrink-0">
              <img src={micro6} alt="" className="w-full object-contain rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* End cap */}
      <section className="bg-black py-32 px-12 lg:px-20 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-6">Project</p>
        <h2 className="text-5xl lg:text-7xl text-white mb-10">Microvoxels</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {projectTags.microvoxels.map(tag => (
            <button key={tag} onClick={() => { sessionStorage.setItem('lastTag', tag); navigate(`/?tag=${encodeURIComponent(tag)}`); }} className="px-5 py-2 text-sm text-gray-400 border border-gray-700 rounded-full hover:border-violet-500 hover:text-violet-400 transition-colors">{tag}</button>
          ))}
        </div>
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 rounded-full hover:border-violet-500 hover:text-violet-400 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all work
        </button>
      </section>
    </div>
  );
}
