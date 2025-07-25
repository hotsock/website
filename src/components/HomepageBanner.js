import Link from "@docusaurus/Link"

export default function HomepageBanner() {
  return (
    <div className="bg-gradient-to-tr from-pink-600 to-pink-400">
      <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center flex-1">
            <p className="mb-0 ml-3 font-medium text-white truncate">
              <span className="md:hidden">
                Just released: message scheduling and web console updates!
              </span>
              <span className="hidden md:inline">
                New in Hotsock v1.5 - message scheduling and web console
                improvements!
              </span>
            </p>
          </div>
          <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
            <Link
              to="/blog/message-scheduler-and-web-console-improvements/"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-white border border-transparent rounded-sm shadow-sm text-pink-600 hover:bg-indigo-50"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
