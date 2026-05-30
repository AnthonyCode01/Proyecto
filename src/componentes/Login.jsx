import { useState } from "react";

import {
  Mail,
  Lock,
  Eye,
  ShieldCheck,
  X,
  Check,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

function Login({ setUsuario }) {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  // VALIDACIONES

  const tiene8 =
    password.length >= 8;

  const tieneMayus =
    /[A-Z]/.test(password);

  const tieneNumero =
    /\d/.test(password);

  const tieneSimbolo =
    /[!@#$%^&*]/.test(password);

  const validarPassword = () => {

    return (

      tiene8 &&
      tieneMayus &&
      tieneNumero &&
      tieneSimbolo

    );

  };

  const handleLogin = (e) => {

    e.preventDefault();

    if (!email || !password) {

      setError(
        "Completa todos los campos"
      );

      return;

    }

    if (!validarPassword()) {

      setError(
        "La contraseña no cumple los requisitos"
      );

      return;

    }

    const userData = {

      email,

      nombre:
        email.split("@")[0],

    };

    setUsuario(userData);

    setError("");

    navigate("/");

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4">

      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-md bg-white rounded-[30px] shadow-2xl p-8"
      >

        <button
          type="button"
          className="absolute top-5 right-5 text-gray-700 hover:text-black"
          onClick={() =>
            navigate("/")
          }
        >

          <X size={30} />

        </button>

        <div className="flex justify-center mb-5">

          <div className="bg-green-500 p-4 rounded-2xl shadow-lg">

            <ShieldCheck
              className="text-white"
              size={40}
            />

          </div>

        </div>

        <h1 className="text-4xl font-bold text-center text-slate-900">

          Bienvenido de nuevo

        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">

          Inicia sesión para continuar

        </p>

        <label className="font-semibold text-slate-700">

          Correo electrónico

        </label>

        <div className="flex items-center border rounded-xl px-4 py-4 mt-2 mb-6">

          <Mail
            className="text-gray-400 mr-3"
            size={22}
          />

          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full outline-none text-gray-700"
          />

        </div>

        <label className="font-semibold text-slate-700">

          Contraseña

        </label>

        <div className="flex items-center border rounded-xl px-4 py-4 mt-2">

          <Lock
            className="text-gray-400 mr-3"
            size={22}
          />

          <input
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full outline-none text-gray-700"
          />

          <Eye
            className="text-gray-400"
            size={22}
          />

        </div>

        {password.length > 0 && (

          <div className="border rounded-2xl p-4 mt-5 text-sm text-gray-700 bg-gray-50">

            <p className="font-semibold mb-3">

              La contraseña debe cumplir:

            </p>

            <div className="space-y-2">

              <p className="flex items-center gap-2">

                <Check
                  size={18}
                  className={
                    tiene8
                      ? "text-green-500"
                      : "text-gray-400"
                  }
                />

                Mínimo 8 caracteres

              </p>

              <p className="flex items-center gap-2">

                <Check
                  size={18}
                  className={
                    tieneMayus
                      ? "text-green-500"
                      : "text-gray-400"
                  }
                />

                Al menos 1 mayúscula

              </p>

              <p className="flex items-center gap-2">

                <Check
                  size={18}
                  className={
                    tieneNumero
                      ? "text-green-500"
                      : "text-gray-400"
                  }
                />

                Al menos 1 número

              </p>

              <p className="flex items-center gap-2">

                <Check
                  size={18}
                  className={
                    tieneSimbolo
                      ? "text-green-500"
                      : "text-gray-400"
                  }
                />

                Al menos 1 símbolo

              </p>

            </div>

          </div>

        )}

        {error && (

          <p className="text-red-500 text-sm mt-4">

            {error}

          </p>

        )}

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 transition text-white py-4 rounded-xl font-bold text-lg mt-7"
        >

          Iniciar sesión →

        </button>

      </form>

    </div>

  );
}

export default Login;