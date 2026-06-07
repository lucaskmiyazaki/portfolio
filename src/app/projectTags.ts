export const projectTags: Record<string, string[]> = {
  noonchi: ['User Research', 'Interaction Design', 'AI/Computer Vision', 'Healthtech'],
  allycloud: ['Healthtech', 'Embedded Systems', 'User Research', 'Interaction Design', 'Mechanical Design'],
  relevo: ['Embedded Systems', 'Healthtech', 'Mechanical Design', 'User Research'],
  tissueray: ['Digital Fabrication', 'Mechanical Design', 'Embedded Systems', 'Biomaterials', 'Healthtech'],
  tukanos: ['Spatial Computing', 'Interaction Design', 'User Research', 'More-than-human Design'],
  stallguardian: ['Embedded Systems', 'AI/Computer Vision', 'Interaction Design', 'More-than-human Design'],
  'aroma-atlas': ['Spatial Computing', 'Mechanical Design', 'Embedded Systems'],
  dino: ['Spatial Computing', 'Biomaterials', 'Mechanical Design', 'Embedded Systems'],
  microvoxels: ['Digital Fabrication', 'Mechanical Design', 'Embedded Systems', 'Spatial Computing'],
  'ai-cashier': ['AI/Computer Vision', 'Embedded Systems'],
  'teeth-scanning': ['AI/Computer Vision', 'Healthtech', 'Digital Fabrication'],
};

const HERO_EXCLUDE = new Set(['User Research', 'Interaction Design', 'Embedded Systems']);

export function heroTags(key: string): string {
  return (projectTags[key] ?? [])
    .filter(t => !HERO_EXCLUDE.has(t))
    .slice(0, 3)
    .join(' · ');
}
