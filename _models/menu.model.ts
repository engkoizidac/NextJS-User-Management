import { prisma } from "../lib/prisma";

export async function getUserMenus(userId: string) {
  const userWithRoles = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      user_role: {
        include: {
          role: {
            include: {
              role_access_privilege: {
                include: {
                  access_privilege: {
                    include: {
                      menu_child: {
                        include: {
                          menuMain: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!userWithRoles) return [];

  const menus = new Map<
    number,
    { id: number; name: string; children: any[] }
  >();

  for (const userRole of userWithRoles.user_role) {
    for (const rap of userRole.role.role_access_privilege) {
      const menuChild = rap.access_privilege.menu_child;
      const menuMain = menuChild.menuMain;

      if (!menus.has(menuMain.id)) {
        menus.set(menuMain.id, {
          id: menuMain.id,
          name: menuMain.name,
          children: [],
        });
      }

      const currentMenu = menus.get(menuMain.id);

      if (
        currentMenu &&
        !currentMenu.children.some((child) => child.id === menuChild.id)
      ) {
        currentMenu.children.push({
          id: menuChild.id,
          name: menuChild.name,
          link: menuChild.link,
          description: menuChild.description,
        });
      }
    }
  }

  //Sort menu by id
  const sortedMenus = Array.from(menus.values())
    .map((main) => ({
      ...main,
      children: main.children.sort((a, b) => a.id - b.id), // sort child menus
    }))
    .sort((a, b) => a.id - b.id); // ✅ sort main menus by id

  return sortedMenus;
}
