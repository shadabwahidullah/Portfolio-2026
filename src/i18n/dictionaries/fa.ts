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
"برنامه‌های وب و موبایل سریع و کاربرپسند را با بهره‌گیری از فناوری‌ها و ابزارهای مدرن توسعه می‌دهم.",    ctaPrimary: "نمونه‌کارها",
    ctaSecondary: "تماس با من",
  },
  about: {
    title: "درباره من",
    body: "من توسعه‌دهندهٔ اپلیکیشن‌های موبایل و وب‌سایت با تمرکز بر طراحی منحصربه‌فرد، کیفیت بالا و تجربه کاربری ممتاز هستم. بیش از ۵ سال تجربه همکاری با شرکت‌های بین‌المللی در زمینه توسعه نرم‌افزار دارم و همواره بر ارائه راهکارهای سریع، کارآمد، مقیاس‌پذیر و در دسترس تمرکز کرده‌ام.\n\nدر طول فعالیت حرفه‌ای خود، چندین محصول موفق را در پلتفرم‌های مختلف طراحی، توسعه و راه‌اندازی کرده‌ام. علاقه‌مند به حل مسائل پیچیده و چالش‌برانگیز هستم، به‌ویژه پروژه‌هایی که تأثیر مثبت و ملموسی بر زندگی کاربران داشته باشند.\n\nعلاوه بر فعالیت حرفه‌ای، برنده مقام اول مسابقات برنامه‌نویسی دانشجویی بین‌المللی ({icpcLink}) در سطح افغانستان در سال ۲۰۱۹ و قهرمان چندین دوره هکاتون بوده‌ام. این دستاوردها نشان‌دهنده تعهد من به یادگیری مستمر، کار تیمی مؤثر و دستیابی به بالاترین استانداردهای فنی است."
  },
  projects: {
    title: "پروژه‌های منتخب",
    subtitle: "چند نمونه از کارهای اخیر من.",
    viewProject: "پیش‌نمایش زنده",
    items: [
      {
        title: "Spacebox",
        description:
"توسعه اپلیکیشن‌های اندروید و iOS شرکت Spacebox، این اپلیکیشن با هدف مدیریت انبار، ثبت و پیگیری سفارش‌ها، و فراهم‌سازی تجربه‌ای ساده و کارآمد برای مشتریان توسعه یافته است. کاربران از طریق این برنامه می‌توانند سفارش‌های خود را مدیریت کرده، وضعیت آن‌ها پیگیری کنند و به خدمات مختلف انبارداری دسترسی داشته باشند.",        tags: ["React-Native", "Expo", "Redux", "Redux-Toolkit", "TypeScript", "Node.js", "Express.js", "REST API", "PostgreSQL"],
        image: "/projects/spacebox.png",
        appStoreUrl: "https://apps.apple.com/us/app/spacebox-%E9%9A%A8%E5%AD%98%E5%B1%8B/id1398765354",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.spacebox&pli=1",
      },
      {
        title: "وب‌سایت Spacebox",
        description:
          "توسعه وب‌سایت رسمی Spacebox، یکی از پیشروترین ارائه‌دهندگان خدمات انبارداری در هنگ‌کنگ. این پلتفرم خدمات انبارداری شخصی، تجاری و درب‌به‌درب را به مشتریان ارائه می‌دهد و امکان بررسی طرح‌ها، قیمت‌ها و شرایط بسته‌های مختلف انبارداری را فراهم می‌سازد. همچنین کاربران می‌توانند به اطلاعات جامع مربوط به خدمات لجستیک، مدیریت انبار و راهکارهای ذخیره‌سازی دسترسی داشته باشند.",        tags: ["Next.js", "React", "TypeScript"],
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
    email: "shadabwahidullah@gmail.com",
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
