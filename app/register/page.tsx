"use client";

import { useState } from "react";
import { registerAction } from "../lib/actions/register";
import { useValidation } from "../lib/hooks/useValidations";
import { registerSchema } from "../lib/validations/register";

const initialState = {
  errors: {
    name: [""],
    email: [""],
    age: [""],
  },
  success: false,
};

export default function RegisterPage() {
  const validate = useValidation();
  const [state, setState] = useState(initialState);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const raw = {
      name: form.name,
      email: form.email,
      age: form.age ? Number(form.age) : undefined,
    };

    const result = registerSchema.safeParse(raw);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setState({
        success: false,
        errors: {
          name: fieldErrors.name || [],
          email: fieldErrors.email || [],
          age: fieldErrors.age || [],
        },
      });
      return;
    }

    // Dati validi → invia al server (via Server Action)
    const serverResult = await registerAction(
      undefined,
      new FormDataObject(raw)
    );
    setState(serverResult);
  };

  // Utility per convertire oggetto in FormData (compatibile con la Server Action)
  function FormDataObject(data: Record<string, any>) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined) {
        formData.append(key, String(data[key]));
      }
    }
    return formData;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="border p-1 w-full"
          value={form.name}
          onChange={handleChange}
        />
        {state.errors.name[0] && (
          <p className="text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="border p-1 w-full"
          value={form.email}
          onChange={handleChange}
        />
        {state.errors.email[0] && (
          <p className="text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label>Age (optional)</label>
        <input
          type="number"
          name="age"
          className="border p-1 w-full"
          value={form.age}
          onChange={handleChange}
        />
        {state.errors.age[0] && (
          <p className="text-red-500">{state.errors.age[0]}</p>
        )}
      </div>

      <button type="submit" className="bg-black text-white px-4 py-2">
        Register
      </button>

      {state.success && (
        <p className="text-green-600">✅ Registration complete</p>
      )}
    </form>
  );
}
