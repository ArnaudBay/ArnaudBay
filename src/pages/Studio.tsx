import { Studio } from "sanity";
import config from "../../sanity.config";

const StudioPage = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0f0f0f" }}>
    <Studio config={config} />
  </div>
);

export default StudioPage;
