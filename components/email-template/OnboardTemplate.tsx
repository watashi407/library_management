import config from "@/lib/config/config";
import Link from "next/link";
import Image from "next/image";

interface EmailTemplate {
  name?: string;
  projectName?: string;
  companyName?: string;
}

export default function EmailTemplate({
  name,
  projectName = "Watashi Libro",
  companyName = "Watashi Studio",
}: EmailTemplate) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <Image
          src="/image_owner.png"
          alt="Studio Owner"
          className="w-24 h-24 mx-auto mb-8"
        />

        {/* Welcome Message */}
        <h1 className="text-white text-2xl mb-8w-24 h-24 mx-auto mb-8 rounded-full">
          Welcome to <span className="font-semibold">{projectName}</span>, we
          glad to have !
        </h1>

        {/* Personal Greeting */}
        <div className="text-left text-white space-y-4">
          <p>Hello {name},</p>

          <p className="text-gray-300">
            We&apos;re excited to have you onboard at {projectName}. We hope you
            enjoy your journey with us. If you have any questions or need
            assistance, feel free to reach out.
          </p>

          {/* CTA Button */}
          <div className="text-center my-8">
            <Link href={config.env.apiEndpoint}>
              <button className="bg-[#4285f4] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Get Started
              </button>
            </Link>
          </div>

          {/* Signature */}
          <div className="text-gray-300">
            <p>Cheers,</p>
            <p>The {companyName} Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
