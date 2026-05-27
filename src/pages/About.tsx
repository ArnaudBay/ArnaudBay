import About from "../components/About";
import TrustedBy from "../components/TrustedBy";
import { useLanguage } from "../components/Layout";

const AboutPage = () => {
  const language = useLanguage();
  return (
    <div className="pt-20 sm:pt-24">
      <About language={language} />
      <TrustedBy language={language} />
    </div>
  );
};

export default AboutPage;
