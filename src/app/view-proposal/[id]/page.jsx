import RequirementProposals from "@/Components/Shared/RequirementsProposals";
import { getProposalById } from "@/lib/actions/getProposal";

import { Card, Chip, Separator, Table } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye, FaTasks } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";

const page = async ({ params }) => {
  const { id } = await params;
  console.log("Proposal ID:", id);
  const data = await getProposalById(id);
  console.log("Proposal Data:", data);

  return (
    <div className="w-[clamp(18rem,90vw,64rem)] mx-auto py-[clamp(0.5rem,2vw,2rem)] px-3 sm:px-0">
      <div>
        {/* Header */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center bg-sky-950 text-white px-[clamp(1rem,3vw,2rem)] py-[clamp(0.75rem,2vw,1.25rem)] rounded-t-lg gap-2">
          <p className="text-[clamp(1rem,1.2vw,1.25rem)] font-semibold flex items-center gap-2">
            Proposal Preview
            <FaEye />
          </p>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-blue-200 hover:text-blue-700 transition-colors"
          >
            <IoMdDownload />
            <span>Download</span>
          </Link>
        </div>

        {/* Content Container */}
        <div className="border-2 shadow-md rounded-b-md border-gray-300 p-[clamp(1rem,3vw,2.5rem)] bg-white">
          {/* Header Info Block */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-6 w-full">
            {/* Company Info */}
            <div className="flex flex-col gap-1 w-full md:w-auto">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Proposal"
                  width={50}
                  height={50}
                  className="w-[clamp(2.5rem,4vw,3.5rem)] h-auto shrink-0"
                />
                <div>
                  <p className="font-bold text-[clamp(1.1rem,1.5vw,1.5rem)] leading-tight">
                    BISWAS IT FIRM
                  </p>
                </div>
              </div>
              <p className="text-blue-400 font-semibold text-[clamp(0.875rem,1.1vw,1rem)] mt-1">
                Premium Software Engineering and Consulting Services
              </p>
              <p className="text-[clamp(0.75rem,1vw,0.875rem)] text-gray-500 max-w-xl">
                Suite 804, Silicon Trade Center, Dhaka 1212 •
                hello@biswasitfirm.com • +880 1800-BISWAS
              </p>
            </div>

            {/* Reference Details */}
            <div className="w-full md:w-auto flex justify-start md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
              <div className="flex flex-col items-start md:items-end gap-1 w-full">
                <Chip className="text-green-800 bg-green-100 border border-green-200 text-xs sm:text-sm">
                  Project Proposal
                </Chip>
                <p className="text-[clamp(0.75rem,1vw,0.875rem)] font-semibold text-gray-500">
                  Reference: {data?._id ? `${data._id.slice(0, 8)}...` : "N/A"}
                </p>
                <p className="text-[clamp(0.75rem,1vw,0.875rem)] font-semibold text-gray-500">
                  Date: {data?.proposalDate || "N/A"}
                </p>
                <p className="text-[clamp(0.75rem,1vw,0.875rem)] font-semibold text-gray-500">
                  Valid : {data?.proposalValidityWindow || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Client & Solution Card */}
          <div className="my-4">
            <Card
              className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white p-[clamp(0.75rem,2vw,1.25rem)]"
              variant="secondary"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="min-w-0">
                  <h3 className="text-[clamp(1rem,1.3vw,1.25rem)] font-semibold truncate">
                    {data?.clientContactName || "Client Name"}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-gray-300 truncate">
                    {data?.companyName || "Company Name"}
                  </p>
                </div>

                <Separator
                  orientation="vertical"
                  className="hidden sm:block h-10 bg-slate-700"
                />

                <div className="flex flex-col sm:items-end gap-0.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-700 w-full sm:w-auto">
                  <p className="text-xs sm:text-sm font-medium text-gray-300">
                    Solution Package
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-green-300 font-mono">
                    {data?.primaryDomain || "N/A"}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Deliverables Section */}
          <div className="my-6">
            <p className="text-[clamp(1rem,1.2vw,1.25rem)] font-semibold mb-3 flex items-center gap-2 text-gray-600">
              <FaTasks className="shrink-0" />
              <span>Scope of Work & Guaranteed Deliverables</span>
            </p>
            <Card className="w-full divide-y divide-gray-100" variant="default">
              {data?.coreDeliverables?.map((deliverable, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-[clamp(0.5rem,1.5vw,0.875rem)]"
                >
                  <IoCheckmarkDone className="text-green-600 text-lg shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-[clamp(0.875rem,1vw,1rem)] leading-relaxed">
                    {deliverable}
                  </p>
                </div>
              ))}
            </Card>
          </div>

          {/* Cost Breakdown Section */}
          <div className="my-6">
            <p className="text-[clamp(1rem,1.2vw,1.25rem)] font-semibold mb-3 flex items-center gap-2 text-gray-600">
              <FaMoneyBillTrendUp className="shrink-0" />
              <span>Financial Investment & Cost Breakdown</span>
            </p>
            <div className="w-full overflow-x-auto rounded-lg ">
              <Table>
                <Table.ScrollContainer>
                  <Table.Content
                    aria-label="Financial Investment Breakdown"
                    className="min-w-[28rem] w-full"
                  >
                    <Table.Header>
                      <Table.Column isRowHeader>Service Item</Table.Column>
                      <Table.Column className="text-right">Amount</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell className="font-medium">
                          {data?.planOrientation}
                        </Table.Cell>
                        <Table.Cell className="text-right font-mono">
                          {data?.planPrice}
                        </Table.Cell>
                      </Table.Row>
                      {data?.additionalServices?.map((service, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{service.name}</Table.Cell>
                          <Table.Cell className="text-right font-mono">
                            {service.price}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            </div>

            {/* Subtotal Footer */}
            <div className="flex justify-end items-center gap-3 mt-4 font-semibold text-gray-600 text-[clamp(0.875rem,1.1vw,1.125rem)]">
              <span>Subtotal:</span>
              <p className="text-green-700 font-mono text-[clamp(1rem,1.3vw,1.25rem)]">
                ${data?.totalPrice ? data.totalPrice.toFixed(2) : "0.00"}
              </p>
            </div>
          </div>

          {/* Embedded Requirements Proposals */}
          <div className="my-6">
            <RequirementProposals />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
