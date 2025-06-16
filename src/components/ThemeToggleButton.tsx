import { useEffect, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

const themes = ["light", "dark"];
/*
Setup dark mode 
 * 1. Không chạy ở Server-Side Rendering (SSR).
 * 2. Theme đã lưu trong localStorage của người dùng.
 * 3. Tùy chọn chế độ tối của hệ điều hành.
 * 4. Mặc định là 'light'.
 * 
 - Server-Side Rendering (SSR) : 
*/
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [theme, setTheme] = useState(() => {
    // Tránh chạy code liên quan đến trình duyệt khi ở môi trường SSR (Server-Side Rendering)
    // Ví dụ: trong Astro, Next.js khi render trang trên server
    if (import.meta.env.SSR) {
      return undefined; // Trả về undefined để việc xác định theme diễn ra ở client
    }
    // Ưu tiên 1: Lấy theme đã được người dùng lưu trữ trong trình duyệt (localStorage)
    // Đảm bảo localStorage tồn tại trước khi truy cập
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme"); // Nếu có, sử dụng theme đó
    }
    // Ưu tiên 2: Kiểm tra tùy chọn theme của hệ điều hành người dùng
    // (Ví dụ: Dark Mode trong cài đặt Windows/macOS)
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"; // Nếu hệ thống đang ở chế độ tối, trả về 'dark'
    }
    return "light";
  });

  /*
  !! Sẽ bị nhầm ở đây khi mà tôi sẽ cho theme vào luôn 
  vì tôi sẽ để là để nguyên như trên là kiểm tra xem xong rồi cho vào luôn 

   const toggleTheme = () => {
    localStorage.setItem('theme', theme)
  }
  => thì nó sẽ báo là theme không tồn tại vì hiện tại chưa setTheme ở chõ nào nên nó sẽ bị 
  và để như function dưới đây để bào toàn rằng chỉ có hai gia trị được chấp nhận là light và dark
  */

  /*
  Giải thích useEffect
  để có thể cập nhập được giao diện như -> optimstic UI và cập nhập nhật khi có giá trị thay đổi luôn 

  */
  const toggleTheme = () => {
    const t = theme === "light" ? "dark" : "light"; // (Giả sử bạn gọi setTheme ở đâu đó)
    /// đẩm bảo chỉ có hai giá trị theme
    localStorage.setItem("theme", t); // Lỗi: 'theme' vẫn là giá trị cũ tại đây
    setTheme(t);
  };

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);
  // [theme] có thể coi là trigger kiểm soát việc khi nào mới được hoạt động

  useEffect(() => {
    setIsMounted(true);
  }, []); // nó chỉ chạy một lần duy nhất

  return isMounted ? (
    <div className="inline-flex items-center p-[1px] rounded-3xl bg-orange-300 dark:bg-zinc-600">
      {themes.map((t) => {
        const checked = t === theme;

        console.log(theme);
        return (
          <button
            id="themeToggle"
            key={t}
            className={`${
              checked ? "bg-white text-black" : ""
            } cursor-pointer rounded-3xl p-2`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {t === "light" ? <IoSunny /> : <IoMoon />}
          </button>
        );
      })}
    </div>
  ) : (
    <div />
  );
};

export default ThemeToggle;
