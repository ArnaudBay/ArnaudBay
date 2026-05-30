import TechStack from "../components/TechStack";
import { useLanguage } from "../components/Layout";
import { useSeo } from "../utils/seo";

const Skills = () => {
  const language = useLanguage();
  useSeo("skills", language);
  return (
    <div className="pt-28 sm:pt-36">
      <TechStack language={language} />
    </div>
  );
};

export default Skills;
