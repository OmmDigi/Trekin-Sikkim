import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface IProps {
  onNext?: () => void;
  onPrevious?: () => void;
}


export default function Additional({ onNext, onPrevious }: IProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="*:uppercase">
            <TableHead className="w-[100px]">For Month</TableHead>
            <TableHead>From Date</TableHead>
            <TableHead>To Date</TableHead>
            <TableHead>Max Seats</TableHead>
            <TableHead>Avilability Text</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        {/* <TableBody>
          {table_date.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.for_month}</TableCell>
              <TableCell>{data.form_date}</TableCell>
              <TableCell>{data.to_date}</TableCell>
              <TableCell>{data.max_seats}</TableCell>
              <TableCell>{data.avilability_text}</TableCell>
              <TableCell className="text-right flex items-center justify-end gap-4">
                <Button>
                  <Pencil size={12} />
                </Button>
                <Button variant="destructive">
                  <Trash size={12} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>

      <div className="flex items-center justify-between">
        <Button onClick={onPrevious} type="button" variant="secondary">
          Previous
        </Button>
        <Button onClick={onNext}>Save & Next</Button>
      </div>
    </div>
  );
}
