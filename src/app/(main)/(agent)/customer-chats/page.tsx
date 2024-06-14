import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightToLine,
  ChevronLeft,
  ChevronRight,
  Home,
  LineChart,
  Mail,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  User,
  Users,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Separator } from "@/components/ui/Separator";

function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
      <div className="flex flex-col sm:gap-4 sm:py-2 sm:pl-0">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-3">
              <Alert>
                <AlertTitle>
                  <div className="font-lg">Profile Information</div>
                </AlertTitle>

                <div className="font-md">
                  <span className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />{" "}
                    josafat anderson
                  </span>
                </div>
                <div className="font-md">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />{" "}
                    josafatanderson@email.com
                  </span>
                </div>
              </Alert>
              <Card x-chunk="Page-07-chunk-1 py-2">
                <CardContent className="py-6 flex flex-col gap-4">
                  <div className="flex items-start gap-2.5">
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          Bonnie Green
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          11:46
                        </span>
                      </div>
                      <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                        That{"'"}s awesome. I think our users will really
                        appreciate the improvements.
                      </p>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Delivered
                      </span>
                    </div>
                  </div>

                  <div className="ml-auto flex items-start gap-2.5">
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl dark:bg-gray-700">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          Josafat Anderson Yonain
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          11:46
                        </span>
                      </div>
                      <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                        That{"'"}s awesome. I think our users will really
                        appreciate the improvements.
                      </p>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Delivered
                      </span>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="justify-between py-4 gap-2">
                  <Input type="text" placeholder="Please Reply To Customer" />
                  <Button
                    size="sm"
                    variant="default"
                    className="gap-1 dark:text-white"
                  >
                    Send <ArrowRightToLine className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-3">
              <Card className="overflow-hidden" x-chunk="Page-07-chunk-4">
                <CardHeader>
                  <CardTitle>AI Helper</CardTitle>
                  <CardDescription>
                    We{"'"}re here to help you deal with customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Image
                      alt="Ad Or Company Logo"
                      className="w-full rounded-md object-fit"
                      height="100"
                      src="/banner.png"
                      width="300"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <button>BUTTON</button>
                      <button>BUTTON</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
