import { strapiFetch } from "@/lib/strapi";

export async function getFooter() {
  return await strapiFetch("/api/footer", {
    query: {
      populate: {
        logo: true,
        links: true,
        socials: true,
      },
    },
    revalidate: 60,
  });
}
