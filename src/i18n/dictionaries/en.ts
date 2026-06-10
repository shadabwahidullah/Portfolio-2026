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
    ctaPrimary: "View my work",
    ctaSecondary: "Get in touch",
  },
  // About section.
  about: {
    title: "About me",
    body: "I'm a software developer passionate about building high-quality mobile and web applications that solve real-world problems. With 4+ years of experience in mobile and frontend development, I focus on creating performant, accessible, and scalable solutions with clean architecture.\nI've launched multiple products across different platforms and thrive on solving challenging problems that make a positive impact on people's lives. Beyond professional development, I'm a first-place ICPC winner (2019) and a multiple-time hackathon champion, reflecting my commitment to continuous learning and technical excellence.",
  },
  // Projects section + a small list of example projects.
  projects: {
    title: "Selected projects",
    subtitle: "A few things I've built recently.",
    // Accessible label for the "open live preview" link on each project card.
    viewProject: "Live preview",
    items: [
      {
        title: "Analytics Dashboard",
        description:
          "A real-time analytics dashboard with streaming charts and role-based access.",
        tags: ["Next.js", "TypeScript", "WebSockets"],
        // Preview screenshot (lives in /public/projects) + external live link.
        image: "/projects/analytics.svg",
        url: "https://example.com",
      },
      {
        title: "E-commerce Platform",
        description:
          "A headless storefront with optimized images and edge-rendered pages.",
        tags: ["React", "Stripe", "Edge"],
        image: "/projects/ecommerce.svg",
        url: "https://example.com",
      },
      {
        title: "Design System",
        description:
          "A reusable component library with theming and full RTL support.",
        tags: ["Tailwind", "Storybook", "a11y"],
        image: "/projects/design-system.svg",
        url: "https://example.com",
      },
    ],
  },
  // Skills section.
  skills: {
    title: "Skills & tools",
    subtitle: "Technologies I work with every day.",
  },
  // Contact section, including all labels/messages for the email form.
  contact: {
    title: "Let's work together",
    body: "Have a project in mind or just want to say hello? My inbox is always open.",
    // Recipient address the form sends to.
    email: "hello@example.com",
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
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
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
