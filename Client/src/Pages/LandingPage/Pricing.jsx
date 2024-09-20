import PricingCard from "./PricingCard";

export default function Pricing() {
  const plans = [
    {
      name: "Starter Plan",
      price: 0,
      explanation:
        "Individual landlords or small property managers with up to 5 units.",
      features: [
        "Manage up to 5 rental units",
        "Tenant communication tools (basic messaging)",
        "Rental payment tracking and reminders",
        "Basic maintenance request management",
        "Mobile access",
        "3.6% fee on rent payments",
      ],
    },
    {
      name: "Pro",
      price: 149,
      explanation:
        "Growing property managers or landlords with up to 50 units.",
      features: [
        "Manage up to 50 rental units",
        "Tenant communication tools (advanced messaging, notifications)",
        "Automated rental payment processing",
        "Comprehensive maintenance request management",
        "Basic reporting and analytics",
        "3.2% fee on rent payments",
      ],
    },
    {
      name: "Enterprise",
      price: 329,
      explanation: " Large enterprises managing multiple locations.",
      features: [
        "Manage unlimited rental units",
        "Advanced tenant communication tools (chatbots, SMS notifications)",
        "Automated payment processing with customizable reminders",
        "Full-featured maintenance request system with vendor management",
        "Advanced document storage, sharing.",
        "Detailed reporting and analytics",
        "2,9% fee on rent payments",
      ],
    },
  ];
  return (
    <section className=" dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Empowering Landlords and Property Managers
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            At RentMinder, we specialize in providing tools that enhance
            property management, streamline tenant communication, and optimize
            rental income. Whether you manage one property or many, we’ve got
            the solutions to help you succeed.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
