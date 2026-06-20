import { redirect } from "next/navigation";

export default async function LibraryIndexPage({ params }) {
  const { lang } = await params;
  redirect(`/${lang}/library/books`);
}
