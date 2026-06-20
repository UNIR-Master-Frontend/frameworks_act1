import { notFound } from "next/navigation";
import {
  getMessages,
  isValidLanguage,
  SUPPORTED_LANGUAGES,
} from "@/config/i18n";
import { LanguageProvider } from "@/context/LanguageContext";
import { Providers } from "@/app/providers";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/Footer/Footer";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const messages = getMessages(lang);

  return (
    <LanguageProvider lang={lang} messages={messages}>
      <Providers>
        <Header />
        <main className="page-container">{children}</main>
        <Footer />
      </Providers>
    </LanguageProvider>
  );
}
