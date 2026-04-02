import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { webProjects, mobileApps } from '../data/portfolioData';
import './Details.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const allProjects = [...webProjects, ...mobileApps];
    const project = allProjects.find(p => p.id === id);
    const isWeb = webProjects.some(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return <div className="details-page"><h2 className="text-center">Project Not Found</h2></div>;
    }

    return (
        <div className="details-page animate-fadeUp">
            <div className="details-container glass-card">
                <Link to={isWeb ? "/portfolio/web" : "/portfolio/apps"} className="back-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Back to List
                </Link>

                <div className="details-grid">
                    <div className="details-media">
                         {project.icon ? (
                            <div className="project-icon-wrap">
                                <img src={project.icon} alt={project.name} className="detail-app-icon" />
                            </div>
                        ) : (
                            <div className="detail-placeholder-wrap">
                                <div className="placeholder-3d-effect">
                                    {project.name.charAt(0)}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="details-info">
                        <span className={`status-badge ${project.status}`}>{project.status === 'live' ? 'Live Project' : 'Under Development'}</span>
                        <h1 className="heading-serif detail-title">{project.name}</h1>
                        <div className="gold-divider" />
                        
                        <p className="detail-full-desc">{project.fullDesc}</p>
                        
                        <div className="detail-meta">
                            <div className="meta-item">
                                <span className="meta-label">Technologies Used:</span>
                                <span className="tech-badge">{project.tech}</span>
                            </div>
                        </div>

                        {project.url && project.url !== "#" && (
                            <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-gold detail-btn">
                                {project.id.includes('2048') || project.id.includes('chess') || project.id.includes('tic-tac') ? 'Get it on Play Store' : 'Visit Live Website'}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
