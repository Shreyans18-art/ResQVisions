import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Emergency Response System</CardTitle>
            <CardDescription>Sign in or create an account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            A platform for students, teachers, and ambulance services
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
