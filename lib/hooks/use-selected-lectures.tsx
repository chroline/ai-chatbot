'use client'

import * as React from 'react'

type SelectedLecturesContext = [
  number[],
  React.Dispatch<React.SetStateAction<number[]>>
]

const SelectedLecturesContext = React.createContext<
  SelectedLecturesContext | undefined
>(undefined)

export function useSelectedLectures() {
  const context = React.useContext(SelectedLecturesContext)
  if (!context) {
    throw new Error(
      'useSelectedLectures must be used within a SelectedLecturesProvider'
    )
  }
  return context
}

interface SelectedLecturesProviderProps {
  children: React.ReactNode
}

export function SelectedLecturesProvider({
  children
}: SelectedLecturesProviderProps) {
  const state = React.useState<number[]>(
    Array.from({ length: 19 }, (_, index) => index)
  )

  return (
    <SelectedLecturesContext.Provider value={state}>
      {children}
    </SelectedLecturesContext.Provider>
  )
}
