/* eslint-disable react/prop-types */

import Button from "../../SharedComponents/Button";
import CheckSVG from "../../SharedComponents/SVG/CheckSVG";

export default function PricingCard({
  name,
  price,
  explanation,
  features,
  setOpenAuthModal,
}) {
  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-emerald-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 text-2xl font-semibold">{name}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        {explanation}
      </p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">${price}</span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>
      {/*<-- List -->*/}
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature) => (
          <li key={feature} className="flex items-center space-x-3">
            {/*<!-- Icon -->*/}
            <CheckSVG />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        text="Get started"
        onClick={() => {
          setOpenAuthModal({ open: true, isLogin: false, isLandlord: true });
        }}
      />
    </div>
  );
}
