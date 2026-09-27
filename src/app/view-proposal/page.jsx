import { Button, Table } from "@heroui/react";
import React from "react";

const page = () => {
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
              <Table.Row>
                <Table.Cell>Kate Moore</Table.Cell>
                <Table.Cell>CEO</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold"
                  >
                    Inspect
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default page;
