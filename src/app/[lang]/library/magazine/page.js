import { redirect } from "next/navigation";

export default async function MagazineAliasPage({ params }) {
  const { lang } = await params;
  redirect(`/${lang}/library/magazines`);
}
