import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  { name: "Samila", avatarUrl: "https://picsum.photos/100/100?random=1", dataAiHint: "woman smiling" },
  { name: "Amaya", avatarUrl: "https://picsum.photos/100/100?random=2", dataAiHint: "woman portrait" },
];

export default function UserSelectionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground mb-2">
          Welcome to Expense Duo
        </h1>
        <p className="text-muted-foreground text-lg">
          Please select your profile to continue.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        {users.map((user) => (
          <Link href={`/dashboard/${user.name}`} key={user.name} passHref>
            <Card className="group transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Login as {user.name}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-transparent group-hover:border-primary/20 transition-colors">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-xl">{user.name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
