"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Login from "@/app/auth/(views)/Login/Login.jsx";
import useLoading from "../../hooks/useLoading";
import Loading from "../../components/Loading/Loading";
import useUser from "../../hooks/useUser";

export default function AuthPage() {
  const { loading } = useLoading();
  const { user } = useUser();
  const router = useRouter();

  
  useEffect(() => {
    if (user) {
      
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      
      {loading && <Loading />}

      
      {!user && <Login />}
    </>
  );
}