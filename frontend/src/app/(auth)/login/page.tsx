import { AuthWrapper } from "@/components/layout/auth-wrapper";
import { LoginForm } from "@/components/features/auth/login-form";

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
