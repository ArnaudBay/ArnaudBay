import { Studio } from "sanity";
import config from "../../sanity.config";

const StudioPage = () => {
  if (!config) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "#0f0f0f",
          color: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: 560, lineHeight: 1.6 }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Sanity Studio indisponible
          </h1>
          <p style={{ marginBottom: "0.75rem" }}>
            La variable d'environnement <code>VITE_SANITY_PROJECT_ID</code> est
            manquante au moment du build.
          </p>
          <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
            Ajoute-la dans les variables d'environnement Vercel (Production +
            Preview + Development) puis redéploie sans cache.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0f0f0f" }}>
      <Studio config={config} />
    </div>
  );
};

export default StudioPage;
