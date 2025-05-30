import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import getNotAssignedAccess from "@/lib/data-access/access-privilege";
import { getRoleById } from "@/lib/data-access/role";
import { PlusCircle, StepBack } from "lucide-react";

export default async function AccessPrivilegesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const roleId = Number((await params).slug);
  const Privileges = await getNotAssignedAccess(roleId);

  return (
    <div>
      <ul>
        {Privileges.map((items) => (
          <li key={items.id}>{items.menu_child.menuMain.name}</li>
        ))}
      </ul>
    </div>
  );
}
