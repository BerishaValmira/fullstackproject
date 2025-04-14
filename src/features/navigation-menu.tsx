'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import Link from "next/link"
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import {  useSession } from "next-auth/react"


export default function NavMenu({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession(); 

  console.log("session", session);

    return (
        <SidebarProvider defaultOpen={true}>
          <SidebarTrigger  className="fixed top-0 left-1 z-50"/>
        <Sidebar>
            <SidebarHeader className="text-xl font-bold px-20 py-4"> </SidebarHeader>
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
       
            {/* ///TODO Add the Log out log in authentication*/}

              {/* <div className="flex flex-col gap-4 mt-4">
                {status === "authenticated" ? (
                  <Button variant="outline" onClick={() => signOut()}>
                    Sign out
                  </Button>
                ) : (
                  <SignInButton/>

                )}
              </div> */}
              </NavigationMenuList>
            </NavigationMenu>
            </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-9">{children}</main>
      </SidebarProvider>

      )
}