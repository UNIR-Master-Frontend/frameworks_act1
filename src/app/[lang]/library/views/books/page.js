import { redirect } from "next/navigation";

export default async function BooksViewsAliasPage({ params }) {
  const { lang } = await params;
  redirect(`/${lang}/library/books`);
}
