import fs from "node:fs";
import path from "node:path";
import CodingActivity from "@/components/CodingActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hackathons from "@/components/Hackathons";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";

export default function HomePage() {
  const githubUsername = process.env.GITHUB_USERNAME || "hardik-singh";
  const leetcodeUsername = process.env.LEETCODE_USERNAME || "hardik-singh";
  const profileImageSrc = ["/profile.jpg", "/profile.png"].find((imagePath) =>
    fs.existsSync(path.join(process.cwd(), "public", imagePath.replace("/", ""))),
  );

  return (
    <main id="content" className="relative overflow-x-hidden bg-black">
      <Navbar githubUsername={githubUsername} />
      <Hero
        githubUsername={githubUsername}
        profileImageSrc={profileImageSrc}
      />
      <Projects />
      <CodingActivity
        githubUsername={githubUsername}
        leetcodeUsername={leetcodeUsername}
      />
      <Hackathons />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
