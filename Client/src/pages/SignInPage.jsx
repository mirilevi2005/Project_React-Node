import Link from "next/link"
import { LoginForm } from "@/components/login-form"

const SignInPage=()=> {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Sign in to your account</h1>
            <p className="mt-2 text-gray-600">Access the forum and join the conversation</p>
          </div>
  
          <LoginForm />
  
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <a href="/register" className="font-medium text-gray-900 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default SignInPage;