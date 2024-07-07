import React, { ReactNode } from "react";
import RootLayout from "./RootLayout";
import {
  App,
  Icon,
  KonstaProvider,
  Page,
  Tabbar,
  TabbarLink,
} from "konsta/react";
import {
  Archive,
  CalendarClock,
  FilePenLine,
  FilePenLineIcon,
  Fingerprint,
  Home,
  LayoutDashboard,
  Newspaper,
  PcCase,
  PencilRuler,
  User2,
  UserCircle,
} from "lucide-react";
import { Badge } from "@nextui-org/react";
import { useRouter } from "next/router";
const MobileLayout = ({
  children,
  tabbar = true,
}: {
  children: ReactNode;
  tabbar?: Boolean | true;
}) => {
  const router = useRouter();
  const routeCurrent = "aa";
  const tabs = [
    {
      access: true,
      route: "/mobile/",
      routeRef: "m.blog.page",
      iosIcon: <LayoutDashboard className="w-7 h-7" />,
      materialIcon: <LayoutDashboard className="w-6 h-6" />,
      badgeColor: "bg-green-500",
    },
    {
      access: true,

      route: "/mobile/",
      routeRef: "m.paraf.page",

      iosIcon: <CalendarClock className="w-7 h-7" />,
      materialIcon: <CalendarClock className="w-6 h-6" />,
      badgeColor: "bg-red-500",
    },
    {
      access: true,
      counting: 1,
      route: "/mobile/tabulasi",
      routeRef: "m.overview.page",
      iosIcon: <FilePenLineIcon className="w-7 h-7" />,
      materialIcon: <Home className="w-6 h-6" />,
      badgeColor: "bg-green-500",
    },
    {
      access: true,

      route: "/mobile/",
      routeRef: "m.overview.page",
      iosIcon: <Newspaper className="w-7 h-7" />,
      materialIcon: <Newspaper className="w-6 h-6" />,
      badgeColor: "bg-green-500",
    },
    {
      access: true,
      route: "/mobile/profile",
      routeRef: "m.profile.page",
      iosIcon: <UserCircle className="w-7 h-7" />,
      materialIcon: <UserCircle className="w-6 h-6" />,
      badgeColor: "bg-green-500",
    },
  ];

  return (
    <RootLayout>
      <App theme="ios">
        <Page>
          <div className="pb-20">
          {children}
          </div>
          {tabbar && (
            <Tabbar
              className="left-0 bottom-0 fixed"
              labels={true}
              icons={true}
            >
              {tabs.map((tab, index) => {
                if (tab?.access) {
                  return (
                    <TabbarLink
                      active={tab?.routeRef === routeCurrent}
                      key={index}
                      onClick={() => router.push(tab.route)}
                      icon={
                        tab?.counting ? (
                          <Badge
                            className="mt-1 "
                            content={tab?.counting}
                            color="danger"
                          >
                            <Icon
                              ios={tab.iosIcon}
                              material={tab.materialIcon}
                              badgeColors={{
                                bg: tab.badgeColor,
                              }}
                            />
                          </Badge>
                        ) : (
                          <Icon
                            ios={tab.iosIcon}
                            material={tab.materialIcon}
                            badgeColors={{
                              bg: tab.badgeColor,
                            }}
                          />
                        )
                      }
                    />
                  );
                }
              })}
            </Tabbar>
          )}
        </Page>
      </App>
    </RootLayout>
  );
};

export default MobileLayout;
