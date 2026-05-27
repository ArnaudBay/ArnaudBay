import Projects from "../components/Projects";
import { useLanguage } from "../components/Layout";

const ProjectsPage = () => {
  const language = useLanguage();
  return (
    <div className="pt-28 sm:pt-36">
      <Projects language={language} />
    </div>
  );
};

export default ProjectsPage;
