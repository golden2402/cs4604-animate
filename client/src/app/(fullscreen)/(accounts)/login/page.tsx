"use client";

import Link from "next/link";

import { FormEvent } from "react";

import { useValidator } from "@/hooks/validation";
import required from "@/hooks/validation/validators/required";

import PasswordField from "@/components/forms/password-field";
import FieldError from "@/components/forms/field-error";

export default function LoginForm() {
  const [errorBuilders, errors] = useValidator({
    username: [required("Username is required!")],
    password: [required("Password is required!")]
  });

  function handleInput(event: FormEvent<HTMLInputElement>) {
    const { name: field, value } = event.currentTarget;
    errorBuilders[field](value);
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-medium">Login</h2>

      <form className="flex flex-col gap-2">
        <input
          className="p-2 w-full fg fg-outline rounded text-sm"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Username"
          onChange={handleInput}
        />
        <FieldError errors={errors.username} />

        <div className="p-2 w-full fg fg-outline rounded text-sm">
          <PasswordField
            name="password"
            onChange={handleInput}
            placeholder="Password"
          />
        </div>
        <FieldError errors={errors.password} />
      </form>

      <button
        className="primary-box rounded p-2"
        onClick={(event) => {
          event.preventDefault();
          // TODO: submit here!
        }}
      >
        Sign in
      </button>

      <div className="text-sm text-center">
        Don&apos;t have an account?&nbsp;
        <Link className="text-blue-500" href="">
          <span>Sign up.</span>
        </Link>
      </div>
    </section>
  );
}