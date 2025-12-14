import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import AnimatedBackground from "../components/AnimatedBackground"; 
const API_BASE = import.meta.env.VITE_API_BASE;

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const dataToSend = form;

        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });
            const json = await res.json();

            if (json.error) {
                setError(json.error || "Register gagal. Coba lagi.");
            } else {
                navigate("/login");
            }
        } catch (err) {
            setError("Gagal terhubung ke server.");
            console.error("Register error:", err);
        }
    };

     return (
        <div className="relative h-screen flex items-center justify-center bg-[#0a0f18] text-white overflow-hidden">
            
            <AnimatedBackground />

            <RegisterForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
            />
        </div>
    );
}
