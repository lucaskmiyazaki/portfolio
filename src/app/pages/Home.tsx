import { Link, useSearchParams } from 'react-router';
import { ScrollIndicator } from '../components/ScrollIndicator';
import ProjectCard from '../components/ProjectCard';
import SkillTag from '../components/SkillTag';
import { projectTags } from '../projectTags';
import heroVideo from '../../imports/hero_main.mp4';

import relevoImage from '../../imports/061-relevo.gif';
import allyCloudImage from '../../imports/095-ally.jpg';
import noonchiImage from '../../imports/noonchi0.png';
import stallGuardianImage from '../../imports/horse0.png';
import tissueRayImage from '../../imports/tissue0.png';
import tukanosImage from '../../imports/tukanos_hero.png';
import teethImage from '../../imports/teeth1.gif';
import dinoImage from '../../imports/dino0.png';
import aromaImage from '../../imports/aroma4-1.jpg';
import microImage from '../../imports/micro0.gif';
import cashierImage from '../../imports/tcc1.gif';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag') ?? '';
  const activeFilters = activeTag ? [activeTag] : [];

  function toggleFilter(skill: string) {
    if (activeTag === skill) {
      setSearchParams({});
      sessionStorage.removeItem('lastTag');
    } else {
      setSearchParams({ tag: skill });
      sessionStorage.setItem('lastTag', skill);
    }
  }

  const skills = [
    'User Research',
    'Interaction Design',
    'Digital Fabrication',
    'Mechanical Design',
    'Embedded Systems',
    'Spatial Computing',
    'AI/Computer Vision',
    'Healthtech',
    'Biomaterials',
    'More-than-human Design',
  ];

  const projects = [
    {
      title: 'Noonchi',
      description: 'A wearable remote speech-therapy support system that helps autistic professionals reflect on tone and communication during workplace meetings.',
      tags: projectTags.noonchi,
      imageUrl: noonchiImage,
      isVideo: false,
      href: '/noonchi'
    },
    {
      title: 'AllyCloud',
      description: 'A pediatric smart wearable for allergy immunotherapy at home.',
      tags: projectTags.allycloud,
      imageUrl: allyCloudImage,
      isVideo: false,
      href: '/allycloud'
    },
    {
      title: 'Relevo',
      description: 'A soft robot for tele-physiotherapy.',
      tags: projectTags.relevo,
      imageUrl: relevoImage,
      isVideo: false,
      href: '/relevo'
    },
    {
      title: 'TissueRay',
      description: 'A low-cost bioprinter for fabricating organ-on-a-chip.',
      tags: projectTags.tissueray,
      imageUrl: tissueRayImage,
      isVideo: false,
      href: '/tissueray'
    },
    {
      title: 'Tukanos',
      description: 'An AR museum that preserves Indigenous memories of water while exploring the connection between ecological, cultural, and spiritual health.',
      tags: projectTags.tukanos,
      imageUrl: tukanosImage,
      isVideo: false,
      href: '/tukanos'
    },
    {
      title: 'StallGuardian',
      description: 'An embedded IoT system for real-time livestock health monitoring.',
      tags: projectTags.stallguardian,
      imageUrl: stallGuardianImage,
      isVideo: false,
      href: '/stallguardian'
    },
    {
      title: 'Aroma Atlas',
      description: 'A multisensory navigation experience using scent as a spatial interface.',
      tags: projectTags['aroma-atlas'],
      imageUrl: aromaImage,
      isVideo: false,
      href: '/aroma-atlas'
    },
    {
      title: 'DINO',
      description: 'A living digital display powered by bioluminescent dinoflagellates.',
      tags: projectTags.dino,
      imageUrl: dinoImage,
      isVideo: false,
      href: '/dino'
    },
    {
      title: 'Microvoxels',
      description: 'A self-assembling micro-robot built from electrostatically controlled voxel cubes.',
      tags: projectTags.microvoxels,
      imageUrl: microImage,
      isVideo: false,
      href: '/microvoxels'
    },
    {
      title: 'AI Cashier',
      description: 'A computer vision system for automated retail checkout without friction.',
      tags: projectTags['ai-cashier'],
      imageUrl: cashierImage,
      isVideo: false,
      href: 'https://ieeexplore.ieee.org/document/9529909'
    },
    {
      title: 'Teeth Scanning',
      description: '3D scanning and computational modeling of dental structures.',
      tags: projectTags['teeth-scanning'],
      imageUrl: teethImage,
      isVideo: false,
      href: 'https://www.researchgate.net/publication/347289425_Teeth_Mesh_Segmentation_Through_Curvature_Analysis'
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-gray-950 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src={heroVideo}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pb-12 lg:pb-20">
            <h1 className="text-4xl md:text-5xl lg:text-7xl leading-tight max-w-5xl" style={{ color: 'rgb(180, 255, 255)', mixBlendMode: 'difference' }}>
              Health and Wellness Tech for Everyday Life
            </h1>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Intro Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <h2 className="text-3xl lg:text-5xl text-gray-900 mb-8">
              I am a designer and biomedical engineer
            </h2>

            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              that develops human-centered wearable and interactive systems to connect patients and caregivers.
            </p>

            <p className="text-lg text-gray-500 mb-8">
              Harvard MDE '26 · USP Mechatronics / Biomedical Engineering '21
            </p>

            <Link to="/about" className="text-lg text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors">
              More →
            </Link>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <h2 className="text-3xl lg:text-4xl text-gray-900 mb-8 lg:mb-12">
          Selected Work
        </h2>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-3 mb-12 lg:mb-16">
          {skills.map((skill) => (
            <SkillTag
              key={skill}
              label={skill}
              active={activeFilters.includes(skill)}
              onClick={() => toggleFilter(skill)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {projects
            .filter(p =>
              activeFilters.length === 0 ||
              activeFilters.some(f => p.tags.includes(f))
            )
            .map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              isVideo={project.isVideo}
              href={project.href}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-teal-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-6">
              Let's talk
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              I'm interested in collaborations with HCI research labs and early-stage healthtech startups.
            </p>
            <a
              href="mailto:lucas@example.com"
              className="inline-block px-8 py-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
