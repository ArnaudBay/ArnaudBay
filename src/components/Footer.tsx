import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from "./SocialIcons";
import type { SiteLanguage } from "../pages/Index";

const copy = {
  fr: {
    by: "Par Arnaud BAYALE | Portfolio",
    copyright: "\u00a9 2023-2025 Arnaud BAYALE",
  },
  en: {
    by: "By Arnaud BAYALE | Portfolio",
    copyright: "\u00a9 2023-2025 Arnaud BAYALE",
  },
};

const links = [
  { label: "Email", icon: MailIcon, href: "mailto:arnaud@gmail.com" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/arnaud-bayale-57a35b2b9?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { label: "GitHub", icon: GithubIcon, href: "https://github.com/ArnaudBay" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/arnaud_bayale?igsh=ODJxYTUybW41MXoy" },
];

const Footer = ({ language }: { language: SiteLanguage }) => (
  <footer className="border-t border-border py-8">
    <div className="page-container space-y-6">
      <div className="flex flex-col justify-between gap-4 text-xs text-muted-foreground md:flex-row md:items-center">
        <p>{copy[language].by}</p>
        <div className="flex flex-wrap items-center gap-4">
          {links.map(({ label, icon: Icon, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
              <Icon size={14} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
      <p className="text-center text-[11px] text-muted-foreground">{copy[language].copyright}</p>
    </div>
  </footer>
);

export default Footer;
