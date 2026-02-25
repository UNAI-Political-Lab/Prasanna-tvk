import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, image }) => {
    const siteTitle = 'Prasanna TVK - Tamilaga Vettri Kazhagam';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "Official website of Prasanna, a dedicated TVK (Tamilaga Vettri Kazhagam) candidate and member. Discover his biography, services, petitions, and vision for the people.";
    const defaultKeywords = "Prasanna TVK, Prasanna tvk, TVK Prasanna, Tamilaga Vettri Kazhagam, TVK Candidate, TVK Member, Prasanna politics, Tamil Nadu politics";
    const defaultImage = "/webbg.png";
    const defaultUrl = "https://www.prasannatvk.com";

    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || defaultKeywords;
    const metaImage = image || defaultImage;
    const metaUrl = url ? `${defaultUrl}${url}` : defaultUrl;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />
            <meta property="twitter:url" content={metaUrl} />
        </Helmet>
    );
};

export default SEO;
