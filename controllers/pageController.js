import Product from '../models/Product.js';
import Category from '../models/Category.js';

const getHomepage = async (req, res) => {
    try {
        const newProducts = await Product.find().sort({ createdAt: -1 }).limit(8).populate('category');
        const categories = await Category.find();

        // --- DỮ LIỆU MỚI CHO STATS SECTION ---
        const statsData = [
            { number: 12, suffix: '+', label: 'Năm Kinh Nghiệm' },
            { number: 500, suffix: '+', label: 'Dự Án Hoàn Thành' },
            { number: 200, suffix: '+', label: 'Đối Tác Tin Cậy' },
            { number: 98, suffix: '%', label: 'Khách Hàng Hài Lòng' }
        ];
         const processStepsData = [
            { step: 1, title: 'Tư Vấn & Lên Đơn', description: 'Liên hệ với chúng tôi để nhận tư vấn chuyên sâu và hỗ trợ đặt hàng nhanh chóng.' },
            { step: 2, title: 'Báo Giá & Xác Nhận', description: 'Chúng tôi gửi báo giá cạnh tranh nhất và xác nhận đơn hàng, thời gian giao nhận.' },
            { step: 3, title: 'Giao Hàng Tận Nơi', description: 'Vận chuyển vật liệu đến tận chân công trình của bạn, đảm bảo đúng tiến độ.' }
        ];
        const commitmentsData = [
            { icon: 'fa-award', title: 'Chất Lượng Hàng Đầu', description: 'Sản phẩm được kiểm định nghiêm ngặt, đảm bảo tiêu chuẩn kỹ thuật cho mọi hạng mục.' },
            { icon: 'fa-tags', title: 'Giá Cả Cạnh Tranh', description: 'Giá gốc từ nhà sản xuất, chiết khấu hấp dẫn cho các dự án và đối tác lâu dài.' },
            { icon: 'fa-truck-fast', title: 'Giao Hàng Nhanh Chóng', description: 'Hệ thống xe vận chuyển đa dạng, đảm bảo giao hàng đúng tiến độ tại chân công trình.' }
        ];

        // --- DỮ LIỆU MỚI CHO TESTIMONIALS SECTION ---
        const testimonialsData = [
            { rating: 5, content: 'Chất lượng sản phẩm rất tốt, giao hàng đúng hẹn. Dịch vụ chuyên nghiệp, tôi rất hài lòng và sẽ tiếp tục hợp tác lâu dài.', name: 'Anh Trần Văn An', company: 'Giám đốc, Công ty Xây dựng An Bình' },
            { rating: 5, content: 'Đội ngũ tư vấn rất nhiệt tình, giúp tôi chọn được vật liệu phù hợp với ngân sách mà vẫn đảm bảo chất lượng. Sẽ giới thiệu cho đối tác.', name: 'Chị Lê Thị Mai', company: 'Chủ thầu, Công trình nhà phố Q7' },
            { rating: 4, content: 'Giá cả cạnh tranh so với nhiều nhà cung cấp khác. Quá trình đặt và nhận hàng khá suôn sẻ, chỉ có một chút chậm trễ nhỏ nhưng không đáng kể.', name: 'Ông Nguyễn Hùng', company: 'Kỹ sư trưởng, Dự án ABC' }
        ];
        const categoriesForTabs = await Category.find().limit(3);
        const productsByCat = await Promise.all(
            categoriesForTabs.map(async (cat) => {
                const items = await Product.find({ category: cat._id }).limit(3);
                return {
                    category: cat.name,
                    slug: cat.slug,
                    items: items.map(p => ({ 
                        name: p.name,
                        slug: p.slug,
                        price: `₫${p.price.toLocaleString('vi-VN')}`,
                        image: p.images[0] || 'https://via.placeholder.com/300x200'
                    }))
                };
            })
        );

        // Organization structured data for homepage
        const organizationStructuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "VLXD Hùng Anh",
            "url": process.env.SITE_URL,
            "logo": `${process.env.SITE_URL}/images/vlxd-hung-anh.jpeg`,
            "description": "Chuyên cung cấp các loại vật liệu xây dựng chất lượng cao như gạch, cát, đá, xi măng với giá tốt nhất thị trường",
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
            },
            "sameAs": [
                "https://facebook.com/vlxdhunganh",
                "https://instagram.com/vlxdhunganh"
            ]
        };

        res.render('pages/index', {
            meta: {
                title: 'Trang chủ - Vật liệu Xây dựng Hùng Anh',
                description: 'Chuyên cung cấp các loại vật liệu xây dựng chất lượng cao như gạch, cát, đá, xi măng với giá tốt nhất thị trường.',
                keywords: 'vật liệu xây dựng, gạch, xi măng, cát, đá, thép xây dựng, VLXD, Hùng Anh, TP.HCM',
                canonical: process.env.SITE_URL,
                ogType: 'website'
            },
            structuredData: organizationStructuredData,
            currentPath: '/',
            products: newProducts,
            categories: categories,
            stats: statsData,
            productsByCat: productsByCat,
            processSteps: processStepsData,
            testimonials: testimonialsData,
            commitments: commitmentsData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};

export default {
    getHomepage
};
