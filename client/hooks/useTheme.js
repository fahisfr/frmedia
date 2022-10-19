import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState("dark");

  const changeTheme = () => {
    const newTheme = theme == "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    setTheme(localStorage.theme);
  }, [changeTheme]);

  return [theme, changeTheme];
}

export default useTheme;
