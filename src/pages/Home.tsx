import Hero from "../components/Hero";
import { useLanguage } from "../components/Layout";

const Home = () => {
  const language = useLanguage();
  return <Hero language={language} />;
};

export default Home;
