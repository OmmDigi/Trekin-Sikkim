
import { Label } from "@/components/ui/label";

import SinglePackageInfoHolder from "@/components/package/SinglePackageInfoHolder";

export default function SinglePackageInfo() {
  return (
    <div className="space-y-5">
      <Label className="text-xl">Single Package Details</Label>
      <SinglePackageInfoHolder />
    </div>
  );
}
