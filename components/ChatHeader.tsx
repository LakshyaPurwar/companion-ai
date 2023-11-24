"use client";
//Global Imports
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Edit,
  Trash,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
//Local Imports
import { Companion, Message } from "@prisma/client";
import { Button } from "@/components/ui/button";
import BotAvatar from "@/components/BotAvatar";
import { useToast } from "./ui/use-toast";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: Number;
    };
  };
}
const ChatHeader = ({ companion }: ChatHeaderProps) => {

  const router = useRouter();
  const { user } = useUser();
  const {toast} = useToast();

  const onDelete = async ()=>{
    try {

        await axios.delete(`/api/companion/${companion.id}`);

        toast({
            description : "Success."
        });
        router.refresh();
        router.push('/');   
    } catch (error) {
        toast({
            description : "Something went wrong!",
            variant : "destructive"
        });
  }
}

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={companion.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 mr-1" />
              <span>{companion._count.messages + ""}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {companion.userName}
          </p>
        </div>
      </div>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatHeader
