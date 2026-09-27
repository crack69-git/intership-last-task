"use client";

import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import { FaProjectDiagram, FaBalanceScale, FaDownload } from "react-icons/fa";

export default function RequirementProposals() {
  const phases = [
    {
      num: "1",
      title: "Phase I: Discovery",
      desc: "Architecture, SRS & Wireframing",
      badgeColor: "bg-blue-600",
    },
    {
      num: "2",
      title: "Phase II: Engineering",
      desc: "Sprint Dev, DB & UI Integration",
      badgeColor: "bg-blue-600",
    },
    {
      num: "3",
      title: "Phase III: QA & Audit",
      desc: "Speed test, Cross-device & Security",
      badgeColor: "bg-blue-600",
    },
    {
      num: "4",
      title: "Phase IV: Handover",
      desc: "DNS Launch, Source Code & SLA",
      badgeColor: "bg-emerald-600",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Top Bar with Download Button */}
      <div className="flex justify-end mb-4">
        {/* <Button
          color="primary"
          onClick={handleDownloadPDF}
          startContent={<FaDownload className="text-sm" />}
          className="font-medium shadow-sm"
        >
          Download Receipt
        </Button> */}
      </div>

      {/* Downloadable Receipt Container */}
      <div
        id="proposal-receipt-section"
        className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-8"
      >
        {/* Section 1: Execution Roadmap */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-slate-500 font-bold tracking-wider text-xs uppercase">
              <FaProjectDiagram className="text-blue-600 text-sm" />
              <span>Execution Roadmap & Phased Milestones</span>
            </div>
            <Chip
              variant="flat"
              classNames={{
                base: "bg-blue-50 border border-blue-200/60 text-blue-700 font-semibold text-xs px-3 py-1 rounded-md",
              }}
            >
              Duration: 3–4 Weeks (Standard Recommended)
            </Chip>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
            {phases.map((phase) => (
              <Card
                key={phase.num}
                shadow="none"
                className="border border-slate-200/80 bg-slate-50/50 rounded-xl"
              >
                <div className="text-center p-5 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full text-white font-bold text-xs flex items-center justify-center mb-3 ${phase.badgeColor}`}
                  >
                    {phase.num}
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1.5">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 2: Key Terms & IP Protection */}
        <section>
          <Card
            shadow="none"
            className="border border-slate-200/80 bg-slate-50/30 rounded-2xl p-2"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-slate-600 font-bold tracking-wider text-xs uppercase">
                <FaBalanceScale className="text-blue-600 text-sm" />
                <span>Key Terms of Engagement & IP Protection</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed list-disc pl-4 marker:text-slate-400">
                <li>
                  <strong className="text-slate-800">
                    Payment Milestones:
                  </strong>{" "}
                  50% upfront booking retainer upon agreement signing, and 50%
                  remainder due upon final UAT deployment sign-off.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Full Intellectual Property Rights:
                  </strong>{" "}
                  Upon 100% receipt of settled project invoices, complete
                  proprietary source code, vector assets, databases, and
                  trademarks transfer entirely to Apex Horizon Global Ltd..
                </li>
                <li>
                  <strong className="text-slate-800">
                    Confidentiality (NDA):
                  </strong>{" "}
                  Biswas IT Firm commits strictly to non-disclosure of
                  proprietary company data, business logics, or client
                  credentials.
                </li>
              </ul>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
