"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bell, Send, LogOut, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TeacherDashboard() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [notifications, setNotifications] = useState<string[]>([])
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    // Check if user is logged in and is a teacher
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.role !== "teacher") {
        router.push("/signin")
      } else {
        setUser(parsedUser)
      }
    } else {
      router.push("/signin")
    }
  }, [router])

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send this message to your backend
      console.log("Message sent:", message)
      setMessage("")
      // Simulate receiving a response
      setTimeout(() => {
        setNotifications((prev) => [...prev, "Your message has been received. Help is on the way."])
      }, 1000)
    }
  }

  const handleEmergencyAlert = () => {
    // In a real app, you would send an emergency alert to your backend
    console.log("Emergency alert triggered")
    setNotifications((prev) => [...prev, "Emergency alert sent! Help is on the way."])
  }

  const handleMedicalEmergency = () => {
    // In a real app, you would send a medical emergency alert to your backend
    console.log("Medical emergency alert triggered")
    setNotifications((prev) => [...prev, "Medical emergency alert sent! Ambulance has been notified."])
  }

  const handleLogout = () => {
    // In a real app, you would clear the session
    localStorage.removeItem("user")
    router.push("/signin")
  }

  if (!user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Security Guard Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Alerts</CardTitle>
              <CardDescription>Press the appropriate button in case of emergency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleEmergencyAlert}>
                <Bell className="mr-2 h-4 w-4" />
                Security Emergency
              </Button>

              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white" onClick={handleMedicalEmergency}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Medical Emergency
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
              <CardDescription>Send a message to describe the situation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent alerts and messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <Alert key={index}>
                    <Bell className="h-4 w-4" />
                    <AlertTitle>Notification</AlertTitle>
                    <AlertDescription>{notification}</AlertDescription>
                  </Alert>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">No notifications yet</div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
