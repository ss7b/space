// components/utils/iconMap.js
import * as LucideIcons from "lucide-react";
import * as Fa6Icons from "react-icons/fa6"; // FontAwesome 6

// حول الاسم لـ PascalCase (user-check → UserCheck)
function toPascalCase(input) {
  return String(input || "")
    .trim()
    .replace(/[-_ ]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\s+/g, "");
}

/**
 * جلب أيقونة من Lucide أو FontAwesome6
 * @param {string} name اسم الأيقونة (مثال: "shield" | "FaSquareWhatsapp" | "fa6:twitter")
 * @param {string} fallback أيقونة بديلة من Lucide (افتراضي "Sparkles")
 * @returns {React.ComponentType}
 */
export function getIconByName(name, fallback = "Sparkles") {
  if (!name) return LucideIcons[fallback] || LucideIcons.Sparkles;

  const raw = String(name).trim();

  // 1) جرب Lucide كما هو
  if (LucideIcons[raw]) return LucideIcons[raw];

  // 2) PascalCase لـ Lucide
  const pascal = toPascalCase(raw);
  if (LucideIcons[pascal]) return LucideIcons[pascal];

  // 3) صيغة fa6:icon → fa6:whatsapp
  const match = raw.match(/^fa6\s*:\s*([a-z0-9 _-]+)$/i);
  if (match) {
    const iconName = toPascalCase(match[1]);
    const key = `Fa${iconName}`;
    if (Fa6Icons[key]) return Fa6Icons[key];
  }

  // 4) جرب FontAwesome6 مباشرة (مثلاً FaSquareWhatsapp)
  if (Fa6Icons[raw]) return Fa6Icons[raw];
  if (Fa6Icons[pascal]) return Fa6Icons[pascal];

  // 5) fallback من Lucide
  return LucideIcons[fallback] || LucideIcons.Sparkles;
}
