import { create } from "zustand"

const useMobileSidebar = create((set) => ({
    isOpen: false,
    setOpen: (bool) => set({ isOpen: bool }),
    setClose: () => set({ isOpen: false })
}))

export { useMobileSidebar }