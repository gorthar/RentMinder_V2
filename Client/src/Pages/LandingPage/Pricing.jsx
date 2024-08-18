import PricingCard from "./PricingCard";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 0,
      explanation: "The perfect start for small teams",
      features: [
        "Unlimited projects",
        "Unlimited users",
        "10GB storage",
        "Priority support",
      ],
    },
    {
      name: "Pro",
      price: 15,
      explanation: "The best option for small teams",
      features: [
        "Unlimited projects",
        "Unlimited users",
        "50GB storage",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: 29,
      explanation: "The ultimate option for large teams",
      features: [
        "Unlimited projects",
        "Unlimited users",
        "150GB storage",
        "Priority support",
      ],
    },
  ];
  return (
    <section className=" dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
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
