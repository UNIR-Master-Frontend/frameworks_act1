"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Login from "@/app/[lang]/auth/(views)/Login/Login.jsx";
import useLoading from "../../../hooks/useLoading";
import Loading from "../../../components/Loading/Loading";
import useUser from "../../../hooks/useUser";
import { useLang } from "@/context/LanguageContext";

export default function AuthPage() {
  const { loading } = useLoading();
  const { user } = useUser();
  const router = useRouter();
  const lang = useLang();

  useEffect(() => {
    if (user) {
      router.push(`/${lang}`);
    }
  }, [user, router, lang]);

  return (
    <>
      
      {loading && <Loading />}

      
      {!user && <Login />}
    </>
  );
}