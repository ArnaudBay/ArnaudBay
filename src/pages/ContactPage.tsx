import Contact from "../components/Contact";
import { useLanguage } from "../components/Layout";

const ContactPage = () => {
  const language = useLanguage();
  return (
    <div className="pt-20 sm:pt-24">
      <Contact language={language} />
    </div>
  );
};

export default ContactPage;
