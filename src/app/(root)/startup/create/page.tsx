import HeroSection from "@/components/HeroSection";
import StartupForm from "@/components/StartupForm";
import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

const CreatePage = async () => {
  const session = await auth();

  if (!session) redirect("/");
  return (
    <>
      <HeroSection title="Submit Your Startup Pitch" height="min-h-52" />

      <section className="bg-green-600 w-full max-w-4xl mx-auto mt-10 space-y-5">
        <StartupForm />
      </section>
    </>
  );
};

export default CreatePage;
