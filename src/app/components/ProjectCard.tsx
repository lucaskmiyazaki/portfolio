import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  isVideo?: boolean;
  href?: string;
}

export default function ProjectCard({ title, description, tags, imageUrl, isVideo = false, href }: ProjectCardProps) {
  const thumbnail = (
    <div className="relative overflow-hidden rounded-3xl bg-gray-50 aspect-[4/3] mb-6">
      {isVideo ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
          <svg className="w-20 h-20 text-teal-400/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      ) : (
        <ImageWithFallback
          src={imageUrl || ''}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}
    </div>
  );

  const inner = (
    <>
      {thumbnail}
      <h3 className="text-2xl text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:border-teal-300 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
          {inner}
        </a>
      );
    }
    return (
      <Link to={href} className="group cursor-pointer block">
        {inner}
      </Link>
    );
  }

  return <div className="group cursor-pointer">{inner}</div>;
}
