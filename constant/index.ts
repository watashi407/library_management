export const navigationLinks = [
  {
    href: "/library",
    label: "Library",
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/book-requests",
    text: "Borrow Requests",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "number",
  password: "password",
};

export const FIELD_NAMES_BOOK = {
  title: "Book Title",
  description: "Book Description",
  author: "Book Author",
  genre: "Genre",
  rating: "Rating",
  totalCopies: "Total Copies",
  coverUrl: "Book Cover URL",
  coverColor: "Color",
  videoUrl: "Book Video URL",
  summary: "Book Summary",
};

export const FIELD_TYPES_BOOK = {
  title: "text",
  description: "text",
  author: "text",
  genre: "text",
  rating: "number",
  totalCopies: "number",
  coverUrl: "text",
  coverColor: "text",
  videoUrl: "text",
  summary: "text",
};
