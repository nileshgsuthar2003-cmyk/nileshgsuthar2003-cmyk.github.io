import { trackResumeDownload } from '../../utils/analytics';

function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const resumePath = `${import.meta.env.BASE_URL}documents/Nilesh_Suthar_Resume.pdf`;

  const handleDownloadClick = () => {
    trackResumeDownload({
      action: 'direct_download',
      source: 'resume_modal',
      method: 'file_attachment',
    });
  };

  const handleViewClick = () => {
    trackResumeDownload({
      action: 'view_in_tab',
      source: 'resume_modal',
      method: 'new_window',
    });
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3 className="modal-title">Nilesh Suthar — Resume</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        </div>

        <div className="modal-body">
          <p className="modal-summary">
            Get a detailed look at my experience, skills, projects, and education — all in one document. Feel free to download or view it directly in your browser.
          </p>

          <div className="modal-actions">
            <a 
              href={resumePath} 
              download="Nilesh_Suthar_Resume.pdf"
              className="modal-btn primary-btn"
              onClick={handleDownloadClick}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Resume
            </a>

            <a 
              href={resumePath} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="modal-btn secondary-btn"
              onClick={handleViewClick}
            >
              View Resume ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
