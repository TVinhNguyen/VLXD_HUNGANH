// SEO utility functions
export const generateBreadcrumbStructuredData = (breadcrumbs) => {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url
        }))
    };
};

export const generateProductListStructuredData = (products, categoryName) => {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${categoryName} - Vật liệu xây dựng`,
        "numberOfItems": products.length,
        "itemListElement": products.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.name,
                "url": `${process.env.SITE_URL}/san-pham/${product.slug}`,
                "image": product.images[0] ? `${process.env.SITE_URL}${product.images[0]}` : null,
                "offers": {
                    "@type": "Offer",
                    "price": product.price,
                    "priceCurrency": "VND"
                }
            }
        }))
    };
};

export const generateFAQStructuredData = (faqs) => {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
};