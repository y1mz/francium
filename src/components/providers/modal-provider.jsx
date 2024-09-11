"use client"

import { useState, useEffect } from "react"

import CookiesModal from "@/components/modals/cookie-modal"
import LoginModal from "@/components/modals/login-modal"
import LoginReasonModal from "../modals/login-reason-modal"
import UserSettingsModal from "@/components/modals/user-settings-modal"
import CustomUrlModal from "../modals/create-custom-url-modal"
import LinkReportModal from "../modals/link-report-modal"
import BanUserModal from "../modals/admin/ban-user-modal"
import UserBanDelete from "../modals/admin/delete-report-modal"
import AdminLinkDeleteModal from "../modals/admin/admin-delete-link-modal"
import DisableUrlModal from "../modals/admin/disable-url-modal"
import LinkDeleteModal from "@/components/modals/delete-link-modal";
import SearchLinksModal from "@/components/modals/search-links-modal";

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
            <LinkDeleteModal />
            <BanUserModal />
            <UserBanDelete />
            <AdminLinkDeleteModal />
            <DisableUrlModal />
            <SearchLinksModal />
        </>
    )
}

export default ModalProvider