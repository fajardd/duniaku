import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center p-6 h-screen space-y-2">
      <Skeleton className="w-50 h-5" />
      <Skeleton className="w-80 h-5" />
      <Skeleton className="w-50 h-5" />
      <Skeleton className="w-20 h-5" />
      <div className="flex space-x-2 mt-4">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-32 h-8" />
      </div>
    </div>
  );
}
