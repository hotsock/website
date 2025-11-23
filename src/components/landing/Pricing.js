import Wrapper from "../global/Wrapper"
import Link from "@docusaurus/Link"
import { buttonVariants } from "../../lib/utils"
import Arrow from "../../icons/arrow"

function PricingTable() {
  return (
    <Wrapper className="">
      <h1 className="text-center w-full py-4 mt-4">
        Start for free, upgrade to a license for unlimited usage!
      </h1>
      <p className="mt-4 text-xl mb-8 ">
        New, unlicensed installations have{" "}
        <strong className="text-primary">Free Tier access forever</strong>,
        which includes all features but is capped at 1 million WebSocket
        messages per month. Paid licenses provide unlimited messages and premium
        support! <Link to="/docs/licensing/pricing/">Learn more</Link>
      </p>

      <div className="w-full max-w-4xl mx-auto mt-12 mb-8">
        <div className="grid md:grid-cols-2 gap-8 max-md:gap-6 relative">
          {/* OR divider */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-md:hidden">
            <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-sm font-bold text-white">OR</span>
            </div>
          </div>

          {/* Monthly Pricing Card */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border-2 border-primary p-8 flex flex-col">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Billed Monthly</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-primary">$99</span>
                <span className="text-xl text-gray-600 dark:text-gray-400">
                  / month
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                per AWS account
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <strong>Unlimited messages</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <strong>Unlimited concurrent connections</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <strong>Unlimited installations</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <Link
                    to="/docs/installation/region-support/"
                    className="text-primary hover:underline"
                  >
                    All supported AWS regions
                  </Link>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <Link
                    to="/docs/licensing/pricing/#premium-support"
                    className="text-primary hover:underline"
                  >
                    Premium support
                  </Link>
                </span>
              </li>
            </ul>

            <Link
              className={`flex my-6 max-lg:w-full flex-row items-center group ${buttonVariants(
                {
                  size: "lg",
                }
              )}`}
              href="/docs/installation/initial-setup/"
            >
              <span
                className="mr-3 group-hover:mr-5
              ease-in-out transition-all duration-200
              "
              >
                Buy Now
              </span>{" "}
              <Arrow className="fill-current " />
            </Link>
          </div>

          {/* Annual Pricing Card */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border-2 border-primary p-8 flex flex-col">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Billed Annually</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-primary">$999</span>
                <span className="text-xl text-gray-600 dark:text-gray-400">
                  / year
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                per AWS account
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <strong>Unlimited messages</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <strong>Unlimited concurrent connections</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <strong>Unlimited installations</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <Link
                    to="/docs/installation/region-support/"
                    className="text-primary hover:underline"
                  >
                    All supported AWS regions
                  </Link>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-base">
                  <Link
                    to="/docs/licensing/pricing/#premium-support"
                    className="text-primary hover:underline"
                  >
                    Premium support
                  </Link>
                </span>
              </li>
            </ul>

            <Link
              className={`flex my-6 max-lg:w-full flex-row items-center group ${buttonVariants(
                {
                  size: "lg",
                }
              )}`}
              href="/docs/installation/initial-setup/"
            >
              <span
                className="mr-3 group-hover:mr-5
              ease-in-out transition-all duration-200
              "
              >
                Buy Now
              </span>{" "}
              <Arrow className="fill-current " />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <p className="text-base m-0">
          <strong>💡 Pricing note:</strong> Hotsock licensing fees are separate
          from AWS infrastructure costs. Your AWS costs will vary based on
          actual usage.
        </p>
      </div>

      <div className="w-full items-center justify-center flex flex-col">
        <Link
          className={`flex my-6 max-lg:w-full flex-row items-center group ${buttonVariants(
            {
              size: "lg",
            }
          )}`}
          href="/docs/installation/initial-setup/"
        >
          <span
            className="mr-3 group-hover:mr-5
              ease-in-out transition-all duration-200
              "
          >
            Launch your installation
          </span>{" "}
          <Arrow className="fill-current " />
        </Link>
      </div>
    </Wrapper>
  )
}

export default PricingTable
