"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"

import { useForm } from "react-hook-form"
import { useOnboarding } from "@/lib/hooks/onboarding-complete-hook"
import { useToast } from "@/lib/hooks/use-toast"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"

function OnboardingUserNameCard() {
  const [loading, setLoading] = useState(false)
  const { setComplete } = useOnboarding()
  const { register, watch, handleSubmit, formState : { errors }, setError } = useForm()
  const { toast } = useToast()
  const { data: session } = useSession()

  const onSubmit = async (data) => {
    const userId = session.user.id
    const { username } = data

    const postData = {
      id: userId,
      newUsername: username
    }
    setLoading(true)
    // check for username
    const checkUsername = async (name) => {
      const request = await fetch("/api/account/check/username", {
        method: "POST",
        body: JSON.stringify({
          userName: name
        })
      })

      if (request.status === 201) {
        setError("username", { type: "custom", message: "Username already taken" })
        return false
      } else {
        return true
      }
    }

    try {

     const checkU = await checkUsername(username)

      if (!checkU) {
        return
      } else  {
        const response = await fetch("/api/account/onboarding", {
          method: "PATCH",
          body: JSON.stringify(postData)
        })

        if (!response.ok) {
          throw new Error("Internal Server error")
        }

        if (response.ok) {
          setComplete()
          toast({
            title: "Success!"
          })
        }
      }

    } catch (e) {
      toast({
        title: "Something went wrong",
        description: "Server had an error processing request. Please try again",
        variant: "destructive"
      })
      console.error("[USERNAME_UPDATE]", e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="username">
          Username
          <div className="flex w-full gap-2">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Your cool username"
                {...register("username", {
                  required: true, maxLength: {
                    value: 15, message: "Username can't exceed 15 characters"
                  }, minLength: {
                    value: 3, message: "Username must be at least 3 characters"
                  }
                })}
                className={cn(errors.username && "border-red-600 ring-red-500")}
              />
              {errors.username && (<p className="text-red-600">{errors.username.message}</p>)}
            </div>
            <Button disabled={loading}>
              Apply
            </Button>
          </div>
        </Label>
      </form>
    </div>
  )
}

export default OnboardingUserNameCard
