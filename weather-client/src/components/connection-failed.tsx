import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
export default function ConnectionFailed() {

    const router = useRouter();
  return(<>
      <div className="flex flex-col w-full items-center min-h-screen justify-center gap-4">
        <h1>Could not connect to the server.</h1>
        <Button onClick={()=>router.refresh()}>Retry</Button>
    </div>
  
  </>);
}
