export default async function AccessPrivilegesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      <div className="container mx-auto py-8  ">
        <div className="font-bold text-2xl">My Settings</div>
        <div className="text-blue-500">User personal settings</div>
      </div>
      <div className="container mx-auto">
        <div className="border-t border-gray-300 "></div>
      </div>
    </div>
  );
}
