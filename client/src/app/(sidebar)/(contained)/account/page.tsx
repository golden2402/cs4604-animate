"use client";

import { FormEvent } from "react";

import { useValidator } from "@/hooks/validation";
import { max } from "@/hooks/validation/validators/range";

import Field from "@/components/forms/field-wrapper";
import FieldErrorList from "@/components/forms/field-error-list";
import FieldErrorPair from "@/components/forms/field-error-pair";
import HiddenField from "@/components/forms/fields/hidden-field";

export default function Account() {
  const [errorBuilders, errors] = useValidator({
    // personalization:
    displayName: [max(80, "Display name can't be longer than 80 characters.")],
    blurb: [max(255, "Blurb can't be longer than 255 characters.")],

    // credentials:
    // TODO:
    newUsername: [],
    newPassword: [],
    oldPassword: [],

    // danger zone:
    deletionSignature: [
      (value: string) =>
        value.length > 0 &&
        value.trim() !== "Yes, I want to delete my account." &&
        'You must affirm: "Yes, I want to delete my account."'
    ],
    // TODO:
    deletionOldPassword: []
  });

  function handleInput(
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name: field, value } = event.currentTarget;
    errorBuilders[field](value);
  }

  return (
    <div
      className="
      flex flex-col gap-4
      mx-auto max-w-3xl"
    >
      <div>
        <h1 className="text-3xl font-bold">Account</h1>
        <p className="text-neutral-500">
          Keep your information correct & up to date.
        </p>
      </div>

      <form
        className="
        flex flex-col gap-2
        p-6
        rounded
        fg fg-outline"
      >
        <div>
          <h2 className="text-xl font-bold">Profile</h2>
          <p className="text-sm text-neutral-500">
            How do you want to appear on AniMate?
          </p>
        </div>

        <div className="w-full h-[1px] bg-neutral-300" />

        <div className="flex flex-col gap-2">
          <div className="max-w-xl">
            <h3 className="text-sm font-medium">Display Name</h3>
            <FieldErrorPair>
              <Field>
                <input
                  name="displayName"
                  placeholder="What do you want to be called?"
                  onChange={handleInput}
                />
              </Field>
              <FieldErrorList errors={errors.displayName} />
            </FieldErrorPair>
          </div>

          <div>
            <h3 className="text-sm font-medium">Blurb</h3>
            <FieldErrorPair>
              <Field>
                <textarea
                  name="blurb"
                  className="block h-36 resize-none"
                  placeholder="Say something about yourself..."
                  onChange={handleInput}
                />
              </Field>
              <FieldErrorList errors={errors.blurb} />
            </FieldErrorPair>
          </div>
        </div>

        <button
          className="text-sm px-6 py-1 min-w-[6rem] w-fit rounded primary-box primary-shadow"
          onClick={(event) => {
            event.preventDefault();
            // TODO: submit!
          }}
        >
          Save
        </button>
      </form>

      <form
        className="
        flex flex-col gap-2
        p-6
        rounded
        fg fg-outline"
      >
        <div>
          <h2 className="text-xl font-bold">Credentials</h2>
          <p className="text-sm text-neutral-500">
            Let&apos;s make sure we got everything correct.
          </p>
        </div>

        <div className="w-full h-[1px] bg-neutral-300" />

        <div className="text-sm">
          <h3 className="font-medium">Username</h3>
          <p className="text-xs text-neutral-500">
            This is how others discover you on AniMate.
          </p>
        </div>
        <FieldErrorPair>
          <Field>
            <input
              name="newUsername"
              placeholder="New Username"
              onChange={handleInput}
            />
          </Field>
          <FieldErrorList errors={errors.blurb} />
        </FieldErrorPair>

        <h3 className="text-sm font-medium">Change Password</h3>
        <FieldErrorPair>
          <Field>
            <HiddenField
              name="newPassword"
              autoComplete="password"
              placeholder="New Password"
              onChange={handleInput}
            />
          </Field>
          <FieldErrorList errors={errors.blurb} />
        </FieldErrorPair>

        <div className="text-sm">
          <h3 className="font-semibold">Verify</h3>
          <p className="text-xs text-neutral-500">
            Before we make these changes, we need to make sure it&apos;s you.
          </p>
        </div>

        <h3 className="text-sm font-medium">Current Password</h3>
        <FieldErrorPair>
          <Field>
            <HiddenField
              name="oldPassword"
              placeholder="Current Password"
              onChange={handleInput}
            />
          </Field>
          <FieldErrorList errors={errors.blurb} />
        </FieldErrorPair>

        <button
          className="text-sm px-6 py-1 min-w-[6rem] w-fit rounded primary-box primary-shadow"
          onClick={(event) => {
            event.preventDefault();
            // TODO: submit!
          }}
        >
          Update
        </button>
      </form>

      <form
        className="
        flex flex-col gap-2
        p-6
        rounded
        fg fg-outline"
      >
        <div>
          <h2 className="text-xl text-red-900 font-bold">Danger Zone</h2>
          <p className="text-sm text-neutral-500">Tread with caution.</p>
        </div>

        <div className="w-full h-[1px] bg-neutral-300" />

        <div className="text-sm">
          <h3 className="font-medium">Delete Account</h3>
          <p className="text-neutral-500">
            Please affirm by typing &quot;Yes, I want to delete my
            account.&quot; in the field below.
          </p>
        </div>
        <FieldErrorPair>
          <Field>
            <input
              name="deletionSignature"
              autoComplete="off"
              placeholder="Yes, I want to delete my account."
              onChange={handleInput}
            />
          </Field>
          <FieldErrorList errors={errors.deletionSignature} />
        </FieldErrorPair>

        <h3 className="text-sm font-medium">Current Password</h3>
        <FieldErrorPair>
          <Field>
            <HiddenField
              name="deletionOldPassword"
              placeholder="Current Password"
              onChange={handleInput}
            />
          </Field>
          <FieldErrorList errors={errors.blurb} />
        </FieldErrorPair>

        <p className="text-sm text-red-500">
          Account deletion cannot be undone&mdash;be sure you want to do this.
        </p>

        <button
          className="text-sm px-6 py-1 min-w-[6rem] w-fit rounded danger-box danger-shadow"
          onClick={(event) => {
            event.preventDefault();
            // TODO: submit!
          }}
        >
          Delete Account
        </button>
      </form>
    </div>
  );
}