"use client";

import React, { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Github, Loader2, Send } from "lucide-react";
import { format } from "date-fns";

import { useIsAdmin } from "@/hooks/use-is-admin";
import { messageSchema, type MessageFormValues } from "@/lib/schemas";
import { sendMessage } from "@/actions/message";
import { fetchAdminMessages } from "@/actions/fetch-admin-messages";
import type { SocialLink, MessageWithUser } from "@/lib/types";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";


const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.24 44 30.024 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

interface ConnectSectionProps {
    socialLinks: SocialLink[];
}

export const ConnectSection = React.forwardRef<HTMLElement, ConnectSectionProps>(({ socialLinks }, ref) => {
  const { data: session } = useSession();
  const isAdmin = useIsAdmin();
  const [isSigningIn, setIsSigningIn] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);


  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  });

  const handleSignIn = (provider: "github" | "google") => {
    setIsSigningIn(provider);
    signIn(provider);
  };

  const handleSignOut = () => {
    setIsSigningOut(true);
    signOut();
  };

  const onMessageSubmit = (values: MessageFormValues) => {
    startTransition(async () => {
      const result = await sendMessage(values);
      if (result.error) {
        toast.error(result.error);
      }
      if (result.success) {
        toast.success(result.success);
        form.reset();
      }
    });
  };
  
  const watchedContent = form.watch("content", "");

  useEffect(() => {
    if (isModalOpen && isAdmin) {
      setIsFetchingMessages(true);
      fetchAdminMessages()
        .then(setMessages)
        .catch(error => {
          console.error("Failed to fetch messages:", error);
          toast.error("Failed to load messages.");
        })
        .finally(() => setIsFetchingMessages(false));
    }
  }, [isModalOpen, isAdmin]);


  return (
    <section id="connect" ref={ref} className="py-32 opacity-0">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-4xl font-light">Let's Connect</h2>
          <div className="space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Always interested in new opportunities, collaborations, and conversations about technology and design.
            </p>
            {session ? (
              <div className="pt-2">
                  <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                          Signed in as <span className="font-medium text-foreground">{session.user?.name}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <AlertDialogTrigger asChild>
                              <button className="flex items-center justify-center px-3 py-1.5 w-auto text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors">
                                Messages
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-md md:max-w-lg lg:max-w-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Visitor Messages</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Read messages sent by your website visitors.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="max-h-[70vh] py-2">
                                <ScrollArea className="h-full max-h-[60vh] p-4 -mx-4">
                                  {isFetchingMessages ? (
                                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                                      <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                      Loading messages...
                                    </div>
                                  ) : messages.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                      <p>No messages yet.</p>
                                    </div>
                                  ) : (
                                    <div className="space-y-2"> {/* Reduced gap from space-y-4 to space-y-2 */}
                                      {messages.map((message, index) => (
                                        <React.Fragment key={message.id}>
                                          <div className="flex flex-col p-3 border border-border rounded-md bg-card shadow-sm">
                                            <p className="text-sm text-foreground line-clamp-1"> {/* Message content */}
                                              <span className="font-medium pr-1">&quot;{message.content}&quot;</span>
                                            </p>
                                            <div className="flex items-center text-xs text-muted-foreground mt-1 justify-between">
                                                <span className="flex-grow pr-2 truncate">
                                                    From: <span className="font-semibold">{message.user.name}</span> (<span className="text-muted-foreground/80">{message.user.email}</span>)
                                                </span>
                                                <span className="font-mono text-muted-foreground/80 flex-shrink-0">
                                                    {format(new Date(message.createdAt), "dd MMM yyyy, h:mm a")}
                                                </span>
                                            </div>
                                          </div>
                                          {index < messages.length - 1 && <Separator className="my-2" />}
                                        </React.Fragment>
                                      ))}
                                    </div>
                                  )}
                                </ScrollArea>
                              </div>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                        <button
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 w-auto text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                          {isSigningOut ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Signing out...</span>
                            </>
                          ) : (
                            <span>Sign out</span>
                          )}
                        </button>
                      </div>
                  </div>

                  {!isAdmin && (
                    <form onSubmit={form.handleSubmit(onMessageSubmit)} className="w-full mt-4">
                        <div className="flex items-start gap-2">
                            <div className="relative flex-grow">
                                <input
                                    {...form.register("content")}
                                    placeholder="Send a message..."
                                    maxLength={50}
                                    className="w-full input-style pr-12"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                                    {watchedContent.length}/50
                                </span>
                            </div>
                            <button
                                type="submit"
                                disabled={isPending}
                                aria-label="Send message"
                                className="p-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed h-[40px] aspect-square flex items-center justify-center shrink-0"
                            >
                                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 text-muted-foreground" />}
                            </button>
                        </div>
                        {form.formState.errors.content && <p className="form-error">{form.formState.errors.content.message}</p>}
                    </form>
                  )}
              </div>
            ) : (
              <div className="pt-2">
                  <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">Sign in with</span>
                      <div className="flex items-center gap-2">
                          <button
                              onClick={() => handleSignIn("github")}
                              disabled={!!isSigningIn}
                              aria-label="Sign in with GitHub"
                              className="group p-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                          >
                              {isSigningIn === 'github' ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                  <Github className="w-5 h-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                              )}
                          </button>
                          <button
                              onClick={() => handleSignIn("google")}
                              disabled={!!isSigningIn}
                              aria-label="Sign in with Google"
                              className="group p-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                          >
                              {isSigningIn === 'google' ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                  <GoogleIcon />
                              )}
                          </button>
                      </div>
                  </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
              >
                <div className="space-y-2">
                  <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                    {social.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{social.handle}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
});

ConnectSection.displayName = "ConnectSection";