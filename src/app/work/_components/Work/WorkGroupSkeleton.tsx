import Grid from "@/components/Layout/Grid";
import PaginationSkeleton from "@/components/elements/PaginationSkeleton";

const ThumbnailSkeleton = () => (
  <div className="border-solid border-8 border-white bg-gray-200 shadow-lg aspect-square w-full h-full">
    &nbsp;
  </div>
);

export default function WorkGroupSkeleton() {
  return (
    <>
      <PaginationSkeleton />

      <Grid className="mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <ThumbnailSkeleton key={index} />
        ))}
      </Grid>
    </>
  );
}
