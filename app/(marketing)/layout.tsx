import { Children } from "react";
type Props = {
  children: React.ReactNode;
};
export default function MarketingLayout({ children }: Props) {
  return <main className="">{children}</main>;
}
