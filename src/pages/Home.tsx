import Hero from "../components/Hero";
import { useLanguage } from "../components/Layout";
import { useSeo } from "../utils/seo";

const Home = () => {
  const language = useLanguage();
  useSeo("home", language);
  return <Hero language={language} />;
};

export default Home;
