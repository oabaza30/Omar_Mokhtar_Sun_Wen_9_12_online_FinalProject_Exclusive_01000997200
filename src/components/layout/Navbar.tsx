"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const links = [
  { path: "/", label: "Home" },
  { path: "/cantact", label: "Cantact" },
  { path: "/products", label: "Products" },
  { path: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { cartDetails } = useCart();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="w-1/3">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Exclusive
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="w-1/3 hidden lg:flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-6">
                {links.map((link, idx) => (
                  <NavigationMenuItem key={idx}>
                    <NavigationMenuLink
                      href={link.path}
                      className={cn(
                        "text-center text-base font-medium hover:underline transition",
                        pathname === link.path && "underline underline-offset-4"
                      )}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Icons */}
          <div className="w-1/3 hidden lg:flex items-center justify-end gap-6">
            {status === "loading" ? (
              <span>Loading...</span>
            ) : status === "unauthenticated" ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
                <Link href="/wishlist" className="relative">
                  <Heart className="size-6" />
                </Link>
                <Link href="/cart" className="relative">
                  <ShoppingCart className="size-6" />
                  {cartDetails && (
                    <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 text-xs font-semibold" variant="destructive">
                      {cartDetails.data.products.reduce((total, product) => total + product.count, 0)}
                    </Badge>
                  )}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer">
                    <User className="size-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile Sheet Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      Exclusive
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4 gap-6">
                {links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    className={cn("font-medium", pathname === link.path && "underline")}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="flex flex-col gap-4 mt-6">
                  {status === "loading" ? (
                    <span>Loading...</span>
                  ) : status === "unauthenticated" ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link className="relative" href="/wishlist">
                        <Badge className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 text-xs font-semibold" variant="destructive">
                          0
                        </Badge>
                        <Heart className="size-6" />
                      </Link>
                      <Link className="relative" href="/cart">
                        {cartDetails && (
                          <Badge className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 text-xs font-semibold" variant="destructive">
                            {cartDetails?.numOfCartItems}
                          </Badge>
                        )}
                        <ShoppingCart className="size-6" />
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                          <User className="size-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
                            Sign Out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
