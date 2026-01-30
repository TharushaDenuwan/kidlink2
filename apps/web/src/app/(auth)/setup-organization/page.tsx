// import { AgentSetupForm } from "@/features/auth/components/agent-setup-form";

// export default function AgentSetupPage() {
//   return <AgentSetupForm />;
// }


import { Suspense } from "react";
import { AgentSetupForm } from "@/features/auth/components/agent-setup-form";

export default function AgentSetupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AgentSetupForm />
    </Suspense>
  );
}
