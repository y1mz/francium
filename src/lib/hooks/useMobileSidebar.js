import { create } from "zustand"

const useMobileSidebar = create((set) => ({
    isOpen: false,
    isMobile: false,
    setOpen: (bool) => set({ isOpen: bool }),
    setClose: () => set({ isOpen: false }),
    setMobile: (bool) => set({ isMobile: bool })
}))

export { useMobileSidebar }
