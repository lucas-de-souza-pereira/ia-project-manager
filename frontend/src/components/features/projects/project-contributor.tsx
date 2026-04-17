// Composants shared
import { UserChip } from "@/components/shared/user-chip";

// types et actions
import { type User } from "@/types/user";
import { type ProjectWithTasks } from "@/types/project";

interface ProjectContributorProps {
  project: ProjectWithTasks;
  currentUser: User;
  allTeamMembers: { member: User; role: string }[];
  otherTeamMembers: { member: User; role: string }[];
}

export default function ProjectContributor({
  project,
  currentUser,
  allTeamMembers,
  otherTeamMembers,
}: ProjectContributorProps) {
  return (
    <section
      className="flex flex-col lg:flex-row py-5 px-12.5 lg:items-center justify-between gap-y-4 bg-[#F3F4F6] rounded-lg"
      aria-labelledby="project-contributors"
    >
      <div className="flex items-center gap-x-2">
        <h2 id="project-contributors" className="text-lg font-semibold">
          Contributeurs
        </h2>
        <p className="text-sm text-muted-foreground">
          {allTeamMembers.length} personnes
        </p>
      </div>
      <ul
        className="flex flex-col md:flex-row items-start md:items-center gap-y-2 md:gap-x-2 flex-wrap"
        aria-label="Listes des contributeurs du projet"
      >
        <li>
          <UserChip
            user={currentUser}
            currentUserId={currentUser.id}
            ownerId={project.owner.id}
            variant="role"
          />
        </li>

        {otherTeamMembers.map((otherTeamMember) => (
          <li
            key={otherTeamMember.member.id}
            className="flex items-center gap-x-2"
          >
            <UserChip
              user={otherTeamMember.member}
              currentUserId={currentUser.id}
              ownerId={project.owner.id}
              variant="name"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
