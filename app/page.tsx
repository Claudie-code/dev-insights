import HomeLayout from "@/components/HomeLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Hero } from "@/components/Hero";
import Features from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <HomeLayout>
      <Hero session={!!session} />
      <HowItWorks />
      <Features />
      <CTA session={!!session} />
      <Footer />
    </HomeLayout>
  );
}
