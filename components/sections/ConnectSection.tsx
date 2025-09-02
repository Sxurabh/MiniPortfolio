import React from "react"
import Link from "next/link"
import type { SocialLink } from "@/lib/types"

interface ConnectSectionProps {
    socialLinks: SocialLink[];
}

export const ConnectSection = React.forwardRef<HTMLElement, ConnectSectionProps>(({ socialLinks }, ref) => {
  return (
    <section id="connect" ref={ref} className="py-32 opacity-0">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-4xl font-light">Let's Connect</h2>
          <div className="space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Always interested in new opportunities, collaborations, and conversations about technology and design.
            </p>
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