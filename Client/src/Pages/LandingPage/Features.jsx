import BoardSVG from "../../SharedComponents/SVG/BoardSVG";
import CapSVG from "../../SharedComponents/SVG/CapSVG";
import CardsSVG from "../../SharedComponents/SVG/CardsSVG";
import DollarSVG from "../../SharedComponents/SVG/DollarSVG";
import GearSVG from "../../SharedComponents/SVG/GearSVG";
import HandBagSVG from "../../SharedComponents/SVG/HandBagSVG";
import Feature from "./Feature";

export default function Features() {
  const features = [
    {
      text: "Manage your property portfolio with ease, from listing vacancies to tracking paayments.",
      headerText: "Property Listings",
      svg: <BoardSVG className={"h-8 w-8"} />,
    },
    {
      text: "Ensure you find the best tenants with our comprehensive screening process.",
      headerText: "Tenant Screening",
      svg: <CapSVG className={"h-8 w-8"} />,
    },
    {
      text: "Automate rent payments and keep your finances in check effortlessly.",
      headerText: "Rent Collection",
      svg: <HandBagSVG className={"h-8 w-8"} />,
    },
    {
      text: "Get detailed insights into your property performance with our powerful reporting tools.",
      headerText: "Financial Reporting",
      svg: <DollarSVG className={"h-8 w-8"} />,
    },
    {
      text: "Store and organize all your important documents in one secure place.",
      headerText: "Document Management",
      svg: <CardsSVG className={"h-8 w-8"} />,
    },
    {
      text: "Handle maintenance requests quickly and efficiently with our streamlined system.",
      headerText: "Maintenance Requests",
      svg: <GearSVG className={"h-8 w-8"} />,
    },
  ];
  return (
    <section className=" dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Built for Landlords Like You
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            At RentMinder, we focus on providing the technology and support you
            need to streamline your rental business and boost your profits.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
