import profileImage from '../../imports/Adobe_Express_-_IMG_2389.jpg';
import backgroundImage1 from '../../imports/IMG_3912.JPG';
import backgroundImage2 from '../../imports/IMG_3933.JPG';

export default function About() {
  return (
    <>
      {/* About Section - First Part with Profile */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <img
                src={profileImage}
                alt="Lucas Miyazaki"
                className="w-full rounded-3xl shadow-sm"
              />
            </div>

            <div>
              <h2 className="text-3xl lg:text-5xl text-gray-900 mb-8">
                Designing wearable devices for care.
              </h2>

              <p className="text-lg text-gray-500 mb-8">
                Harvard MDE '26 · USP Mechatronics / Biomedical Engineering '21
              </p>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  My career began in Mechatronics Engineering at the University of São Paulo, where I developed a strong foundation in machine design and computational geometry. During my undergraduate studies, I also completed a research internship at the University of Tokyo, working with medical imaging technologies.
                  After graduating, I worked in tissue engineering and biotechnology, first at TissueLabs from 2020 to 2022 and later at Galy from 2022 to 2023. In these roles, I designed laboratory equipment and 3D printers.
                </p>
                <p>
                  While I enjoyed building new tech, I became increasingly uncomfortable with the idea that my role as an engineer was to replace people with machines. I wanted to create technologies that support people instead. This led me to do my Masters in Design Engineering at Harvard, exploring wearable devices, digital health, and HCI.
                </p>
                <p>
                  In 2025, my startup AllyCloud was selected as one of the top 100 projects for Prototypes for Humanity, a global program organized by the Government of Dubai.
                </p>
                <p>
                  Outside of my work, I love engaging in social projects, especially through teaching and mentoring. I also enjoy drinking tea, cooking, bouldering, and exploring new countries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Background with Parallax */}
      <section className="flex h-[80vh] lg:h-[90vh] overflow-hidden">
        <div
          className="w-1/2"
          style={{
            backgroundImage: `url(${backgroundImage1})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'left bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '55%'
          }}
        />
        <div
          className="w-1/2"
          style={{
            backgroundImage: `url(${backgroundImage2})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '55%'
          }}
        />
      </section>

      {/* About Section - Second Part */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl text-gray-900 mb-8">
              Health is not only clinical
            </h2>

            <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
              <p>
                Across my projects, I redesign patient–caregiver interactions through cyber-physical technologies that consider three dimensions of care:
              </p>
              <ul className="space-y-2 list-none pl-0">
                <li><strong>Bodies</strong> — delivering treatment, monitoring biomarkers, and sensing physiological change.</li>
                <li><strong>Behaviors</strong> — understanding how people feel, trust, and integrate care into daily routines.</li>
                <li><strong>Systems</strong> — examining how people, organizations, cultures, and social structures can either support care or contribute to health problems.</li>
              </ul>
              <p>Some of the questions that guide my work:</p>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-gray-800">What should be treated?</p>
                  <p>
                    Healthcare should not automatically define difference as disorder. For example, autism is often framed as a disability to be cured, rather than a form of neurodivergence that can be understood, supported, and accommodated. When care tries to normalize people instead of supporting them, it can create more stigma than healing.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">How should care be delivered?</p>
                  <p>
                    Care should respect different cultural understandings of health. In many Indigenous communities in Brazil, health is not only individual or clinical; it is also ecological, spiritual, and collective. Technologies for care should not impose a single Western medical worldview, but listen to the communities they are meant to serve.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Where should care happen?</p>
                  <p>
                    Health does not have to be limited to hospitals, clinics, or doctor's offices. Care can happen at home, at work, in schools, in communities, and through playful everyday interactions.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Who should receive care?</p>
                  <p>
                    Everyone should have access to good, affordable, and meaningful care — including people often excluded from healthcare systems, as well as animals and the ecosystems we depend on.
                  </p>
                </div>
              </div>
              <p>
                My work is to listen to stakeholders across these contexts and design technologies that take bodies, behaviors, cultures, and systems into account.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
