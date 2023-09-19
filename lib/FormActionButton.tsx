import { Button } from "@/components/ui/button"
export default function FormActionButton({path, text}: {path: string, text: string}) {
  return (
    <form action={path} method="post">
      <Button variant={"secondary"}>
        {text}
      </Button>
    </form>
  )
}
