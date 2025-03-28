import dynamic from "next/dynamic";

const Entity1Table = dynamic(
  () => import("../../features/entity1stuff/entity1-table"),
  {
    loading: () => <p>Loading...</p>,
    // ssr: false,
  },
);
export default function Page() {
  return (
    <div className="h-screen w-screen -mt-3 -ml-100">
      <Entity1Table />
    </div>
  );
}
