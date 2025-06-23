import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10 bg-primary-dull">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12 object-contain"
              src={assets.logo1}
              alt="logo"
            />
            <span className="text-lg md:text-xl font-medium text-gray-800">
              Nature's Crate
            </span>
          </div>
          <p className="max-w-[410px] mt-6">
            Nature’s Crate is your go-to destination for organic fruits and
            farm-fresh vegetables. We partner with local farms to deliver clean,
            sustainable food straight to your door - because your health
            deserves the best nature has to offer.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:underline transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © {new Date().getFullYear()} Nature's Crate. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
