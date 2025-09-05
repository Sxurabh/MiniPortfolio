"use client"

import React from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Github } from "lucide-react"
import type { SocialLink } from "@/lib/types"

interface ConnectSectionProps {
    socialLinks: SocialLink[];
}

export const ConnectSection = React.forwardRef<HTMLElement, ConnectSectionProps>(({ socialLinks }, ref) => {
  const { data: session } = useSession()

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
                <div className="flex items-center gap-4 pt-2">
                    <p className="text-sm text-muted-foreground">
                        Signed in as <span className="font-medium text-foreground">{session.user?.name}</span>
                    </p>
                    <button
                        onClick={() => signOut()}
                        className="px-3 py-1.5 text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors"
                    >
                        Sign out
                    </button>
                </div>
            ) : (
                <div className="pt-2">
                    <button
                        onClick={() => signIn("github")}
                        className="group flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 text-foreground hover:text-foreground/90 text-sm"
                    >
                        <Github className="w-4 h-4" />
                        <span>Sign in with GitHub</span>
                    </button>
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
