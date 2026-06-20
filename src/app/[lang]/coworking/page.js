import { redirect } from "next/navigation";

export default async function CoworkingIndexPage({ params }) {
  const { lang } = await params;
  redirect(`/${lang}/coworking/spaces`);
}
