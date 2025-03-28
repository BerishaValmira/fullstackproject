import dynamic from "next/dynamic";
import SupportContact from "~/features/SupportContact/support-table";

const SupportTable = dynamic(
  () => import("../../features/SupportContact/support-table"),
  {
    loading: () => <p>Loading...</p>,
    // ssr: false,
  },
);

export default function Page() {
  return (
    <div className="h-screen w-screen -mt-3 -ml-100">
      <SupportContact />
    </div>
  );
}
