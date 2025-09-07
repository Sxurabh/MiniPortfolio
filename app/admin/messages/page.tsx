// app/admin/messages/page.tsx
import { redirect } from 'next/navigation';
import { checkAdminAuth } from '@/lib/auth-utils';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import Link from 'next/link';
import { Prisma } from '@prisma/client'; // MODIFIED: Changed from 'import type'

// Define a payload that includes the user relation
const messageWithUserPayload = Prisma.validator<Prisma.MessageDefaultArgs>()({
  include: {
    user: {
      select: { name: true, email: true },
    },
  },
});

// Create a type from that payload
type MessageWithUser = Prisma.MessageGetPayload<typeof messageWithUserPayload>;


export default async function AdminMessagesPage() {
  try {
    await checkAdminAuth();
  } catch (error) {
    redirect('/'); // Secure the page: redirect if not admin
  }

  const messages: MessageWithUser[] = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-8 lg-px-16 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-light">Visitor Messages</h1>
        <Link href="/" className="px-3 py-1.5 text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors">
            Back to Portfolio
        </Link>
      </div>
      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>You have no messages yet.</p>
          </div>
        ) : (
          messages.map((message: MessageWithUser) => (
            <div key={message.id} className="p-6 border border-border rounded-lg bg-card shadow-sm">
              <p className="text-foreground leading-relaxed">"{message.content}"</p>
              <div className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                <span>From: <strong>{message.user.name}</strong> ({message.user.email})</span>
                <span className="font-mono">{format(new Date(message.createdAt), "dd MMM yyyy, h:mm a")}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}