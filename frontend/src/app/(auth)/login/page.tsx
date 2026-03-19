import { AuthWrapper } from "@/components/layout/AuthWrapper";
import { LoginForm } from "@/components/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthWrapper
      imageSrc="/images/login-bg.jpg"
      imageAlt="Bureau des fournitures (bloc notes, un métre, etc...) et un clavier"
    >
      <LoginForm />
    </AuthWrapper>
  );
}
