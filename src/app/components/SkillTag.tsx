interface SkillTagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function SkillTag({ label, active, onClick }: SkillTagProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full border transition-all ${
        active
          ? 'bg-teal-600 border-teal-600 text-white'
          : 'text-gray-700 bg-white border-gray-200 hover:border-teal-400 hover:bg-teal-50/30'
      }`}
    >
      {label}
    </button>
  );
}
