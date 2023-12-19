import * as React from 'react'
import Link from 'next/link'

import { IconSeparator } from '@/components/ui/icons'
import { SelectLecturesDropdown } from '@/components/select-lectures-dropdown'
import { USCShieldLogo } from '@/components/logos/usc-shield'
import { USCMonogramLogo } from '@/components/logos/usc-monogram'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center h-16">
        <Link
          href="https://usc.edu"
          target="_blank"
          rel="nofollow"
          className="h-8 flex items-center mr-1 text-[#990000] dark:text-white sm:mr-2"
        >
          <div className="relative w-8 h-8">
            <USCShieldLogo className="h-full object-contain" />
          </div>
          <div className="relative h-6 ml-2 hidden sm:block">
            <USCMonogramLogo className="h-full object-contain" />
          </div>
        </Link>
        <div className="flex items-center">
          <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
          <p className="font-bold font-mono text-lg ml-1 sm:ml-2">LING 385</p>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <SelectLecturesDropdown />
      </div>
    </header>
  )
}
