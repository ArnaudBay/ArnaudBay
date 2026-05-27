import TechStack from "../components/TechStack";
import { useLanguage } from "../components/Layout";

const Skills = () => {
  const language = useLanguage();
  return (
    <div className="pt-28 sm:pt-36">
      <TechStack language={language} />
    </div>
  );
};

export default Skills;
