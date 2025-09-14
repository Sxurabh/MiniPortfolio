// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/components/features/Connect/MessageForm.tsx
"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { messageSchema, type MessageFormValues } from "@/lib/schemas";
import { sendMessage } from "@/actions/message";

export function MessageForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  });

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

  return (
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
  );
}