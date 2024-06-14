import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";

const Page = () => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12 px-8">
        <LoginForm />
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/cs.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Page;
