import { deleteTask, getTask } from "@/src/lib/tasks";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const result = await getTask(id);
  return Response.json(result, { status: result.success ? 200 : 404 });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const formData = new FormData();
  formData.set("id", id);
  await deleteTask(formData);
  return Response.json({ success: true });
}
