"use client";
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
import React from "react";
import { FcApproval } from "react-icons/fc";
import { RiLightbulbAiFill } from "react-icons/ri";

const FormSection = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      coreDeliverables: formData.getAll("coreDeliverables"),
    };
    console.log("Form Data:", data);
  };
  return (
    <div className="pt-5">
      {" "}
      <div className="flex items-center gap-2 text-lg font-semibold mb-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <FcApproval size="24px" />
            <div>
              <h5>Proposal Configurater</h5>
              <p className="text-sm font-medium text-gray-600">
                Configure parameters, deliverables, pricing & timeline.
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              <span>Estimated Total: $10,000</span>
            </p>
          </div>
        </div>
      </div>
      <Card className="w-full rounded-lg" variant="default">
        {/* one */}
        <div>
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
            <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <TextField isRequired name="clientContactName" type="text">
                  <Label>Client Contact Name</Label>
                  <Input placeholder="Client Contact Name" />
                  <FieldError />
                </TextField>
                <TextField isRequired name="companyName" type="text">
                  <Label>Company/Business Name</Label>
                  <Input placeholder="Company/Business Name" />
                  <FieldError />
                </TextField>
                <TextField
                  isRequired
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
                <TextField isRequired name="clientPhone" type="text">
                  <Label>Client Phone/WhatsApp Number</Label>
                  <Input placeholder="Phone/WhatsApp Number" />
                  <FieldError />
                </TextField>
                <DatePicker className="w-full" name="proposalDate" isRequired>
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
                      <Calendar.YearPickerGrid>
                        <Calendar.YearPickerGridBody>
                          {({ year }) => (
                            <Calendar.YearPickerCell year={year} />
                          )}
                        </Calendar.YearPickerGridBody>
                      </Calendar.YearPickerGrid>
                    </Calendar>
                  </DatePicker.Popover>
                </DatePicker>
              </div>

              <div className="my-10">
                <div className="flex items-center gap-3">
                  <p className="border w-fit p-3 rounded-lg bg-blue-100 text-blue-800 font-bold">
                    2
                  </p>
                  <div>
                    <p className="font-medium text-lg">
                      Service Category & Tier
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      Primary Domain & Solution Tier
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-3 gap-4">
                  <Select
                    className="w-full col-span-3"
                    placeholder="Select one"
                    name="primaryDomain"
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
                      className="grid grid-cols-3 gap-4"
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
                        <Chip className="absolute -top-3 left-1/2 -translate-x-1/2  right-0">
                          Most Polular
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
                      <Label>Included Core Delivaries</Label>
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
                      <Checkbox value="Interactive Forms with Email Webhooks">
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          Interactive Forms with Email Webhooks
                        </Checkbox.Content>
                      </Checkbox>
                      <Checkbox value="Core Web Vitals & Speed Optimization">
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          Core Web Vitals & Speed Optimization
                        </Checkbox.Content>
                      </Checkbox>
                      <Checkbox value="Analytics & Event Tracking Dashboard">
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          Analytics & Event Tracking Dashboard
                        </Checkbox.Content>
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
                <div className="my-10 ">
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
                    <p className="text-sm font-medium text-gray-600">
                      Select extra services to automatically fold into scope and
                      recalculate proposal totals:
                    </p>
                    <CheckboxGroup name="AdditionalServices">
                      <Checkbox
                        value="Additional Polishing & Revisions Round"
                        className="border p-4 rounded-lg border-gray-200"
                      >
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-lg">
                                Additional Polishing & Revisions Round
                              </p>
                              <p>
                                Includes 2 extra iterative review cycles with
                                dedicated lead designer.
                              </p>
                            </div>
                            <p className="font-bold text-lg">+$100</p>
                          </div>
                        </Checkbox.Content>
                      </Checkbox>
                      <Checkbox
                        value="Speed Optimization & Global CDN Caching"
                        className="border p-4 rounded-lg border-gray-200"
                      >
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-lg">
                                Speed Optimization & Global CDN Caching
                              </p>
                              <p>
                                Target 90+ Google Lighthouse score, Brotli
                                compression & Cloudflare tuning.
                              </p>
                            </div>
                            <p className="font-bold text-lg">+$150</p>
                          </div>
                        </Checkbox.Content>
                      </Checkbox>
                      <Checkbox
                        value="SEO Foundation Setup & Schema Markup"
                        className="border p-4 rounded-lg border-gray-200"
                      >
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-lg">
                                SEO Foundation Setup & Schema Markup
                              </p>
                              <p>
                                Structured JSON-LD schema, OpenGraph tags, XML
                                sitemap, and Google Search Console index.
                              </p>
                            </div>
                            <p className="font-bold text-lg">+$200</p>
                          </div>
                        </Checkbox.Content>
                      </Checkbox>
                      <Checkbox
                        value="1-Year Priority Maintenance & Security Support"
                        className="border p-4 rounded-lg border-gray-200"
                      >
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-lg">
                                1-Year Priority Maintenance & Security Support
                              </p>
                              <p>
                                Monthly core updates, 24/7 uptime monitoring &
                                automated daily offsite backups.
                              </p>
                            </div>
                            <p className="font-bold text-lg">+$400</p>
                          </div>
                        </Checkbox.Content>
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
                <div className="mt-10 ">
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
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Project Delivary Schedule
                    </p>
                    <RadioGroup
                      defaultValue="Standard Delivery"
                      name="ProjectDeliverySchedule"
                      className="grid grid-cols-3 gap-4"
                    >
                      <Radio
                        value="Express Delivery"
                        className="border p-4 rounded-lg border-gray-200"
                      >
                        <div className="flex justify-center items-center flex-col gap-2">
                          <Radio.Content>
                            <Radio.Control>
                              <Radio.Indicator className="border rounded-full border-gray-300" />
                            </Radio.Control>
                            Express Delivery
                          </Radio.Content>
                          <Description>1-2 Weeks</Description>
                        </div>
                      </Radio>
                      <Radio
                        value="Standard Delivery"
                        className="border p-4 rounded-lg border-gray-200"
                      >
                        <div className="flex justify-center items-center flex-col gap-2">
                          <Radio.Content>
                            <Radio.Control>
                              <Radio.Indicator className="border rounded-full border-gray-300" />
                            </Radio.Control>
                            Standard Delivery
                          </Radio.Content>
                          <Description>3-4 Weeks</Description>
                        </div>
                      </Radio>
                      <Radio
                        value="Extended Delivery"
                        className="border p-4 rounded-lg border-gray-200"
                      >
                        <div className="flex justify-center items-center flex-col gap-2">
                          <Radio.Content>
                            <Radio.Control>
                              <Radio.Indicator className="border rounded-full border-gray-300" />
                            </Radio.Control>
                            Extended Delivery
                          </Radio.Content>
                          <Description>5-6 Weeks</Description>
                        </div>
                      </Radio>
                    </RadioGroup>
                  </div>
                  <Select
                    className="w-full mt-4"
                    placeholder="Select one"
                    name="billingInstallments"
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
                          textValue="Vis/MasterCard"
                        >
                          Visa/MasterCard
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="American Express"
                          textValue="American Express"
                        >
                          American Express
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                  <Select
                    className="w-full mt-4"
                    placeholder="Select one"
                    name="proposalValidityWindow"
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

              <div className="flex gap-2">
                <Button type="submit">Submit</Button>
                <Button type="reset" variant="secondary">
                  Reset
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Card>
      <div className="my-5 bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start gap-2">
        <RiLightbulbAiFill color="blue" size={20} className="w-20 h-5" />
        <div>
          <span className="font-semibold ">Pro-tip for Agency Leads:</span>{" "}
          Every change in this form instantaneously recalculates pricing tables
          and milestones on the A4 document canvas. Ready to deliver? Click{" "}
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
