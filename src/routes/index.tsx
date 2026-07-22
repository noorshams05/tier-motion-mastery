import { createFileRoute } from "@tanstack/react-router";
import TopTierPage from "@/components/top-tier-site";
import { Toaster } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Top Tier Moving Solutions — Worcester, MA Movers" },
      {
        name: "description",
        content:
          "Premium residential, commercial, and long-distance moving in Worcester, MA. Trained crew, fully insured, 24/7 availability. Call 774-415-6411.",
      },
      { property: "og:title", content: "Top Tier Moving Solutions — Worcester, MA" },
      {
        property: "og:description",
        content:
          "Top service. Top care. Top tier. Premium moving crew serving Worcester and Central Massachusetts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <TopTierPage />
      <Toaster position="top-center" theme="dark" richColors />
    </>
  );
}
