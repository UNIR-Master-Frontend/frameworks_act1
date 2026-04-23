import { redirect } from "next/navigation";

export default async function BookViewsDetailAliasPage({ params }) {
  const resolvedParams = await params;
  redirect(`/library/books/${resolvedParams.id}`);
}
