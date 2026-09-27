import { getProposal } from "@/lib/actions/getProposal";
import { Button, Table } from "@heroui/react";
import Link from "next/link";
import React from "react";

const page = async () => {
  const data = await getProposal();
  console.log("Fetched Proposals:", data);
  return (
    <div className="w-11/12 mx-auto py-5">
      <p className="text-lg font-semibold mb-3">View Proposals</p>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="w-full">
            <Table.Header>
              <Table.Column isRowHeader>Proposal Id</Table.Column>
              <Table.Column>Client Name</Table.Column>
              <Table.Column>Primary Domain</Table.Column>
              <Table.Column>Proposal Date</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {data.length > 0 ? (
                data.map((proposal) => (
                  <Table.Row key={proposal._id}>
                    <Table.Cell>
                      <Link
                        href={`/view-proposal/${proposal._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {proposal._id}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{proposal.clientContactName}</Table.Cell>
                    <Table.Cell>{proposal.primaryDomain}</Table.Cell>
                    <Table.Cell>{proposal.proposalDate}</Table.Cell>
                    <Table.Cell>
                      <Link href={`/view-proposal/${proposal._id}`}>
                        <Button
                          variant="primary"
                          size="sm"
                          className="rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold"
                        >
                          Inspect
                        </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center">
                    No proposals found.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default page;
