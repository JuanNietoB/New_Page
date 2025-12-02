export type Language = "en" | "es"

export const translations = {
  en: {
    // Navigation
    about: "About",
    pricing: "Pricing",
    blog: "Blog",
    contact: "Contact",
    signIn: "Sign In",
    startFreeTrial: "Start Free Trial",
    dashboard: "Dashboard",
    myAccount: "My Account",
    signOut: "Sign Out",
    proPlan: "Pro Plan",
    freeTrial: "Free Trial",

    // Footer
    navigation: "Navigation",
    home: "Home",
    legal: "Legal",
    terms: "Terms",
    privacy: "Privacy",
    cookies: "Cookies",
    consultancyDesc: "Analytics and data for the battery energy storage market across the Americas.",

    // Home Page
    heroTitle: "Battery Energy Storage Analytics for the Americas",
    heroSubtitle:
      "Track real-time BESS deployment, analyze growth patterns, and discover market opportunities across North and South America with comprehensive data insights.",
    getStarted: "Start Free Trial",
    viewPricing: "View Pricing",
    freeTrialNote: "30-day free trial • No credit card required",

    // Features
    comprehensiveBESS: "Comprehensive BESS Intelligence",
    comprehensiveBESSDesc: "Everything you need to make informed decisions in the energy storage market",

    interactiveMapView: "Interactive Map View",
    interactiveMapViewDesc:
      "Visualize BESS projects across the Americas with detailed location data and project status",

    growthAnalytics: "Growth Analytics",
    growthAnalyticsDesc: "Track deployment trends by country with comprehensive charts and historical data",

    kpiTitle: "Key Performance Indicators",
    kpiDesc: "Monitor capacity, investment levels, and market penetration metrics in real-time",

    countryInsights: "Country-Level Insights",
    countryInsightsDesc: "Deep dive into regional markets with detailed country-specific analytics",

    realTimeUpdates: "Real-Time Updates",
    realTimeUpdatesDesc: "Get the latest data on new projects, policy changes, and market developments",

    enterpriseSecurity: "Enterprise Security",
    enterpriseSecurityDesc: "Bank-level encryption and secure data access controls for your organization",

    // CTA
    ctaTitle: "Ready to Transform Your Energy Storage Strategy?",
    ctaSubtitle:
      "Join industry leaders using EnergyStore to make data-driven decisions in the renewable energy market.",
    getStartedNow: "Get Started Now",

    // Pricing Page
    simplePricing: "Simple, Transparent Pricing",
    pricingSubtitle: "Choose the plan that fits your needs. Start with a free trial and upgrade anytime.",
    freeTrialTitle: "Free Trial",
    freeTrialDesc: "Perfect for exploring the platform",
    perMonth: "/month",
    daysFreeTrial: "30 days free access",
    startFreeTrialBtn: "Start Free Trial",
    basicDashboard: "Basic dashboard with energy storage data",
    limitedCountry: "Limited country coverage",
    basicCharts: "Basic charts and visualizations",
    interactiveMap: "Interactive map with project locations",
    advancedKPIs: "Advanced KPIs and analytics",
    dataExport: "Data export capabilities",
    notAvailableEmail: "Note: Not available for @gmail, @hotmail, or @yahoo addresses",
    proPlanTitle: "Pro Plan",
    proPlanDesc: "For professionals who need full access",
    orAnnual: "or $4,800/year (save 20%)",
    mostPopular: "Most Popular",
    upgradeNow: "Upgrade Now",
    everythingInFree: "Everything in Free Trial, plus:",
    interactiveMapAll: "Interactive map with all project locations",
    completeCountry: "Complete coverage of all Americas countries",
    advancedBarCharts: "Advanced bar charts showing BESS growth by country",
    comprehensiveKPIs: "Comprehensive KPIs and analytics dashboard",
    exportData: "Export data to CSV and Excel",
    prioritySupport: "Priority email support",
    apiAccess: "API access for integrations",
    faqTitle: "Frequently Asked Questions",
    cancelAnytime: "Can I cancel anytime?",
    cancelAnswer:
      "Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period.",
    paymentMethods: "What payment methods do you accept?",
    paymentAnswer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and ACH transfers for annual plans.",
    annualDiscount: "Is there a discount for annual billing?",
    annualAnswer: "Yes, annual subscribers save 20% compared to monthly billing. That is 2 months free!",
    enterprisePlans: "Do you offer team or enterprise plans?",
    enterpriseAnswer:
      "Yes, we offer custom enterprise plans with additional features, dedicated support, and volume discounts. Contact us for details.",

    // Blog Page
    blogTitle: "Energy Storage Insights",
    blogSubtitle:
      "Stay updated with the latest trends, analysis, and insights from the battery energy storage industry across the Americas.",
    blogCategory: {
      industryInsights: "Industry Insights",
      marketAnalysis: "Market Analysis",
      technicalGuide: "Technical Guide",
      policyRegulation: "Policy & Regulation",
      caseStudy: "Case Study",
      economics: "Economics",
    },
    readArticle: "Read Article",
    neverMissUpdate: "Never Miss an Update",
    subscribeNewsletter:
      "Subscribe to our newsletter for weekly insights on battery energy storage trends and analysis.",
    subscribeToNewsletter: "Subscribe to Newsletter",

    // Blog Posts
    blogPost1Title: "The Future of Battery Energy Storage Systems in North America",
    blogPost1Excerpt:
      "Exploring the rapid growth of BESS deployments across the United States and Canada, and what it means for renewable energy adoption.",
    blogPost2Title: "Understanding BESS Market Trends in Latin America",
    blogPost2Excerpt:
      "A deep dive into the emerging battery storage markets in Brazil, Chile, and Argentina, and the factors driving growth.",
    blogPost3Title: "How to Choose the Right Energy Storage Solution",
    blogPost3Excerpt:
      "Key considerations for energy developers when selecting battery energy storage systems for grid-scale projects.",
    blogPost4Title: "Policy Changes Driving BESS Adoption in 2024",
    blogPost4Excerpt:
      "An overview of new regulations and incentives accelerating battery storage deployment across the Americas.",
    blogPost4Content: `
      <p>The year 2024 marks a turning point for battery energy storage systems (BESS) across the Americas, driven by unprecedented policy support and regulatory frameworks designed to accelerate the clean energy transition.</p>
      
      <h2>Key Policy Developments</h2>
      
      <p>Governments across North and South America have introduced significant incentives and mandates that are reshaping the energy storage landscape. Below is a comprehensive overview of the major policies by country:</p>
      
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Policy/Incentive</th>
            <th>Impact</th>
            <th>Timeline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>United States</td>
            <td>IRA Investment Tax Credit (ITC)</td>
            <td>30% tax credit for standalone storage</td>
            <td>2024-2032</td>
          </tr>
          <tr>
            <td>Canada</td>
            <td>Clean Energy Investment Tax Credit</td>
            <td>Up to 30% for qualifying projects</td>
            <td>2024-2034</td>
          </tr>
          <tr>
            <td>Chile</td>
            <td>Energy Storage Mandate</td>
            <td>20% renewable integration requirement</td>
            <td>2024-2030</td>
          </tr>
          <tr>
            <td>Mexico</td>
            <td>National Energy Storage Strategy</td>
            <td>5 GW target by 2028</td>
            <td>2024-2028</td>
          </tr>
          <tr>
            <td>Brazil</td>
            <td>ANEEL Resolution 1000/2021</td>
            <td>Grid-scale storage compensation</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Investment Trends</h2>
      
      <p>These policy changes have catalyzed a surge in investment, with analysts projecting over $50 billion in BESS deployments across the Americas by 2028. The combination of tax incentives, renewable energy mandates, and grid modernization initiatives creates a favorable environment for developers and investors.</p>
      
      <h2>Looking Ahead</h2>
      
      <p>As these policies take effect, we expect to see rapid growth in both utility-scale and distributed energy storage projects. The regulatory certainty provided by multi-year incentive programs is enabling long-term planning and financing for major infrastructure investments.</p>
    `,
    blogPost5Title: "Case Study: 500 MWh BESS Project in Texas",
    blogPost5Excerpt: "Lessons learned from one of the largest battery storage installations in North America.",
    blogPost6Title: "California Lidera la Revolución del Almacenamiento de Energía",
    blogPost6Excerpt:
      'La capacidad de almacenamiento en baterías en California está en auge. Con mas de 11 GW ya instalados, el estado está preparado para un crecimiento explosivo con casi 4 GW de nuevos proyectos planificados para este año. El condado de Riverside por sí solo tiene 3.5 GW instalados, lo que resalta la rápida expansión. Bienvenidos a la "Década del Almacenamiento de Energía".',

    // Contact Page
    contactTitle: "Get In Touch",
    contactSubtitle:
      "Have questions about our platform? We are here to help. Reach out and we will get back to you as soon as possible.",
    sendUsMessage: "Send Us a Message",
    formDescription: "Fill out the form below and we will respond within 24 hours",
    thankYouMessage: "Thank you for your message! We will get back to you soon.",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    namePlaceholder: "John Doe",
    emailPlaceholder: "john@company.com",
    subjectPlaceholder: "How can we help?",
    messagePlaceholder: "Tell us more about your inquiry...",
    sendMessage: "Send Message",
    sending: "Sending...",
    emailLabel: "Email",
    phoneLabel: "Phone",
    officeLabel: "Office",
    supportEmail: "support@energystore.com",
    salesEmail: "sales@energystore.com",
    phoneNumber: "+1 (555) 123-4567",
    phoneHours: "Mon-Fri 9am-6pm EST",
    officeAddress1: "123 Energy Plaza",
    officeAddress2: "New York, NY 10001",
    officeAddress3: "United States",

    // About Page
    aboutTitle: "About EnergyStore",
    aboutSubtitle:
      "We are building the most comprehensive battery energy storage analytics platform for the Americas, empowering decision-makers with actionable insights.",
    ourMission: "Our Mission",
    missionPara1:
      "The energy storage market is growing exponentially, but quality data remains fragmented and difficult to access. EnergyStore was founded to solve this problem by providing a unified platform that tracks, analyzes, and forecasts battery energy storage system deployment across the Americas.",
    missionPara2:
      "We believe that transparent, accessible data is essential for accelerating the clean energy transition. Our platform serves developers, investors, policymakers, and researchers who need reliable intelligence to make informed decisions in this rapidly evolving market.",
    whatDrivesUs: "What Drives Us",
    dataAccuracy: "Data Accuracy",
    dataAccuracyDesc:
      "We maintain the highest standards of data quality through rigorous verification processes and continuous monitoring of industry sources.",
    marketFocus: "Market Focus",
    marketFocusDesc:
      "Our exclusive focus on the Americas allows us to provide unmatched depth and regional expertise that global platforms cannot match.",
    userExperience: "User Experience",
    userExperienceDesc:
      "We design intuitive interfaces that make complex data accessible, enabling users to extract insights quickly and efficiently.",
    innovation: "Innovation",
    innovationDesc:
      "We continuously enhance our platform with new features, data sources, and analytical tools to stay ahead of market needs.",
    builtByExperts: "Built by Energy Experts",
    builtByExpertsDesc:
      "Our team combines decades of experience in renewable energy development, data analytics, and software engineering. We understand the challenges you face because we have worked on the same problems ourselves in various roles across the energy storage value chain.",

    // Password Recovery
    forgotPassword: "Forgot password?",
    resetPassword: "Reset Password",
    resetPasswordTitle: "Reset Your Password",
    resetPasswordSubtitle: "Enter your email and we will send you a link to reset your password",
    sendResetLink: "Send Reset Link",
    backToSignIn: "Back to Sign In",
    checkYourEmail: "Check Your Email",
    resetLinkSent: "We have sent a password reset link to your email address. Please check your inbox.",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    updatePassword: "Update Password",
    passwordUpdated: "Password Updated!",
    passwordUpdatedMessage: "Your password has been successfully updated. You can now sign in with your new password.",
    passwordMismatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 6 characters",
  },
  es: {
    // Navigation
    about: "Nosotros",
    pricing: "Precios",
    blog: "Blog",
    contact: "Contacto",
    signIn: "Iniciar Sesión",
    startFreeTrial: "Prueba Gratuita",
    dashboard: "Panel",
    myAccount: "Mi Cuenta",
    signOut: "Cerrar Sesión",
    proPlan: "Plan Pro",
    freeTrial: "Prueba Gratuita",

    // Footer
    navigation: "Navegación",
    home: "Inicio",
    legal: "Legal",
    terms: "Términos",
    privacy: "Privacidad",
    cookies: "Cookies",
    consultancyDesc: "Análisis y datos para el mercado de almacenamiento de energía de baterías en las Américas.",

    // Home Page
    heroTitle: "Datos y análisis sobre almacenamiento eléctrico",
    heroSubtitle:
      "Track real-time BESS deployment, analyze growth patterns, and discover market opportunities across North and South America with comprehensive data insights.",
    getStarted: "Comenzar Prueba Gratuita",
    viewPricing: "Ver Precios",
    freeTrialNote: "Prueba gratuita de 30 días • No se requiere tarjeta de crédito",

    // Features
    comprehensiveBESS: "Inteligencia Integral de BESS",
    comprehensiveBESSDesc:
      "Todo lo que necesita para tomar decisiones informadas en el mercado de almacenamiento de energía",

    interactiveMapView: "Vista de Mapa Interactivo",
    interactiveMapViewDesc:
      "Visualice proyectos BESS en las Américas con datos detallados de ubicación y estado del proyecto",

    growthAnalytics: "Análisis de Crecimiento",
    growthAnalyticsDesc: "Rastree tendencias de despliegue por país con gráficos completos y datos históricos",

    kpiTitle: "Indicadores Clave de Rendimiento",
    kpiDesc: "Monitoree capacidad, niveles de inversión y métricas de penetración de mercado en tiempo real",

    countryInsights: "Información por País",
    countryInsightsDesc: "Profundice en los mercados regionales con análisis detallados específicos por país",

    realTimeUpdates: "Actualizaciones en Tiempo Real",
    realTimeUpdatesDesc:
      "Obtenga los últimos datos sobre nuevos proyectos, cambios de políticas y desarrollos del mercado",

    enterpriseSecurity: "Seguridad Empresarial",
    enterpriseSecurityDesc: "Cifrado de nivel bancario y controles de acceso a datos seguros para su organización",

    // CTA
    ctaTitle: "¿Listo para Transformar su Estrategia de Almacenamiento de Energía?",
    ctaSubtitle:
      "Únase a los líderes de la industria que usan EnergyStore para tomar decisiones basadas en datos en el mercado de energía renovable.",
    getStartedNow: "Comenzar Ahora",

    // Pricing Page
    simplePricing: "Precios Simples y Transparentes",
    pricingSubtitle:
      "Elija el plan que se ajuste a sus necesidades. Comience con una prueba gratuita y actualice en cualquier momento.",
    freeTrialTitle: "Prueba Gratuita",
    freeTrialDesc: "Perfecto para explorar la plataforma",
    perMonth: "/mes",
    daysFreeTrial: "30 días de acceso gratuito",
    startFreeTrialBtn: "Comenzar Prueba Gratuita",
    basicDashboard: "Panel básico con datos de almacenamiento de energía",
    limitedCountry: "Cobertura limitada de países",
    basicCharts: "Gráficos y visualizaciones básicas",
    interactiveMap: "Mapa interactivo con ubicaciones de proyectos",
    advancedKPIs: "KPIs y análisis avanzados",
    dataExport: "Capacidades de exportación de datos",
    notAvailableEmail: "Nota: No disponible para direcciones @gmail, @hotmail o @yahoo",
    proPlanTitle: "Plan Pro",
    proPlanDesc: "Para profesionales que necesitan acceso completo",
    orAnnual: "o $4,800/año (ahorra 20%)",
    mostPopular: "Más Popular",
    upgradeNow: "Actualizar Ahora",
    everythingInFree: "Todo en Prueba Gratuita, más:",
    interactiveMapAll: "Mapa interactivo con todas las ubicaciones de proyectos",
    completeCountry: "Cobertura completa de todos los países de las Américas",
    advancedBarCharts: "Gráficos de barras avanzados que muestran el crecimiento de BESS por país",
    comprehensiveKPIs: "Panel de KPIs y análisis completo",
    exportData: "Exportar datos a CSV y Excel",
    prioritySupport: "Soporte prioritario por correo electrónico",
    apiAccess: "Acceso API para integraciones",
    faqTitle: "Preguntas Frecuentes",
    cancelAnytime: "¿Puedo cancelar en cualquier momento?",
    cancelAnswer:
      "Sí, puede cancelar su suscripción en cualquier momento. Continuará teniendo acceso hasta el final de su período de facturación.",
    paymentMethods: "¿Qué métodos de pago aceptan?",
    paymentAnswer:
      "Aceptamos todas las principales tarjetas de crédito (Visa, MasterCard, American Express) y transferencias ACH para planes anuales.",
    annualDiscount: "¿Hay descuento por facturación anual?",
    annualAnswer:
      "Sí, los suscriptores anuales ahorran 20% en comparación con la facturación mensual. ¡Eso es 2 meses gratis!",
    enterprisePlans: "¿Ofrecen planes para equipos o empresas?",
    enterpriseAnswer:
      "Sí, ofrecemos planes empresariales personalizados con características adicionales, soporte dedicado y descuentos por volumen. Contáctenos para más detalles.",

    // Blog Page
    blogTitle: "Perspectivas de Almacenamiento de Energía",
    blogSubtitle:
      "Manténgase actualizado con las últimas tendencias, análisis y perspectivas de la industria de almacenamiento de energía en baterías en las Américas.",
    blogCategory: {
      industryInsights: "Perspectivas de la Industria",
      marketAnalysis: "Análisis de Mercado",
      technicalGuide: "Guía Técnica",
      policyRegulation: "Política y Regulación",
      caseStudy: "Caso de Estudio",
      economics: "Economía",
    },
    readArticle: "Leer Artículo",
    neverMissUpdate: "No Se Pierda Ninguna Actualización",
    subscribeNewsletter:
      "Suscríbase a nuestro boletín para obtener perspectivas semanales sobre tendencias y análisis de almacenamiento de energía en baterías.",
    subscribeToNewsletter: "Suscribirse al Boletín",

    // Blog Posts
    blogPost1Title: "El Futuro de los Sistemas de Almacenamiento de Energía en Baterías en América del Norte",
    blogPost1Excerpt:
      "Explorando el rápido crecimiento de las implementaciones de BESS en Estados Unidos y Canadá, y lo que significa para la adopción de energía renovable.",
    blogPost2Title: "Comprendiendo las Tendencias del Mercado BESS en América Latina",
    blogPost2Excerpt:
      "Una inmersión profunda en los mercados emergentes de almacenamiento de baterías en Brasil, Chile y Argentina, y los factores que impulsan el crecimiento.",
    blogPost3Title: "Cómo Elegir la Solución de Almacenamiento de Energía Adecuada",
    blogPost3Excerpt:
      "Consideraciones clave para desarrolladores de energía al seleccionar sistemas de almacenamiento de energía en baterías para proyectos a escala de red.",
    blogPost4Title: "Cambios de Política que Impulsan la Adopción de BESS en 2024",
    blogPost4Excerpt:
      "Una visión general de las nuevas regulaciones e incentivos que aceleran la implementación de almacenamiento de baterías en las Américas.",
    blogPost4Content: `
      <p>El año 2024 marca un punto de inflexión para los sistemas de almacenamiento de energía en baterías (BESS) en las Américas, impulsado por un apoyo político inédito y marcos regulatorios diseñados para acelerar la transición hacia la energía limpia.</p>
      
      <h2>Desarrollo Clave de Políticas</h2>
      
      <p>Gobiernos de América del Norte y del Sur han introducido importantes incentivos y obligaciones que están remodelando el paisaje de almacenamiento de energía. A continuación se presenta un resumen completo de las políticas principales por país:</p>
      
      <table>
        <thead>
          <tr>
            <th>País</th>
            <th>Política/Incentivo</th>
            <th>Impacto</th>
            <th>Línea de Tiempo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Estados Unidos</td>
            <td>Crédito Fiscal por Inversión en Energía Renovable (IRA ITC)</td>
            <td>Crédito fiscal del 30% para almacenamiento independiente</td>
            <td>2024-2032</td>
          </tr>
          <tr>
            <td>Canadá</td>
            <td>Crédito Fiscal por Inversión en Energía Limpia</td>
            <td>Hasta un 30% para proyectos calificados</td>
            <td>2024-2034</td>
          </tr>
          <tr>
            <td>Chile</td>
            <td>Obligación de Almacenamiento de Energía</td>
            <td>Requisito de integración renovable del 20%</td>
            <td>2024-2030</td>
          </tr>
          <tr>
            <td>México</td>
            <td>Estrategia Nacional de Almacenamiento de Energía</td>
            <td>Objetivo de 5 GW para 2028</td>
            <td>2024-2028</td>
          </tr>
          <tr>
            <td>Brazil</td>
            <td>Resolución ANEEL 1000/2021</td>
            <td>Compensación para almacenamiento de escala de red</td>
            <td>Activa</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Tendencias de Inversión</h2>
      
      <p>Estos cambios en las políticas han impulsado un aumento en las inversiones, con analistas proyectando más de $50 mil millones en implementaciones de BESS en las Américas para 2028. La combinación de incentivos fiscales, obligaciones de energía renovable e iniciativas de modernización de la red crea un ambiente favorable para desarrolladores e inversores.</p>
      
      <h2>Mirando hacia el Futuro</h2>
      
      <p>A medida que estas políticas surtan efecto, esperamos ver un crecimiento rápido en proyectos de almacenamiento de energía tanto a gran escala como distribuidos. La certeza regulatoria proporcionada por programas de incentivos a largo plazo está habilitando la planificación y financiamiento a largo plazo para inversiones de infraestructura importantes.</p>
    `,
    blogPost5Title: "Caso de Estudio: Proyecto BESS de 500 MWh en Texas",
    blogPost5Excerpt:
      "Lecciones aprendidas de una de las instalaciones de almacenamiento de baterías más grandes de América del Norte.",
    blogPost6Title: "California Lidera la Revolución del Almacenamiento de Energía",
    blogPost6Excerpt:
      'La capacidad de almacenamiento en baterías en California está en auge. Con mas de 11 GW ya instalados, el estado está preparado para un crecimiento explosivo con casi 4 GW de nuevos proyectos planificados para este año. El condado de Riverside por sí solo tiene 3.5 GW instalados, lo que resalta la rápida expansión. Bienvenidos a la "Década del Almacenamiento de Energía".',

    // Contact Page
    contactTitle: "Póngase en Contacto",
    contactSubtitle:
      "¿Tiene preguntas sobre nuestra plataforma? Estamos aquí para ayudar. Contáctenos y le responderemos lo antes posible.",
    sendUsMessage: "Envíenos un Mensaje",
    formDescription: "Complete el formulario a continuación y responderemos en 24 horas",
    thankYouMessage: "¡Gracias por su mensaje! Le responderemos pronto.",
    name: "Nombre",
    email: "Correo Electrónico",
    subject: "Asunto",
    message: "Mensaje",
    namePlaceholder: "Juan Pérez",
    emailPlaceholder: "juan@empresa.com",
    subjectPlaceholder: "¿Cómo podemos ayudarle?",
    messagePlaceholder: "Cuéntenos más sobre su consulta...",
    sendMessage: "Enviar Mensaje",
    sending: "Enviando...",
    emailLabel: "Correo Electrónico",
    phoneLabel: "Teléfono",
    officeLabel: "Oficina",
    supportEmail: "support@energystore.com",
    salesEmail: "sales@energystore.com",
    phoneNumber: "+1 (555) 123-4567",
    phoneHours: "Lun-Vie 9am-6pm EST",
    officeAddress1: "123 Energy Plaza",
    officeAddress2: "Nueva York, NY 10001",
    officeAddress3: "Estados Unidos",

    // About Page
    aboutTitle: "Acerca de EnergyStore",
    aboutSubtitle:
      "Estamos construyendo la plataforma de análisis de almacenamiento de energía en baterías más completa para las Américas, empoderando a los tomadores de decisiones con información accionable.",
    ourMission: "Nuestra Misión",
    missionPara1:
      "El mercado de almacenamiento de energía está creciendo exponencialmente, pero los datos de calidad siguen siendo fragmentados y difíciles de acceder. EnergyStore fue fundada para resolver este problema proporcionando una plataforma unificada que rastrea, analiza y pronostica el despliegue de sistemas de almacenamiento de energía en baterías en las Américas.",
    missionPara2:
      "Creemos que los datos transparentes y accesibles son esenciales para acelerar la transición a energía limpia. Nuestra plataforma sirve a desarrolladores, inversores, formuladores de políticas e investigadores que necesitan inteligencia confiable para tomar decisiones informadas en este mercado en rápida evolución.",
    whatDrivesUs: "Lo Que Nos Impulsa",
    dataAccuracy: "Precisión de Datos",
    dataAccuracyDesc:
      "Mantenemos los más altos estándares de calidad de datos a través de rigurosos procesos de verificación y monitoreo continuo de fuentes de la industria.",
    marketFocus: "Enfoque de Mercado",
    marketFocusDesc:
      "Nuestro enfoque exclusivo en las Américas nos permite proporcionar una profundidad inigualable y experiencia regional que las plataformas globales no pueden igualar.",
    userExperience: "Experiencia de Usuario",
    userExperienceDesc:
      "Diseñamos interfaces intuitivas que hacen que los datos complejos sean accesibles, permitiendo a los usuarios extraer información rápida y eficientemente.",
    innovation: "Innovación",
    innovationDesc:
      "Mejoramos continuamente nuestra plataforma con nuevas características, fuentes de datos y herramientas analíticas para mantenernos a la vanguardia de las necesidades del mercado.",
    builtByExperts: "Construido por Expertos en Energía",
    builtByExpertsDesc:
      "Nuestro equipo combina décadas de experiencia en desarrollo de energía renovable, análisis de datos e ingeniería de software. Entendemos los desafíos que enfrenta porque hemos trabajado en los mismos problemas nosotros mismos en varios roles a lo largo de la cadena de valor del almacenamiento de energía.",

    // Password Recovery
    forgotPassword: "¿Olvidó su contraseña?",
    resetPassword: "Restablecer Contraseña",
    resetPasswordTitle: "Restablezca su Contraseña",
    resetPasswordSubtitle: "Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña",
    sendResetLink: "Enviar Enlace",
    backToSignIn: "Volver a Iniciar Sesión",
    checkYourEmail: "Revise su Correo Electrónico",
    resetLinkSent:
      "Hemos enviado un enlace de restablecimiento de contraseña a su dirección de correo electrónico. Por favor revise su bandeja de entrada.",
    newPassword: "Nueva Contraseña",
    confirmPassword: "Confirmar Contraseña",
    updatePassword: "Actualizar Contraseña",
    passwordUpdated: "¡Contraseña Actualizada!",
    passwordUpdatedMessage:
      "Su contraseña se ha actualizado correctamente. Ahora puede iniciar sesión con su nueva contraseña.",
    passwordMismatch: "Las contraseñas no coinciden",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
  },
}
