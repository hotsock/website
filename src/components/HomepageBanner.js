import Link from "@docusaurus/Link"

export default function HomepageBanner() {
  return (
    <div className="bg-gradient-to-tr from-pink-600 to-pink-400">
      <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center flex-1">
            <p className="mb-0 ml-3 font-medium text-white truncate">
              <span className="md:hidden">Hotsock v1.0 is here!</span>
              <span className="hidden md:inline">
                Big news! We're excited to announce that Hotsock v1.0 is
                released!
              </span>
            </p>
          </div>
          <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
            <Link
              to="/blog/hotsock-v1.0/"
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
