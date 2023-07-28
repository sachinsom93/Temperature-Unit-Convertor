import { LucideProps, ArrowUpDown, type Icon as LucideIcon } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  ArrowUpDown: (props: LucideProps) => <ArrowUpDown {...props}/>,
};
