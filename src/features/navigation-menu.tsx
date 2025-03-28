'use client'

import { cn } from "~/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import Link from "next/link"
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "~/components/ui/sidebar"

export default function NavMenu({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
        <Sidebar>
            <SidebarHeader className="text-xl font-bold px-0 py-2"> </SidebarHeader>
            <SidebarContent className="py-4">
            <NavigationMenu className="py-80 px-4">
              <NavigationMenuList >
                <div className="-mt-83">
              <NavigationMenuItem >
                <Link href="/entity1" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Author Menu
                </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem >
                <Link href="/entity2" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Publisher Menu
                </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem >
                <Link href="/SupportContact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Suport Contact
                </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              </div>
              <div>
            {/* ///TODO Add the Log out log in authentication*/}
              <NavigationMenuItem >
                <Link href="/entityLogOut" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 Log Out 
                </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              </div>
              </NavigationMenuList>
            </NavigationMenu>
            </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-9">{children}</main>
      </SidebarProvider>

      )
}