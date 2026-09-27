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
    <div className="w-1/2 mx-auto py-2">
      <div>
        <div className="flex justify-between items-center bg-sky-950 text-white px-5 py-4 rounded-t-lg">
          <p className="text-lg font-semibold mb-3 flex items-center gap-2">
            Proposal Preview
            <FaEye />
          </p>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-blue-200 hover:text-blue-700"
          >
            <IoMdDownload />
            <span>Download</span>
          </Link>
        </div>
        <div className="border-2 shadow-md rounded-b-md border-gray-300 p-10">
          <div className="flex justify-between items-start mb-3 w-full">
            <div className="flex flex-col mb-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Proposal"
                  width={50}
                  height={50}
                ></Image>
                <div>
                  <p className="font-bold text-lg">BISWAS IT FIRM</p>
                </div>
              </div>
              <p className="text-blue-400 font-semibold">
                Premium Software Engineering and Consulting Services
              </p>
              <p className="text-sm text-gray-500">
                Suite 804, Silicon Trade Center, Dhaka 1212 •
                hello@biswasitfirm.com • +880 1800-BISWAS
              </p>
            </div>

            <div className="w-full flex justify-end">
              <div className="flex flex-col justify-end items-end gap-1">
                <Chip className=" text-green-800 bg-green-100 border border-green-200">
                  Project Proposal
                </Chip>
                <p className="text-sm font-semibold text-gray-500">
                  Reference: {data?._id.slice(0, 8) || "N/A"}...
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  Date: {data?.proposalDate}
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  Valid : {data?.proposalValidityWindow}
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-3" />
          <div>
            <Card
              className="w-full bg-linear-to-r from-slate-900 to-slate-800 text-white"
              variant="secondary"
            >
              <div className="flex justify-between items-center gap-3 p-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    {data?.clientContactName}
                  </h3>
                  <p className="text-sm font-medium text-gray-300">
                    {data?.companyName}
                  </p>
                </div>
                <Separator orientation="vertical" className="" />
                <div className="flex flex-col justify-end items-end gap-1">
                  <p className="text-sm font-medium text-gray-300">
                    Solution Package
                  </p>
                  <p className="text-sm font-medium text-green-300">
                    {data?.primaryDomain}
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="my-3">
            <p className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-500">
              <FaTasks />
              Scope of Work & Guaranteed Deliverables
            </p>
            <div>
              <Card className="w-full" variant="default">
                {data.coreDeliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2 p-3">
                    <IoCheckmarkDone className="text-green-600" />
                    <p className="text-gray-700">{deliverable}</p>
                  </div>
                ))}
              </Card>
            </div>
          </div>
          <div className="my-3">
            <p className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-500">
              <FaMoneyBillTrendUp />
              Financial Investment & Cost Breakdown
            </p>
            <div>
              <Table>
                <Table.ScrollContainer>
                  <Table.Content
                    aria-label="Team members"
                    className="min-w-full"
                  >
                    <Table.Header>
                      <Table.Column isRowHeader>Service Item</Table.Column>

                      <Table.Column>Amount</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>{data.planOrientation}</Table.Cell>
                        <Table.Cell>{data.planPrice}</Table.Cell>
                      </Table.Row>
                      {data.additionalServices.map((service, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{service.name}</Table.Cell>
                          <Table.Cell>{service.price}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
              <div className="flex justify-end items-center gap-4 mt-3 font-semibold text-gray-500">
                Subtotal:{" "}
                <p className="text-green-700">${data.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="my-3">
            <RequirementProposals />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
