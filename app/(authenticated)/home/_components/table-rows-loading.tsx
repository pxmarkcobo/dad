import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

export default function TableRowsSkeleton() {
  return Array.from({ length: 10 }, (_, index) => (
    <TableRow key={index} className="w-full">
      <TableCell>
        <Skeleton className="h-[40px] w-full rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[40px] w-full rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[40px] w-full rounded-full" />
      </TableCell>
    </TableRow>
  ))
}
