import dynamic from "next/dynamic";

const ARFrame = dynamic(() => import("./ARFrame"), { ssr: false });

export default function ARPage() {
  return <ARFrame />;
}
