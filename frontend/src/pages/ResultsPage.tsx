import { Skeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { getPickerData, PickerDetails } from "@/lib/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ResultsPage = () => {
  const { pickerId } = useParams();
  const navigate = useNavigate();
  const [picker, setPicker] = useState<PickerDetails>();

  useEffect(() => {
    (async () => {
      if (!pickerId) return navigate(import.meta.env.BASE_URL);
      const picker = await getPickerData(pickerId);
      setPicker(picker);
    })();
  }, [pickerId]);

  return (
    <div className="root-container">
      <div className="tracking-tigh mb-4 text-center text-2xl font-semibold">
        Results
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-700">
            <TableHead className="font-bold text-white">Position</TableHead>
            <TableHead className="w-full font-bold text-white">Item</TableHead>
            <TableHead className="text-right font-bold text-white">
              Votes
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {picker
            ? picker.things
                .sort((a, b) => b.score - a.score) // TODO: sort on backend
                .map((thing, i) => (
                  <TableRow
                    id={thing.id.toString()}
                    className="odd:bg-slate-800 even:bg-slate-700"
                  >
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>{thing.name}</TableCell>
                    <TableCell className="text-right">{thing.score}</TableCell>
                  </TableRow>
                ))
            : Array.from({ length: 5 }).map((_, i) => (
                <TableRow
                  id={i.toString()}
                  className="odd:bg-slate-800 even:bg-slate-700"
                >
                  <TableCell className="font-medium" colSpan={3}>
                    <Skeleton className="h-4 w-full opacity-60" />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};
