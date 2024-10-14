import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { VscError } from "react-icons/vsc";
import SideBar from "~/components/Sidebar";
import { SignUp } from "~/services/authentication";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password)
    return { error: "'username' and 'password' is required" };
  else if (!username) return { error: "'username' is required" };
  else if (!password) return { error: "'password' is required" };

  try {
    await SignUp(username.toString(), password.toString(), request);
    return redirect("/auth/login");
  } catch (error: any) {
    return { error: error.message };
  }
}

export default function Auth() {
  const actionData = useActionData<{ error?: string }>();
  console.log(actionData?.error);

  return (
    <main className="flex h-screen bg-dark-gray">
      <div className="flex flex-grow relative my-9 mx-[30px]">
        <SideBar />

        <div className="flex flex-col w-full mx-[22px] items-center justify-center">
          <Form method="post" className="flex flex-col gap-4 w-[280px]">
            {actionData?.error && (
              <div
                role="alert"
                className="alert alert-error text-[13px] gap-1 text-center"
              >
                <VscError />
                <span>{actionData.error}</span>
              </div>
            )}
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="
                py-[14px] px-2 rounded-[.6rem] leading-[18px] outline-none
                bg-light-gray text-[13px] text-light-white text-light-text  
                placeholder:text-light-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="
                py-[14px] px-2 rounded-[.6rem] leading-[18px] outline-none
                bg-light-gray text-[13px] text-light-white text-light-text  
                placeholder:text-light-white"
            />
            <button
              type="submit"
              className="btn btn-neutral flex-grow rounded-[.6rem]"
            >
              Signup
            </button>
          </Form>
        </div>
      </div>
    </main>
  );
}
