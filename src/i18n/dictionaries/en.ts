/**
 * English dictionary — the SINGLE SOURCE OF TRUTH for all translatable copy.
 *
 * The shape of this object defines the `Dictionary` type (see ../dictionaries.ts),
 * which means every other locale file MUST provide exactly the same keys.
 * If a key is missing in another language, TypeScript fails the build.
 */
const en = {
  // Navigation links rendered in the header.
  nav: {
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
  // Top hero section.
  hero: {
    greeting: "Hi, I'm",
    name: "Wahidullah Shadab",
    role: "Full-Stack Developer",
    tagline:
      "I build fast, accessible, and beautiful mobile and web experiences with modern tooling.",
    seoDescription:
      "Full-Stack Developer with 4+ years of experience in React Native, Next.js & TypeScript. I build fast, accessible, and scalable mobile and web applications.",
    ctaPrimary: "View my work",
    ctaSecondary: "Get in touch",
  },
  // About section.
  about: {
    title: "About me",
    body: "I'm a software developer passionate about building high-quality mobile and web applications that solve real-world problems. With 4+ years of experience in mobile and frontend development, I focus on creating performant, accessible, and scalable solutions with clean architecture.\n\nI've launched multiple products across different platforms and thrive on solving challenging problems that make a positive impact on people's lives.\n\nBeyond professional development, I'm the first-place winner of the Afghanistan {icpcLink} National Contest in 2019 and a multiple-time hackathon champion, reflecting my commitment to continuous learning and technical excellence.",
  },
  // Projects section + a small list of example projects.
  projects: {
    title: "Selected projects",
    subtitle: "A few things I've built recently.",
    // Accessible label for the "open live preview" link on each project card.
    viewProject: "Live preview",
    items: [
      {
        title: "Spacebox",
        description:
          "The first Hong Kong storage company to introduce door-to-door storage services, providing better and more convenient self storage service options than traditional facilities. Spacebox Apps are available on PlayStore and AppStore.",
        tags: ["React-Native", "Expo", "Redux", "Redux-Toolkit", "TypeScript", "Node.js", "Express.js", "REST API", "PostgreSQL"],
        image: "/projects/spacebox.png",
        appStoreUrl: "https://apps.apple.com/us/app/spacebox-%E9%9A%A8%E5%AD%98%E5%B1%8B/id1398765354",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.spacebox&pli=1",
      },
      {
        title: "Spacebox Website",
        description:
          "Developed the official website for Spacebox, a leading Hong Kong storage provider offering self-storage, door-to-door storage, and business storage solutions. The platform enables customers to explore storage plans, manage storage services, and access information about logistics and inventory management features.",
        tags: ["Next.js", "React", "TypeScript"],
        image: "/projects/spacebox-website.png",
        url: "https://www.spacebox.com.hk/",
      },
      {
        title: "Daily Budget",
        description:
          "A mobile application designed to help users take control of their finances through simple and effective budget management. The app enables users to track daily expenses, monitor spending habits, manage income and savings goals, and gain better visibility into their financial health through intuitive reporting and analytics.",
        tags: ["React-Native", "Expo", "TypeScript", "SQLite"],
        image: "/projects/daily-budget.png",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.shadab.dailybudget.app",
      },
    ],
  },
  // Skills section.
  skills: {
    title: "Skills & tools",
    subtitle: "Technologies I work with every day.",
    categories: {
      "Frontend & Mobile": "Frontend & Mobile",
      "Backend & Database": "Backend & Database",
      "Tools & Testing": "Tools & Testing",
    },
  },
  // Contact section, including all labels/messages for the email form.
  contact: {
    title: "Let's work together",
    body: "Have a project in mind or just want to say hello? My inbox is always open.",
    // Recipient address the form sends to.
    email: "shadabwahidullah@gmail.com",
    form: {
      name: "Name",
      namePlaceholder: "Jane Doe",
      email: "Email",
      emailPlaceholder: "jane@example.com",
      phone: "Phone",
      phonePlaceholder: "+1 555 123 4567",
      message: "Message",
      messagePlaceholder: "Tell me about your project...",
      // Shown under the contact fields as guidance.
      contactHint: "Provide at least an email or a phone number.",
      send: "Send message",
      sending: "Sending...",
      success: "Thanks! Your message has been sent.",
      error: "Something went wrong. Please try again.",
      // Per-field validation messages shown when the form is submitted.
      errors: {
        name: "Please enter your name.",
        message: "Please enter a message.",
        messageMin: "Your message must be at least 30 characters.",
        email: "Please enter a valid email address.",
        contact: "Provide at least an email or a phone number.",
      },
    },
  },
  // Social profile links (same URLs across languages).
  social: {
    linkedin: "https://www.linkedin.com/in/wahidullah-shadab/",
    github: "https://github.com/shadabwahidullah",
  },
  // Footer.
  footer: {
    rights: "All rights reserved.",
  },
  // Accessible label for the language switcher.
  localeSwitcher: {
    label: "Change language",
  },
  // Accessible labels for the light/dark theme toggle button.
  theme: {
    toggle: "Toggle theme",
    light: "Switch to light theme",
    dark: "Switch to dark theme",
  },
};

export default en;
