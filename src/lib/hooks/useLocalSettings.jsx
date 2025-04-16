import { create } from "zustand"

const useLocalSettings = create((set) => ({
    options : {},
    setOptions: (data) => set({ options: data }),
}))

export { useLocalSettings }