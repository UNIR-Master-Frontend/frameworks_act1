import { redirect } from "next/navigation";

export default async function MagazineViewsDetailAliasPage({ params }) {
  const { lang, id } = await params;
  redirect(`/${lang}/library/magazines/${id}`);
}
