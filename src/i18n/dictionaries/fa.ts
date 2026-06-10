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
    name: "وحیدالله شاداب",
    role: "توسعه‌دهنده فول‌استک",
    tagline:
      "تجربه‌های وب سریع، در دسترس و زیبا را با ابزارهای مدرن می‌سازم.",
    ctaPrimary: "نمونه‌کارها",
    ctaSecondary: "تماس با من",
  },
  about: {
    title: "درباره من",
    body: "توسعه‌دهنده‌ای هستم که عاشق ساخت اپلیکیشن‌های موبایل و وب با کیفیت بالا برای حل مسائل واقعی است. با بیش از ۴ سال تجربه در توسعه موبایل و فرانت‌اند، روی ایجاد راه‌حل‌های کارآمد، در دسترس و مقیاس‌پذیر با معماری تمیز تمرکز دارم.\n\nچندین محصول در پلتفرم‌های مختلف راه‌اندازی کرده‌ام و از حل مسائل چالش‌برانگیز که تأثیر مثبتی بر زندگی مردم دارند لذت می‌برم.\n\nفراتر از توسعه حرفه‌ای، برنده مقام اول مسابقه ملی افغانستان {icpcLink} در سال ۲۰۱۹ و قهرمان چندین هکاتون هستم که نشان‌دهنده تعهد من به یادگیری مداوم و برتری فنی است.",
  },
  projects: {
    title: "پروژه‌های منتخب",
    subtitle: "چند نمونه از کارهای اخیر من.",
    viewProject: "پیش‌نمایش زنده",
    items: [
      {
        title: "Spacebox",
        description:
          "اولین شرکت ذخیره‌سازی هنگ‌کنگ که خدمات ذخیره‌سازی درب به درب را معرفی کرده و گزینه‌های ذخیره‌سازی خودکار بهتر و راحت‌تری از امکانات سنتی ارائه می‌دهد. اپلیکیشن‌های Spacebox در PlayStore و AppStore موجود است.",
        tags: ["React-Native", "Expo", "Redux", "Redux-Toolkit", "TypeScript", "Node.js", "Express.js", "REST API", "PostgreSQL"],
        image: "/projects/spacebox.png",
        appStoreUrl: "https://apps.apple.com/us/app/spacebox-%E9%9A%A8%E5%AD%98%E5%B1%8B/id1398765354",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.spacebox&pli=1",
      },
      {
        title: "وب‌سایت Spacebox",
        description:
          "توسعه وب‌سایت رسمی Spacebox، ارائه‌دهنده پیشرو ذخیره‌سازی در هنگ‌کنگ که خدمات ذخیره‌سازی خودکار، درب به درب و تجاری ارائه می‌دهد. این پلتفرم به مشتریان امکان می‌دهد طرح‌های ذخیره‌سازی را بررسی کنند، خدمات ذخیره‌سازی را مدیریت کنند و به اطلاعات ویژگی‌های لجستیک و مدیریت موجودی دسترسی پیدا کنند.",
        tags: ["Next.js", "React", "TypeScript"],
        image: "/projects/spacebox-website.png",
        url: "https://www.spacebox.com.hk/",
      },
      {
        title: "بودجه روزانه",
        description:
          "یک اپلیکیشن موبایل طراحی شده برای کمک به کاربران در کنترل امور مالی خود از طریق مدیریت بودجه ساده و مؤثر. این اپلیکیشن به کاربران امکان می‌دهد هزینه‌های روزانه را ردیابی کنند، عادات خرج کردن را نظارت کنند، اهداف درآمد و پس‌انداز را مدیریت کنند و از طریق گزارش‌دهی و تحلیل‌های بصری دید بهتری به سلامت مالی خود کسب کنند.",
        tags: ["React-Native", "Expo", "TypeScript", "SQLite"],
        image: "/projects/daily-budget.png",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.shadab.dailybudget.app",
      },
    ],
  },
  skills: {
    title: "مهارت‌ها و ابزارها",
    subtitle: "فناوری‌هایی که هر روز با آن‌ها کار می‌کنم.",
    categories: {
      "Frontend & Mobile": "فرانت‌اند و موبایل",
      "Backend & Database": "بک‌اند و دیتابیس",
      "Tools & Testing": "ابزارها و تست",
    },
  },
  contact: {
    title: "بیایید با هم کار کنیم",
    body: "پروژه‌ای در ذهن دارید یا فقط می‌خواهید سلام کنید؟ صندوق پیام من همیشه باز است.",
    email: "shadabwahidullah+hello@gmail.com",
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
    linkedin: "https://www.linkedin.com/in/wahidullah-shadab/",
    github: "https://github.com/shadabwahidullah",
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
