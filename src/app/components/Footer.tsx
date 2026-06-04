export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-2">Lucas Miyazaki</h2>
          <p className="text-gray-600">Designing wearable devices for care.</p>
        </div>

        <div className="flex flex-wrap gap-6 text-gray-600">
          <a
            href="mailto:lucaskmiyazaki@hotmail.com"
            className="hover:text-teal-600 transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-miyazaki-584a75409"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-600 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/lucaskmiyazaki"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-600 transition-colors"
          >
            GitHub
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-600 transition-colors"
          >
            CV
          </a>
        </div>
      </div>
    </footer>
  );
}
