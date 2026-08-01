"use client";

import { useSession, signOut } from "next-auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <UserCard />
    </div>
  );
}

function UserCard() {
  const { data } = useSession({ required: true });

  if (!data?.user) return null;

  return (
    <Card className="w-[400px] flex flex-col items-center gap-4 p-6 shadow-lg">
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar className="w-24 h-24">
          {data.user.image ? (
            <AvatarImage src={data.user.image} alt={data.user.name || "User"} />
          ) : (
            <AvatarFallback>{data.user.name?.[0] || "U"}</AvatarFallback>
          )}
        </Avatar>
        <CardTitle className="text-xl text-center">{data.user.name}</CardTitle>
        <CardDescription className="text-center text-gray-500">
          {data.user.email}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center w-full">
        <Button
          variant="destructive"
          onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
          className="w-full"
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
