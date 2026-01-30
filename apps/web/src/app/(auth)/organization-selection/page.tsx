import { OrganizationSelection } from "@/features/auth/components/organization-selection";
import {Suspense} from "react";

export default function OrganizationSelectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrganizationSelection />
    </Suspense>
  );
}
