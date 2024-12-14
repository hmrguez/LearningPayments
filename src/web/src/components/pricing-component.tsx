const plans = [
    {
        name: "Basic",
        price: "$9",
        description: "Essential features for small projects",
        features: ["Up to 5 projects", "1 GB storage", "Basic support"],
    },
    {
        name: "Pro",
        price: "$29",
        description: "Advanced features for growing teams",
        features: ["Unlimited projects", "10 GB storage", "Priority support", "Advanced analytics"],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$99",
        description: "Custom solutions for large organizations",
        features: [
            "Unlimited projects",
            "Unlimited storage",
            "24/7 dedicated support",
            "Custom integrations",
            "Advanced security",
        ],
    },
]

export default function PricingComponent() {
    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pricing Plans</h2>
                    <p className="mt-4 text-xl text-gray-600">Choose the perfect plan for your needs</p>
                </div>
                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-lg shadow-lg overflow-hidden ${
                                plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'
                            }`}
                        >
                            <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                                <h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
                                    {plan.name}
                                </h3>
                                <p className="mt-4 text-sm leading-5 text-gray-500">{plan.description}</p>
                                <div className="mt-4">
                                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                    <span className="text-base font-medium text-gray-500">/mo</span>
                                </div>
                            </div>
                            <div className="px-6 pt-6 pb-8 bg-gray-50 sm:p-10 sm:pt-6">
                                <ul className="mt-4 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-base leading-6 text-gray-700">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 rounded-md shadow">
                                    <a
                                        href="#"
                                        className={`flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white ${
                                            plan.popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
                                        } focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
                                    >
                                        Get started
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

