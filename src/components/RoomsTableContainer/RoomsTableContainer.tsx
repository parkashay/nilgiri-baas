"use client";
import React, { useEffect, useState } from "react";
import RoomsTable from "../table/RoomsTable";
import { useSearchParams } from "next/navigation";
import { Room } from "@/types/types";
import { useAtom } from "jotai";
import { refetchAtom } from "@/jotai/atoms";
async function getRooms(page: number) {
  try {
    const res = await fetch(`/api/rooms?page=${page}`, {
      cache: "no-cache",
    });
    const rooms = await res.json();
    if (!rooms.err) return rooms;
    return undefined;
  } catch (err) {
    return undefined;
  }
}
const RoomsTableContainer = () => {
  const [rooms, setRooms] = useState<{ total: number; rooms: Room[] }>({
    total: 0,
    rooms: [],
  });
  const [refetch] = useAtom(refetchAtom)
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  useEffect(() => {
    async function fetchRooms() {
      const res = await getRooms(page);
      setRooms(res);
    }
    fetchRooms();
  }, [page, refetch]);
  return (
    <div>
      <RoomsTable rooms={rooms?.rooms ?? []} total={rooms?.total} />
    </div>
  );
};

export default RoomsTableContainer;
