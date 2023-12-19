'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import * as React from 'react'
import { useSelectedLectures } from '@/lib/hooks/use-selected-lectures'

export function SelectLecturesDropdown() {
  const [selectedLectures, setSelectedLectures] = useSelectedLectures()

  function toggleLecture(i: number) {
    if (selectedLectures.includes(i)) {
      setSelectedLectures([...selectedLectures].filter(v => v !== i))
    } else {
      setSelectedLectures([...selectedLectures, i])
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="shadow-none">
          Querying{' '}
          {selectedLectures.length === 19 ? 'all' : selectedLectures.length}{' '}
          lecture{selectedLectures.length !== 1 ? 's' : ''}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 max-h-96 overflow-auto p-4 space-y-4"
      >
        <div className="flex">
          <Button
            size="sm"
            variant="link"
            className="w-full px-0"
            onClick={() =>
              setSelectedLectures(
                Array.from({ length: 19 }, (_, index) => index)
              )
            }
          >
            Select All
          </Button>
          <Button
            size="sm"
            variant="link"
            className="w-full px-0"
            onClick={() => setSelectedLectures([])}
          >
            De-select All
          </Button>
        </div>
        {Array.from({ length: 19 }, (_, index) => index).map(i => (
          <div key={i} className="flex items-center space-x-2">
            <Checkbox
              id={'lecture-' + i}
              checked={selectedLectures.includes(i)}
              onClick={() => toggleLecture(i)}
            />
            <label
              htmlFor={'lecture-' + i}
              className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Lecture {i + 1}
            </label>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
