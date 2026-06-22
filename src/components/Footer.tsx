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
  <footer className="pt-24 pb-6 text-xs text-muted-foreground md:text-sm">
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-5 px-6 sm:flex-row sm:gap-4 md:px-8 xl:px-0">
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
