import { redirect } from "next/navigation";

export default async function MagazineDetailAliasPage({ params }) {
  const resolvedParams = await params;
  redirect(`/library/magazines/${resolvedParams.id}`);
}
