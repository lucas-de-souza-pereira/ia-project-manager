import { RegisterForm } from "@/components/features/auth/RegisterForm";
import { AuthWrapper } from "@/components/layout/AuthWrapper";

export default function RegisterPage() {
  return (
    <AuthWrapper
      imageSrc="/images/register-bg.jpg"
      imageAlt="Bureau des fournitures (stylos, agrapheuses, un métre, etc...) et un ordinateur"
    >
      <RegisterForm />
    </AuthWrapper>
  );
}
