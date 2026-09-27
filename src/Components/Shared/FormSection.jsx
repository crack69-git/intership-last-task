"use client";

import React, { useState } from "react";
import { postProposals } from "@/lib/actions/postData";
import {
  Button,
  Calendar,
  Card,
  DateField,
  DatePicker,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Separator,
  TextField,
  Select,
  Description,
  Radio,
  RadioGroup,
  Chip,
  Checkbox,
  CheckboxGroup,
} from "@heroui/react";
import { FcApproval } from "react-icons/fc";
import { RiLightbulbAiFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const ADDITIONAL_SERVICES_OPTIONS = [
  {
    id: "additional-revisions",
    name: "Additional Polishing & Revisions Round",
    description:
      "Includes 2 extra iterative review cycles with dedicated lead designer.",
    price: 100,
  },
  {
    id: "speed-optimization",
    name: "Speed Optimization & Global CDN Caching",
    description:
      "Target 90+ Google Lighthouse score, Brotli compression & Cloudflare tuning.",
    price: 150,
  },
  {
    id: "seo-foundation",
    name: "SEO Foundation Setup & Schema Markup",
    description:
      "Structured JSON-LD schema, OpenGraph tags, XML sitemap, and Google Search Console index.",
    price: 200,
  },
  {
    id: "maintenance-support",
    name: "1-Year Priority Maintenance & Security Support",
    description:
      "Monthly core updates, 24/7 uptime monitoring & automated daily offsite backups.",
    price: 400,
  },
];

const FormSection = () => {
  const router = useRouter();
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(300); // Default to Starter ($300)
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState(
    [],
  );

  // Calculate total price dynamically
  const additionalServicesTotal = selectedAdditionalServices.reduce(
    (sum, serviceJson) => sum + JSON.parse(serviceJson).price,
    0,
  );
  const totalPrice = selectedPlanPrice + additionalServicesTotal;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Parse additional services into structured objects
    const rawAdditionalServices = formData.getAll("AdditionalServices");
    const parsedAdditionalServices = rawAdditionalServices.map((item) =>
      JSON.parse(item),
    );

    const data = {
      clientContactName: formData.get("clientContactName"),
      companyName: formData.get("companyName"),
      clientEmail: formData.get("clientEmail"),
      clientPhone: formData.get("clientPhone"),
      proposalDate: formData.get("proposalDate"),
      primaryDomain: formData.get("primaryDomain"),
      planOrientation: formData.get("plan-orientation"),
      planPrice: selectedPlanPrice,
      coreDeliverables: formData.getAll("coreDeliverables"),
      additionalServices: parsedAdditionalServices, // Formatted as [{ name: '...', price: 100 }, ...]
      additionalServicesTotal,
      totalPrice, // Complete total amount stored
      projectDeliverySchedule: formData.get("ProjectDeliverySchedule"),
      billingInstallments: formData.get("billingInstallments"),
      proposalValidityWindow: formData.get("proposalValidityWindow"),
    };

    console.log("Form Data Submitted:", data);
    const res = await postProposals(data);
    console.log("Response from API:", res);
    if (res.acknowledged) {
      alert("Proposal submitted successfully!");
      router.push("/view-proposal");
    } else {
      alert("Failed to submit proposal.");
    }
  };

  return (
    <div className="pt-5">
      <div className="flex items-center gap-2 text-lg font-semibold mb-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <FcApproval size="24px" />
            <div>
              <h5>Proposal Configurator</h5>
              <p className="text-sm font-medium text-gray-600">
                Configure parameters, deliverables, pricing & timeline.
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              <span>Estimated Total: ${totalPrice.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>

      <Card className="w-full rounded-lg" variant="default">
        <Form className="flex w-full flex-col gap-4 p-4" onSubmit={onSubmit}>
          {/* Section 1: Client & Project Info */}
          <div>
            <div className="flex items-center gap-3">
              <p className="border w-fit p-3 rounded-lg bg-blue-100 text-blue-800 font-bold">
                1
              </p>
              <div>
                <p className="font-medium text-lg">
                  Client & Project Information
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Contact person, business & proposal date
                </p>
              </div>
            </div>
            <Separator className="my-4" />

            <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
              <TextField
                defaultValue="ashu"
                name="clientContactName"
                type="text"
              >
                <Label>Client Contact Name</Label>
                <Input placeholder="Client Contact Name" />
                <FieldError />
              </TextField>

              <TextField
                defaultValue="ashu ltd."
                name="companyName"
                type="text"
              >
                <Label>Company/Business Name</Label>
                <Input placeholder="Company/Business Name" />
                <FieldError />
              </TextField>

              <TextField
                defaultValue="ashu@gmail.com"
                name="clientEmail"
                type="email"
                validate={(value) => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return (
                    emailRegex.test(value) ||
                    "Please enter a valid email address"
                  );
                }}
              >
                <Label>Client Email Address</Label>
                <Input placeholder="Client Email Address" />
                <FieldError />
              </TextField>

              <TextField
                defaultValue="1234567890"
                name="clientPhone"
                type="text"
              >
                <Label>Client Phone/WhatsApp Number</Label>
                <Input placeholder="Phone/WhatsApp Number" />
                <FieldError />
              </TextField>

              <DatePicker className="w-full" name="proposalDate">
                <Label>Proposal Date</Label>
                <DateField.Group fullWidth>
                  <DateField.Input>
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateField.Suffix>
                    <DatePicker.Trigger>
                      <DatePicker.TriggerIndicator />
                    </DatePicker.Trigger>
                  </DateField.Suffix>
                </DateField.Group>
                <DatePicker.Popover>
                  <Calendar aria-label="Event date">
                    <Calendar.Header>
                      <Calendar.YearPickerTrigger>
                        <Calendar.YearPickerTriggerHeading />
                        <Calendar.YearPickerTriggerIndicator />
                      </Calendar.YearPickerTrigger>
                      <Calendar.NavButton slot="previous" />
                      <Calendar.NavButton slot="next" />
                    </Calendar.Header>
                    <Calendar.Grid>
                      <Calendar.GridHeader>
                        {(day) => (
                          <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                        )}
                      </Calendar.GridHeader>
                      <Calendar.GridBody>
                        {(date) => <Calendar.Cell date={date} />}
                      </Calendar.GridBody>
                    </Calendar.Grid>
                  </Calendar>
                </DatePicker.Popover>
              </DatePicker>
            </div>
          </div>

          {/* Section 2: Service Category & Tier */}
          <div className="my-10">
            <div className="flex items-center gap-3">
              <p className="border w-fit p-3 rounded-lg bg-blue-100 text-blue-800 font-bold">
                2
              </p>
              <div>
                <p className="font-medium text-lg">Service Category & Tier</p>
                <p className="text-sm font-medium text-gray-600">
                  Primary Domain & Solution Tier
                </p>
              </div>
            </div>
            <Separator className="my-4" />

            <div className="grid max-sm:grid-cols-1 grid-cols-3 gap-4">
              <Select
                className="w-full col-span-3"
                placeholder="Select one"
                name="primaryDomain"
                defaultValue="Web Development"
              >
                <Label>Primary Domain/Service Track</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item
                      id="Web Development"
                      textValue="Web Development"
                    >
                      Web Development
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <div className="flex flex-col gap-4 col-span-3">
                <Label>Subscription plan</Label>
                <RadioGroup
                  defaultValue="starter"
                  name="plan-orientation"
                  orientation="horizontal"
                  className="grid max-sm:grid-cols-1 grid-cols-3 gap-4"
                  onChange={(val) => {
                    if (val === "starter") setSelectedPlanPrice(300);
                    if (val === "professional") setSelectedPlanPrice(500);
                    if (val === "advanced") setSelectedPlanPrice(1000);
                  }}
                >
                  <Radio
                    value="starter"
                    className="border p-4 rounded-lg border-gray-200"
                  >
                    <Radio.Content>
                      <Radio.Control>
                        <Radio.Indicator className="border rounded-full border-gray-200" />
                      </Radio.Control>
                      <div>
                        <p>Starter Tier</p>
                        <p>$300/month</p>
                      </div>
                    </Radio.Content>
                    <Description>
                      Essential foundation for startups & MVPs.
                    </Description>
                  </Radio>

                  <Radio
                    value="professional"
                    className="relative border p-4 rounded-lg border-gray-200"
                  >
                    <Chip className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-100 border border-blue-300 text-blue-800 font-semibold">
                      Most Popular
                    </Chip>
                    <Radio.Content>
                      <Radio.Control>
                        <Radio.Indicator className="border rounded-full border-gray-200" />
                      </Radio.Control>
                      <div>
                        <p>Professional</p>
                        <p>$500/month</p>
                      </div>
                    </Radio.Content>
                    <Description>
                      Full-featured scale build with optimization.
                    </Description>
                  </Radio>

                  <Radio
                    value="advanced"
                    className="border p-4 rounded-lg border-gray-200"
                  >
                    <Radio.Content>
                      <Radio.Control>
                        <Radio.Indicator className="border rounded-full border-gray-200" />
                      </Radio.Control>
                      <div>
                        <p>Advanced</p>
                        <p>$1000/month</p>
                      </div>
                    </Radio.Content>
                    <Description>
                      High capacity, custom integrations & priority SLAs.
                    </Description>
                  </Radio>
                </RadioGroup>

                <CheckboxGroup name="coreDeliverables">
                  <Label>Included Core Deliverables</Label>
                  <Checkbox value="Up to 12 Bespoke Dynamic Pages">
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      Up to 12 Bespoke Dynamic Pages
                    </Checkbox.Content>
                  </Checkbox>
                  <Checkbox value="Modern SPA / Dynamic Component Architecture">
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      Modern SPA / Dynamic Component Architecture
                    </Checkbox.Content>
                  </Checkbox>
                  <Checkbox value="Headless CMS / Content Management Integration">
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      Headless CMS / Content Management Integration
                    </Checkbox.Content>
                  </Checkbox>
                  <Checkbox value="Mobile Responsive & Cross-Browser Tested">
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      Mobile Responsive & Cross-Browser Tested
                    </Checkbox.Content>
                  </Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </div>

          {/* Section 3: Additional Services */}
          <div className="my-10">
            <div className="flex items-center gap-3">
              <p className="border w-fit p-3 rounded-lg bg-blue-100 text-blue-800 font-bold">
                3
              </p>
              <div>
                <p className="font-medium text-lg">
                  Additional Services & Customizations
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Revisions, SEO, hosting & annual maintenance
                </p>
              </div>
            </div>
            <Separator className="my-4" />

            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">
                Select extra services to automatically fold into scope and
                recalculate proposal totals:
              </p>

              <CheckboxGroup
                name="AdditionalServices"
                value={selectedAdditionalServices}
                onChange={setSelectedAdditionalServices}
              >
                {ADDITIONAL_SERVICES_OPTIONS.map((service) => (
                  <Checkbox
                    key={service.id}
                    value={JSON.stringify({
                      name: service.name,
                      price: service.price,
                    })}
                    className="border p-4 rounded-lg border-gray-200 mb-2"
                  >
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col gap-1">
                          <p className="font-medium text-lg">{service.name}</p>
                          <p className="text-sm text-gray-500">
                            {service.description}
                          </p>
                        </div>
                        <div className="font-bold text-lg">
                          +${service.price}
                        </div>
                      </div>
                    </Checkbox.Content>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>

          {/* Section 4: Timeline & Payment Terms */}
          <div className="mt-10">
            <div className="flex items-center gap-3">
              <p className="border w-fit p-3 rounded-lg bg-blue-100 text-blue-800 font-bold">
                4
              </p>
              <div>
                <p className="font-medium text-lg">
                  Project Timeline & Payment Terms
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Delivery pace & milestone installment split
                </p>
              </div>
            </div>
            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
              <Label>Project Delivery Schedule</Label>
              <RadioGroup
                defaultValue="Standard Delivery"
                name="ProjectDeliverySchedule"
                className="grid max-sm:grid-cols-1 grid-cols-3 gap-4"
              >
                <Radio
                  value="Express Delivery"
                  className="border p-4 rounded-lg border-gray-200"
                >
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator className="border rounded-full border-gray-300" />
                    </Radio.Control>
                    Express Delivery
                  </Radio.Content>
                  <Description>1-2 Weeks</Description>
                </Radio>
                <Radio
                  value="Standard Delivery"
                  className="border p-4 rounded-lg border-gray-200"
                >
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator className="border rounded-full border-gray-300" />
                    </Radio.Control>
                    Standard Delivery
                  </Radio.Content>
                  <Description>3-4 Weeks</Description>
                </Radio>
                <Radio
                  value="Extended Delivery"
                  className="border p-4 rounded-lg border-gray-200"
                >
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator className="border rounded-full border-gray-300" />
                    </Radio.Control>
                    Extended Delivery
                  </Radio.Content>
                  <Description>5-6 Weeks</Description>
                </Radio>
              </RadioGroup>

              <Select
                className="w-full mt-4"
                placeholder="Select one"
                name="billingInstallments"
                defaultValue="Bkash"
              >
                <Label>Billing & Payment Installments</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Bkash" textValue="Bkash">
                      Bkash
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Nagad" textValue="Nagad">
                      Nagad
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Rocket" textValue="Rocket">
                      Rocket
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="Visa/MasterCard"
                      textValue="Visa/MasterCard"
                    >
                      Visa/MasterCard
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <Select
                className="w-full mt-4"
                placeholder="Select one"
                name="proposalValidityWindow"
                defaultValue="30days"
              >
                <Label>Proposal Validity Window</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="14days" textValue="14days">
                      Valid 14 days from issue date
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="30days" textValue="30days">
                      Valid 30 days from issue date
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="60days" textValue="60days">
                      Valid 60 days from issue date
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              type="submit"
              className="bg-emerald-800 text-white rounded-lg px-6"
            >
              Submit
            </Button>
            <Button
              type="reset"
              variant="secondary"
              className="rounded-lg text-emerald-800 border border-emerald-800"
              onClick={() => {
                setSelectedPlanPrice(300);
                setSelectedAdditionalServices([]);
              }}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card>

      <div className="my-5 bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start gap-2">
        <RiLightbulbAiFill color="blue" size={20} className="w-20 h-5" />
        <div>
          <span className="font-semibold">Pro-tip for Agency Leads:</span> Every
          change in this form instantaneously recalculates pricing tables and
          milestones on the document canvas. Ready to deliver? Click{" "}
          <span className="font-medium text-blue-600">
            "Print / Download PDF"
          </span>{" "}
          to output clean print pages.
        </div>
      </div>
    </div>
  );
};

export default FormSection;
