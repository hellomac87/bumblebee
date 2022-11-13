import { useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  username: string;
  name: string;
  email: string;
  password: string;
  ["password-confirm"]: string;
  url?: string;
};

function SignUpPage() {
  const { register, handleSubmit } = useForm<FormInputs>();
  const [data, setData] = useState("");

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div>
      <h1>signup</h1>
      <form>
        <input
          {...register("username")}
          placeholder={"username"}
          type={"text"}
        />
        <input {...register("name")} placeholder={"name"} type={"text"} />
        <input
          {...register("email")}
          placeholder={"email@example.com"}
          type={"email"}
        />
        <input
          {...register("password")}
          placeholder={"password"}
          type={"password"}
        />
        <input
          {...register("password-confirm")}
          placeholder={"password"}
          type={"password"}
        />
        <input {...register("url")} placeholder={"url"} />

        <button type={"submit"}>submit</button>
      </form>
    </div>
  );
}

export default SignUpPage;
