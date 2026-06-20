import { redirect } from "next/navigation";

export default async function PurchasesViewsAliasPage({ params }) {
  const { lang } = await params;
  redirect(`/${lang}/library/purchases`);
}
