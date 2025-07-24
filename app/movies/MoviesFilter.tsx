"use client";

import { Plus, Search } from "lucide-react";
import { useSetUrl } from "../hooks/useSeturl";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function MoviesFilter({
  setIsAddModalOpen,
}: {
  setIsAddModalOpen: (type: boolean) => void;
}) {
  const { searchParams, setParams } = useSetUrl();
  const searchQuery = searchParams.get("query") || "";
  const selectedStatus = searchParams.get("status") || "all";
  const type = searchParams.get("type") || "all";

  return (
    <div className="rounded-lg p-4 group  mb-6 has-[input:focus-within]:outline-3 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-green-600 has-[input:focus-within]:shadow-[0_0_10px_4px_rgba(0,255,0,0.9)] bg-black/40 border-green-800  border-2 transition-all duration-300 flex flex-col justify-between lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
      <form className="relative">
        <Input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          className={`w-full pl-10  pr-4 py-2 grow rounded-lg text-white focus:outline-none`}
          onChange={(e) => setParams({ query: e.target.value })}
          Icon={Search}
        />
      </form>

      <div className="flex gap-4 md:flex-row flex-col">
        <select
          value={selectedStatus}
          onChange={(e) => setParams({ status: e.target.value })}
          className="px-6 w-auto py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        >
          <option value={"all"}>Status</option>
          <option value={"watched"}>watched</option>
          <option value={"to-watch"}>To Watch</option>
          <option value={"rewatch"}>rewatch</option>
        </select>
        <select
          value={type}
          onChange={(e) => setParams({ type: e.target.value })}
          className="px-6 w-auto py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        >
          <option value={"all"}>Type</option>
          <option value={"movie"}>Movie</option>
          <option value={"tv"}>Tv Show</option>
        </select>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex gap-2 items-center justify-center py-4"
        >
          <Plus className="w-5 h-5" />
          <span>Add Movie</span>
        </Button>
      </div>
    </div>
  );
}
