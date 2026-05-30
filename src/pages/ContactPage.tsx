import Contact from "../components/Contact";
import { useLanguage } from "../components/Layout";
import { useSeo } from "../utils/seo";

const ContactPage = () => {
  const language = useLanguage();
  useSeo("contact", language);
  return (
    <div className="pt-20 sm:pt-24">
      <Contact language={language} />
    </div>
  );
};

export default ContactPage;
