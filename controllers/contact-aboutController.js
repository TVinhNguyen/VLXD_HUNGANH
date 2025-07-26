const getContactPage = (req, res) => {
  const contactInfo = [
    {
      icon: 'phone',
      title: "Số điện thoại",
      details: [
        { label: "Văn phòng chính", value: "+84 0369 152 207" },
        { label: "Hotline bán hàng", value: "+84 0327 839 689" },
      ],
    },
    {
      icon: 'mail',
      title: "Địa chỉ email",
      details: [
        { label: "Liên hệ chung", value: "info@vlxdhunganh.shop" },
        { label: "Bán hàng", value: "sales@vlxdhunganh.shop" },
        { label: "Hỗ trợ kỹ thuật", value: "support@vlxdhunganh.shop" },
      ],
    },
    {
      icon: 'map-pin',
      title: "Địa chỉ văn phòng",
      details: [
        { label: "Trụ sở chính", value: "232 Đỗ Đăng Tuyển , Đại Lộc, Quảng Nam" },
        { label: "Showroom", value: "133 Đỗ Đăng Tuyển, Đại Lộc, Quảng Nam" },
        { label: "Kho hàng", value: "275 Đỗ Đăng Tuyển, Đại Lộc, Quảng Nam" },
      ],
    },
    {
      icon: 'clock',
      title: "Giờ làm việc",
      details: [
        { label: "Thứ 2 - Thứ 6", value: "7:00 - 18:00" },
        { label: "Thứ 7", value: "8:00 - 17:00" },
        { label: "Chủ nhật", value: "Chỉ nhận cuộc gọi khẩn cấp" },
      ],
    },
  ];

  const inquiryTypes = [
    { value: "quote", label: "Yêu cầu báo giá", icon: "calculator" },
    { value: "technical", label: "Hỗ trợ kỹ thuật", icon: "message-square" },
    { value: "delivery", label: "Yêu cầu giao hàng", icon: "truck" },
    { value: "partnership", label: "Hợp tác", icon: "building" },
    { value: "catalog", label: "Danh mục sản phẩm", icon: "file-text" },
    { value: "other", label: "Khác", icon: "message-square" },
  ];

  const projectTypes = [
    { value: "residential", label: "Nhà ở dân dụng" },
    { value: "commercial", label: "Thương mại" },
    { value: "industrial", label: "Công nghiệp" },
    { value: "infrastructure", label: "Hạ tầng" },
    { value: "renovation", label: "Cải tạo" },
  ];

  res.render('pages/contact', {
    title: 'Liên hệ - VLXD Hùng Anh',
    meta: {
        title: `Liên Hệ - VLXD Hùng Anh`,
        description: `Liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất.`
    },
    contactInfo,
    inquiryTypes,
    projectTypes,
    success: false,
    errors: null,
    formData: {}
  });
};

const postContactForm = async (req, res) => {
  try {
    const { name, email, phone, company, projectType, message, inquiryType } = req.body;
    
    // Validation
    const errors = [];
    if (!name) errors.push('Vui lòng nhập họ và tên');
    if (!email) errors.push('Vui lòng nhập email');
    if (!phone) errors.push('Vui lòng nhập số điện thoại');
    if (!message) errors.push('Vui lòng nhập nội dung');
    if (!inquiryType) errors.push('Vui lòng chọn loại yêu cầu');

    if (errors.length > 0) {
      // Render lại form với errors
      const contactInfo = [
        {
          icon: 'phone',
          title: "Số điện thoại",
          details: [
            { label: "Văn phòng chính", value: "+84 0369 152 207" },
            { label: "Hotline bán hàng", value: "+84 0327 839 689" },
          ],
        },
        {
          icon: 'mail',
          title: "Địa chỉ email",
          details: [
            { label: "Liên hệ chung", value: "info@vlxdhunganh.shop" },
            { label: "Bán hàng", value: "sales@vlxdhunganh.shop" },
            { label: "Hỗ trợ kỹ thuật", value: "support@vlxdhunganh.shop" },
          ],
        },
        {
          icon: 'map-pin',
          title: "Địa chỉ văn phòng",
          details: [
            { label: "Trụ sở chính", value: "232 Đỗ Đăng Tuyển , Đại Lộc, Quảng Nam" },
            { label: "Showroom", value: "133 Đỗ Đăng Tuyển, Đại Lộc, Quảng Nam" },
            { label: "Kho hàng", value: "275 Đỗ Đăng Tuyển, Đại Lộc, Quảng Nam" },
          ],
        },
        {
          icon: 'clock',
          title: "Giờ làm việc",
          details: [
            { label: "Thứ 2 - Thứ 6", value: "7:00 - 18:00" },
            { label: "Thứ 7", value: "8:00 - 17:00" },
            { label: "Chủ nhật", value: "Chỉ nhận cuộc gọi khẩn cấp" },
          ],
        },
      ];

      const inquiryTypes = [
        { value: "quote", label: "Yêu cầu báo giá", icon: "calculator" },
        { value: "technical", label: "Hỗ trợ kỹ thuật", icon: "message-square" },
        { value: "delivery", label: "Yêu cầu giao hàng", icon: "truck" },
        { value: "partnership", label: "Hợp tác", icon: "building" },
        { value: "catalog", label: "Danh mục sản phẩm", icon: "file-text" },
        { value: "other", label: "Khác", icon: "message-square" },
      ];

      const projectTypes = [
        { value: "residential", label: "Nhà ở dân dụng" },
        { value: "commercial", label: "Thương mại" },
        { value: "industrial", label: "Công nghiệp" },
        { value: "infrastructure", label: "Hạ tầng" },
        { value: "renovation", label: "Cải tạo" },
      ];

      return res.render('contact', {
        title: 'Liên hệ chúng tôi - Vật Liệu Xây Dựng Hùng Anh',
        contactInfo,
        inquiryTypes,
        projectTypes,
        success: false,
        errors,
        formData: req.body
      });
    }

    // Xử lý gửi email hoặc lưu vào database
    // TODO: Implement email sending logic
    console.log('Contact form submitted:', {
      name, email, phone, company, projectType, message, inquiryType
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Render success page
    res.render('contact-success', {
      title: 'Cảm ơn - Vật Liệu Xây Dựng Hùng Anh'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).render('error', {
      title: 'Error - VLXD Hùng Anh',
      message: 'Something went wrong. Please try again later.'
    });
  }
};


const getAboutPage = async (req, res) => {
  // Dữ liệu thống kê
  const stats = [
    { number: "15+", label: "Năm kinh nghiệm" },
    { number: "1000+", label: "Dự án hoàn thành" },
    { number: "500+", label: "Khách hàng hài lòng" },
    { number: "50+", label: "Đội ngũ chuyên gia" }
  ];

  // Giá trị cốt lõi
  const values = [
    {
      icon: "shield",
      title: "Chất lượng hàng đầu",
      description: "Chúng tôi không bao giờ thỏa hiệp về chất lượng. Mỗi sản phẩm đều đạt tiêu chuẩn quốc tế cao nhất."
    },
    {
      icon: "users",
      title: "Khách hàng là trung tâm",
      description: "Khách hàng là trọng tâm của mọi hoạt động. Thành công của khách hàng là thành công của chúng tôi."
    },
    {
      icon: "award",
      title: "Đổi mới sáng tạo",
      description: "Chúng tôi liên tục đầu tư vào công nghệ và phương pháp mới để dẫn đầu xu hướng ngành."
    },
    {
      icon: "lightbulb",
      title: "Phát triển bền vững",
      description: "Xây dựng có trách nhiệm cho thế hệ tương lai với vật liệu và giải pháp thân thiện môi trường."
    }
  ];

  // Các cột mốc quan trọng
  const milestones = [
    {
      year: "2007",
      title: "Mở cửa hàng đầu tiên",
      description: "Khởi đầu xây dựng thương hiệu với cửa hàng đầu tiên, đánh dấu bước chân vào ngành vật liệu xây dựng."
    },
    {
      year: "2015",
      title: "Mở rộng quy mô cửa hàng",
      description: "Phát triển thêm nhiều chi nhánh, mở rộng thị trường và nâng cao năng lực phục vụ khách hàng."
    },
    {
      year: "2018",
      title: "Xây dựng kho lưu trữ và xe vận chuyển",
      description: "Hoàn thành kho lưu trữ lớn cùng đội xe vận chuyển chuyên nghiệp, tối ưu năng lực logistics."
    },
    {
      year: "2020",
      title: "Nhận giải thưởng đại lý bán chạy",
      description: "Được vinh danh với các giải thưởng danh giá về doanh số và chất lượng dịch vụ đại lý vật liệu xây dựng."
    },
    {
      year: "2022",
      title: "Mở showroom mới trên trục đường chính",
      description: "Khai trương showroom hiện đại, nâng tầm trải nghiệm khách hàng trên tuyến đường trọng điểm."
    },
    {
      year: "2024",
      title: "Hoàn thành sứ mệnh đổi mới và phát triển",
      description: "Tiếp tục thực hiện các dự án đổi mới, hoàn thiện sản phẩm và dịch vụ, khẳng định vị thế dẫn đầu."
    }
  ];


  

  // Thành tựu và chứng nhận
  const achievements = [
    {
      icon: "trophy",
      title: "Nhà cung cấp xuất sắc 2023",
      description: "Giải thưởng Xây dựng Việt Nam"
    },
    {
      icon: "certificate",
      title: "ISO 9001:2015",
      description: "Hệ thống quản lý chất lượng"
    },
    {
      icon: "star",
      title: "Đánh giá 5 sao",
      description: "Khảo sát hài lòng khách hàng"
    },
    {
      icon: "check-circle",
      title: "Chứng nhận công trình xanh",
      description: "Nhà cung cấp vật liệu bền vững"
    }
  ];

  // Render trang about với dữ liệu
  res.render('pages/about', {
    title: 'Thông tin về chúng tôi - Vật Liệu Xây Dựng Hùng Anh',
    stats,
    values,
    milestones,
    achievements
  });
};

export default {
    getContactPage,
    postContactForm,
    getAboutPage
};