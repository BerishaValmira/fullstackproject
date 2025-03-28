import dynamic from "next/dynamic";

const Entity2Table = dynamic(
  () => import("../../features/entity2stuff/entity2-table"),
  {
    loading: () => <p>Loading...</p>,
    // ssr: false,
  },
);

export default function Page() {
  return (
    <div className="h-screen w-screen -mt-3 -ml-100">
      <Entity2Table />
    </div>
  );
}
