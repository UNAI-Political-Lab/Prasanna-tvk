import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.prasannatvk.com';
const SITE_TITLE = 'Prasanna TVK - Tamilaga Vettri Kazhagam';
const DEFAULT_DESCRIPTION = 'Official website of Prasanna TVK, an Indian politician, entrepreneur, and founder of Autobourn Cars. TVK (Tamilaga Vettri Kazhagam) candidate committed to youth, welfare, and public service.';
const DEFAULT_KEYWORDS = 'Prasanna TVK, TVK Prasanna, Who is Prasanna TVK, Prasanna TVK politician, Founder of Autobourn Cars, Prasanna TVK Autobourn Cars, Tamilaga Vettri Kazhagam, Tamil Nadu politics, TVK Candidate, Velachery';
const DEFAULT_IMAGE = `${SITE_URL}/prasannatvk-bio.jpeg`;

const SEO = ({ title, description, keywords, url, image, schema }) => {
    const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
    const metaDescription = description || DEFAULT_DESCRIPTION;
    const metaKeywords = keywords || DEFAULT_KEYWORDS;
    const metaImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE;
    const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Prasanna TVK" />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Prasanna TVK" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:site" content="@prasannatvk" />

            {/* JSON-LD Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
