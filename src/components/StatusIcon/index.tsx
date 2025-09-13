import { FilterStatus } from "@/types/FilterStatus";
import { Feather } from "@expo/vector-icons";

export function StatusIcon({ status }: { status: FilterStatus }) {
  return status === FilterStatus.DONE ? (
    <Feather size={18} color="#79B44F" name="check-circle" />
  ) : (
    <Feather size={18} color="#2A4B5A" name="circle" />
  );
}
