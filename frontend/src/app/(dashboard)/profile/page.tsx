import ProfileForm from "@/components/features/profile/profile-form";
import { getProfile } from "@/lib/api/profile";
import { LogoutButton } from "@/components/features/auth/logout-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil",
};

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
    <div className="mt-8 md:mt-12 xl:mt-14.25">
      <div className="flex flex-col gap-y-6 bg-card py-10 px-14.75 rounded-lg w-10/12 xl:w-[1215px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1
              id="profile-title"
              className="text-heading text-lg font-semibold"
            >
              Mon profil
            </h1>
            <p>{name}</p>
          </div>
          <LogoutButton />
        </div>
        <ProfileForm userProfile={userProfile} />
      </div>
    </div>
  );
}
