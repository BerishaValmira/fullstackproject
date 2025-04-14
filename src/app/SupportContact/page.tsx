import dynamic from "next/dynamic";
// import SupportContact from "~/features/SupportContact/support-table";

const SupportTable = dynamic(
  () => import("../../features/SupportContact/support-table"),
  {
    loading: () => <p>Loading...</p>,
    // ssr: false,
  },
);

export default function Page() {
  return (
    <div className="-mt-3 -ml-10 overflow-hidden">
      <SupportTable />
    </div>
  );
}
