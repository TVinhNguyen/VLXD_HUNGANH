// SEO middleware for adding common SEO data to all routes
export const addSEODefaults = (req, res, next) => {
    // Add common SEO data that all pages can use
    res.locals.siteUrl = process.env.SITE_URL || 'https://vlxd-hung-anh.com';
    res.locals.siteName = 'VLXD Hùng Anh';
    res.locals.defaultKeywords = 'vật liệu xây dựng, gạch, xi măng, cát, đá, thép xây dựng, VLXD Hùng Anh';
    
    // Add current URL for canonical tags
    res.locals.currentUrl = `${res.locals.siteUrl}${req.originalUrl}`;
    
    next();
};

// Middleware to add structured data for organization
export const addOrganizationData = (req, res, next) => {
    res.locals.organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VLXD Hùng Anh",
        "url": process.env.SITE_URL,
        "logo": `${process.env.SITE_URL}/images/vlxd-hung-anh.jpeg`,
        "description": "Chuyên cung cấp các loại vật liệu xây dựng chất lượng cao",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Đường ABC",
            "addressLocality": "TP.HCM",
            "addressCountry": "VN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+84123456789",
            "contactType": "customer service",
            "availableLanguage": "Vietnamese"
        }
    };
    
    next();
};