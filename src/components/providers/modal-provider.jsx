"use client"

import { useState, useEffect } from "react"

import UserSettingsModal from "@/components/modals/user-settings-modal"
import CustomUrlModal from "../modals/mylinks/create-custom-url-modal"
import LinkReportModal from "../modals/link-report-modal"
import BanUserModal from "../modals/admin/ban-user-modal"
import UserBanDelete from "../modals/admin/delete-report-modal"
import AdminLinkDeleteModal from "../modals/admin/admin-delete-link-modal"
import DisableUrlModal from "../modals/admin/disable-url-modal"
import LinkDeleteModal from "@/components/modals/mylinks/delete-link-modal"
import SearchLinksModal from "@/components/modals/mylinks/search-links-modal"
import CustomUrlSuccessModal from "@/components/modals/mylinks/create-url-success-modal"
import RenameUrlModal from "@/components/modals/mylinks/rename-url-modal"
import LinkDisableModal from "@/components/modals/mylinks/disable-url-modal"

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
            <UserSettingsModal />
            <CustomUrlModal />
            <LinkReportModal />
            <LinkDeleteModal />
            <BanUserModal />
            <UserBanDelete />
            <AdminLinkDeleteModal />
            <DisableUrlModal />
            <SearchLinksModal />
            <CustomUrlSuccessModal />
            <RenameUrlModal />
            <LinkDisableModal />
        </>
    )
}

export default ModalProvider