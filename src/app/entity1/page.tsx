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
    <div className="-mt-85 -ml-170">
      <Entity1Table />
    </div>
  );
}
