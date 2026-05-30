import Projects from "../components/Projects";
import { useLanguage } from "../components/Layout";
import { useSeo } from "../utils/seo";

const ProjectsPage = () => {
  const language = useLanguage();
  useSeo("projects", language);
  return (
    <div className="pt-28 sm:pt-36">
      <Projects language={language} />
    </div>
  );
};

export default ProjectsPage;
