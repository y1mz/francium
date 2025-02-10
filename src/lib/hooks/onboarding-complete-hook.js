import { create } from "zustand"

const useOnboarding = create((set) => ({
    isComplete: false,
    setComplete: () => set({ isComplete: true }),
    setDisable: () => set({ isComplete: false })
}))

export { useOnboarding }
