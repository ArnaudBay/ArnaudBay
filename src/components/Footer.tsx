import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, WhatsappIcon } from "./SocialIcons";

const links = [
  { label: "Email", icon: MailIcon, href: "mailto:arnaud@gmail.com" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/arnaud-bayalé-57a35b2b9?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { label: "GitHub", icon: GithubIcon, href: "https://github.com/ArnaudBay" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/arnaud_bayale?igsh=ODJxYTUybW41MXoy" },
  { label: "WhatsApp", icon: WhatsappIcon, href: "https://wa.me/23672151688" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="mt-24 border-t border-border py-8">
    <div className="page-container flex flex-col items-center gap-5 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:gap-4 sm:text-sm">
      <p>{`© ${currentYear} Arnaud Bayalé.`}</p>
      <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {links.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#9c6a45]">
            {label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
  );
};

export default Footer;
