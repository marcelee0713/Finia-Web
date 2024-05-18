import { AboutInfo } from "@/interfaces/about";

export const AUTH_PAGES = [
  "/",
  "/about",
  "/sign-in",
  "/sign-up",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
  "/greet",
];

export const ABOUT_US_INFOS = {
  about1: `Finia is a streamlined Revenue and Expense Tracker designed to simplify financial management for individuals. 
  With Finia, users can easily track their income sources and expenses, gaining insight into their spending habits and 
  financial health.  Where you can gain valuable insights into your financial patterns with interactive graphs and visualizations. 
  Easily visualize income sources, expense categories, and overall cash flow to make informed decisions and optimize your financial strategy.`,
  about2: `And most importantly, you can effortlessly track your income and expenses, empowering you to stay on top of your finances. 
  With intuitive tools, you can categorize transactions, set budgets, and monitor spending habits to achieve financial goals.`,
  privacyPolicy: `This Privacy Policy governs the manner in which Finia website collects, uses, maintains, and discloses information collected from users of the Finia website.`,
  personalIdentificationInformation: `Finia may collect personal identification information from Users in a variety of ways, including, 
  but not limited to, when Users visit our website, register on the website, and in connection with other activities, services, features, 
  or resources we make available on our website. Users may be asked for, as appropriate, username, email address, and password.`,
  transactionInformation: `Finia may collect transaction information from Users in the form of income or expenses. This may include details 
  such as transaction amount, category, date, and any additional information provided by the User.`,
  subInformationUsage: `Finia may collect and use Users' personal information and transaction information for the following purposes:`,
  informationUsage1: `To provide and maintain the service: We may use information collected to provide and maintain our service, including processing transactions and managing user accounts.`,
  informationUsage2: `To improve our Website: We may analyze transaction data to understand user behavior and preferences, and to enhance the functionality and user experience of our Website.`,
  protectionInformation: `We adopt appropriate data collection, storage, and processing practices and security measures to protect against 
  unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Website.`,
  sharingPersonalInformation: `We do not sell, trade, or rent Users' personal identification information. However, transaction information may be shared with third-party 
  service providers (such as payment processors) as necessary to facilitate transactions and provide the service. We may also share aggregated transaction data with 
  trusted affiliates and advertisers for analytical purposes.`,
  privacyPolicyChangesInformation: `Finia has the discretion to update this Privacy Policy at any time. When we do, we will revise the updated date at the bottom of 
  this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. 
  You acknowledge and agree that it is your responsibility to review this Privacy Policy periodically and become aware of modifications.`,
  acceptance: `By using this Website, you signify your acceptance of this Privacy Policy. If you do not agree to this Privacy Policy, please do not use our Website. 
  Your continued use of the Website following the posting of changes to this Privacy Policy will be deemed your acceptance of those changes.`,
  contact: `If you have any questions about this Privacy Policy, the practices of this Website, or your dealings with this Website, please contact us at magbualmarcel@gmail.com.`,
};

export const aboutInfoList: AboutInfo[] = [
  {
    head: "Privacy Policy",
    sub: ABOUT_US_INFOS.privacyPolicy,
    id: "privacy-policy",
  },
  {
    head: "Personal Identification Information",
    sub: ABOUT_US_INFOS.personalIdentificationInformation,
    id: "personal-identification-info",
  },
  {
    head: "Transaction Information",
    sub: ABOUT_US_INFOS.transactionInformation,
    id: "transaction-information-info",
  },
  {
    head: "How We Use Collected Information",
    sub: ABOUT_US_INFOS.subInformationUsage,
    list: [ABOUT_US_INFOS.informationUsage1, ABOUT_US_INFOS.informationUsage2],
    id: "collection-info",
  },
  {
    head: "How We Protect Your Information",
    sub: ABOUT_US_INFOS.protectionInformation,
    id: "protection-info",
  },
  {
    head: "Sharing Your Personal Information",
    sub: ABOUT_US_INFOS.sharingPersonalInformation,
    id: "personal-info",
  },
  {
    head: "Changes to This Privacy Policy",
    sub: ABOUT_US_INFOS.privacyPolicyChangesInformation,
    id: "changes-privacy-info",
  },
  {
    head: "You Acceptance of These Terms",
    sub: ABOUT_US_INFOS.acceptance,
    id: "acceptance-terms",
  },
  {
    head: "Contacting Us",
    sub: ABOUT_US_INFOS.contact,
    id: "contact",
  },
];
