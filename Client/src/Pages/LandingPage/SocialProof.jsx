export default function SocialProof() {
  return (
    <section className=" dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Trusted by Top Landlords and Property Managers
        </h2>
        <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Leading landlords and property management companies around the globe
          rely on RentMinder to simplify their rental operations, boost tenant
          satisfaction, and maximize returns. Join a community of professionals
          who trust our platform to manage their properties effectively.
        </p>
        <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
          <div className="flex flex-col items-center justify-center  bg-white">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">7K+</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              Tenants
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center  bg-white">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">1K+</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              Landlords
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center  bg-white">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">700+</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              Organizations
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
