import { getTasks } from "@/src/lib/tasks";

export async function GET() {
  const result = await getTasks();
  return Response.json(result, { status: result.success ? 200 : 500 });
}
