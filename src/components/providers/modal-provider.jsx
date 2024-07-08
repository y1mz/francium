"use client"

import { useState, useEffect } from "react"

import CookiesModal from "@/components/modals/cookie-modal"
import LoginModal from "@/components/modals/login-modal"
import LoginReasonModal from "../modals/delete-link-modal"
import UserSettingsModal from "@/components/modals/user-settings-modal"
import CustomUrlModal from "../modals/create-custom-url-modal"
import LinkReportModal from "../modals/link-report-modal"
import BanUserModal from "../modals/ban-user-modal"

function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null
    }
    return (
        <>
            <CookiesModal />
            <LoginModal />
            <LoginReasonModal />
            <UserSettingsModal />
            <CustomUrlModal />
            <LinkReportModal />
            <BanUserModal />
        </>
    )
}

export default ModalProvider