import Image from 'next/image';

const TRUSTED_COMPANIES = [
  { name: 'FPT Software', logo: '/company-logos/fpt-software.svg', category: 'IT Services Leader' },
  { name: 'Viettel Solutions', logo: '/company-logos/viettel-solutions.svg', category: 'Telecom & Tech' },
  { name: 'Techcombank', logo: '/company-logos/techcombank.png', category: 'Digital Banking' },
  { name: 'Zalo Group', logo: '/company-logos/zalo-group.png', category: 'Super-app Platform' },
  { name: 'VinAI', logo: '/company-logos/vinai.png', category: 'AI Research & Tech' },
  { name: 'Shopee Vietnam', logo: '/company-logos/shopee-vietnam.svg', category: 'E-Commerce Giant' },
  { name: 'Grab Vietnam', logo: '/company-logos/grab-vietnam.svg', category: 'Mobility & FinTech' },
  { name: 'Mercari', logo: '/company-logos/mercari.svg', category: 'Global Tech' },
  { name: 'Atlassian', logo: '/company-logos/atlassian.png', category: 'Enterprise DevOps' },
  { name: 'Intel', logo: '/company-logos/intel.svg', category: 'Semiconductor Tech' },
  { name: 'Traveloka', logo: '/company-logos/traveloka.png', category: 'Travel Tech Unicorn' },
  { name: 'Tiki', logo: '/company-logos/tiki.png', category: 'Digital Marketplace' },
];

export default function TrustedPartnersTicker() {
  return (
    <section aria-label="Trusted Enterprise Partners" className="border-b border-[#E5E7EB] bg-white py-10">
      <div className="container-page">
        <p className="text-center text-xs font-bold tracking-widest text-[#6C757D] uppercase">
          TRUSTED BY 1,200+ TECH ENTERPRISES AND MULTINATIONAL CORPORATIONS
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 lg:gap-6">
          {TRUSTED_COMPANIES.map((company) => (
            <div
              key={company.name}
              className="group flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00B14F]/50 hover:bg-white hover:shadow-sm"
            >
              <div className="relative flex h-7 w-16 items-center justify-center grayscale transition-all duration-200 group-hover:grayscale-0 sm:h-8 sm:w-20">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={80}
                  height={32}
                  className="max-h-7 max-w-full object-contain sm:max-h-8"
                />
              </div>
              <div className="border-l border-[#E5E7EB] pl-3 text-left">
                <span className="block text-xs font-bold text-[#1E2837] transition-colors group-hover:text-[#00B14F]">
                  {company.name}
                </span>
                <span className="text-[10px] font-medium text-[#6C757D]">{company.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
