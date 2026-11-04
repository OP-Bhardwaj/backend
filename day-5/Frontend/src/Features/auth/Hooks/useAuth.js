import { login, logout, register, getMe } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  async function handleRegister({ email, username, password }) {
    setLoading(true);
    try {
      const data = await register({ email, username, password });
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ email, password }) {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }

  async function handleGetMe() {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout };
};