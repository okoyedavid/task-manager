"use client";

import { useSearchParams, useRouter } from "next/navigation";

function useSetUrl() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setParams = (params: Record<string, string> | null | string) => {
    const url = new URL(window.location.href);

    if (params === null) {
      url.search = "";
    } else if (typeof params === "object") {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    } else {
      url.searchParams.set("query", params);
    }

    router.push(
      url.pathname + "?" + url.searchParams.toString(),
      {
        scroll: false,
        shallow: true,
      } as any // Type workaround since `next/navigation` lacks `shallow` in its push options
    );
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  return { searchParams, setParams, navigate };
}

export { useSetUrl };
