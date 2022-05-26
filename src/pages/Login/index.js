import React, { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
function Login() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.post("/session", { email })
        const { _id } = response.data;
        localStorage.setItem("@aircnc_id", _id);
        return navigate("/dashboard")
    

    }
    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talantos</strong> para sua empresa
            </p>

            <form>
                <label htmlFor="email">EMAL *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Seu melhor e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit" className="btn" onClick={handleSubmit}>Entrar</button>

            </form>


        </>
    )
}

export { Login };