// sxurabh/miniportfolio/MiniPortfolio-8fc6179eb320b0f649cdabe6a6215686109d4f55/components/features/Connect/ConnectSection.tsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Github, Loader2 } from "lucide-react"
import type { SocialLink } from "@/lib/types"

interface ConnectSectionProps {
    socialLinks: SocialLink[];
}

export const ConnectSection = React.forwardRef<HTMLElement, ConnectSectionProps>(({ socialLinks }, ref) => {
  const { data: session } = useSession()
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignIn = () => {
    setIsSigningIn(true);
    signIn("github");
  };

  const handleSignOut = () => {
    setIsSigningOut(true);
    signOut();
  };

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
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 w-[120px] text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
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
            ) : (
                <div className="pt-2">
                    <button
                        onClick={handleSignIn}
                        disabled={isSigningIn}
                        className="group flex items-center justify-center gap-2 px-4 py-2 w-[190px] border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 text-foreground hover:text-foreground/90 text-sm hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSigningIn ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <Github className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                          <span>Sign in with GitHub</span>
                        </>
                      )}
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