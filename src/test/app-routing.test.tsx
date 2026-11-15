import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it.each([
    ["/services/grey-structure", "/services_/$slug", "/services"],
    ["/projects/contemporary-residence", "/projects_/$slug", "/projects"],
  ])("renders %s independently from its overview", (path, detailId, overviewId) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const ids = router.matchRoutes(path).map(match => match.routeId);
    expect(ids.at(-1)).toBe(detailId);
    expect(ids).not.toContain(overviewId);
  });
});
