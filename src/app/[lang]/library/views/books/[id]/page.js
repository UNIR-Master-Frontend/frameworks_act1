import { redirect } from "next/navigation";

export default async function BookViewsDetailAliasPage({ params }) {
  const { lang, id } = await params;
  redirect(`/${lang}/library/books/${id}`);
}
