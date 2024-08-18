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
      text: "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
      headerText: "Marketing",
      svg: <BoardSVG />,
    },
    {
      text: "Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.",
      headerText: "Legal",
      svg: <CapSVG />,
    },
    {
      text: "Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new templates to help you get started.",
      headerText: "Business Automation",
      svg: <HandBagSVG />,
    },
    {
      text: "Audit-proof software built for critical financial operations like month-end close and quarterly budgeting.",
      headerText: "Finance",
      svg: <DollarSVG />,
    },
    {
      text: "Craft beautiful, delightful experiences for both marketing and product with real cross-company collaboration.",
      headerText: "Enterprise Design",
      svg: <CardsSVG />,
    },
    {
      text: "Keep your company’s lights on with customizable, iterative, and structured workflows built for all efficient teams and individual.",
      headerText: "Operations",
      svg: <GearSVG />,
    },
  ];
  return (
    <section className=" dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for business teams like yours
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
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
