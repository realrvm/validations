import { Form } from "@/pages/form";
import { FormFile } from "@/pages/form-file";
import { FormRHF } from "@/pages/form-rhf";
import { FormTypicode } from "@/pages/form-typicode/ui/FormTypicode";

function App() {
  return (
    <main className="w-[1200px] mx-auto pt-5 grid grid-cols-2 gap-y-20">
      <Form />
      <FormFile />
      <FormRHF />
      <FormTypicode />
    </main>
  );
}

export default App;
