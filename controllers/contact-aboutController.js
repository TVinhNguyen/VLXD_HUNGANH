const getContactPage = (req, res) => {
  const contactInfo = [
    {
      icon: 'phone',
      title: "Phone Numbers",
      details: [
        { label: "Main Office", value: "+84 123 456 789" },
        { label: "Sales Hotline", value: "+84 987 654 321" },
        { label: "Emergency", value: "+84 555 123 456" },
      ],
    },
    {
      icon: 'mail',
      title: "Email Addresses",
      details: [
        { label: "General Inquiries", value: "info@vungxay.com" },
        { label: "Sales", value: "sales@vungxay.com" },
        { label: "Technical Support", value: "support@vungxay.com" },
      ],
    },
    {
      icon: 'map-pin',
      title: "Office Locations",
      details: [
        { label: "Head Office", value: "123 Construction Street, District 1, HCMC" },
        { label: "Warehouse", value: "456 Industrial Zone, District 9, HCMC" },
        { label: "Branch Office", value: "789 Business Center, Hanoi" },
      ],
    },
    {
      icon: 'clock',
      title: "Business Hours",
      details: [
        { label: "Monday - Friday", value: "7:00 AM - 6:00 PM" },
        { label: "Saturday", value: "8:00 AM - 5:00 PM" },
        { label: "Sunday", value: "Emergency calls only" },
      ],
    },
  ];

  const inquiryTypes = [
    { value: "quote", label: "Request Quote", icon: "calculator" },
    { value: "technical", label: "Technical Support", icon: "message-square" },
    { value: "delivery", label: "Delivery Inquiry", icon: "truck" },
    { value: "partnership", label: "Partnership", icon: "building" },
    { value: "catalog", label: "Product Catalog", icon: "file-text" },
    { value: "other", label: "Other", icon: "message-square" },
  ];

  const projectTypes = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "renovation", label: "Renovation" },
  ];

  res.render('pages/contact', {
    title: 'Contact Us - VỮNG XÂY',
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
    if (!name) errors.push('Name is required');
    if (!email) errors.push('Email is required');
    if (!phone) errors.push('Phone is required');
    if (!message) errors.push('Message is required');
    if (!inquiryType) errors.push('Inquiry type is required');

    if (errors.length > 0) {
      // Render lại form với errors
      const contactInfo = [
        {
          icon: 'phone',
          title: "Phone Numbers",
          details: [
            { label: "Main Office", value: "+84 123 456 789" },
            { label: "Sales Hotline", value: "+84 987 654 321" },
            { label: "Emergency", value: "+84 555 123 456" },
          ],
        },
        {
          icon: 'mail',
          title: "Email Addresses",
          details: [
            { label: "General Inquiries", value: "info@vungxay.com" },
            { label: "Sales", value: "sales@vungxay.com" },
            { label: "Technical Support", value: "support@vungxay.com" },
          ],
        },
        {
          icon: 'map-pin',
          title: "Office Locations",
          details: [
            { label: "Head Office", value: "123 Construction Street, District 1, HCMC" },
            { label: "Warehouse", value: "456 Industrial Zone, District 9, HCMC" },
            { label: "Branch Office", value: "789 Business Center, Hanoi" },
          ],
        },
        {
          icon: 'clock',
          title: "Business Hours",
          details: [
            { label: "Monday - Friday", value: "7:00 AM - 6:00 PM" },
            { label: "Saturday", value: "8:00 AM - 5:00 PM" },
            { label: "Sunday", value: "Emergency calls only" },
          ],
        },
      ];

      const inquiryTypes = [
        { value: "quote", label: "Request Quote", icon: "calculator" },
        { value: "technical", label: "Technical Support", icon: "message-square" },
        { value: "delivery", label: "Delivery Inquiry", icon: "truck" },
        { value: "partnership", label: "Partnership", icon: "building" },
        { value: "catalog", label: "Product Catalog", icon: "file-text" },
        { value: "other", label: "Other", icon: "message-square" },
      ];

      const projectTypes = [
        { value: "residential", label: "Residential" },
        { value: "commercial", label: "Commercial" },
        { value: "industrial", label: "Industrial" },
        { value: "infrastructure", label: "Infrastructure" },
        { value: "renovation", label: "Renovation" },
      ];

      return res.render('contact', {
        title: 'Contact Us - VỮNG XÂY',
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
      title: 'Thank You - VỮNG XÂY'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).render('error', {
      title: 'Error - VỮNG XÂY',
      message: 'Something went wrong. Please try again later.'
    });
  }
};

export default {
    getContactPage,
    postContactForm
};
