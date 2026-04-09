import ProfileForm from "@/components/features/profile/profile-form";
import { getProfile } from "@/lib/api/profile";
import { LogoutButton } from "@/components/features/auth/logout-button";

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile.success || !profile.data) {
    return <div>Erreur lors du chargement du profil</div>;
  }
  const name = profile.data.name || "";
  const parts = name.trim().split(" ");
  const firstName = parts?.[0] || "";
  const lastName = parts?.slice(1).join(" ") || "";

  const userProfile = {
    id: profile.data.id,
    firstName,
    lastName,
    email: profile.data.email,
  };

  return (
    <div>
      <ProfileForm userProfile={userProfile} />
      <LogoutButton />
    </div>
  );
}
