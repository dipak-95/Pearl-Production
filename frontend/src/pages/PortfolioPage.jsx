import React from 'react';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

const PortfolioPage = () => {
    return (
        <div className="portfolio-page" style={{paddingTop: '100px'}}>
            <Portfolio />
            <Contact />
        </div>
    );
};

export default PortfolioPage;
