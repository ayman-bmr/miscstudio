import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ===== Header translations =====
  const translations = [
    { key: "home_icon_label", language: "en", value: "Home" },
    { key: "applications", language: "en", value: "Applications" },
    { key: "about_us", language: "en", value: "About Us" },
    { key: "dark_mode", language: "en", value: "Dark Mode" },
    { key: "light_mode", language: "en", value: "Light Mode" },

    { key: "home_icon_label", language: "ar", value: "الرئيسية" },
    { key: "applications", language: "ar", value: "التطبيقات" },
    { key: "about_us", language: "ar", value: "من نحن" },
    { key: "dark_mode", language: "ar", value: "الوضع الداكن" },
    { key: "light_mode", language: "ar", value: "الوضع الفاتح" },
  ];

  for (const t of translations) {
    await prisma.translation.upsert({
      where: { key_language: { key: t.key, language: t.language } },
      update: {},
      create: t,
    });
  }

  // ===== Hero content =====
  const heroContent = [
    // English
    { key: "misc_studio_chip", language: "en", type: "text", value: "Misc Studio" },
    { key: "hero_title", language: "en", type: "text", value: "Creating Digital Magic" },
    { key: "hero_subtitle", language: "en", type: "text", value: "Innovative apps and games that inspire, entertain, and transform experiences." },
    { key: "google_play_store", language: "en", type: "text", value: "Google Play" },
    { key: "google_play_caption", language: "en", type: "text", value: "Available now" },
    { key: "google_play_icon", language: "en", type: "image", value: "/google-play.svg" },
    { key: "google_play_href", language: "en", type: "text", value: "https://play.google.com/store/apps/dev?id=6515640368437909512" },
    { key: "app_store_name", language: "en", type: "text", value: "App Store" },
    { key: "app_store_caption", language: "en", type: "text", value: "Download on the" },
    { key: "app_store_icon", language: "en", type: "image", value: "/apple_logo_black.svg" },
    { key: "app_store_href", language: "en", type: "text", value: "https://apps.apple.com/developer/..." },
    { key: "additional_platforms", language: "en", type: "text", value: "Also available on Steam and other platforms" },
    { key: "hero_image_url", language: "en", type: "image", value: "/image_home.png" },
    { key: "image_alt", language: "en", type: "text", value: "Hero Image" },

    // Arabic
    { key: "misc_studio_chip", language: "ar", type: "text", value: "ميِسك ستوديو" },
    { key: "hero_title", language: "ar", type: "text", value: "خلق سحر رقمي" },
    { key: "hero_subtitle", language: "ar", type: "text", value: "تطبيقات وألعاب مبتكرة تلهم، تسلّي وتحوّل التجارب." },
    { key: "google_play_store", language: "ar", type: "text", value: "جوجل بلاي" },
    { key: "google_play_caption", language: "ar", type: "text", value: "متاح الآن" },
    { key: "google_play_icon", language: "ar", type: "image", value: "/google-play.svg" },
    { key: "google_play_href", language: "ar", type: "text", value: "https://play.google.com/store/apps/dev?id=6515640368437909512" },
    { key: "app_store_name", language: "ar", type: "text", value: "أب ستور" },
    { key: "app_store_caption", language: "ar", type: "text", value: "احصل عليه الآن" },
    { key: "app_store_icon", language: "ar", type: "image", value: "/apple_logo_black.svg" },
    { key: "app_store_href", language: "ar", type: "text", value: "https://apps.apple.com/developer/..." },
    { key: "additional_platforms", language: "ar", type: "text", value: "متوفر أيضًا على منصات أخرى" },
    { key: "hero_image_url", language: "ar", type: "image", value: "/image_home.png" },
    { key: "image_alt", language: "ar", type: "text", value: "صورة البطل" },
  ];

  for (const h of heroContent) {
    await prisma.heroContent.upsert({
      where: { key_language: { key: h.key, language: h.language } },
      update: {},
      create: h,
    });
  }
  await prisma.game.createMany({
    data: [
      {
        title: "Hikaya: Kid's Storytelling",
        description: "Storytelling is a fun, engaging, and safe app designed to spark children's imagination through beautifully narrated and illustrated stories. With a simple and user-friendly interface, children can read, listen, and track their progress, while parents ensure a safe, ad-free experience.",
        image: "/hero-illustration.png",
        link: "/hikaya", // internal route
        language: "en",
      },
      {
        title: "Coup board game",
        description: "Step into a world of cunning and deception with Coup Online! Deploy your strategic skills as you navigate a landscape of perilous political intrigues. Play with friends or challenge players from around the world in this thrilling deduction game.",
        image: "/coup_pic.webp",
        link: "https://play.google.com/store/apps/details?id=com.aikkene.coup",
        language: "en",
      },
      {
        title: "SketchIt",
        description: "Do you have the patience to draw but don’t know where to start? This is the place for you! This app works like tracing paper, helping you sketch everything easily and quickly. You can use it for educational purposes or just for fun.",
        image: "/sketchitImage.jpg",
        link: "https://play.google.com/store/apps/details?id=com.aikkene.sketchit",
        language: "en",
      },
      // Arabic versions (optional)
      {
        title: "حكاية: سرد القصص للأطفال",
        description: " حكاية هي تطبيق ممتع وجذاب وآمن مصمم لتحفيز خيال الأطفال من خلال قصص مُروية ومرسومة بشكل جميل. من خلال واجهة بسيطة وسهلة الاستخدام، يمكن للأطفال القراءة والاستماع ومتابعة تقدمهم، بينما يضمن الآباء تجربة آمنة وخالية من الإعلانات .",
        image: "/hero-illustration.png",
        link: "/hikaya",
        language: "ar",
      },
      {
        title: "لعبة كوبا",
        description: "ادخل عالم المكر والخداع مع Coup Online! استخدم مهاراتك الاستراتيجية أثناء استكشافك لعالم مليء بالمكائد السياسية الخطرة. العب مع أصدقائك أو تحدى لاعبين من جميع أنحاء العالم في هذه اللعبة المثيرة للاستخلاص. خدع، دسائس، وتلاعب لتحقيق النصر—ولكن احذر: الحقيقة سلعة ثمينة والثقة عملة هشة. هل ستصل إلى السلطة أم سيتم تدميرك بشبكة أكاذيبك الخاصة؟ حمل Coup Online الآن واختبر اللعبة القصوى للاستخلاص والخداع!",
        image: "/coup_pic.webp",
        link: "https://play.google.com/store/apps/details?id=com.aikkene.coup",
        language: "ar",
      },
      {
        title: "سكيتش إت",
        description: "هل لديك الصبر للرسم ولكن لا تعرف من أين تبدأ؟ هذا هو المكان المناسب لك! يعمل هذا التطبيق مثل ورق التتبع، حيث سيساعدك على رسم كل شيء بسهولة وسرعة. يمكنك استخدامه لأغراض تعليمية أو للمتعة فقط.",
        image: "/sketchitImage.jpg",
        link: "https://play.google.com/store/apps/details?id=com.aikkene.sketchit",
        language: "ar",
      },
    ],
  });

  console.log("✅ Database has been seeded with games!");
}
 const password = await hash("admin123", 10);

  await prisma.admin.create({
    data: {
      email: "admin@example.com",
      password,
      name: "Admin",
    },
  });

  console.log("Admin created!");


main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
