'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

export default function AnnouncementManagerTab({ currAnnouncement }) {
    const handleDelete = async (id) => {
        const response = await fetch(`/api/admin/announcement/delete`, {
            method: "DELETE",
            body: JSON.stringify({
                id: id
            })
        })

        if (response.ok) {
            window.location.reload()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("/api/admin/announcement/create", {
            method: "POST",
            body: JSON.stringify({
                title: e?.target.title.value,
                description: e?.target.content.value,
                url: e.target.url.value,
                expDate: e?.target.expirationDate.value,
            })
        })
        if (response.ok) {
            window.location.reload()
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Current Announcement</CardTitle>
                </CardHeader>
                <CardContent>
                    {currAnnouncement ? (
                        <>
                            <h2 className="text-xl font-bold mb-1">{currAnnouncement.title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-1">{currAnnouncement.description}</p>
                            <a className="text-sm text-gray-500 hover:underline" href={currAnnouncement.url}>{currAnnouncement.url}</a>

                            <p className="text-sm text-gray-500">Expires
                                on: {new Date(currAnnouncement.expiresAt).toISOString()}</p>
                        </>
                    ) : (
                        <p className="text-gray-600">No active announcement</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button variant="destructive" disabled={!currAnnouncement} onClick={() => handleDelete(currAnnouncement.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Announcement
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Announcement</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter announcement title"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Enter announcement content"
                                required
                                rows={2}
                            />
                        </div>
                        <div className="flex w-full gap-2">
                            <div className="flex-grow">
                                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                                    Url
                                </label>
                                <Input
                                    id="url"
                                    name="url"
                                    placeholder="Enter Announcement url"
                                />
                            </div>
                            <div>
                                <label htmlFor="expirationDate"
                                       className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiration Date
                                </label>
                                <Input
                                    type="date"
                                    id="expirationDate"
                                    name="expirationDate"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="mt-4 w-full">Update Announcement</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}