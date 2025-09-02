import React from "react"

export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 w-full">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">© 2025 Saurabh Kirve. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}