import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Every admin-managed page is request-time dynamic. Disabling the Next
  // incremental cache avoids needing an R2 bucket on the free plan.
  incrementalCache: "dummy",
  tagCache: "dummy",
  queue: "direct",
});
