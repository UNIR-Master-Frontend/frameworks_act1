import { redirect } from "next/navigation";

export default async function MagazinesViewsAliasPage({ params }) {
  const { lang } = await params;
  redirect(`/${lang}/library/magazines`);
}
