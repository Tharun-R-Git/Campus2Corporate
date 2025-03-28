import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Campus2Corporate</h1>
      <LoginForm />
    </main>
  )
}

