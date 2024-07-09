import React, { ReactNode } from "react";
import RootLayout from "./RootLayout";
import {
  BarChart4Icon,
  CalendarClock,
  Divide,
  DoorClosed,
  Flag,
  LayoutDashboard,
  Newspaper,
  Pencil,
  PowerOff,
  SquareUserRound,
  User2,
  UserCog2,
  Users2,
} from "lucide-react";
import {
  Button,
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const GuestLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const { user }: any = session || {};
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const menuItems = [
    {
      href: "/admin",
      icon: <LayoutDashboard className="group-hover:text-white" />,
      label: "Dashboard",
    },
    {
      href: "/admin/agenda",
      icon: <CalendarClock className="group-hover:text-white" />,
      label: "Agenda",
    },
    {
      href: "/admin/berita",
      icon: <Newspaper className="group-hover:text-white" />,
      label: "Berita",
    },

    {
      href: "/admin/tps",
      icon: <DoorClosed className="group-hover:text-white" />,
      label: "TPS",
    },
    {
      href: "/admin/partai",
      icon: <Flag className="group-hover:text-white" />,
      label: "Partai",
    },
    {
      href: "/admin/relawan",
      icon: <Users2 className="group-hover:text-white" />,
      label: "Relawan",
    },
    {
      href: "/admin/caleg",
      icon: <SquareUserRound className="group-hover:text-white" />,
      label: "Caleg",
    },
    {
      href: "/admin/saksi",
      icon: <User2 className="group-hover:text-white" />,
      label: "Saksi",
    },
    {
      href: "/admin/admin",
      icon: <UserCog2 className="group-hover:text-white" />,
      label: "Admin",
    },
    {
      href: "/admin/live",
      icon: <BarChart4Icon className="group-hover:text-white" />,
      label: "Live Count",
    },
  ];
  return (
    <RootLayout>
      <div className="min-h-screen flex">
        <nav className="w-72 lg:block hidden flex-none bg-gray-100 border-r-none lg:border-r">
          <div className="bg-gray-50 text-center p-3 text-xl font-bold border-b">
            CaleQ
          </div>
          <div>
            <div className="mt-5 px-3 relative">
              <div>
                <User name={user?.name} description={user?.email} />
                <div className="absolute right-2 top-0">
                  <Button isIconOnly color="primary" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Divider className="mt-2" />
            <ul className="pt-5">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`py-2 group hover:bg-primary px-5 cursor-pointer ${
                    router.pathname === item.href ? "bg-gray-200" : ""
                  }`}
                >
                  <Link href={item.href}>
                    <div className="flex gap-2">
                      <div>{item.icon}</div>
                      <span
                        className={`font-semibold ${
                          router.pathname === item.href
                            ? "text-primary"
                            : "text-gray-500"
                        }  group-hover:text-white`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="py-2 group hover:bg-primary px-5 cursor-pointer">
                <Link href="#" onClick={() => signOut({ redirect: true })}>
                  <div className="flex gap-2">
                    <div>
                      <PowerOff className="group-hover:text-white" />
                    </div>
                    <span
                      className={`font-semibold text-gray-500 group-hover:text-white`}
                    >
                      Keluar
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="flex-1 min-w-0 overflow-auto ">
          <div className="lg:hidden block">
            <Navbar
              isMenuOpen={isMenuOpen}
              onMenuOpenChange={setIsMenuOpen}
              isBordered
            >
              <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
              </NavbarContent>
              <NavbarContent className="sm:hidden " justify="center">
                <NavbarBrand>
                  <p className="font-bold text-inherit">CalegQ</p>
                </NavbarBrand>
              </NavbarContent>

              <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                  <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    size="sm"
                    as={Link}
                    color="danger"
                    href="#"
                    onClick={() => signOut({ redirect: true })}
                    variant="flat"
                  >
                    Keluar
                  </Button>
                </NavbarItem>
              </NavbarContent>
              <NavbarMenu>
                {menuItems.map((item, index) => (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                      className="w-full"
                      color="foreground"
                      href="#"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push(item.href);
                      }}
                      size="lg"
                    >
                      {item?.label}
                    </Link>
                  </NavbarMenuItem>
                ))}
              </NavbarMenu>
            </Navbar>
          </div>

          <div className="max-w-screen-2xl mx-auto p-5">{children}</div>
        </main>
      </div>
    </RootLayout>
  );
};

export default GuestLayout;
