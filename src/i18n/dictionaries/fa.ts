import type { Dictionary } from "../dictionaries";

/**
 * Persian (Farsi) dictionary.
 *
 * It is typed as `Dictionary`, so it must mirror the exact key structure of the
 * English source of truth. Add a key in English -> TypeScript reminds you to
 * translate it here too.
 */
const fa: Dictionary = {
  nav: {
    about: "درباره",
    projects: "پروژه‌ها",
    skills: "مهارت‌ها",
    contact: "تماس",
  },
  hero: {
    greeting: "سلام، من",
    name: "نام شما",
    role: "توسعه‌دهنده فول‌استک",
    tagline:
      "تجربه‌های وب سریع، در دسترس و زیبا را با ابزارهای مدرن می‌سازم.",
    ctaPrimary: "نمونه‌کارها",
    ctaSecondary: "تماس با من",
  },
  about: {
    title: "درباره من",
    body: "توسعه‌دهنده‌ای هستم که عاشق تبدیل مسائل پیچیده به راه‌حل‌های ساده و زیبا است. به کارایی، دسترس‌پذیری و معماری تمیز اهمیت زیادی می‌دهم.",
  },
  projects: {
    title: "پروژه‌های منتخب",
    subtitle: "چند نمونه از کارهای اخیر من.",
    viewProject: "پیش‌نمایش زنده",
    items: [
      {
        title: "داشبورد تحلیلی",
        description:
          "داشبورد تحلیلی بلادرنگ با نمودارهای زنده و دسترسی مبتنی بر نقش.",
        tags: ["Next.js", "TypeScript", "WebSockets"],
        image: "/projects/analytics.svg",
        url: "https://example.com",
      },
      {
        title: "پلتفرم فروشگاهی",
        description:
          "فروشگاه هدلس با تصاویر بهینه و صفحات رندرشده در لبه شبکه.",
        tags: ["React", "Stripe", "Edge"],
        image: "/projects/ecommerce.svg",
        url: "https://example.com",
      },
      {
        title: "سیستم طراحی",
        description:
          "کتابخانه کامپوننت‌های قابل‌استفاده مجدد با پشتیبانی کامل از راست‌به‌چپ.",
        tags: ["Tailwind", "Storybook", "a11y"],
        image: "/projects/design-system.svg",
        url: "https://example.com",
      },
    ],
  },
  skills: {
    title: "مهارت‌ها و ابزارها",
    subtitle: "فناوری‌هایی که هر روز با آن‌ها کار می‌کنم.",
  },
  contact: {
    title: "بیایید با هم کار کنیم",
    body: "پروژه‌ای در ذهن دارید یا فقط می‌خواهید سلام کنید؟ صندوق پیام من همیشه باز است.",
    email: "hello@example.com",
    form: {
      name: "نام",
      namePlaceholder: "نام شما",
      email: "ایمیل",
      emailPlaceholder: "you@example.com",
      phone: "تلفن",
      phonePlaceholder: "+98 912 345 6789",
      message: "پیام",
      messagePlaceholder: "درباره پروژه‌تان بنویسید...",
      contactHint: "حداقل یک ایمیل یا شماره تلفن وارد کنید.",
      send: "ارسال پیام",
      sending: "در حال ارسال...",
      success: "سپاس! پیام شما ارسال شد.",
      error: "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
      errors: {
        name: "لطفاً نام خود را وارد کنید.",
        message: "لطفاً یک پیام وارد کنید.",
        messageMin: "پیام شما باید حداقل ۳۰ کاراکتر باشد.",
        email: "لطفاً یک ایمیل معتبر وارد کنید.",
        contact: "حداقل یک ایمیل یا شماره تلفن وارد کنید.",
      },
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
  },
  footer: {
    rights: "تمامی حقوق محفوظ است.",
  },
  localeSwitcher: {
    label: "تغییر زبان",
  },
  theme: {
    toggle: "تغییر پوسته",
    light: "تغییر به پوسته روشن",
    dark: "تغییر به پوسته تیره",
  },
};

export default fa;
