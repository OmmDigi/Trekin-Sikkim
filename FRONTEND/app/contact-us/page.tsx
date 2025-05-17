import Button from "@/components/Button";
import Info from "@/components/Form/Info";
import Input from "@/components/Form/Input";
import TextArea from "@/components/Form/TextArea";
import HeadingSubHeding from "@/components/HeadingSubHeding";
import MainWrapper from "@/components/MainWrapper";
import { Mail, MapPinned, MoveRight, Phone, User } from "lucide-react";
import React from "react";
import { RiWhatsappLine } from "react-icons/ri";

export default function page() {
  return (
    <MainWrapper className="wrapper mx-auto space-y-10 overflow-visible max-sm:p-2.5">
      <HeadingSubHeding
        heading="Contact Us"
        subheading="If you have any questions, please feel free to get in touch"
      />

      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        <form
          action=""
          className="font-primary py-8 px-10 bg-light-gray rounded-2xl space-y-4"
        >
          <h2 className="font-semibold text-xl">GET IN TOUCH</h2>
          <div className="w-full h-[1px] bg-gray-300"></div>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <Input
              iconBefore={<User size={15} />}
              label="NAME"
              placeholder="Enter your name"
            />
            <Input
              iconBefore={<Phone size={15} />}
              label="PHONE NUMBER"
              placeholder="Enter your contact number"
            />
          </div>

          <Input
            iconBefore={<Mail size={15} />}
            type="email"
            label="EMAIL"
            placeholder="Enter your email"
          />

          <TextArea label="MESSAGE" rows={5} />

          <Button theme="black">SEND MESSAGE</Button>
        </form>

        <div className="space-y-3.5">
          <div className="font-primary py-8 px-10 bg-light-gray rounded-2xl space-y-4">
            <h2 className="font-semibold text-xl">CONTACT INFORMATION</h2>

            <div className="flex flex-col gap-5">
              <Info
                iconBefore={<Phone size={15} />}
                label="PHONE"
                text="+917407248200"
              />
              <Info
                iconBefore={<Mail size={15} />}
                label="EMAIL"
                text="kiran.yuksom@gmail.com"
              />
              <Info
                iconBefore={<RiWhatsappLine size={15} />}
                label="WHATSAPP"
                text="+917407248200"
              />

              <Info
                iconBefore={<MapPinned size={15} />}
                label="ADDRESS"
                text="Yuksom Bazar Main Road Near Hotel Yangri Gang, West Sikkim, Pin no - 737113"
              />
            </div>
          </div>

          <div className="font-primary py-8 px-10 bg-light-gray rounded-2xl flex max-sm:flex-col gap-y-2.5">
            <div className="flex-1">
              <h2 className="font-semibold">
                Make Life Count: Embrace the Adventure
              </h2>
              <p className="text-sm">
                Life’s short — explore, trek, and chase adventure.
              </p>
            </div>

            <Button theme="black" className="flex items-center gap-1.5">
              <span>Explore</span>
              <MoveRight />
            </Button>
          </div>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14173.089473438664!2d88.22019!3d27.367208!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDIyJzAyLjAiTiA4OMKwMTMnMTIuNyJF!5e0!3m2!1sen!2sus!4v1744104952256!5m2!1sen!2sus"
        className="w-full rounded-2xl"
        height="450"
        loading="lazy"
      ></iframe>
    </MainWrapper>
  );
}
