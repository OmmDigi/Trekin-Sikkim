"use client";

import ViewDescriptionDialog from "@/components/dialogs/ViewDescriptionDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { Eye } from "lucide-react";
import React, { useState } from "react";

const INFO = [
  {
    id: 1,
    name: "Somnath Gupta",
    phone_number: "+919382413005",
    email: "somnathgupta@gmail.com",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet obcaecati placeat, quia quisquam ipsa architecto harum impedit? Omnis vel perferendis excepturi illo minus! Ab animi quam, eius veritatis sapiente eaque?",
  },
  {
    id: 2,
    name: "Arindam Gupta",
    phone_number: "+919382413005",
    email: "arindamgupta@gmail.com",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet obcaecati placeat, quia quisquam ipsa architecto harum impedit? Omnis vel perferendis excepturi illo minus! Ab animi quam, eius veritatis sapiente eaque?",
  },
];

export default function ContactDetails() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ViewDescriptionDialog isOpen={isOpen} setOpen={setOpen} />
      <div className="space-y-3.5">
        <div>
          <Label className="text-2xl font-semibold">Contact Details</Label>
        </div>

        <Table>
          <TableCaption>
            People who have contact you from your website contact form
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">NAME</TableHead>
              <TableHead>PHONE NUMBER</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>MESSAGE</TableHead>
              <TableHead className="text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INFO.map((info) => (
              <TableRow key={info.id}>
                <TableCell className="font-medium">{info.name}</TableCell>
                <TableCell>{info.phone_number}</TableCell>
                <TableCell>{info.email}</TableCell>
                <TableCell>
                  <span className="text-wrap line-clamp-2">{info.message}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => setOpen(true)}>
                    <Eye size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
