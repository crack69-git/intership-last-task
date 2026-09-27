import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { RiAiGenerate3dLine } from "react-icons/ri";

const NavbarSection = () => {
  return (
    <div className="border-b-2 border-gray-200">
      <div className="flex justify-between items-center w-11/12 mx-auto py-4">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <div>
              <h4 className="font-bold text-lg">Biswas IT Firm</h4>
              <p className="text-sm text-gray-500">Reliable IT Solutions</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-1 font-semibold text-gray-700 hover:underline underline-offset-2"
            >
              <IoMdAdd />
              Add Proposal
            </Link>
            <Link
              href="/view-proposal"
              className="flex items-center gap-1 font-semibold text-gray-700 hover:underline underline-offset-2"
            >
              <HiOutlineViewGrid />
              View Proposals
            </Link>
          </div>
        </div>
        <div>
          <Button
            variant="primary"
            className="rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold"
            size="sm"
          >
            <RiAiGenerate3dLine />
            Generate Proposal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection;
