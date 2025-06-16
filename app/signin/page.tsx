"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would validate credentials against your backend
    // For demo purposes, we'll check localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (
        user.email === formData.email &&
        user.password === formData.password
      ) {
        // Redirect to the appropriate dashboard based on role
        router.push(`/dashboard/${user.role}`);
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("User not found. Please sign up first.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary underline">
                  Sign Up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export default function SignIn() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData)

//     try {
//       const response = await fetch('/api/auth/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',

//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store token in localStorage or cookies
//         localStorage.setItem('token', data.token);
//         router.push(`/dashboard/${data.role}`);
//       } else {
//         alert(data.message || 'Signin failed');
//       }
//     } catch (error) {
//       console.error('Signin error:', error);
//       alert('An error occurred during signin');
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden">
//       {/* Background Video */}
//       <video
//         autoPlay
//         muted
//         loop
//         className="absolute inset-0 h-full w-full object-cover z-0"
//       >
//         <source src="/videos/bg.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50 z-10" />

//       {/* Sign-in Content */}
//       <div className="relative z-20 flex min-h-screen flex-col items-center justify-center p-4">
//         <div className="max-w-md w-full">
//           <Card className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-2xl text-center">Sign In</CardTitle>
//               <CardDescription className="text-center">
//                 Enter your credentials to access your account
//               </CardDescription>
//             </CardHeader>
//             <form onSubmit={handleSubmit}>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="Enter your password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </CardContent>

//               <CardFooter className="flex flex-col space-y-4">
//                 <Button type="submit" className="w-full">
//                   Sign In
//                 </Button>
//                 <div className="text-center text-sm">
//                   Don&apos;t have an account?{" "}
//                   <Link href="/signup" className="text-primary underline">
//                     Sign Up
//                   </Link>
//                 </div>
//               </CardFooter>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
