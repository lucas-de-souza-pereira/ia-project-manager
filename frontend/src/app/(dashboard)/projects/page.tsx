import ProjectsView from "@/components/features/projects/projects-view";
import { Project } from "@/types/project";

const mockProjects: Project[] = [
  {
    id: "cmnd2y5es0013lugxp5tmwvw1",
    name: "Dashboard Analytics",
    description:
      "Interface de visualisation de données avec graphiques interactifs et rapports automatisés.",
    createdAt: "2026-03-30T11:03:36.676Z",
    updatedAt: "2026-03-30T11:03:36.676Z",
    ownerId: "cmnd2y4qq0000lugx9cjgz9mv",
    owner: {
      id: "cmnd2y4qq0000lugx9cjgz9mv",
      email: "alice@example.com",
      name: "Alice Martin",
    },
    members: [
      {
        id: "cmnd2y5ex0015lugxb37kmnia",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.682Z",
        userId: "cmnd2y4t80001lugxqp92spbz",
        projectId: "cmnd2y5es0013lugxp5tmwvw1",
        user: {
          id: "cmnd2y4t80001lugxqp92spbz",
          email: "bob@example.com",
          name: "Bob Dupont",
        },
      },
      {
        id: "cmnd2y5f20017lugx5z6wo1pi",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.687Z",
        userId: "cmnd2y5090004lugxasyrey1d",
        projectId: "cmnd2y5es0013lugxp5tmwvw1",
        user: {
          id: "cmnd2y5090004lugxasyrey1d",
          email: "emma@example.com",
          name: "Emma Rousseau",
        },
      },
      {
        id: "cmnd2y5fa0019lugx027ia22r",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.695Z",
        userId: "cmnd2y57k0007lugx59lfw5rw",
        projectId: "cmnd2y5es0013lugxp5tmwvw1",
        user: {
          id: "cmnd2y57k0007lugx59lfw5rw",
          email: "henri@example.com",
          name: "Henri Laurent",
        },
      },
    ],
    _count: { tasks: 3 },
    userRole: "ADMIN",
  },
  {
    id: "cmnd2y5eb000xlugxsbzqegj5",
    name: "Plateforme de Formation",
    description:
      "Système de gestion de cours en ligne avec vidéos, quiz et suivi des progrès.",
    createdAt: "2026-03-30T11:03:36.660Z",
    updatedAt: "2026-03-30T11:03:36.660Z",
    ownerId: "cmnd2y4qq0000lugx9cjgz9mv",
    owner: {
      id: "cmnd2y4qq0000lugx9cjgz9mv",
      email: "alice@example.com",
      name: "Alice Martin",
    },
    members: [
      {
        id: "cmnd2y5eh000zlugxdq1yqbdo",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.665Z",
        userId: "cmnd2y5cc0009lugx9aygz2mk",
        projectId: "cmnd2y5eb000xlugxsbzqegj5",
        user: {
          id: "cmnd2y5cc0009lugx9aygz2mk",
          email: "jacques@example.com",
          name: "Jacques Durand",
        },
      },
      {
        id: "cmnd2y5el0011lugxq9uguvd7",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.670Z",
        userId: "cmnd2y4qq0000lugx9cjgz9mv",
        projectId: "cmnd2y5eb000xlugxsbzqegj5",
        user: {
          id: "cmnd2y4qq0000lugx9cjgz9mv",
          email: "alice@example.com",
          name: "Alice Martin",
        },
      },
    ],
    _count: {
      tasks: 3,
    },
    userRole: "ADMIN",
  },
  {
    id: "cmnd2y5du000rlugxve3lq9p2",
    name: "Application Mobile Fitness",
    description:
      "App mobile pour le suivi d'entraînement, nutrition et objectifs fitness personnalisés.",
    createdAt: "2026-03-30T11:03:36.642Z",
    updatedAt: "2026-03-30T11:03:36.642Z",
    ownerId: "cmnd2y4qq0000lugx9cjgz9mv",
    owner: {
      id: "cmnd2y4qq0000lugx9cjgz9mv",
      email: "alice@example.com",
      name: "Alice Martin",
    },
    members: [
      {
        id: "cmnd2y5e0000tlugxjy19qyck",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.649Z",
        userId: "cmnd2y57k0007lugx59lfw5rw",
        projectId: "cmnd2y5du000rlugxve3lq9p2",
        user: {
          id: "cmnd2y57k0007lugx59lfw5rw",
          email: "henri@example.com",
          name: "Henri Laurent",
        },
      },
      {
        id: "cmnd2y5e5000vlugxgls7v8c6",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.653Z",
        userId: "cmnd2y59y0008lugxuo4f4tt2",
        projectId: "cmnd2y5du000rlugxve3lq9p2",
        user: {
          id: "cmnd2y59y0008lugxuo4f4tt2",
          email: "isabelle@example.com",
          name: "Isabelle Petit",
        },
      },
    ],
    _count: {
      tasks: 3,
    },
    userRole: "ADMIN",
  },
  {
    id: "cmnd2y5d6000jlugx7uesyldl",
    name: "Système de Gestion RH",
    description:
      "Application web pour la gestion des ressources humaines : congés, évaluations, planning.",
    createdAt: "2026-03-30T11:03:36.618Z",
    updatedAt: "2026-03-30T11:03:36.618Z",
    ownerId: "cmnd2y4qq0000lugx9cjgz9mv",
    owner: {
      id: "cmnd2y4qq0000lugx9cjgz9mv",
      email: "alice@example.com",
      name: "Alice Martin",
    },
    members: [
      {
        id: "cmnd2y5dc000llugxrwbnt7ax",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.624Z",
        userId: "cmnd2y5090004lugxasyrey1d",
        projectId: "cmnd2y5d6000jlugx7uesyldl",
        user: {
          id: "cmnd2y5090004lugxasyrey1d",
          email: "emma@example.com",
          name: "Emma Rousseau",
        },
      },
      {
        id: "cmnd2y5dh000nlugxqr4dx4ok",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.629Z",
        userId: "cmnd2y52r0005lugxbgf8mbi8",
        projectId: "cmnd2y5d6000jlugx7uesyldl",
        user: {
          id: "cmnd2y52r0005lugxbgf8mbi8",
          email: "francois@example.com",
          name: "François Dubois",
        },
      },
      {
        id: "cmnd2y5dn000plugx8k0qu8r7",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.636Z",
        userId: "cmnd2y5540006lugx9rsfxmbp",
        projectId: "cmnd2y5d6000jlugx7uesyldl",
        user: {
          id: "cmnd2y5540006lugx9rsfxmbp",
          email: "gabrielle@example.com",
          name: "Gabrielle Simon",
        },
      },
    ],
    _count: {
      tasks: 4,
    },
    userRole: "ADMIN",
  },
  {
    id: "cmnd2y5cj000blugxvibwjma4",
    name: "Application E-commerce",
    description:
      "Développement d'une plateforme de vente en ligne moderne avec paiement sécurisé et gestion des stocks.",
    createdAt: "2026-03-30T11:03:36.594Z",
    updatedAt: "2026-03-30T11:03:36.594Z",
    ownerId: "cmnd2y4qq0000lugx9cjgz9mv",
    owner: {
      id: "cmnd2y4qq0000lugx9cjgz9mv",
      email: "alice@example.com",
      name: "Alice Martin",
    },
    members: [
      {
        id: "cmnd2y5co000dlugxavkvx7tp",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.601Z",
        userId: "cmnd2y4t80001lugxqp92spbz",
        projectId: "cmnd2y5cj000blugxvibwjma4",
        user: {
          id: "cmnd2y4t80001lugxqp92spbz",
          email: "bob@example.com",
          name: "Bob Dupont",
        },
      },
      {
        id: "cmnd2y5cu000flugx1eejdg04",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.607Z",
        userId: "cmnd2y4vj0002lugxrfzw0h88",
        projectId: "cmnd2y5cj000blugxvibwjma4",
        user: {
          id: "cmnd2y4vj0002lugxrfzw0h88",
          email: "caroline@example.com",
          name: "Caroline Leroy",
        },
      },
      {
        id: "cmnd2y5d0000hlugx0qm92laq",
        role: "CONTRIBUTOR",
        joinedAt: "2026-03-30T11:03:36.612Z",
        userId: "cmnd2y4xw0003lugxla75tmg9",
        projectId: "cmnd2y5cj000blugxvibwjma4",
        user: {
          id: "cmnd2y4xw0003lugxla75tmg9",
          email: "david@example.com",
          name: "David Moreau",
        },
      },
    ],
    _count: {
      tasks: 4,
    },
    userRole: "ADMIN",
  },
];

export default function ProjectPage() {
  return (
    <div>
      <ProjectsView projects={mockProjects} />
    </div>
  );
}
