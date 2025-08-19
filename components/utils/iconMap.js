// components/utils/iconMap.js
import * as LucideIcons from "lucide-react";

export function getIconByName(name, fallback = "Sparkles") {
  if (!name) return LucideIcons[fallback] || LucideIcons.Sparkles;

  // 1) محاولة الاسم كما هو
  if (LucideIcons[name]) return LucideIcons[name];

  // 2) جرّب تحويله من "users" أو "user-check" إلى "Users" / "UserCheck"
  const pascal = String(name)
    .replace(/[-_ ]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\s+/g, '');
  if (LucideIcons[pascal]) return LucideIcons[pascal];

  // 3) fallback
  return LucideIcons[fallback] || LucideIcons.Sparkles;
}
