import React from "react";
import Wrapper from "../global/Wrapper";
import Link from "@docusaurus/Link";
import { buttonVariants } from "../../lib/utils";
import Arrow from "../../icons/arrow";

function PricingTable() {
  return (
    <Wrapper className="">
      <h1 className="text-center w-full py-4 mt-4">
        Start for free, then pay as you grow.
      </h1>
      <p className="mt-4 text-xl mb-8 ">
        New installations have{" "}
        <strong className="text-primary">Free Tier access forever</strong>,
        which includes all features but is capped at 1 million free WebSockets
        messages per month. Paid Tier options remove these limits and add access
        to email support!{" "}
        <Link to={"/docs/licensing/pricing/"}>Learn more</Link>
      </p>
      <div className="w-full max-w-full overflow-x-auto">
        <main className="grid  w-full   py-4 gap-0  grid-cols-12 max-md:grid-cols-10">
          {/* first column */}
          <div className="w-full bg-pink-50/70 dark:bg-gray-800  flex col-span-2   flex-col items-center text-center h-fit  ">
            <div className="table-title">Price</div>
            <div className="table-item">$1.25 per million messages</div>
            <div className="table-item">$99/month or $1,069/year</div>
            <div className="table-item">$299/month or $3,229/year</div>
            <div className="table-item">$599/month or $6,469/year</div>
            <div className="table-item">$1,299/month or $14,029/year</div>
            <div className="table-item  !border-b-0 ">
              $2,799/month or $30,229/year
            </div>
          </div>
          {/* second column */}
          <div className="w-full flex col-span-4 max-md:col-span-3 border-l border-solid border-y-0 border-gray-400 border-r flex-col items-center text-center min-h-fit ">
            <div className="table-title">Included messages per month</div>
            <div className="table-item !font-normal">
              1 million free messages each month,
              <br /> then pay as you go
            </div>
            <div className="table-item !font-normal">
              300 million (~10 million per day) <br />
              $0.50 per additional million
            </div>
            <div className="table-item !font-normal">
              1.5 billion (~50 million per day) <br />
              $0.45 per additional million
            </div>
            <div className="table-item !font-normal">
              7.5 billion (~250 million per day) <br />
              $0.40 per additional million
            </div>
            <div className="table-item !font-normal">
              30 billion (~1 billion per day) <br />
              $0.35 per additional million
            </div>
            <div className="table-item !border-b-0  !font-normal">
              150 billion (~5 billion per day) <br />
              $0.30 per additional million
            </div>
          </div>
          {/* third column */}
          <div className="w-full bg-pink-50/70  border-solid border-y-0 border-l-0  dark:bg-gray-800 flex col-span-4 max-md:col-span-3  flex-col items-center text-center border-r border-gray-400 min-h-fit ">
            <div className="table-title">AWS Configuration</div>
            <div className="table-item !font-normal">1 account, 1 region</div>
            <div className="table-item !font-normal">1 account, 1 region</div>
            <div className="table-item !font-normal">5 accounts, 2 regions</div>
            <div className="table-item !font-normal">
              25 accounts, 5 regions
            </div>
            <div className="table-item !font-normal">
              100 accounts, all regions
            </div>
            <div className="table-item !border-b-0 !font-normal">
              500 accounts, all regions
            </div>
          </div>
          {/* fourth */}
          <div className="w-full flex col-span-2  flex-col items-center text-center h-fit  ">
            <div className="table-title">Support</div>
            <div className="table-item !font-normal">Standard</div>
            <div className="table-item !font-normal">Standard</div>
            <div className="table-item !font-normal">Priority</div>
            <div className="table-item !font-normal">Priority</div>
            <div className="table-item !font-normal">Priority</div>
            <div className="table-item !border-b-0  !font-normal">Priority</div>
          </div>
        </main>
      </div>

      <div className="w-full items-center justify-center flex flex-col">
        <Link
          className={`flex my-6  max-lg:w-full flex-row items-center  group ${buttonVariants(
            {
              size: "lg",
            }
          )}`}
          href="/docs/installation/initial-setup/"
        >
          <span
            className="mr-3  group-hover:mr-5
              ease-in-out transition-all duration-200
              "
          >
            Launch your installation
          </span>{" "}
          <Arrow className="fill-current " />
        </Link>
      </div>
    </Wrapper>
  );
}

export default PricingTable;

// old table with splitted columns
// function PricingTable() {
//   return (
//     <Wrapper className="">
//       <h1 className="text-center w-full py-4 mt-4">Pricing Plans</h1>
//       <div className="w-full max-w-full overflow-x-auto">
//         <main className="grid  w-full max-md:w-[150vw]  py-4 gap-3 lg:gap-4 grid-cols-12">
//           {/* first column */}
//           <div className="w-full bg-pink-50/70 dark:bg-gray-800  flex col-span-2  flex-col items-center text-center h-fit  ">
//             <div className="table-title">Price</div>
//             <div className="sub-table !border-none"></div>
//             <div className="table-item">$1.25 per million messages</div>
//             <div className="table-item">$99/month or $1,069/year</div>
//             <div className="table-item">$299/month or $3,229/year</div>
//             <div className="table-item">$599/month or $6,469/year</div>
//             <div className="table-item">$1,299/month or $14,029/year</div>
//             <div className="table-item">$2,799/month or $30,229/year</div>
//           </div>
//           {/* second column */}
//           <div className="w-full flex col-span-4  flex-col items-center text-center min-h-fit ">
//             <div className="table-title">Included messages per month</div>
//             <div className="sub-table">
//               <span>first</span>
//               <span>then</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>1 million free messages each month</span>
//               <span>pay as you go</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>300 million (~10 million per day)</span>
//               <span>$0.50 per additional million</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>1.5 billion (~50 million per day)</span>
//               <span>$0.45 per additional million</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>7.5 billion (~250 million per day)</span>
//               <span>$0.40 per additional million</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>30 billion (~1 billion per day)</span>
//               <span>$0.35 per additional million</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>150 billion (~5 billion per day)</span>
//               <span>$0.30 per additional million</span>
//             </div>
//           </div>
//           {/* third column */}
//           <div className="w-full bg-pink-50/70 dark:bg-gray-800 flex col-span-4  flex-col items-center text-center min-h-fit ">
//             <div className="table-title">AWS Configuration</div>
//             <div className="sub-table">
//               <span>Accounts</span>
//               <span>Regions</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>1</span>
//               <span>1</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>1</span>
//               <span>1</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>5</span>
//               <span>2</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>25</span>
//               <span>5</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>100</span>
//               <span>All regions</span>
//             </div>
//             <div className="sub-table !font-normal !h-24">
//               <span>500</span>
//               <span>All regions</span>
//             </div>
//           </div>
//           {/* fourth */}
//           <div className="w-full flex col-span-2  flex-col items-center text-center h-fit  ">
//             <div className="table-title">Support</div>
//             <div className="sub-table !border-none"></div>
//             <div className="table-item !font-normal">Standard</div>
//             <div className="table-item !font-normal">Standard</div>
//             <div className="table-item !font-normal">Priority</div>
//             <div className="table-item !font-normal">Priority</div>
//             <div className="table-item !font-normal">Priority</div>
//             <div className="table-item !font-normal">Priority</div>
//           </div>
//         </main>
//       </div>
//     </Wrapper>
//   );
// }
